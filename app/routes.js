import CMS from './containers/CMS'
import Portal from './containers/Portal'
import Planner from './containers/Planner'
import Aether from './Aether'
import { isUserAuthenticated, deauthenticateUser } from './api/security'

export default {
  component: Aether,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (isUserAuthenticated()) {
          callback(null, CMS)
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
      path: '/planner',
      getComponent: (location, callback) => {
        if (isUserAuthenticated()) {
          callback(null, Planner)
        } else {
          callback(null, Portal)
        }
      },
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