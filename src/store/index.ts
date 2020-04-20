import {combineReducers, createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { profileReducer } from './reducers/reducers';

const rootReducer = combineReducers({
    profile : profileReducer 
})

export default function configureStore(){
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware()
        )
    );
    return store;
}