
import React, {useState, createContext, useContext} from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import './Dialog.scss';

const Dialog=({children,open, onClose})=>{
  return (
    <div className='Dialog'>
      <MuiDialog open={open} onClose={onClose}>
          {children}
      </MuiDialog>
    </div>
  )
}

const DialogContext = createContext();

const DialogProvider= ({ children })=>{
  const [_open, _setOpen]=useState(false)
  const [_content, _setContent]=useState(<></>)

  const open = (content) => {
    _setContent(content)
    _setOpen(true);
  };

  const close=()=>{
    _setOpen(false)
    _setContent(<></>)
  }

  return(
    <>
      <DialogContext.Provider children={children} value={{open, close}}/>
      <Dialog open={_open} onClose={()=>_setOpen(false)} children={_content}/>
    </>
  )
}
export {DialogProvider}

const useDialog = () => useContext(DialogContext)

export {useDialog}