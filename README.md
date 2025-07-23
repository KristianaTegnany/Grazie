# Hello dev

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: MapBox configuration

To install MapBox, you have to create a new file ".netrc" in the project's root (or in ~/) with these lines inside.

```bash
machine api.mapbox.com
login mapbox
password xxxx
```

## Step 2: Switch to prod or preprod

First, you will need to unzip the file "GigiFiles" sent to you privately in the project's root. Then you need to choose which env do you want to test (prod or preprod) by following these commands.

To switch to preprod env:

```bash
# using npm
npm run switch_preprod

# OR using Yarn
yarn switch_preprod
```

To switch to preprod env:

```bash
# using npm
npm run switch_prod

# OR using Yarn
yarn switch_prod
```

## Step 3: Start the Metro Server

First, you will need to install yarn if not already installed.

```bash
npm i -g yarn
```

Then 

```bash
# using Yarn
yarn start
```

## Step 4: Start our Grazie Gigi app

### For Android

```bash
yarn android
```

### For iOS

```bash
# go to ios directory
cd ios
# install pod dependencies
pod install
# go back to root
cd ..
# run the app on iOS simulator
yarn ios
```
