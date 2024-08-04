# DeVote

Welcome to DeVote, a Decentralized Voting App.
Revolutionizing Voting: Safe, Transparent, and Effortless!

## Prerequisites

1. Nvm installed on the machine, or Node version v21.1.0 (inside the .nvmrc file)

## Local setup

### Install requirements

1. Clone repo
2. Use correct node version in `.nvmrc` or run `nvm use`
3. Install yarn: `npm install -g yarn`
4. Install libraries: `yarn`
5. Backend
    1. `cd backend`
    2. Use another version of node: `nvm use`
    3. Install yarn: `npm install -g yarn`
    4. Install dependencies: `yarn`
    5. Build: `yarn build`

### Start the Application

`yarn start`

Or you can run the UI and Backend separately:

1. Start the backend: `yarn start:backend`
2. Start the frontend: `yarn start:ui`

### Accessing the application

You access the different parts of the APP:

1. UI: http://localhost:3000/
2. APIs: http://127.0.0.1:5001/devote-ba3e8/us-central1
3. Firebase Emulators: http://127.0.0.1:4000/

## Deploy

This project is using CI/CD pipelines to deploy on Firebase cloud.
Every merge on the main branch will automatically deploy the application into firebase.
