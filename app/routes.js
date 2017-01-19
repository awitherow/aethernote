import Aether from './containers/Aether'
import Portal from './containers/Portal'
import Membrane from './containers/Membrane'
import { isUserAuthenticated, deauthenticateUser } from './api/security'

export default {
  component: Membrane,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (isUserAuthenticated()) {
          callback(null, Aether)
        } else {
          callback(null, Portal)
        }
      },
    },
    {
      path: '/portal',
      component: Portal,
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        deauthenticateUser()
        replace('/')
      },
    },
  ],
}
