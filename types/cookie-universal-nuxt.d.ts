import { CookieSerializeOptions } from 'cookie';

type CookieValue = any;

interface GetOptions {
  fromRes?: boolean;
  parseJSON?: boolean;
}

interface SetParams {
  name: string;
  value: CookieValue;
  opts?: CookieSerializeOptions;
}

export interface NuxtCookies {
  set: (
    name: string,
    value: CookieValue,
    opts?: CookieSerializeOptions,
  ) => void;
  setAll: (cookieArray: SetParams[]) => void;
  get: (name: string, opts?: GetOptions) => CookieValue;
  getAll: (opts?: GetOptions) => CookieValue[];
  remove: (name: string, opts?: CookieSerializeOptions) => void;
  removeAll: () => void;
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $cookies: NuxtCookies;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: NuxtCookies;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $cookies: NuxtCookies;
  }
}
