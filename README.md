# Fullstack Job Application using React, Vite, Node.js, Express.js and PostgreSQL (PERN)

## This is fullstack application of a jobportal and a challenge from Frontend Mentor.

## To install this project

- Please remove the .git file by using command "rm -rf .git"
- Then use "git init" again
- Then "npm install" or "yarn install"
- Then "npm update" or "yarn upgrade"

## Used Technologies...

## [Vite](https://vitejs.dev/guide/)

... is a lightning-fast build tool for React projects.

## Frontend Technologies

### [React](https://react.dev/)

... is a JavaScript library for building user interfaces. Developed by Meta, it allows you to create reusable UI components, making it efficient to build interactive and dynamic web applications. Perfect for building modern and efficient front-end experiences.

### [Tailwind-CSS](https://tailwindcss.com/docs/guides/vite)

... simplifies styling in your React application by using classnames.

### [Styled-Components](https://styled-components.com)

... allows to use CSS code in your components and more.

### [React Router](https://reactrouter.com/en/main/start/overview)

... is a popular library for routing in React applications. It allows you to navigate between different pages or views in your single-page application (SPA). With React Router, you can define routes and render components based on the URL, creating a seamless user experience.

### [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)

... is a library that simplifies and streamlines Redux, a state management tool for JavaScript applications. It reduces boilerplate code and provides useful utilities for easier development.

## Backend Technologies

### [Node.js](https://nodejs.org/en)

... is an open-source, cross-platform JavaScript runtime environment.

### [Express.js](https://expressjs.com/)

... is a web application framework for Node.js, simplifying the process of building robust and scalable web applications. It provides a set of features for routing, middleware, and handling HTTP requests and responses.

### [node-postgres](https://node-postgres.com/)

... is a Node.js module for interacting with PostgreSQL databases. It allows you to easily connect to a PostgreSQL database, perform queries, and handle results. Useful for integrating PostgreSQL into your Node.js applications.

## Authorization

### [Auth0 by Okta](https://auth0.com/)

... is an identity and access management platform. It simplifies authentication and authorization processes, providing features like social login, multi-factor authentication, and single sign-on. Useful for securing and managing user access in your applications.

## Fetching

### [Axios](https://axios-http.com/docs/intro)

... is a promise-based HTTP client for the browser and Node.js. It simplifies making HTTP requests and handling responses. Commonly used for fetching data from APIs or sending data to a server.

## Deployment (Front- and Backend)

### [Netlify](https://www.netlify.com/)

... is a web development platform that offers continuous integration, serverless functions, and automatic deployment. It simplifies the process of building, deploying, and managing modern web projects.

### [Render](https://render.com/)

... is a cloud platform that provides a simple and scalable solution for deploying and hosting web applications. It supports a variety of programming languages and frameworks, offering easy setup and automatic scaling.

## Project Overview

The project is representing a role based jobportal for developers with various functions.

## Paths of the application

--Root
--Signup
--Inner (represented by jobId)
--Dashboard
--Errorpage (for not existing paths)

## Important note for users

The app currently does not support the signup and login as not Chrome, Firefox and Edge users.
Safari does not store third-party cookies without disabling the "Prevent cross-site tracking" option or can create partitioned cookies. This behaviour can cause server issues at this state. For this I have disabled the option to signup and login for users other than the mentioned browsers above.

## General overview of the app

![Home](/frontend/public/home.png)

On the Rootpage of the application the app is fetching existing jobs from the database and renders the job components. On top is a filter functionality tofilter the jobs.
The app can be displayed in light and dark mode. Clicking on the job components will
link you to the details of the jobs.

![JobDetails](/frontend/public/inner.png)

On the inner path more details of the job are displayed. This is also the place where users can send an application to the jobcreator or visit the website.

![SignUp](/frontend/public/signup.png)

On the signup page the user is able to decide if they want to create a private or company account. The registration of the profile is handle with auth0 from Okta. Only users with github account are able to register.

## Overview private user

![dashboardPrivate](/frontend/public/dashboardPrivate.png)

On the private dashboard page as private user you can see some Profile data. Here the user can check his application to other jobs and check the state. The user also can edit the profile and read the messages from companies on the applications. The applications can be sorted or filtered. The user can also upload another picture powered by cloudinary by clicking on the profile picture.

![editProfile](/frontend/public/editProfile.png)

On the edit popup the user can modify the user data or delete the profile.

![viewApplications](/frontend/public/viewApplications.png)

On the view applications popup the user can check the job description and the application text as also some statistics and link to original page.

![readMessages](/frontend/public/readMessages.png)

In this part the user can see the answers on the applications from the companies and can also answer back to the company.

## Overview company user

![dashboardCompany](/frontend/public/dashboardCompany.png)

On the company dashboard the company user can create and edit new and existing jobs. Also the user can check the applications from the users and respond to them or change the status of their application. The job can also be closed without deleting them changing their status.

![createJobs](/frontend/public/createJobs.png)

In this popup the user can fill out a form to submit a job wich then can be seen by other users.

![editJobs](/frontend/public/editJobs.png)

To make changes on the existing joboffer the user can edit the single job with the edit button and make changes.

![appsCompany](/frontend/public/appsCompany.png)

The company user can also inspect the applications related to the jobs and see the applicants user data and text. Here the company user can change the status of the application to accepted or denied and also can answer to the applicant.

![readReplies](/frontend/public/readReplies.png)

In the read replies popup the user can then also ckeck what the applicant answered to the messages from the company user.

## Overview admin user

![dashboardAdmin](/frontend/public/dashboardAdmin.png)

The app also contains an admin user wich is the developer. The admin user is able to ban users or delete single jobs again by visiting the detailed jobpages.

![adminUserdetails](/frontend/public/adminUserdetails.png)

The admin can also view basic statistics from other users.
