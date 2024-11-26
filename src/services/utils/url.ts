import {BASE_URL} from '../../../env';

const server = '/api/v1';

export const url = {
  baseUrl: BASE_URL,
  graphql: '/graphql/v1',
  preload: {
    noAuth: `${server}/screens/preload`,
    auth: `${server}/screens/preload2`,
  },
  user: {
    account: `${server}/account`,
    changeEmail: `${server}/account/new-email`,
    changePassword: `${server}/account/new-password`,
    delete: `${server}/account/delete`,
    cancelDeleting: `${server}/account/delete/cancel`,
    find: `${server}/account/exists`,
    passwordRecovery: `${server}/password/recovery`,
    passwordSet: `${server}/password/set`,
    travel: `${server}/travel`,
    newOrder: `${server}/order/new`,
    updateOrder: `${server}/order/`,
    updateAppointment: `${server}/appointment/`,
    logger: `${server}/logger`
  },
  auth: {
    login: `${server}/login`,
    logout: `${server}/logout`,
    refreshToken: `${server}/refresh-token/refresh`,
    registerNew: `${server}/register/new`,
    registerAccount: `${server}/register/account`,
    registerValidate: `${server}/register/validate`,
    registerCodeReset: `${server}/validation-code/reset`,
  },
  messages: {
    new: `${server}/messenger/message`,
    get: `${server}/messenger/messages`,
  },
  favorites: {
    favorite: `${server}/favorite`,
    list: `${server}/favorites/list`,
  },
  map: {
    points: `${server}/address/points`,
  },
};
