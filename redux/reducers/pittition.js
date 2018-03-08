import { FETCHING_PITTITION, FETCHING_PITTITION_SUCCESS, FETCHING_PITTITION_FAILURE } from '../../utils/constants'
const initialState = {
  pittition: [],
  isFetching: false,
  error: false
}

export default function pittitionReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_PITTITION:
      return {
        ...state,
        pittition: [],
        isFetching: true
      }
    case FETCHING_PITTITION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pittition: action.data
      }
    case FETCHING_PITTITION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}