import { combineReducers } from 'redux'
import pittition from './pittition'
import user from './user'
import reset from './reset'

const rootReducer = combineReducers({
	reset,
    pittition,
    user
})

export default rootReducer