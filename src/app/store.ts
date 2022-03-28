import { createStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import taskSlice from '../shared/slices/task-slice';
import rootSaga from './../shared/sagas/common/root-saga'


const sagaMiddleware = createSagaMiddleware()
 const reducer = combineReducers({
    task: taskSlice.reducer,
});

const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
// configureStore vs createStore
// find in the documents if i use createStore the second parameters is for reducer if im not using combineReducers need to clear this part

//  didnt get this part , even i google it :(
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
