import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
export const addListener = createReduxBoundAddListener("root");
