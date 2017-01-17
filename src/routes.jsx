import React                        from 'react';
import {
	IndexRoute,
	Router,
	Route,
	browserHistory
}                                   from 'react-router';
import { ReduxAsyncConnect }        from 'redux-connect';
import App                          from './components/App';
import Homepage                     from './components/Homepage';

const Routes = (
  <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Homepage} />
      <Route path='/quizes' />
      <Route path='/quize/:id' />
    </Route>
  </Router>
);

export default Routes;
