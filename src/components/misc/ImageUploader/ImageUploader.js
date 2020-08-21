import React, {useRef} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';
import './ImageUploader.scss'; 

const ImageUploader=props=>{ 
  const {image,pending, updateImage, retry}=props
  const fileInput=useRef()
  const handleChange= e => {
    if (e.target.files.length) {
      updateImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      })
    }
  }

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
        <IconButton disabled={pending} size="small" aria-label="close" onClick={removeImage}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      <label htmlFor="imgup-uploadButton"> 
          {!_.isEmpty(image.preview)  ?  props.preview(image.preview) : props.emptyPreview()}
          {pending && retry && <div className='imgup-mask'>{props.pendingPreview()}</div>}
          {!_.isEmpty(image.preview) && retry && !pending && <div className='imgup-mask'>{props.retryPreview()}</div>}
      </label>
      <input
        ref={fileInput}
        type="file"
        id="imgup-uploadButton"
        style={{ display: "none" }}
        onChange={handleChange}
        disabled={(!_.isEmpty(image.preview) && retry ) || pending}
      />
    </div>
  )
}


export default ImageUploader