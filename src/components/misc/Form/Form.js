import React from 'react';
import { useForm } from "react-hook-form";
import { OutlinedInput, InputLabel, FormControl } from '@material-ui/core';
import './Form.scss';

const Form=(props)=>{
  const {inputs, onSubmit, submitText, className, pending, error}=props
  const { handleSubmit, register, errors, getValues } = useForm();

  return(
    <form className={`Form ${className || ''} `} onSubmit={handleSubmit(onSubmit)} >
      <div visible={error ? 'true' : 'false'} className='frm-error fs12 cred txtal marv20'>{error ? '⚠ '+error : ''}</div>
      <div className='flex col'>
        {
          inputs.map(input=>{
            const additionalValidation = input.combinedValdation 
            ? { validate : value=> input.combinedValdation(getValues()) } : {}
            return(
              <div key={input.name} witherror={errors[input.name] ? 'true' : 'false'} className='frm-inputField flex col marv10'>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="component-outlined"
                    classes={{
                      root : 'frm-inputLabel',
                      focused : 'frm-focusedInputLabel'
                    }}>
                    <span>{input.label} </span>
                  </InputLabel>
                  <OutlinedInput label={input.label}  
                    classes={{
                      root : 'frm-outlineInput',
                      focused : 'frm-focusedOutlineInput',
                      input : 'frm-input',
                      notchedOutline : 'frm-notchedOutlineInput'
                    }}
                    name={input.name}
                    inputRef={register({...input.validation, ...additionalValidation})}
                    error={errors[input.name] ? true : false}
                    type={input.type || 'text'}
                  />
                </FormControl>
                <div className='frm-error fs12 marl3 mart5 cred light' >{errors[input.name] && errors[input.name].message}</div>
              </div>
            )
          })
        }
      </div>
      <button className='frm-button pointer relw100 mart20 brad5 fs14 fw600 bblue cwhite'  type='submit' disabled={pending}>{!pending ? submitText : "En cours..."} </button>
    </form>
  )
}

export default Form;