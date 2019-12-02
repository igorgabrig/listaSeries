import {SET_SERIES} from '../actions';


export default function(state = null, action) {
  switch(action.type) {
    case SET_SERIES:
      console.log(action.series);
      return action.series;
    default:
      return state;
  }
}