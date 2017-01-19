import Aether from './containers/Aether'
import Portal from './containers/Portal'
import Membrane from './containers/Membrane'
import { isUserAuthenticated, deauthenticateUser } from './api/security'

let routes = {
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

if (module.hot) {
  let oldRoutes = module.hot.data && module.hot.data.routes
  if (oldRoutes) {
    routes = oldRoutes
  }
  module.hot.dispose(data => data.routes = routes)
}

export default routes
