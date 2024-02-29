# Fullstack Job Application using React, Vite and PostgreSQL

This is the setup I use for bigger React projects in JavaScript.
The projects have multiple pages and have a lot of functionality and complex state manipulation across the project.
For fetching data RTK Query is used or async thunks.

## This template uses following setups

- Please remove the .git file by using command "rm -rf .git"
- Then use "git init" again
- Then "npm install" or "yarn install"
- Then "npm update" or "yarn upgrade"

### Using Vite for bundling

[Vite](https://vitejs.dev/guide/) is a lightning-fast build tool for React projects.

### Using Tailwind-CSS for quick Styling

[Tailwind-CSS](https://tailwindcss.com/docs/guides/vite) simplifies styling in your React application.

### Prepared React Testing Library and Jest

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is a user-centric testing library that encourages testing your React components as users would interact with them.
- [Jest](https://jestjs.io/docs/getting-started) is a JavaScript testing framework that provides a simple and powerful toolset for testing JavaScript applications, including React components, with built-in test runners and assertions.

### Using React Router for routing

- [React Router](https://reactrouter.com/en/main/start/overview) React Router is a popular library for routing in React applications. It allows you to navigate between different pages or views in your single-page application (SPA). With React Router, you can define routes and render components based on the URL, creating a seamless user experience.

### Using Redux Toolkit for state management

- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) Redux Toolkit is a library that simplifies and streamlines Redux, a state management tool for JavaScript applications. It reduces boilerplate code and provides useful utilities for easier development.

### images

- public/images with favicon
- favicon-32x32.png

#### styles

- normalize.css
- index.css

### Files

#### netlify.toml

- holding the rules for redirecting for netlify

#### store

- store.js hold the configuration for the store object used in redux. Example file.

#### slices

- slice directory and example todoSlice.js to demonstrate its use.

#### thunks

- thunks directory and example todoThunk.js to demonstrate its use.

#### RTK Query api directory

- api directory holding the apiSlice.js.
- configured store.js for RTK Query
- installed Provider in main.jsx

#### Todos Examples

- Example Todos.jsx and Todo.jsx to demonstrate the use of redux.

#### utils functions

- utils.js currently has (saveDataToLocalStorage, loadDataFromLocalStorage) functions

#### animations

- animations.js has prepared animations for framer library for react animations.

#### App data

- data.js holding static data for the web app

#### customHooks

- useFetchData.jsx

#### Loader

- Loader.jsx a Styled-Component which you can use to represent fetching animation.

#### Footer

- Footer.jsx a footer component for Frontend Mentor. (Change your name there or styles or delete)

#### Routes

- Holding example path and how to structure the paths

#### pages

- pages directory to hold pages components

#### SharedLayout

- Holding an example of how to use shared components between pages

#### ErrorPage

- Holding example of 404 page

#### HomePage

- Example and placeholder page for starting route

#### ErrorBoundary

- ErrorBoundary.jsx optional component to catch errors and return a component on error

#### Example Test

- components/Example/Counter.jsx
- .tests/Example/Counter.test.jsx

You can run tests by using ("npm run test" or "yarn test" depending on your package manager).

What you don't need you can remove and ofcourse install more dependencies which you might need for sure 😊
I hope this might inspire you to create your own template which you can keep on modifying and ofcourse create different variants.

Happy coding!
