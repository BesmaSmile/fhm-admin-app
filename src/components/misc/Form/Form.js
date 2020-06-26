import React from 'react';
import { useForm } from "react-hook-form";
import './Form.scss';

const Form=(props)=>{
  const {inputs, onSubmit, submitText}=props
  const { handleSubmit, register, errors } = useForm();

  return(
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex col'>
        {
          inputs.map(input=>(

            <div witherror={errors[input.name] ? 'true' : 'false'} className='frm-inputField flex col mart10 marb10'>
              <input className='padl15 padr15 brad5 bwhite fs14 medium' 
                name={input.name} 
                placeholder={input.placeholder}   
                ref={register(input.validation)}
                type={input.type || 'text'}
                />
              <div className='frm-error fs12 marl3 mart5 cred' >{errors[input.name] && errors[input.name].message}</div>
            </div>
          ))
        }
      </div>
      <button className='frm-button relw100 mart20 brad5 fs14 fw600 bpurple cwhite'  type='submit'>{submitText} </button>
    </form>
  )
}

export default Form;