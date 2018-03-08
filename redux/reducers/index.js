import { combineReducers } from 'redux'
import pittition from './pittition'
import user from './user'

const rootReducer = combineReducers({
    pittition,
    user
})

export default rootReducer