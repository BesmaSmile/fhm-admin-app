import {newsConstants} from 'store/constants';

export function news(state = {}, action) {
  switch(action.type) {
    case newsConstants.GET_NEWS:
    return {
        ...state,
        news : action.news
    }
    case newsConstants.ADD_NEWS:
    return {
      ...state,
      news : [ action.news, ...state.news]
    }
    default :
    return state
  }
}
