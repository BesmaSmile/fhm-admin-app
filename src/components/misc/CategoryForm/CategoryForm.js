import React from 'react';
import Form from 'components/misc/Form/Form';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

const CategoryForm=props=>{
  const {close, categories, addCategory, category} = props
  const addCategoryRequest=hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit=values=>{
    if(categories.find(category=>category.name===values.name))
      enqueueSnackbar(`La catégrorie de produit "${values.name}" existe déja!`, { variant: 'warning' })
    else
      addCategoryRequest.execute({
        action: () => addCategory({...values, order :parseInt(values.order) }, categories),
        success: (res) => {
          enqueueSnackbar(`La cétegorie de produit "${values.name}" a bien été enregistrée !`, { variant: 'success' })
          close()
        },
        failure: (error) => {
          enqueueSnackbar(error.message, { variant: error.added ? 'warning' : 'error' })
          if(error.added)
            close()
        }
      })
  }

  const orderErrorMessage=`Ordre invalide, veuillez choisir une valeur entre 1 et ${categories.length+1}`
  const categoryInputs=[
    {
      name: 'name',
      label: 'Nom de catégorie',
      defaultValue : _.get(category,'name'),
      validation: { required: 'Champs requis' }
    },
    {
      name: 'order',
      label: 'Ordre',
      type : 'number',
      defaultValue : _.get(category,'order'),
      validation: { 
        required: 'Champs requis',
        min : {value : 1, message: orderErrorMessage}, 
        max: {value :categories.length+1, message:orderErrorMessage}
      }
    },
    {
      name: 'importation',
      label: 'Importation',
      type : 'switch',
      defaultValue : _.get(category,'importation')
    }
  ]
  return (
    <div className='CategoryForm'>
      <Form title="Nouvelle catégorie de produit"
        inputs={categoryInputs}
        onSubmit={onSubmit}
        submitText='Enregistrer'
        pending={addCategoryRequest.pending}
        isDialog={true}
        cancel={close}
      />
    </div>
  )
}

export default CategoryForm;