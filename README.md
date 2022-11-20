# To-Do App

This website is simple To-Do App, but with few extra features.
<br>
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Description
User can add/edit/remove To-Do Tasks using this website and this comes with few fearures which is

* User can mark certain task as 'Important' or 'Completed'.
* This app stores data inside local storage by default so after reload data will be retrived from local storage.
* This app also comes with cloud mode support, where user can create account and store data into firebase database.

## Notice

* In above app I am using firebase realtime database for storing data and firebase's own REST API for user authentication.
This is only for demo purpose and **This app does not _ _encrypt data while storing inside cloud_ _** So this will be only used for demo purposes.
* This app works in Local Mode all the time and Switching to cloud mode will not disable local mode. for more info on how it works see
[help section of website](https://todoapp-ee61f.web.app/modeshelp). So in Local mode, data will be stored only inside user's device and not in cloud database.
* Authentication mode will not verify email address, that's why it is requested to use any dummy email for testing pupose. The validation will happen but that will be simple validation of html. So anything which bypassess standard email validation will work as an email for sign-up.

## Demo

Here is the [Demo of website](https://todoapp-ee61f.web.app/) 
<br>
Deployed using [Firebase](https://firebase.google.com/)

## Built With

* <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
* <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" />  
* <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=whitw" />
* <img src="https://img.shields.io/badge/HTML5%20-%23e34f26.svg?&style=for-the-badge&logo=html5&logoColor=white" />
* <img src="https://img.shields.io/badge/CSS3-1572B6?&style=for-the-badge&logo=css3&logoColor=white" />

## Screenshots
<details>
  <summary>Click to see screenshots</summary>
  <br>
  <img src='/src/assets/todohome.png' />
  <img src='/src/assets/auth.png' />
  <img src='/src/assets/modeshelp.png' />
  <img src='/src/assets/taskadded.png' />
</details>

## Getting Started

### Prerequisites
1) [Angular CLI v14.2.1 and UP](https://angular.io/)
2) [Node.js v16.17.0 and UP](https://nodejs.org/en/) (LTS Version Recommanded)

### Installing

If anyone wants to test this project, user can do so by following below instruction.

* Download source code and extract anywhere into the PC.
* Open Terminal where project is extracted and then run following command 
```
npm install 
```
* After npm installs all dependency, user can run below command to see project in action.
```
ng serve
```

### Note

* By following above instruction, everything will work except Cloud mode (obviously). 
* If any user want to try cloud mode, user will need to sign-up for firebase, setup new realtime database and authentication.
* User then need to put project's webapi key inside environment.ts (for dev-server) and inside environment.prod.ts (for production).
