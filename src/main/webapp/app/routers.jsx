/* eslint-disable max-len */
import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import zh from 'react-intl/locale-data/zh'

import App from './App'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ValidatePage from './pages/Validate'
import SettingsPage from './pages/Settings'
import TopicsPage from './pages/Topics'
import TopicPage from './pages/Topic'
import TopicNewPage from './pages/TopicNew'

import auth from './auth'
import * as routes from './constants/routes'
import configureStore from './store/configureStore'
import { setLocale } from './utils/intl'

addLocaleData([...zh])
const language = 'zh-CN'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const requireLogged = (_, replace) => {
  if (!auth.checkAuth()) {
    replace(routes.ACCOUNT_LOGIN)
  }
}

const requireNotLogged = (_, replace) => {
  if (auth.checkAuth()) {
    replace(routes.ROOT)
  }
}

const requireNotValidate = (_, replace) => {
  requireLogged(_, replace)
  const username = auth.getUsername()
  auth.activate(username)
    .then(res => {
      if (res.data.success) {
        replace(routes.ROOT)
      }
    })
}

// https://stackoverflow.com/questions/40280369/use-anchors-with-react-router
const hashLinkScroll = () => {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

const Routers = () => (
  <Provider store={store}>
    <IntlProvider locale={language} messages={setLocale(language)}>
      <Router history={history} onUpdate={hashLinkScroll}>
        <Route path={routes.ROOT} component={App}>
          <IndexRedirect to={routes.TOPICS} />

          {/* Account */}
          <Route path={routes.ACCOUNT_LOGIN} component={LoginPage} onEnter={requireNotLogged} />
          <Route path={routes.ACCOUNT_REGISTER} component={RegisterPage} onEnter={requireNotLogged} />
          <Route path={routes.ACCOUNT_VALIDATE} component={ValidatePage} onEnter={requireNotValidate} />
          <Route path={routes.ACCOUNT_SETTINGS} component={SettingsPage} onEnter={requireLogged} />

          {/* Topic */}
          <Route path={routes.TOPICS} component={TopicsPage} />
          <Route path={routes.TOPIC_NEW} component={TopicNewPage} onEnter={requireLogged} />
          <Route path={routes.TOPIC_DETAIL} component={TopicPage} />
        </Route>
      </Router>
    </IntlProvider>
  </Provider>
)

export default Routers
