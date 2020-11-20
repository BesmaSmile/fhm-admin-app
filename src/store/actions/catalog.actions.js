import { catalogService } from 'services';
import { catalogConstants } from 'store/constants';

export const catalogActions = {
  getCategories,
  getProducts,
  setProduct,
  setCategory,
  updateSubCategories,
  updateStates
}

function getCategories() {
  return dispatch => {
    return catalogService.getCategories().then(categories => {
      dispatch({ type: catalogConstants.GET_CATEGORIES, categories })
      return categories;
    })
  }
}

function getProducts() {
  return dispatch => {
    return catalogService.getProducts().then(products => {
      dispatch({ type: catalogConstants.GET_PRODUCTS, products })
      return products;
    })
  }
}

function setProduct(product, picture) {
  return dispatch => {
    return catalogService.setProduct(product, picture).then((poductToSet) => {
      dispatch({ type: product.id ? catalogConstants.UPDATE_PRODUCT : catalogConstants.ADD_PRODUCT, product: poductToSet })
      return product;
    })
  }
}

function setCategory(category, categories) {
  return dispatch => {
    return catalogService.setCategory(category, categories).then((categories) => {
      dispatch({ type: catalogConstants.UPDATE_CATEGORIES, categories })
      return categories;
    })
  }
}

function updateSubCategories(categoryId, subCategories) {
  return dispatch => {
    return catalogService.updateSubCategories(categoryId, subCategories).then(() => {
      dispatch({ type: catalogConstants.UPDATE_SUB_CATEGORIES, categoryId, subCategories })
      return subCategories;
    })
  }
}

function updateStates(categoryId, states) {
  return dispatch => {
    return catalogService.updateStates(categoryId, states).then(() => {
      dispatch({ type: catalogConstants.UPDATE_STATES, categoryId, states })
      return states;
    })
  }
}