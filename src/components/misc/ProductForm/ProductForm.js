
import React, { useState } from 'react';
import Form from 'components/misc/Form/Form';
import { hooks } from 'functions/hooks';
import './ProductForm.scss';
import ImageIcon from '@material-ui/icons/Image';
import ReplayIcon from '@material-ui/icons/Replay';
import ImageUploader from 'components/misc/ImageUploader/ImageUploader';
import {storageService} from 'services';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

const ProductForm = props => {
  const { categories, defaultCategory, defaultSubCategory, setProduct, close, product, pictureUrl } = props
  const [_image, _setImage] = useState({ preview: pictureUrl, raw: "" });
  const setProductRequest = hooks.useRequest()
  const uploadPictureRequest=hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();
  const  [_retryUploadingPicture, _setRetryUploadingPicture] = useState({retry : false})
  
  const onSubmit = values => {
    if(_.isEmpty(_image.preview)){
      enqueueSnackbar("Veuiller ajouter l'image du produit  !", { variant: 'warning' })
    }
    else{
      setProductRequest.execute({
        action: () => setProduct({...values,price : parseInt(values.price),...(values.importationPrice ? {importationPrice : parseInt(values.importationPrice)} : {}), id : _.get(product, 'id')},_image.raw && _image.raw!==pictureUrl ? _image.raw : undefined),
        success: (res) => {
          enqueueSnackbar("Le produit a bien été enregistré !", { variant: 'success' })
          close()
        },
        failure: (error) => {
          enqueueSnackbar(_.get(error, 'message', 'Une erreur est survenue !'), { variant: _.get(error, 'pictureUploadFailed') ? 'warning' : 'error' })
          if (_.get(error, 'pictureUploadFailed'))
            _setRetryUploadingPicture({retry : true, path : error.path})
        }
      })
    }
  }

  const onUpdateImage=(image)=>{
    _setImage(image)
    if(_retryUploadingPicture.retry && _.get(image, 'raw'))
      sendImage(image)
  }

  const sendImage=(image)=>{
    uploadPictureRequest.execute({
      action : ()=> storageService.uploadFile(_retryUploadingPicture.path, _.get(image, 'raw',_image.raw) ),
      success : ()=> {
        enqueueSnackbar("L'image a bien été enregistrée !", { variant: 'success' })
        close()
        window.location.reload();
      },
      failure : ()=>{
        enqueueSnackbar("Echec de chargement de l'image. Réessayer !", { variant: 'error' })
      }
    })
  }


  const productInputs = [
    {
      content : ()=> <div className='mart10 marb20'>
          <div className='pf-imgContainer  w150 h150'>
            <ImageUploader image={_image} updateImage={onUpdateImage}
              preview={(image) => <img className='relw100 relh100' src={image} alt='produit' />}
              pending={uploadPictureRequest.pending || setProductRequest.pending}
              retry={_retryUploadingPicture.retry}
              emptyPreview={() =>
                <div className='relw100 relh100 flex aic jcc cgrey'>
                  <ImageIcon classes={{ root: 'pf-imgIcon' }} />
                </div>}
              retryPreview={()=>
                <div className='relw100 relh100 flex aic jcc cgrey pointer' onClick={sendImage}>
                  <ReplayIcon classes={{ root: 'pf-replyIcon' }} />
                </div>
              }
              pendingPreview={() =>
                <div className='relh100 flex aife jcc'>
                  <p className='cwhite fs10 marb10'>Enregistrement en cours de l'image...</p>
                </div>} />
          </div>
        </div>
    },
    {
      name: 'available',
      label: 'Produit disponible',
      type : 'switch',
      defaultValue : !_.isUndefined(_.get(product,'available')) ? product.available : true 
    },
    {
      name: 'category',
      label: "Catégorie",
      type: 'select',
      defaultValue : defaultCategory || _.get(product,'category'),
      validation: { required: "Champs requis" },
      options: (values) => categories.map(category => ({ value: category.name, name: category.name }))
    },
    {
      name: 'subCategory',
      label: "Sous-catégorie",
      type: 'select',
      defaultValue : defaultSubCategory || _.get(product,'subCategory'),
      validation: { required: "Champs requis" },
      watch: 'category',
      options: (watchedValue) => {
        const category = watchedValue && categories.find(category => category.name === watchedValue)
        return _.get(category, 'subCategories') && category.subCategories.map(subCategory => ({ value: subCategory, name: subCategory }))
      }
    },
    {
      name: 'state',
      label: "Etat",
      type: 'select',
      defaultValue : _.get(product,'state'),
      validation: { required: "Champs requis" },
      watch:'category',
      options: (watchedValue) => {
        const category = watchedValue && categories.find(category => category.name === watchedValue)
        return _.get(category, 'states') && category.states.map(state => ({ value: state, name: state }))
      }
    },
    {
      name: 'nameFr',
      label: 'Nom du produit',
      defaultValue : _.get(product,'nameFr'),
      validation: { required: 'Champs requis' }
    },
    {
      name: 'nameAr',
      label: 'إسم المنتوج',
      defaultValue : _.get(product,'nameAr'),
      validation: { required: 'Champs requis' }
    },
    {
      name: 'price',
      label: "Prix",
      type: 'number',
      defaultValue : _.get(product,'price'),
      validation: { required: "Champs requis" },
      endAdornment: <span className='fs14 cgrey medium'>DA</span>
    },
    {
      name: 'importationPrice',
      label: "Prix importation",
      type: 'number',
      watch : 'category',
      defaultValue : _.get(product,'importationPrice'),
      hidden : watchedValue =>{
        const category = watchedValue && categories.find(category => category.name === watchedValue)
        return _.get(category, 'importation')!==true
      },
      endAdornment: <span className='fs14 cgrey medium'>DA</span>
    }
  ]

  return (
    <div className='ProductForm w500'>
    <div className='flex row'>

      <Form className='' 
        title={product ?  "Modifier les informations du produit" : "Nouveau produit"}
        disabled={_retryUploadingPicture.retry}
        inputs={productInputs}
        onSubmit={onSubmit}
        submitText='Enregistrer'
        pending={setProductRequest.pending}
        isDialog={true}
        cancel={close}
      />
      </div>
    </div>
  )
}

export default ProductForm