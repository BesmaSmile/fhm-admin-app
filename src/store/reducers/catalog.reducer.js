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
    case catalogConstants.ADD_PRODUCT:
    return {
      ...state,
      products : [...state.products, action.product]
    }
    case catalogConstants.UPDATE_PRODUCT:
    return {
      ...state,
      products : state.products.map(product=>product.id===action.product.id ? action.product : product)
    }
    case catalogConstants.UPDATE_CATEGORIES:
    return{
      ...state,
      categories : action.categories
    }
    case catalogConstants.UPDATE_SUB_CATEGORIES:
    return {
      ...state,
      categories :state.categories.map(category=>(category.id===action.categoryId ? {...category, subCategories : action.subCategories} : category))
    }
    default :
    return state
  }
}
