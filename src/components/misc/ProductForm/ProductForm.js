
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
  const { categories, defaultCategory, setProduct, close, product, pictureUrl } = props
  const [_image, _setImage] = useState({ preview: pictureUrl, raw: "" });
  const setProductRequest = hooks.useRequest()
  const uploadPictureRequest=hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();
  const  [_retryUploadingPicture, _setRetryUploadingPicture] = useState({retry : false})
  const productInputs = [
    {
      name: 'nomFr',
      label: 'Nom du produit',
      defaultValue : _.get(product,'nameFr'),
      validation: { required: 'Champs requis' }
    },
    {
      name: 'nomAr',
      label: 'إسم المنتوج',
      defaultValue : _.get(product,'nameAr'),
      validation: { required: 'Champs requis' }
    },
    {
      name: 'categorie',
      label: "Catégorie",
      type: 'select',
      defaultValue : defaultCategory || _.get(product,'category'),
      validation: { required: "Champs requis" },
      options: (values) => categories.map(category => ({ value: category.label, name: category.label }))
    },
    {
      name: 'sousCategorie',
      label: "Sous-catégorie",
      type: 'select',
      defaultValue : _.get(product,'subCategory'),
      validation: { required: "Champs requis" },
      watch: 'categorie',
      options: (watchedValue) => {
        const category = watchedValue && categories.find(category => category.label === watchedValue)
        return _.get(category, 'subCategories') && category.subCategories.map(subCategory => ({ value: subCategory, name: subCategory }))
      }
    },
    {
      name: 'etat',
      label: "Etat",
      type: 'select',
      defaultValue : _.get(product,'state'),
      validation: { required: "Champs requis" },
      watch:'categorie',
      options: (watchedValue) => {
        const category = watchedValue && categories.find(category => category.label === watchedValue)
        return _.get(category, 'states') && category.states.map(state => ({ value: state, name: state }))
      }
    },
    {
      name: 'prix',
      label: "Prix",
      type: 'number',
      defaultValue : _.get(product,'price'),
      validation: { required: "Champs requis" },
      endAdornment: <span className='fs14 cgrey medium'>DA</span>
    },
    {
      name: 'prixImportation',
      label: "Prix importation",
      type: 'number',
      watch : 'categorie',
      defaultValue : _.get(product,'importationPrice'),
      hidden : watchedValue =>{
        const category = watchedValue && categories.find(category => category.label === watchedValue)
        return _.get(category, 'importation')!==true
      },
      endAdornment: <span className='fs14 cgrey medium'>DA</span>
    }
  ]
  const onSubmit = values => {
    console.log(_image)
    if(_.isEmpty(_image.preview)){
      enqueueSnackbar("Veuiller ajouter l'image du produit  !", { variant: 'warning' })
    }
    else{
      setProductRequest.execute({
        action: () => setProduct({...values,id : _.get(product, 'id')},_image.raw && _image.raw!==pictureUrl ? _image.raw : undefined),
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
        enqueueSnackbar("L'imagea bien été enregistrée !", { variant: 'success' })
        close()
      },
      failure : ()=>{
        enqueueSnackbar("Echec de chargement de l'image. Réessayer !", { variant: 'error' })
      }
    })
  }

  return (
    <div className='ProductForm pad20'>
      <div className='fs20 clightblue'>Nouveau Produit</div>
      <div className='flex row'>
        <div className=''>

          <Form className='w250' 
            disabled={_retryUploadingPicture.retry}
            inputs={productInputs}
            onSubmit={onSubmit}
            submitText='Enregistrer'
            pending={setProductRequest.pending}
          />
        </div>
        <div className='w200 marl10 mart30'>
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
      </div>
    </div>
  )
}

export default ProductForm