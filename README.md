# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment via Docker

Configure the .env variables

Create the build with `npm run build`

Build Docker with `docker build -t imageName .`

Now you can run Docker with `docker run -dp 3000:3000 imageName`

**if you want to change the env variables but not to rebuild.
You can change the variable in the .env and run Docker with:**
`docker run -dp 3000:3000 --env-file pathToEnvFile imageName`

_It is also Possible to give the variables as an argument to docker
`docker run -dp 3000:3000
-e REACT_APP_BACKEND="http://host.docker.internal:3001" imageName`_


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
