import React from 'react';
import { useForm, useWatch, Controller  } from "react-hook-form";
import { OutlinedInput, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';

import _ from 'lodash';
import './Form.scss';

const Form=(props)=>{
  const {inputs, onSubmit, submitText, className, pending, disabled, error}=props
  const { handleSubmit, errors, getValues , control, setValue } = useForm();

  const dependentSelection =useWatch({
    control,
    defaultValue: [] 
  })
  
  const resetWatchingInputs=(e)=>{
    const {name}=e.target
    const watchingInputs=inputs.filter(input=>input.watch===name)
    watchingInputs.forEach(watchingInput => {
      setValue(watchingInput.name)
    });
  }

  const cleanAndSubmit=(values)=>{
    const toSend=_.omitBy(values,_.isEmpty);
    onSubmit(toSend)
  }

  return(
    <form className={`Form ${className || ''} `} onSubmit={handleSubmit(cleanAndSubmit)} >
      <div visible={error ? 'true' : 'false'} className='frm-error fs12 cred txtal marv20'>{error ? '⚠ '+error : ''}</div>
      <div className='flex col'>
      {
        inputs.map(input=>{
          const additionalValidation = input.combinedValdation 
          ? { validate : value=> input.combinedValdation(getValues()) } : {}
          const adornments = {
            endAdornment : input.endAdornment,
            startAdornment : input.startAdornment
          }
          
          return(
            <>
            {(input.type!=='select' || input.options(dependentSelection[input.watch]))
             && (!input.hidden || !input.hidden(dependentSelection[input.watch])) &&
            <div key={input.name} witherror={errors[input.name] ? 'true' : 'false'} className='frm-inputField flex col marv10'>
              <FormControl variant="outlined" key={input.name}>
                <InputLabel htmlFor="component-outlined">
                  <span>{input.label} </span>
                </InputLabel>
                {
                  input.type==='select' 
                  ? <Controller 
                  control={control}
                  name={input.name}
                  defaultValue={input.defaultValue}
                  rules={{...input.validation, ...additionalValidation}}
                  render={({ onChange, onBlur, value, name }) => (<Select
                      label={input.label}
                      error={errors[input.name] ? true : false} 
                      onChange={(e)=>{onChange(e); resetWatchingInputs(e);}}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      disabled={disabled}
                      >
                      {input.options(dependentSelection[input.watch]).map(option=>(
                        <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                      ))}
                      
                  </Select>)}/>
                  : <Controller 
                  control={control}
                  name={input.name}
                  defaultValue={input.defaultValue}
                  rules={{...input.validation, ...additionalValidation}}
                  render={({ onChange, onBlur, value, name }) => (<OutlinedInput 
                    label={input.label}                   
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    disabled={disabled}
                    error={errors[input.name] ? true : false}
                    type={input.type || 'text'}
                    {...adornments}
                  />)}/>
                }
                
              </FormControl>
              <div className='frm-error fs12 marl3 mart5 cred light' >{errors[input.name] && errors[input.name].message}</div>
            </div>
            }
            </>
          )
        })
      }
      </div>
      <button className='frm-button pointer relw100 mart20 brad5 fs14 fw600 bblue cwhite'  type='submit' disabled={pending || disabled}>{!pending ? submitText : "En cours..."} </button>
    </form>
  )
}

export default Form;