import React, {useRef} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import './ImageUploader.scss'; 

const ImageUploader=props=>{ 
  const {image,pending, updateImage, retry}=props
  const fileInput=useRef()
  const { enqueueSnackbar } = useSnackbar();

  const extArray = ['png', 'jpeg', 'jpg'];
  const isValidImage = (e) => {
    const ext = e.target.files[0].type.split('/')[1];
    return extArray.indexOf(ext) !== -1
  };

  const handleChange= e => {
    if (e.target.files.length) {
      const valid = isValidImage(e);
      if (valid){
        updateImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        })
      }
      else  enqueueSnackbar("Image non valide. Veuillez choisir une image png, jpg ou jpeg !", { variant: 'warning' })
    }
  }

  const id = Math.random();

  const removeImage=(e)=>{
   fileInput.current.value=""
    updateImage({
      preview: "",
      raw: ""
    })
  }

  

  return( 
    <div className='ImageUploader relw100 relh100'>
      {!_.isEmpty(image.preview) && 
        <IconButton disabled={pending} size="small" label="supprimer" onClick={removeImage}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      <label htmlFor={`${id}imgup-uploadButton`}> 
          {!_.isEmpty(image.preview)  ?  props.preview(image.preview) : props.emptyPreview()}
          {pending && retry && <div className='imgup-mask'>{props.pendingPreview()}</div>}
          {!_.isEmpty(image.preview) && retry && !pending && <div className='imgup-mask'>{props.retryPreview()}</div>}
      </label>
      <input
        ref={fileInput}
        accept="image/png,image/jpg,image/jpeg,"
        type="file"
        id={`${id}imgup-uploadButton`}
        style={{ display: "none" }}
        onChange={handleChange}
        disabled={(!_.isEmpty(image.preview) && retry ) || pending}
      />
    </div>
  )
}


export default ImageUploader