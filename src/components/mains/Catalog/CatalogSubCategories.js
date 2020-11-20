import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';

const CatalogSubCategories = (props) => {
  const { subCategories, selectedSubCategory, handleSelectSubCategory, updateSubCategories } = props
  const [_subCategoryForm, _setSubCategoryForm] = useState({
    visible: false
  })
  const addSubCategoryRequest = hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();

  const handleSubCategoryChange = (e) => {
    _setSubCategoryForm({
      ..._subCategoryForm,
      value: e.target.value
    })
  }

  const addOnclick = (e) => {
    _setSubCategoryForm({
      ..._subCategoryForm,
      visible: true
    })
  }
  const handleSubmit = (e) => {
    if (subCategories.find(subCategory => _subCategoryForm.value === subCategory))
      enqueueSnackbar(`La sous-catégrorie de produit "${_subCategoryForm.value}" existe déja!`, { variant: 'warning' })
    else
      addSubCategoryRequest.execute({
        action: () => updateSubCategories([...subCategories, _subCategoryForm.value]),
        success: (res) => {
          _setSubCategoryForm({ visible: false })
          enqueueSnackbar(`La sous-cétegorie de produit "${_subCategoryForm.value}" a bien été enregistrée !`, { variant: 'success' })
        },
        failure: (error) => {
          enqueueSnackbar(error.message, { variant: 'error' })
        }
      })
  }

  const cancelOnClick = (e) => {
    _setSubCategoryForm({
      ..._subCategoryForm,
      visible: false
    })
  }

  return (
    <div className='flex row fww'>
      {subCategories.map(subCategory => (
        <Button key={subCategory}
          onClick={() => handleSelectSubCategory(subCategory)}
          active={subCategory === selectedSubCategory ? 'true' : 'false'}
          variant="outlined"
          classes={{
            root: 'ctg-subCategoryButton',
            outlined: 'ctg-subCategoryButton_outlined',
            label: 'ctg-subCategoryButton_label'
          }}>
          {subCategory}
        </Button>
      ))}
      {_subCategoryForm.visible ?
        <>
          <OutlinedInput
            placeholder='Sous-categorie'
            value={_subCategoryForm.value}
            onChange={handleSubCategoryChange} />

          <Button variant="outlined"
            onClick={handleSubmit}
            disabled={_.isEmpty(_subCategoryForm.value)}
            classes={{
              root: 'ctg-subCategoryButton',
              outlined: 'ctg-subCategoryButton_outlined',
              label: 'ctg-subCategoryButton_label'
            }}>
            {!addSubCategoryRequest.pending ? "Ok" : <CircularProgress size={14} />}
          </Button>
          <Button variant="outlined"
            onClick={cancelOnClick}
            disabled={addSubCategoryRequest.pending}
            classes={{
              root: 'ctg-subCategoryButton',
              outlined: 'ctg-subCategoryButton_outlined',
              label: 'ctg-subCategoryButton_label'
            }}>
            Annuler
          </Button>
        </>
        :
        <ButtonWrapper
          neededPermission={permissionConstants.UPDATE_CATALOG}
          button={(disabled) => <Button
            disabled={disabled}
            variant="outlined" classes={{
              root: 'ctg-subCategoryButton',
              outlined: 'ctg-subCategoryButton_outlined',
              label: 'ctg-subCategoryButton_label'
            }}
            onClick={addOnclick}>
            +
        </Button>} />
      }
    </div>
  )
}

export default CatalogSubCategories;