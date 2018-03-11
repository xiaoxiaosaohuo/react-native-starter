import { NavigationActions } from 'react-navigation';

let _container;

function setContainer(container) {
  _container = container;
}

function reset(routeName, params) {
    const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: routeName })],
  });
  _container.props.navigation.dispatch(resetAction);

}

function navigate(routeName, params) {

    const navigateAction = NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    })
  _container.props.navigation.dispatch(navigateAction);

}



function getCurrentRoute(){
  if (!_container || !_container.state.nav) {
    return null;
  }
  return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
  setContainer,
  navigate,
  reset,
  getCurrentRoute,
};
