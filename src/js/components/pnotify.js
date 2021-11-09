import { notice, error, alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyMobile from '@pnotify/mobile';

export function myNotice() {
  notice({
    text: 'Please, enter the name of the movie!',
    width: 200,
    sticker: false,
    hide: true,
    delay: 2000,
    modules: new Map([
      ...defaultModules,
      [
        PNotifyMobile,
        {
          swipeDismiss: true,
        },
      ],
    ]),
  });
}

export function myError() {
  error({
    text: 'Search result not successful. Enter the correct movie name and try again',
    width: 200,
    sticker: false,
    hide: true,
    delay: 2000,
    modules: new Map([
      ...defaultModules,
      [
        PNotifyMobile,
        {
          swipeDismiss: true,
        },
      ],
    ]),
  });
}

export function myAlert() {
  alert({
    text: 'Movies with this name has already shown!',
    width: 200,
    sticker: false,
    hide: true,
    delay: 2000,
    modules: new Map([
      ...defaultModules,
      [
        PNotifyMobile,
        {
          swipeDismiss: true,
        },
      ],
    ]),
  });
}
