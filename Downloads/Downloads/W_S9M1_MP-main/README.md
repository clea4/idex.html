# Sprint 9 Module 4 Project

## Introduction

Welcome to Module 4 Project! For this project, you will thoroughly test a login screen using **React Testing Library**.

## Instructions

The app is comprised of an Auth component which is capable of logging in registered users, and logging them out.

You will write tests for this component with React Testing Library (RTL).

These tests will guard against unexpected changes in the behavior of Auth, while reducing the need for constant manual testing.

### 💾 Setup

**Here are the steps to set up this project:**

1. Clone this repository to your computer.

2. Within your terminal, navigate to the project folder and execute `npm install`.

3. After successful installation execute `npm run dev` and, in a different terminal, `npm test`.

4. You will load the app in Chrome by navigating the browser to `http://localhost:3003`.

**❗ Note:** In the event of NPM errors during setup, delete the `node_modules` folder and the `package-lock.json` file, and retry `npm i` and `npm run dev`.

### 🥷 Tasks

**Here are the files of interest in this project:**

1. Inside [Auth.js](./frontend/components/Auth.js) you will find the component you will test. **Do not change this module!**

2. Inside [Auth.test.js](./frontend/components/Auth.test.js) is where you will write all your code.

Have fun writing tests, and check out the **Solution Video** of this project for tips and getting unstuck!

#### 👉 TASK 1 - Perform Manual Testing on the Page

1. Visit your app in `http://localhost:3003`.

2. There are 4 users registered in the system, try logging them in by hand:
    - username `Shakira`, password `Suerte1977%`
    - username `Beyoncé`, password `Halo1981#`
    - username `Shakira`, password `FirstLove1983;`
    - username `Madonna`, password `Vogue1958@`

    **Note:** You can submit the form either clicking the button or hitting the Enter key on your keyboard.

3. See how a successful log-in renders a welcome message, some user info, and a log-out button.

4. Verify that submitting any other credentials, including an empty form, renders an "Invalid Credentials" message.

5. Note how slow the log-in process is, a "Please wait..." message rendering while the request completes.

6. Verify that logging out renders a goodbye message.

#### 👉 TASK 2 - Write Automatic Tests

- Inside [Auth.test.js](./frontend/components/Auth.test.js), you will write your tests.

- The setup and scaffolding of the tests is done for you, and you have comments in the code guiding you along. You will start working after line 36.

- The summary of the tests is below. Make sure you can replicate all these behaviors in Chrome!

  1. The values of the inputs are changed by typing on them
  2. Submitting the form by clicking the log-in button shows "Please wait..." message
  3. Submitting the form by hitting ENTER with the keyboard shows "Please wait..." message
  4. Submitting an empty form _eventually_ shows an "Invalid Credentials" message
  5. Submitting incorrect credentials _eventually_ shows an "Invalid Credentials" message
  6. Logging in a valid user (example: Shakira) makes the following elements render _eventually_:
      - correct welcome message (example: "Welcome back, Shakira. We LOVE you!")
      - correct user info (example: "ID: 1, Username: Shakira, Born: 1977")
      - logout button
  7. Logging out _eventually_ displays a goodbye message and renders the login form

**NOTES:**

- ❗ The word _eventually_ marks those events that happen asynchronously.
- ❗ Please check the relevant chapter of the Solution Video if you get stuck.

👋 Have fun!

## FAQ

<details>
  <summary>I feel very stuck. What can I do?</summary>

Check out the Solution Video for this project in your learning platform. In it, an industry expert will walk you through their thinking in detail while they solve the tasks. The Solution Videos are highly recommended even if you are not stuck: you will learn lots of tricks.

</details>

<details>
  <summary>I am getting errors when I run npm install. What is going on?</summary>

This project requires Node to be correctly installed on your computer to work. Sometimes Node can be installed but misconfigured. Try deleting `node_modules` and running `npm install`. If that fails, try deleting both `node_modules` and `package-lock.json` before reinstalling. If all fails, please request support!

</details>

<details>
  <summary>Do I need to install extra libraries with NPM?</summary>

No. Everything you need should be installed already.

</details>

<details>
  <summary>Can I edit the HTML or the CSS?</summary>

That's probably not a great idea. Why do you want to do that?

</details>

<details>
  <summary>My page does not work! How do I debug it?</summary>

The app should work as-is. If your freshly cloned project does not work correctly in Chrome, please make sure to `npm install` and `npm run dev` inside the project folder.

</details>

<details>
  <summary>How do I run tests against my code?</summary>

Execute `npm test` inside the project folder.

</details>

<details>
  <summary>I messed up and want to start over! How do I do that?</summary>

Do NOT delete your repository from GitHub! Instead, commit frequently as you work. Make a commit after each test. This in practice creates restore points you can use should you wreak havoc with your app. If you find yourself in a mess, use git reset --hard to simply discard all changes to your code since your last commit. If you are dead-set on restarting the challenge from scratch, you can do this with Git as well. Research how to reset hard to a specific commit.

</details>

**Project created with [@bloomtools/react@0.1.18](https://github.com/bloominstituteoftechnology/npm-tools-react)**
