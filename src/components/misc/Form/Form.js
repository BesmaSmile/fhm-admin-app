import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import './Form.scss';

const Form=(props)=>{
  const {inputs, onSubmit, submitText, className, pending}=props
  const { handleSubmit, register, errors, getValues } = useForm();

  return(
    <form className={`Form ${className || ''} `} onSubmit={handleSubmit(onSubmit)} >
      <div className='flex col'>
        {
          inputs.map(input=>{
            const additionalValidation = input.combinedValdation 
            ? { validate : value=> input.combinedValdation(getValues()) } : {}
            return(
              <div key={input.name} witherror={errors[input.name] ? 'true' : 'false'} className='frm-inputField flex col marv5'>
                <input className='padl15 padr15 brad5 bwhite fs14 medium' 
                  name={input.name} 
                  autoComplete='off'
                  placeholder={input.placeholder}   
                  ref={register({...input.validation, ...additionalValidation})}
                  type={input.type || 'text'}
                  />
                <div className='frm-error fs12 marl3 mart5 cred' >{errors[input.name] && errors[input.name].message}</div>
              </div>
            )
          })
        }
      </div>
      <button className='frm-button pointer relw100 mart20 brad5 fs14 fw600 bpurple cwhite'  type='submit' disabled={pending}>{!pending ? submitText : "En cours..."} </button>
    </form>
  )
}

export default Form;