import React, {useState, useEffect} from 'react';
import {storageService} from 'services';
import {hooks} from 'functions';

const ProductCard=(props)=>{
  const {product, openProductForm}=props
  const [_pictureUrl,_setPictureUrl]=useState()
  const pictureRequest=hooks.useRequest()

  useEffect(()=>{
    _setPictureUrl()
    pictureRequest.execute({
      action : ()=>storageService.getFileUrl(`${product.category}/${product.id}`),
      success : (url)=> _setPictureUrl(url)
    })
    // eslint-disable-next-line
  }, [product])

  return (
    <div className='ctg-productCard flex row pointer' active={product.available? 'true' : 'false'} onClick={(e)=>openProductForm(product, _pictureUrl)} >
      {_pictureUrl && <img className='w80 marr10' src={_pictureUrl} alt={product.nameFr}/>}
      <div className='flex f1 col txtar'>
        <div className='fs16 cstronggrey green'>{product.nameFr}</div>
        <div className='fs12 light cgrey green'>{product.nameAr}</div>
        <div className='fs12 medium cgreen f1 flex aife jcfe'>
          <div className='ctg-productPrice'>{product.price} DZ</div>
        </div>
      </div>
    </div>
  )
}
const CatalogProductsList=(props)=>{
  const {products, openProductForm}=props
  return (
    <div className='flex row fww'>
      {products.map(product=>(
        <ProductCard key={product.id} product={product} openProductForm={openProductForm}/>
      ))}
    </div>
  )
}

export default CatalogProductsList