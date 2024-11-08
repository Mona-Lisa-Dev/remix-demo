import {OptionsObject} from 'notistack';

declare module 'notistack' {
  interface OptionsObject {
    variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
    heading?: string;
    messages?: string | string[];
  }
}
