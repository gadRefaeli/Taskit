import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { boardReducer } from './reducers/board.reducer.js';
import { userReducer } from './reducers/user.reducer.js'
import ReduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    userModule: userReducer,
    boardModule: boardReducer,
})

// export const store = createStore(rootReducer,
//     compose(applyMiddleware(ReduxThunk))) //Passing the reducer
export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))) //Passing the reducer




