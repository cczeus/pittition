import { LOGGING_IN, LOGGING_IN_SUCCESS, LOGGING_IN_FAILURE } from '../../utils/constants'
const initialState = {
  user: {},
  isFetching: false,
  error: false
}

export default function pittitionReducer (state = initialState, action) {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
        user: {},
        isFetching: true
      }
    case LOGGING_IN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.data
      }
    case LOGGING_IN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}