import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import { OutlinedInput} from '@material-ui/core';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

const CatalogSubCategories=(props)=>{
  const {subCategories,selectedSubCategory, handleSelectSubCategory, updateSubCategories}=props
  const [_subCategoryForm, _setSubCategoryForm]=useState({
    visible : false
  })
  const addSubCategoryRequest=hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();

  const handleSubCategoryChange=(e)=>{
    _setSubCategoryForm({
      ..._subCategoryForm,
      value:e.target.value
    })
  }

  const addOnclick=(e)=>{
    _setSubCategoryForm({
      ..._subCategoryForm,
      visible :true
    })
  }
  const handleSubmit=(e)=>{
    if(subCategories.find(subCategory=>_subCategoryForm.value===subCategory))
      enqueueSnackbar(`La sous-catégrorie de produit "${_subCategoryForm.value}" existe déja!`, { variant: 'warning' })
    else
      addSubCategoryRequest.execute({
        action: () => updateSubCategories([...subCategories, _subCategoryForm.value]),
        success: (res) => {
          _setSubCategoryForm({visible:false})
          enqueueSnackbar(`La sous-cétegorie de produit "${_subCategoryForm.value}" a bien été enregistrée !`, { variant: 'success' })
        },
        failure: (error) => {
          enqueueSnackbar(error, { variant: 'error' })
        }
      })
  }

  const cancelOnClick=(e)=>{
    _setSubCategoryForm({
      ..._subCategoryForm,
      visible:false
    })
  }

  return(
    <div className='flex row fww'>
      {subCategories.map(subCategory=>(
        <Button key={subCategory} 
          onClick={()=>handleSelectSubCategory(subCategory)}
          active={subCategory===selectedSubCategory ? 'true' : 'false'}
          variant="outlined" 
          classes={{
            root : 'ctg-subCategoryButton', 
            outlined : 'ctg-subCategoryButton_outlined',
            label : 'ctg-subCategoryButton_label'
          }}>
          {subCategory}
        </Button>
      ))}
        {/*<OutlinedInput            
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          disabled={disabled}
          error={errors[input.name] ? true : false}
          type={input.type || 'text'}
          {...adornments}
        />*/}
        {_subCategoryForm.visible ?
        <>
          <OutlinedInput
            lable='Sous-categorie'
            value={_subCategoryForm.value} 
            onChange={handleSubCategoryChange}/>
          {!addSubCategoryRequest.pending  ? 
            <Button variant="outlined" 
              onClick={handleSubmit}
              disabled={_.isEmpty(_subCategoryForm.value)}
              classes={{
                root : 'ctg-subCategoryButton', 
                outlined : 'ctg-subCategoryButton_outlined',
                label : 'ctg-subCategoryButton_label'}}>
              Ok
            </Button> : <span>en cours...</span>
          }
          <Button variant="outlined" 
              onClick={cancelOnClick}
              disabled={addSubCategoryRequest.pending}
              classes={{
                root : 'ctg-subCategoryButton', 
                outlined : 'ctg-subCategoryButton_outlined',
                label : 'ctg-subCategoryButton_label'}}>
              Annuler
          </Button>
        </>
        :
        <Button variant="outlined" classes={{
          root : 'ctg-subCategoryButton', 
          outlined : 'ctg-subCategoryButton_outlined',
          label : 'ctg-subCategoryButton_label'}}
          onClick={addOnclick}>
          +
        </Button>
        }
    </div>
  )
}

export default CatalogSubCategories;