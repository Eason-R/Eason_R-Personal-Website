const express = require('express');
// create express server instance 
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);


// static resource router
// serve css as static
app.use(express.static(__dirname + "/public"));

// HelloWorld
app.get('/', (req, res) => {
    // res.send('Hello World!');
    // console.log(__dirname)
    res.redirect('/home')
});

// Intro Page
app.get("/home", (req,res) => {
    res.sendFile(__dirname + "/public/pages/Intro.html");
})

// About Page
app.get("/about", (req,res) => {
    res.sendFile(__dirname + "/public/pages/Detail.html");
})

app.get("/test", (req,res) => {
    res.sendFile(__dirname+'/public/pages/WebTest.html')
})

// Chat Page
app.get("/chat", (req,res) => {
    res.sendFile(__dirname + "/public/pages/Chat.html");
})


// request handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let users = {};
let onlineUsers = [];

io.on('connection',function(socket){

    socket.on('new user', (name) => {
        let isnew = false;
        if(!(onlineUsers.includes(name))){
            isnew = !isnew
            users[name] = socket  // save new user as private socket  key{name}=value{socket}
            onlineUsers.push(name)  // save username to online user list
            console.log(onlineUsers)
        }
        io.emit('online users', isnew,onlineUsers)// brocast online user list
    });

    // monitor private message - unuse for now
    socket.on('private message', (from,to,msg) => {
        if(to in users){ 
            users[to].emit('to'+to, {msg,from,to}); 
        }
    });

    // monitor public message
    socket.on('public message', (from,msg) => {
        let time = new Date();
        let message = {
            user: from,
            msg: msg,
            time: time.toLocaleString()  // show time
        }
        io.emit('new message', message)
    });

    // brocast typing user
    socket.on('typing', user => {
        io.emit('typing', user)
    });

    // monitor user exit
    socket.on('disconnect', () => {
        let logoutUserName=Object.keys(users).find(key=>users[key]==socket);
        // delete user
        if(logoutUserName != undefined){
            delete users[logoutUserName];
        }
        onlineUsers = onlineUsers.filter(user => user!=logoutUserName);
        console.log(onlineUsers);
        io.emit('user disconnected',logoutUserName,onlineUsers);
    });
});

router.post("/login", (req,res)=>{
    let username = req.body.name,isnew = false;
    if(!(onlineUsers.includes(username))){
        isnew = !isnew
        users[username] = req.body.socket  // save new user as private socket  key{username}=value{socket}
        onlineUsers.push(username)  // save username to online user list
        console.log(onlineUsers)
    }
    io.emit('online users', isnew,onlineUsers)// brocast online user list
});

app.use("/",router);

// listen backend port
http.listen(3000,() => {
    console.log('server is running at port 3000') 
});

