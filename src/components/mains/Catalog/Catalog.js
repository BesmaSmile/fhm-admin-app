import React, { useState, useEffect } from 'react';
import CatalogCategories from './CatalogCategories';
import CatalogSubCategories from './CatalogSubCategories';
import CatalogProductsList from './CatalogProductsList';
import CatalogStates from './CatalogStates';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';
import { catalogActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import { Button } from '@material-ui/core';
import { useDialog } from 'components/misc/Dialog/Dialog';
import ProductForm from 'components/misc/ProductForm/ProductForm';
import CategoryForm from 'components/misc/CategoryForm/CategoryForm';
import _ from 'lodash';
import './Catalog.scss';

const Catalog = (props) => {
  const categoriesRequest = hooks.useRequest()
  const productsRequest = hooks.useRequest()
  const formDialog = useDialog()

  const [_selectedCategory, _selectCategory] = useState()
  const [_selectedSubCategory, _selectSubCategory] = useState()
  const [_toggledImportation, _toggleImportation] = useState(false)
  const [_selectedStates, _selectStates] = useState([])

  const categories = _.get(props, 'categories', []).sort((c1, c2) => c1.order > c2.order ? 1 : -1)
  const subCategories = _.get(_selectedCategory, 'subCategories', [])
  const states = _.get(_selectedCategory, 'states', [])
  const importation = _.get(_selectedCategory, 'importation')

  const products = _.get(props, 'products', []).filter(product =>
    product.category === _.get(_selectedCategory, 'name')
    && (!_selectedSubCategory || product.subCategory === _selectedSubCategory)
    && (_selectedStates.length === 0 || _selectedStates.some(state => state === product.state))
    && (!_toggledImportation || !_.get(_selectedCategory, 'importation') || product.importationPrice > 0)
  )

  console.log(_toggledImportation)
  console.log()

  console.log(_.get(props, 'products', []).filter(product =>
    product.category === _.get(_selectedCategory, 'name')))

  useEffect(() => {
    if (!props.categories)
      categoriesRequest.execute({
        action: props.getCategories
      })
    if (!props.products)
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
      _selectCategory(_.get(props, 'categories', []).find(category => category.id === _selectedCategory.id))
    // eslint-disable-next-line
  }, [props.categories])

  useEffect(() => {
    if (_selectedCategory) {
      _selectSubCategory(_.get(_selectedCategory.subCategories, '0'))
    }
  }, [_selectedCategory])

  const handleSelectCategory = (id) => {
    const selectedCategory = categories.find(category => category.id === id)
    _selectCategory(selectedCategory)
  }

  const handleSelectSubCategory = (subCategory) => {
    _selectSubCategory(subCategory)
  }

  const handleSelectState = (state) => {
    let selectedStates = Object.assign([], _selectedStates)
    if (selectedStates.some(s => s === state))
      selectedStates = selectedStates.filter(s => s !== state)
    else selectedStates = [...selectedStates, state]
    _selectStates(selectedStates)
  }

  const openProductForm = (product, pictureUrl) => {
    const productForm = <ProductForm product={product}
      pictureUrl={pictureUrl}
      defaultCategory={!product && _.get(_selectedCategory, 'name')}
      defaultSubCategory={!product && _selectedSubCategory}
      categories={_.get(props, 'categories', [])}
      setProduct={props.setProduct}
      close={formDialog.close} />

    formDialog.open(productForm, true)
  }

  const openCategoryForm = (category) => {
    const categoryForm = <CategoryForm close={formDialog.close}
      categories={_.get(props, 'categories', [])}
      setCategory={props.setCategory}
      category={category} />
    formDialog.open(categoryForm, true)
  }

  return (
    <div className='Catalog relw100'>
      <div className='ctg-categories pad20'>
        {!categoriesRequest.pending && props.categories &&
          <CatalogCategories
            categories={categories}
            selectedCategory={_.get(_selectedCategory, 'id')}
            handleSelectCategory={handleSelectCategory}
            openCategoryForm={openCategoryForm}
          />
        }
        {categoriesRequest.pending && <div>Chargement en cours...</div>}
        {categoriesRequest.error && <div>{categoriesRequest.error}</div>}
      </div>

      <div className='pad20 flex row jcsb'>
        <div className='ctg-subCategories f1'>
          <div className='flex row aic'>
            {subCategories.length === 0 && <div className='fs14 cblack marr10 cmain'>Sous-catégories de produits</div>}
            {subCategories &&
              <CatalogSubCategories
                subCategories={subCategories}
                selectedSubCategory={_selectedSubCategory}
                handleSelectSubCategory={handleSelectSubCategory}
                updateSubCategories={(subCategories) => props.updateSubCategories(_selectedCategory.id, subCategories)}
              />
            }
          </div>
        </div>

        <ButtonWrapper
          neededPermission={permissionConstants.UPDATE_CATALOG}
          button={(disabled) => <Button variant="contained"
            disabled={disabled || productsRequest.pending}
            classes={{
              root: 'ctg-newButton',
              contained: 'ctg-newButton_contained',
              label: 'ctg-newButton_label'
            }}
            onClick={() => openProductForm()}
          >
            Nouveau produit
        </Button>} />

      </div>

      <div className='flex row marh20 marb20'>
        <div className='ctg-productList f1 marr10'>
          <CatalogProductsList products={products} openProductForm={openProductForm} />
        </div>
        <CatalogStates states={states}
          selectedStates={_selectedStates}
          handleSelectState={handleSelectState}
          updateStates={(states) => props.updateStates(_selectedCategory.id, states)}
          importation={importation}
          toggledImportation={_toggledImportation}
          handleToggleImportation={_toggleImportation}

        />
      </div>)
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
  setProduct: catalogActions.setProduct,
  setCategory: catalogActions.setCategory,
  updateSubCategories: catalogActions.updateSubCategories,
  updateStates: catalogActions.updateStates
}

export default connect(mapState, actionCreators)(Catalog);