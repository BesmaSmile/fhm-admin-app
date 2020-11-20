
import React, { useState } from 'react';
import Form from 'components/misc/Form/Form';
import { hooks } from 'functions/hooks';
import './NewsForm.scss';
import ImageIcon from '@material-ui/icons/Image';
import ReplayIcon from '@material-ui/icons/Replay';
import ImageUploader from 'components/misc/ImageUploader/ImageUploader';
import { storageService } from 'services';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

const NewsForm = props => {
  const { addNews, close, pictureUrl } = props
  const [_image, _setImage] = useState({ preview: pictureUrl, raw: "" });
  const addNewsRequest = hooks.useRequest()
  const uploadPictureRequest = hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();
  const [_retryUploadingPicture, _setRetryUploadingPicture] = useState({ retry: false })

  const onSubmit = values => {
    if (_.isEmpty(_image.preview)) {
      enqueueSnackbar("Veuiller ajouter une image  !", { variant: 'warning' })
    }
    else {
      addNewsRequest.execute({
        action: () => addNews(values, _image.raw && _image.raw !== pictureUrl ? _image.raw : undefined),
        success: (res) => {
          enqueueSnackbar("La nouvelle a bien été enregistré !", { variant: 'success' })
          close()
        },
        failure: (error) => {
          enqueueSnackbar(_.get(error, 'message', 'Une erreur est survenue !'), { variant: _.get(error, 'pictureUploadFailed') ? 'warning' : 'error' })
          if (_.get(error, 'pictureUploadFailed'))
            _setRetryUploadingPicture({ retry: true, path: error.path })
        }
      })
    }
  }

  const onUpdateImage = (image) => {
    _setImage(image)
    if (_retryUploadingPicture.retry && _.get(image, 'raw'))
      sendImage(image)
  }

  const sendImage = (image) => {
    uploadPictureRequest.execute({
      action: () => storageService.uploadFile(_retryUploadingPicture.path, _.get(image, 'raw', _image.raw)),
      success: () => {
        enqueueSnackbar("L'imagea bien été enregistrée !", { variant: 'success' })
        close()
      },
      failure: () => {
        enqueueSnackbar("Echec de chargement de l'image. Réessayer !", { variant: 'error' })
      }
    })
  }


  const newsInputs = [
    {
      content: () => <div className='mart10 marb20'>
        <div className='nf-imgContainer h250'>
          <ImageUploader image={_image} updateImage={onUpdateImage}
            preview={(image) => <img className='relw100 relh100' src={image} alt='produit' />}
            pending={uploadPictureRequest.pending || addNewsRequest.pending}
            retry={_retryUploadingPicture.retry}
            emptyPreview={() =>
              <div className='relw100 relh100 flex aic jcc cgrey'>
                <ImageIcon classes={{ root: 'nf-imgIcon' }} />
              </div>}
            retryPreview={() =>
              <div className='relw100 relh100 flex aic jcc cgrey pointer' onClick={sendImage}>
                <ReplayIcon classes={{ root: 'nf-replyIcon' }} />
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
      name: 'title',
      label: 'Titre',
      validation: { required: 'Champs requis' }
    },
    {
      name: 'text',
      label: 'Text',
      multiline: true,
      rows: 4,
      validation: { required: 'Champs requis' }
    },
  ]

  return (
    <div className='NewsForm w410'>
      <div className='flex row'>

        <Form className=''
          title={"Nouveauté"}
          disabled={_retryUploadingPicture.retry}
          inputs={newsInputs}
          onSubmit={onSubmit}
          submitText='Enregistrer'
          pending={addNewsRequest.pending}
          isDialog={true}
          cancel={close}
        />
      </div>
    </div>
  )
}

export default NewsForm