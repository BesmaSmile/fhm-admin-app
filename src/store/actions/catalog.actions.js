import {catalogService} from 'services';
import {catalogConstants} from 'store/constants';

export const catalogActions= {
  getCategories,
  getProducts,
  setProduct
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

function setProduct(product, picture){
  return dispatch => {
    return catalogService.setProduct(product, picture).then((poductToSet)=>{
      dispatch({ type: product.id ? catalogConstants.UPDATE_PRODUCT : catalogConstants.ADD_PRODUCT, product : poductToSet })
      return product;
    })
  }
}
