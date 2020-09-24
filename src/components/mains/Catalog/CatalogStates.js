import React, { useState } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Divider,
  OutlinedInput,
  Tooltip,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

const CatalogStates = props => {
  const { states, selectedStates, handleSelectState,
    updateStates, importation, toggledImportation, handleToggleImportation } = props
  const [_stateForm, _setStateForm] = useState({
    visible: false
  })

  const addStateRequest = hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();

  const handleStateChange = (e) => {
    _setStateForm({
      ..._stateForm,
      value: e.target.value
    })
  }

  const addOnclick = (e) => {
    _setStateForm({
      ..._stateForm,
      visible: true
    })
  }

  const handleSubmit = (e) => {
    if (states.find(state => _stateForm.value === state))
      enqueueSnackbar(`L'état de produit "${_stateForm.value}" existe déja!`, { variant: 'warning' })
    else
      addStateRequest.execute({
        action: () => updateStates([...states, _stateForm.value]),
        success: (res) => {
          _setStateForm({ visible: false })
          enqueueSnackbar(`L'état de produit "${_stateForm.value}" a bien été enregistrée !`, { variant: 'success' })
        },
        failure: (error) => {
          enqueueSnackbar(error, { variant: 'error' })
        }
      })
  }

  const cancelOnClick = (e) => {
    _setStateForm({
      ..._stateForm,
      visible: false
    })
  }

  return (
    <div className='ctg-catalogStates w230 flex bwhite'>
      <div className='mar20 flex col'>
        <FormControlLabel
      
          control={
            <Checkbox
              checked={toggledImportation && importation}
              onChange={e => handleToggleImportation(e.target.checked)}
              disabled={!importation}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />}
          label="Produits d'importation" />
        <Divider />
        <div className='f1'>
          {states.map(state => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedStates.some(s=>s===state)}
                  onChange={e => handleSelectState(state)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
              label={state} />
          ))}
        </div>
        {_stateForm.visible &&
          <div className='flex row aic'>
            <OutlinedInput
              placeholder='Etat'
              value={_stateForm.value}
              onChange={handleStateChange} />
            <Tooltip title="Valider" placement="top">
              <IconButton disabled={_.isEmpty(_stateForm.value)}
                onClick={handleSubmit}
                classes={{ root: 'ctg-addButton' }}>
                {!addStateRequest.pending ? <AddIcon /> : <CircularProgress size={10} />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Annuler" placement="top">
              <IconButton disabled={addStateRequest.pending}
                onClick={cancelOnClick}
                classes={{ root: 'ctg-cancelButton' }}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>

        }
        <Divider />
        <ButtonWrapper
          neededPermission={permissionConstants.UPDATE_CATALOG}
          button={(disabled) =>
            <div disabled={disabled} className='clightblue medium pointer fs12 mart10' onClick={addOnclick}>+ Ajouter</div>
          } />
      </div>
    </div>
  )
}

export default CatalogStates