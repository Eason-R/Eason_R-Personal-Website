# ABD-web assignment Report
Author: Yusheng Ren

Date: 04/2023

>   **key points**
>
>   [overall design](#design)
>
>   [challenges](#challenges)
>
>   [web communication & web socket](#web)

## How to run the program
if you are in Windows
```shell
cd ... #cd to project base path
npm i
nodemon
```
Then you can access `localhost:8888/` to visit pages by any browser.
(Chorme or Edge are recommened)

## <span id='design'>Design</span>
The overall style of my website is simple and clear. And I will introduce design in every pages briefly.

### Introduction Page

This is a simple hello page.

In the bottom part of the page, there is a set of navigation can direct user to all 3 main pages. And I added wave animation making the page more interesting.

### About Page
This page contains some of my informations. The header is where I show my name. Below it is the main area and the area is divided into two parts. The larger one on the left should be the main text, while another on the right is for navigation buttons and my message. The navigation buttons have smooth special animation effects.

I left a lot of space for me to fit more functions and content into the page, in the future.

### Chat application
The chat application contains 3 parts. The static part on the top left corner shows my information that provide more visual interest. And the bottom left part is for login and showing online users. The big part on the right is the chatbox which can let user send and view messages.

User can type in username they want in input element in login area and then they can create an account by clicking login button. If they do so, there will be a hint messsage show in chat box. At the same time, the login button will be disabled and the user list will update. When a new user login, the user list will update, too. When one user close exit the chat room(close the page), a hint will show and user list will also update. There will be hint showing in chat box when a user is typing.

The chat box can show message from users. Your messages will appear on the right while others on the left(system hints will appear in the middle with special look). And every meesage will contains time and username of who send it.

## <span id='web'>Web Communication & Web Socket</span>

The application use `express` and `socket.io` to communicate between front-end and back-end. User can enter website address to get pages. In ChatRoom, data are emitted to back-end with `socket.io`.

In back-end, `socket.io` are used to handle request from users. Each user has a unique socket, so back-end could automatically indentify each user. What back-end can handle, for instance, are page switch, login, send message as well as logout. Most of the time, back-end only need to send data from an user to other users and that's quite simple.

In front-end. the logic of codes are a little more complicated. Script need to send request to back-end, handle response from back-end and update UI when necessary. I will just skip some details.

-   **Login**: send request to back-end, then if login succeed, the login button will be disabled(prevent user from login multiple times in one tab). Then user list element will be updated.
-   **Send Message**: send request and then show the message in chat box(update UI).
-   **Receive Messages & Receive System Hints**: just append new message into chat box
-   **Logout**: When user close a tab. the socket will send a request to back-end on it own. Then, it can show the leave hint on other online users' screen and update user list next.

The operations above are all based on `socket.io`.

## <span id='challenges'>Challenges</span>

In the process of designing my website, I had a lot of troubles in adjusting typography. Sometimes, I want text to be in the middle of the line but I tried many CSS attribute to find they were all useless. Luckily, I broswered many blogs and answers to figure them out.

Then, I couldn't communicate with back-end normally. And the cause is the version of `socket.io` are different between front-end and back-end.

Initially, I planed to preserve multiple connection in a single tab. However, I soon found it unnecessary and resouce-wasting to realize this. Thus, I gave it up.

Finally, I was blocked because I was unable to debug my application on Codio. With the help of Professor Jari, I managed to solve the proble

## References
 1. [Best Personal Websites: 35+ Examples to Blow Your Mind](https://blog.hubspot.com/marketing/best-personal-websites)
 2. [Bootstrap v4 Docs - Simplified Chinese](https://v4.bootcss.com/docs/getting-started/introduction/)
 3. [Seán Halpin — Product Designer](https://www.seanhalpin.xyz/)
 4. [CSS教程](https://www.w3school.com.cn/css/index.asp)
 5. [CSDN博客_前端必学的CSS3波浪效果演示_国服第二切图仔的博客](https://blog.csdn.net/m0_61243965/article/details/125268823)
 6. ChatGPT