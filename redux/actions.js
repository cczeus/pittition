import { FETCHING_PITTITION, FETCHING_PITTITION_SUCCESS, FETCHING_PITTITION_FAILURE } from '../utils/constants'

export function fetchPittitionFromAPI() {
  return (dispatch) => {
    console.log("FETCHING");
    dispatch(getPittition())
    fetch('http://localhost:3000/getPittitions')
    .then(data => data.json())
    .then(json => {
      dispatch(getPittitionSuccess(json))
    })
    .catch(err => dispatch(getPittitionFailure(err)))
  }
}

export function getPittition() {
  return {
    type: FETCHING_PITTITION
  }
}

export function getPittitionSuccess(data) {
  return {
    type: FETCHING_PITTITION_SUCCESS,
    data,
  }
}

export function getPittitionFailure() {
  return {
    type: FETCHING_PITTITION_FAILURE
  }
}