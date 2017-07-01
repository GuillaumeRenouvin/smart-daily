import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login/trello',
      name: 'trelloLogin',
      getComponent(nextState, cb) {
        import('containers/TrelloLogin')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/settings/board',
      name: 'settingsBoard',
      getComponent(nextState, cb) {
        import('containers/SettingsBoard')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/settings/columns',
      name: 'settingsColumns',
      getComponent(nextState, cb) {
        import('containers/SettingsColumns')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
