import { combineReducers } from 'redux'
import pittition from './pittition'
import user from './user'
import reset from './reset'
import activePittition from './activePittition'

const rootReducer = combineReducers({
	reset,
    pittition,
    user,
    activePittition
})

export default rootReducer