import Aether from './containers/Aether';
import Portal from './containers/Portal';
import Guardhouse from './containers/Guardhouse';
import { isUserAuthenticated, deauthenticateUser } from './api/security';

export default {
  component: Guardhouse,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (isUserAuthenticated()) {
          callback(null, Aether);
        } else {
          callback(null, Portal);
        }
      }
    },
    {
      path: '/portal',
      component: Portal
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        deauthenticateUser();
        replace('/');
      }
    }
  ]
}