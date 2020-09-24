import React, { useState, useEffect } from 'react';
import { storageService } from 'services';
import { hooks } from 'functions';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';

const ProductCard = (props) => {
  const { product, openProductForm } = props
  const [_pictureUrl, _setPictureUrl] = useState()
  const pictureRequest = hooks.useRequest()

  useEffect(() => {
    _setPictureUrl()
    pictureRequest.execute({
      action: () => storageService.getFileUrl(`${product.category}/${product.id}`),
      success: (url) => _setPictureUrl(url)
    })
    // eslint-disable-next-line
  }, [product])

  return (
    <ButtonWrapper
      neededPermission={permissionConstants.UPDATE_CATALOG}
      button={(disabled) =>
        <div className='ctg-productCard flex col'>
          <div className={`f1 flex row ${!disabled ? 'pointer' : ''}`} active={product.available ? 'true' : 'false'} onClick={(e) => { if (!disabled) openProductForm(product, _pictureUrl) }} >
            {_pictureUrl && <img className='w70 h70 marr10' src={_pictureUrl} alt={product.nameFr} />}
            <div className='flex f1 col txtar'>
              <div className='fs16 cstronggrey green ctg-truncateText'>{product.nameFr}</div>
              <div className='fs12 light cgrey green ctg-trancateText'>{product.nameAr}</div>

            </div>
          </div>
          <div className='fs12 medium f1 flex aife jcfe'>
            <div className='ctg-productPrice cwhite medium bmain brad5 padh5 padv3'>{product.price} DZ</div>
            {product.importationPrice && <div className='ctg-productPrice cwhite medium borange brad5 padh5 padv3 marl5'>{product.importationPrice} DZ</div>}
          </div>
        </div>} />
  )
}
const CatalogProductsList = (props) => {
  const { products, openProductForm } = props
  return (
    <div className='flex row fww'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} openProductForm={openProductForm} />
      ))}
    </div>
  )
}

export default CatalogProductsList