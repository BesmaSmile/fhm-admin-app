import {catalogService} from 'services';
import {catalogConstants} from 'store/constants';

export const catalogActions= {
  getCategories,
  getProducts
}

function getCategories(){
  return dispatch => {
    return catalogService.getCategories().then(categories=>{
      dispatch({ type: catalogConstants.GET_CATEGORIES, categories })
      return categories;
    })
  }
}

function getProducts(){
  return dispatch => {
    return catalogService.getProducts().then(products=>{
      dispatch({ type: catalogConstants.GET_PRODUCTS, products })
      return products;
    })
  }
}
