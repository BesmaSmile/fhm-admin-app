import React, {useState, useEffect} from 'react';
import Catalog_Categories from './Catalog_Categories';
import Catalog_SubCategories from './Catalog_SubCategories';
import Catalog_ProductsList from './Catalog_ProductsList';
import {catalogActions} from 'store/actions';
import {connect} from 'react-redux';
import {hooks} from 'functions';
import {Button} from '@material-ui/core';
import _ from 'lodash';
import './Catalog.scss';

const Catalog=(props)=>{
  const categoriesRequest=hooks.useRequest(props.getCategories)
  const productsRequest=hooks.useRequest(props.getProducts)

  const [_selectedCategory, _selectCategory]=useState()
  const [_selectedSubCategory, _selectSubCategory]=useState()
  
  const categories=_.get(props, 'categories', []).sort((c1, c2)=>c1.order>c2.order ? 1 : -1)
  const subCategories=_.get(_selectedCategory,'subCategories',[])

  const products = _.get(props,'products',[]).filter(product=>
    product.category==_selectedCategory.label 
    && (!_selectedSubCategory ||product.subCategory== _selectedSubCategory)
  )

  useEffect(()=>{
    if(_.get(props,'categories', []).length>0 && !_selectedCategory){
     _selectCategory(props.categories[0])
    }
  }, [props.categories])

  useEffect(()=>{
    if(_selectedCategory)
      _selectSubCategory(_.get(_selectedCategory.subCategories,'0'))
  }, [_selectedCategory])

  const handleSelectCategory=(id)=>{
    const selectedCategory=categories.find(category=>category.id==id)
    _selectCategory(selectedCategory)
  }

  const handleSelectSubCategory=(subCategory)=>{
    _selectSubCategory(subCategory)
  }

  return (
    <div className='Catalog relw100'>
      <div className='ctg-categories pad20'>
        {!categoriesRequest.pending && props.categories && props.categories.length>0 && 
          <Catalog_Categories 
            categories={categories} 
            selectedCategory={_.get(_selectedCategory,'id')}
            handleSelectCategory={handleSelectCategory}
          />
        }
        {categoriesRequest.pending && <div>Chargeemnt en cours...</div>}
        {categoriesRequest.error && <div>{categoriesRequest.error}</div>}
      </div>

      <div className='pad20 flex row jcsb'>
        <div className='ctg-subCategories f1'>
          <div className='flex row aic'>
            {subCategories.length==0 && <div className='fs14 cblack marr10 clightblue'>Sous-catégories de produits</div> }
            {subCategories && 
              <Catalog_SubCategories 
                subCategories={subCategories}   
                selectedSubCategory={_selectedSubCategory}
                handleSelectSubCategory={handleSelectSubCategory}
              />
            }
          </div>
        </div>
        <Button variant="contained" 
          classes={{
            root : 'ctg-newButton', 
            contained : 'ctg-newButton_contained',
            label : 'ctg-newButton_label'}}
          >
          Nouveau produit
        </Button>
      </div>

      <div className='flex row marh20 marb20'>
        <div className='ctg-productList f1 marr10'>
            <Catalog_ProductsList products={products} />
        </div>
        <div className='w250'></div>
      </div>
    </div>
  )
}
const mapState=(state)=>({
  categories : state.catalog.categories,
  products : state.catalog.products
})

const actionCreators = {
  getCategories: catalogActions.getCategories,
  getProducts : catalogActions.getProducts
}

export default connect(mapState,actionCreators)(Catalog);