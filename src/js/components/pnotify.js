import { notice, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export function myNotice() {
  notice({
    text: 'Please, enter the name of the movie!',
  });
}

export function myError() {
  error({
    text: 'Search result not successful. Enter the correct movie name and try again',
  });
}
