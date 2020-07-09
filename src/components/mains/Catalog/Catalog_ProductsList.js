import React, {useState} from 'react';
import {storageService} from 'services';
import {hooks} from 'functions';

const ProductCard=(props)=>{
  const {product}=props
  const [_photoUrl,_setPhotoUrl]=useState()
  const photoRequest=hooks.useRequest(()=>storageService.getPhotoUrl(`${product.category}/${product.image}`), 
    url=>{
      console.log(url)
      _setPhotoUrl(url)
    }
  )

  return (
    <div className='ctg-productCard flex row'>
      {_photoUrl && <img className='w80 marr10' src={_photoUrl}/>}
      <div className='flex f1 col txtar'>
        <div className='fs16 cstronggrey green'>{product.nameFr}</div>
        <div className='fs12 light cgrey green'>{product.nameAr}</div>
        <div className='fs12 medium cgreen f1 flex aife jcfe'>
          <div className=''>{product.price} DZ</div>
        </div>
      </div>
    </div>
  )
}
const Catalog_ProductsList=(props)=>{
  const {products}=props
  return (
    <div className='flex row fww'>
      {products.map(product=>(
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}

export default Catalog_ProductsList