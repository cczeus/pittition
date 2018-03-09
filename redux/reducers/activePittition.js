import { FETCHING_ACTIVE_PITTITION } from '../../utils/constants'
const initialState = {
  activePittition: [],
  isFetching: false,
  error: false
}

export default function activePittitionReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_ACTIVE_PITTITION:
      return {
        ...state,
        activePittition: action.data,
        isFetching: false
      }
    default:
      return state
  }
}