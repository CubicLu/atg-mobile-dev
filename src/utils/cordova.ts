import { showKeyboard, didShowKeyboard, hideKeyboard } from '.';
declare global {
  interface CordovaPlugins {
    backgroundMode: any;
  }
}

export function loadCordovaPlugins(): void {
  console.log('cordova Loaded!');
  (window as any).deviceready = true;

  //Delay for splashscreen when ready
  setTimeout((): void => (navigator as any).splashscreen.hide(), 200);

  //Listeners for keyboard behavior on device
  window.addEventListener('keyboardWillShow', (): void => showKeyboard());
  window.addEventListener('keyboardDidShow', (): void => didShowKeyboard());
  window.addEventListener('keyboardWillHide', (): void => {
    window.Keyboard.isVisible && hideKeyboard();
  });

  //Background mode for Android
  if (window.cordova.platformId === 'android') {
    const bgMode = window.cordova.plugins.backgroundMode;
    bgMode.enable();
    bgMode.setDefaults({ title: 'title', text: 'title', silent: true });
    bgMode.on('deactivate', (): void => bgMode.moveToBackground());
    bgMode.on('enable', (): void => console.log('background enabled'));
    bgMode.on('activate', (): void => {
      console.log('background active');
      bgMode.moveToForeground();
      bgMode.disableWebViewOptimizations();
    });
  }
}
