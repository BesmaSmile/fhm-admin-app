import React from 'react';
import { useForm, useWatch, Controller } from "react-hook-form";
import { OutlinedInput, InputLabel, FormControl, FormControlLabel, Select, MenuItem, Switch, Checkbox } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import _ from 'lodash';
import './Form.scss';

const FormLayout = ({ isDialog, title, content, submitAction, submitButton, cancelDisabled, cancel }) => {
  if (isDialog) return (
    <div className='Form'>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div className='form-content'>{content}</div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained"
          disabled={cancelDisabled}
          classes={{
            root: 'frm-cancelButton'
          }}
          onClick={cancel}>Annuler
          </Button>
        {submitButton(submitAction)}
      </DialogActions>
    </div>

  )
  else return (
    <form className='Form' onSubmit={submitAction} >
      {content}
      <div className='frm-largeButton relw100 mart20'>{submitButton()}</div>
    </form>
  )
}

const Form = (props) => {
  const { title, inputs, onSubmit, submitText, pending, disabled, isDialog, cancel } = props
  const { handleSubmit, errors, getValues, control, setValue } = useForm();
  console.log(getValues())
  const defaultValues = {}
  inputs.forEach(input => {
    if (input.defaultValue) defaultValues[input.name] = input.defaultValue
  })

  const dependentSelection = useWatch({
    control,
    defaultValue: defaultValues
  })

  const resetWatchingInputs = (e) => {
    const { name } = e.target
    const watchingInputs = inputs.filter(input => input.watch === name)
    watchingInputs.forEach(watchingInput => {
      setValue(watchingInput.name)
    });
  }

  const cleanAndSubmit = (values) => {
    const toSend = _.omitBy(values, value=>_.isNil(value) || value==='');
    onSubmit(toSend)
  }

  const formContent = () => (
    <div className='flex col'>
      {
        inputs.map(input => {
          if (input.content)
            return input.content
          else {
            const type =['select', 'switch', 'check'].find(t=>t===input.type) || 'default'
            const additionalValidation = input.combinedValdation ? { validate: value => input.combinedValdation(getValues()) } : {}
            const adornments = {
              endAdornment: input.endAdornment,
              startAdornment: input.startAdornment
            }

            return (
              <>
                {(input.type !== 'select' || input.options(dependentSelection[input.watch]))
                  && (!input.hidden || !input.hidden(dependentSelection[input.watch])) &&
                  <div key={input.name} 
                    witherror={errors[input.name] ? 'true' : 'false'} 
                    className={`frm-inputField flex col ${type!=='check' ? 'marv10' : ''}`}>
                    <FormControl variant="outlined" key={input.name}>
                      {type!=='switch' && type!=='check' &&<InputLabel htmlFor="component-outlined">
                        <span>{input.label} </span>
                      </InputLabel>}
                      <Controller
                        control={control}
                        name={input.name}
                        defaultValue={input.defaultValue}
                        rules={{ ...input.validation, ...additionalValidation }}
                        render={({ onChange, onBlur, value, name }) => (
                          <>
                            {type === 'select' && 
                              <Select
                                label={input.label}
                                error={errors[input.name] ? true : false}
                                onChange={(e) => { onChange(e); resetWatchingInputs(e); }}
                                onBlur={onBlur}
                                value={value}
                                name={name}
                                disabled={disabled || input.disabled}>
                                {input.options(dependentSelection[input.watch]).map(option => (
                                  <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                                  ))
                                }
                              </Select>
                            }
                            {type==='switch' &&
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={value}
                                  onChange={e => onChange(e.target.checked)}
                                  name={name}
                                  disabled={disabled || input.disabled}
                                  inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}
                              label={input.label}/>
                            }
                            {type==='check' &&
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={value}
                                  onChange={e => onChange(e.target.checked)}
                                  name={name}
                                  disabled={disabled || input.disabled}
                                  inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}
                              label={input.label}/>
                            }
                            {type==='default' &&
                              <OutlinedInput
                                label={input.label}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                name={name}
                                disabled={disabled || input.disabled}
                                error={errors[input.name] ? true : false}
                                type={input.type || 'text'}
                                {...adornments} />
                            }
                          </>
                            
                        )} />

                    </FormControl>
                    <div className='frm-error fs12 marl3 mart5 cred light' >{errors[input.name] && errors[input.name].message}</div>
                  </div>
                }
              </>
            )
          }

        })
      }
    </div>
  )
  const submitButton = (onClick) => (
    <Button variant="contained"
      classes={{
        root: 'frm-submitButton'
      }}
      type='submit'
      disabled={pending || disabled}
      onClick={onClick}>
      {!pending ? submitText : "En cours..."}
    </Button>
  )
  const submitAction = handleSubmit(cleanAndSubmit)
  return (
    <FormLayout
      title={title}
      cancelDisabled={pending}
      content={formContent()}
      isDialog={isDialog}
      submitAction={submitAction}
      submitButton={submitButton}
      cancel={cancel} />
  )
}

export default Form;