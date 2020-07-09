import React from 'react';
import {Button} from '@material-ui/core';

const Catalog_SubCategories=(props)=>{
  const {subCategories,selectedSubCategory, handleSelectSubCategory}=props
  return(
    <div className='flex row fww'>
      {subCategories.map(subCategory=>(
        <Button key={subCategory} 
          onClick={()=>handleSelectSubCategory(subCategory)}
          active={subCategory==selectedSubCategory ? 'true' : 'false'}
          variant="outlined" 
          classes={{
            root : 'ctg-subCategoryButton', 
            outlined : 'ctg-subCategoryButton_outlined',
            label : 'ctg-subCategoryButton_label'
          }}>
          {subCategory}
        </Button>
      ))}
        <Button variant="outlined" classes={{
          root : 'ctg-subCategoryButton', 
          outlined : 'ctg-subCategoryButton_outlined',
          label : 'ctg-subCategoryButton_label'}}>
          +
        </Button>
    </div>
  )
}

export default Catalog_SubCategories;