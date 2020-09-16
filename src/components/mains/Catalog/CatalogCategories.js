import React from 'react';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';

const CatalogCategories = (props) => {
  const { categories, selectedCategory, handleSelectCategory, openCategoryForm } = props
  return (
    <div className='relw100'>
      <div className='medium fs25 cstronggrey marb10'>Catégories</div>
      <div className='flex row fww'>
        {categories.map(category => (
          <div className='ctg-buttonContainer'>
            <Button key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              active={category.id === selectedCategory ? 'true' : 'false'}
              variant="outlined"
              classes={{
                root: 'ctg-categoryButton',
                outlined: 'ctg-categoryButton_outlined',
                label: 'ctg-categoryButton_label'
              }}>
              {category.name}
            </Button>
            <ButtonWrapper
              neededPermission={permissionConstants.UPDATE_CATALOG}
              button={(disabled) =>
                <Tooltip title="Modifier" placement="top">
                  <IconButton disabled={disabled} classes={{ root: 'ctg-editTooltip' }}
                    onClick={() => openCategoryForm(category)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>} />
          </div>
        ))}
        <ButtonWrapper
          neededPermission={permissionConstants.UPDATE_CATALOG}
          button={(disabled) => <Button
            disabled={disabled}
            variant="outlined"
            classes={{
              root: 'ctg-categoryButton',
              outlined: 'ctg-categoryButton_outlined',
              label: 'ctg-categoryButton_label'
            }}
            onClick={() => openCategoryForm()}>
            +
          </Button>} />
      </div>
    </div>
  )
}

export default CatalogCategories;