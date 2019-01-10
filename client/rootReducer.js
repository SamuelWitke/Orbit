import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Client from '../imports/Client/reducers';


export default history => combineReducers({
  router: connectRouter(history),

  Client,
})
;