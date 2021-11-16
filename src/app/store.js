import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import loginAttempt  from '../redux_features/authSlice';
import { watcherSaga } from '../redux_features/Saga/sagas'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authentication: loginAttempt,
  },
  middleware: [sagaMiddleware],
  devTools: true
});

sagaMiddleware.run(watcherSaga)