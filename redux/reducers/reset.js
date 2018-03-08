import { LOGOUT } from '../../utils/constants'
const initialState = {
  isFetching: false,
  error: false
}

export default function resetReducer (state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}