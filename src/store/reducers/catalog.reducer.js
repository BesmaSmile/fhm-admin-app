import {catalogConstants} from 'store/constants';

export function catalog(state = {orders : {}}, action) {
  switch(action.type) {
    case catalogConstants.GET_CATEGORIES:
    return {
        ...state,
        categories : action.categories
    }
    case catalogConstants.GET_PRODUCTS:
    return {
        ...state,
        products : action.products
    }
    default :
    return state
  }
}
