# Dog Search

This is a single-page application to search for photos of nice doggies. 🐶

Also, it provided me with the opportunity to practice working with [TypeScript + React](https://reactjs.org/docs/static-type-checking.html#typescript)!

---

## Specifications

This application was built according to the following specifications:

> Create a single-page application that allows a user to:
>
> - Search for a specific breed of dog and display a list of the first 12 matching results, sorted
> alphabetically.
>   - If the search field is empty, display a list of the first 12 breeds available, sorted alphabetically.
>   - If the search field does not match any breeds, display a message that no breeds were found.
>   - While the list of breeds is loading, display a message that the breeds are loading.
> - Select one of the matching results and view pictures of that breed.
>   - When a result is selected, mark the selection visually as being active.
>   - While the images of the selected breed are loading, display a message that the images are loading.
>   - Use the Dog API (https://dog.ceo/dog-api/) as your data source.

---

## Implementation

### Finite State Machines

The logic for this user interface is built using **reducers** that act explicitly as **finite state machines**. That is, the reducer uses the current state and current action to determine which is the next state it should transition, and side-effects are run *only* when transitions between certain states have occurred.

Modeling the application with state machines will make easier to support extensibility in the long term, since it precisely defines when side-effects should be executed.

See the following state machines as interactive visualizations:
- [The `App` Component's state machine visualized](https://xstate.js.org/viz/?gist=464b097c1f2061d8ccde857f1fd060ce).
- [The `BreedSelector` Component's state machine visualized](https://xstate.js.org/viz/?gist=862063fd29ac5959193d07758e32cfc9).

### Sub-breed Search

While not mentioned in the specification, this application supports search by sub-breed (e.g. boston bulldog, english bulldog, french bulldog).

---


## Technologies

* TypeScript

    The sourcecode for this application has been in [TypeScript](https://www.typescriptlang.org/), allowing for errors to be caught at build time.

*  React

    This application is built using React, a library for building user interfaces. In particular, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

    In addition, the sourcecode for this application makes use of Hooks, a new(ish) feature of React.
    `useReducer` hooks are used to organize the logic for changes to application state, and `useEffect` is employed to retrieve API data.

* Bootstrap

    This application relies on [Bootstrap (v4)](https://getbootstrap.com/), an opensource CSS library.

* Dog API

    The [Dog API](https://github.com/ElliottLandsborough/dog-ceo-api) hosts the data and images queried by this application.

---

## Running the Application

This application has been bootstrapped with [`create-react-app`](https://facebook.github.io/create-react-app/).

To run this application in a local development environment, Node 8.10.0 or later is required.

To install the application's dependencies, navigate to the the project directory in a terminal, and run the command: `npm install`

### Development

Once the installation is complete, you can run: `npm start`

This command runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production

To view this application as it would run in a production environment, the recommended approach would be to generate a production build and use a static server (like [serve](https://github.com/zeit/serve)) to view it.

```
npm run build
npm install -g serve
serve -s build
```
