import { createStore, combineReducers, compose, applyMiddleware, } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import editor from './editor/reducer';
import login from './login/reducer';
import project from './project/reducer';
import projects from './projects/reducer';
import settings from './settings/reducer';
import user from './user/reducer';

const reducers = combineReducers({
  editor,
  login,
  project,
  projects,
  settings,
  user,
});

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate(),
  ),
);

persistStore(store, {
  whitelist: ['editor', 'project', 'projects', 'user', 'settings'],
  storage: AsyncStorage,
});//.purge();

export default store;
