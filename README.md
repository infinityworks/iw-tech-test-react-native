# Infinity Works - React Native Tech Test

## Getting started

### Clone this repo

```
$ git clone https://github.com/infinityworks/iw-tech-test-react-native.git
$ cd /path/to/iw-tech-test-react-native # instructions assume you are in this folder
```

### Set up your development environment
Follow the instructions [here](https://reactnative.dev/docs/environment-setup) to set up your development environment for either iOS or Android.


### Visual Studio Code

We recommend [Visual Studio Code](https://code.visualstudio.com/). There are workspace settings in [`.vscode/settings.json`](.vscode/settings.json) that will automatically format the code and fix any linting issues on save.

For this to work, you must also install the [Microsoft ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

### Install packages

```
$ npm install
```

### iOS only: Install CocoaPods

```
$ npx pod-install ios # this may take a while
```

### Run Metro

```
$ npx react-native start
```

### Run the app on an Android Emulator

```
$ npx react-native run-android
```

### Run the app on an iOS Simulator

```
$ npx react-native run-ios
```

## Testing

### Overview

Our tests are written in TypeScript using the [Jest Testing Framework](https://jestjs.io/). Test files are adjacent to the code they test (look for `index.test.ts*`).

We use [Jest Mocks](https://jestjs.io/docs/manual-mocks) to mock dependencies where necessary.

We use [Mock Service Worker](https://mswjs.io/) to mock API calls where necessary.

There are __no__ API integration tests nor end to end UI tests.

### Running tests

There are a number of test scripts defined in [package.json](package.json):

```
$ npm run test              # runs all tests once
$ npm run test:watch        # runs tests for changed (uncommited) code
$ npm run test:coverage     # runs all tests and produces a test coverage report

```

## Submission

* Do __NOT__ fork this repository
* Do __NOT__ commit your code to a public GitHub repo

## Screenshots

![Authority List Screen](screenshots/authority-list-screen.png)
![Authority Detail Screen](screenshots/authority-detail-screen.png)
