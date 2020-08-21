import React, { useState, useEffect } from 'react';
import CatalogCategories from './CatalogCategories';
import CatalogSubCategories from './CatalogSubCategories';
import CatalogProductsList from './CatalogProductsList';
import { catalogActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import { Button } from '@material-ui/core';
import {useDialog} from 'components/misc/Dialog/Dialog';
import ProductForm from 'components/misc/ProductForm/ProductForm';
import _ from 'lodash';
import './Catalog.scss';

const Catalog = (props) => {
  const categoriesRequest = hooks.useRequest()
  const productsRequest = hooks.useRequest()
  const formDialog=useDialog()

  const [_selectedCategory, _selectCategory] = useState()
  const [_selectedSubCategory, _selectSubCategory] = useState()

  const categories = _.get(props, 'categories', []).sort((c1, c2) => c1.order > c2.order ? 1 : -1)
  const subCategories = _.get(_selectedCategory, 'subCategories', [])

  const products = _.get(props, 'products', []).filter(product =>
    product.category === _.get(_selectedCategory, 'label')
    && (!_selectedSubCategory || product.subCategory === _selectedSubCategory)
  )

  useEffect(() => {
    categoriesRequest.execute({
      action: props.getCategories
    })
    productsRequest.execute({
      action: props.getProducts
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (_.get(props, 'categories', []).length > 0 && !_selectedCategory) {
      _selectCategory(props.categories[0])
    }
    // eslint-disable-next-line
  }, [props.categories])

  useEffect(() => {
    if (_selectedCategory)
      _selectSubCategory(_.get(_selectedCategory.subCategories, '0'))
  }, [_selectedCategory])

  const handleSelectCategory = (id) => {
    const selectedCategory = categories.find(category => category.id === id)
    _selectCategory(selectedCategory)
  }

  const handleSelectSubCategory = (subCategory) => {
    _selectSubCategory(subCategory)
  }

  const productForm=(product, pictureUrl)=>{
    return (
      <ProductForm product={product} 
        pictureUrl={pictureUrl}
        defaultCategory={!product && _.get(_selectedCategory, 'label')}
        categories={_.get(props, 'categories', [])} 
        setProduct={props.setProduct}
        close={formDialog.close} />
    )
  }

  return (
    <div className='Catalog relw100'>
      <div className='ctg-categories pad20'>
        {!categoriesRequest.pending && props.categories && props.categories.length > 0 &&
          <CatalogCategories
            categories={categories}
            selectedCategory={_.get(_selectedCategory, 'id')}
            handleSelectCategory={handleSelectCategory}
          />
        }
        {categoriesRequest.pending && <div>Chargement en cours...</div>}
        {categoriesRequest.error && <div>{categoriesRequest.error}</div>}
      </div>

      <div className='pad20 flex row jcsb'>
        <div className='ctg-subCategories f1'>
          <div className='flex row aic'>
            {subCategories.length === 0 && <div className='fs14 cblack marr10 clightblue'>Sous-catégories de produits</div>}
            {subCategories &&
              <CatalogSubCategories
                subCategories={subCategories}
                selectedSubCategory={_selectedSubCategory}
                handleSelectSubCategory={handleSelectSubCategory}
              />
            }
          </div>
        </div>

        <Button variant="contained"
          disabled={productsRequest.pending}
          classes={{
            root: 'ctg-newButton',
            contained: 'ctg-newButton_contained',
            label: 'ctg-newButton_label'
          }} 
          onClick={()=>{formDialog.open(productForm(), true)}}
        >
          Nouveau produit
        </Button>
            
      </div>

      <div className='flex row marh20 marb20'>
        <div className='ctg-productList f1 marr10'>
          <CatalogProductsList products={products} openProductForm={(product, pictureUrl)=>formDialog.open(productForm(product, pictureUrl), true)}/>
        </div>
        <div className='w250'></div>
      </div>
    </div>
  )
}
const mapState = (state) => ({
  categories: state.catalog.categories,
  products: state.catalog.products
})

const actionCreators = {
  getCategories: catalogActions.getCategories,
  getProducts: catalogActions.getProducts,
  setProduct : catalogActions.setProduct
}

export default connect(mapState, actionCreators)(Catalog);