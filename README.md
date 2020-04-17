order:
https://github.com/ionic-team/ionic-react-conference-app/blob/master/src/App.tsx
<IonApp>
<IonReactRouter>
<IonRouterOutlet>
# Ionic React Cordova

## Install dependencies
```shell
npm install -g cordova
npm install -g @ionic/cli
```

## Prepare ENV
```shell
mkdir www
```

## Add platforms
```shell
cordova platform add android
cordova platform add ios
```

## Add plugins
```shell
cordova plugin add whatever-plugin
```

## Build Project
```shell
ionic build
```

## Run device/emulator
```shell
cordova run android
cordova run ios
```
## INSTALL nightly packages
npm install --global cordova@nightly
cordova platform add ios@nightly
cordova platform add android@nightly

## Note:
You can still use any ionic or cordova command

### Example:
```shell
ionic build
ionic serve
cordova plugin ls
cordova platform update android --save
```

