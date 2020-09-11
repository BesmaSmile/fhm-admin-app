import React, {useRef} from 'react';
import Logo from 'components/misc/Logo/Logo';
import QRCode from 'qrcode.react';
import { Fab, Tooltip } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { useReactToPrint } from "react-to-print";
import './DeliveryOrder.scss';

const DeliveryOrder = props => {
  const {order}=props
  const docRef=useRef()

  const printOrder= useReactToPrint({
    content: () => docRef.current,
  })

  return (
    <div className='DeliveryOrder'>
      <div className='do-docContainer pad20 bgblue' ref={docRef}>
        <div className='flex row jcsb aic'>
          <Logo/>
          <div>
            <QRCode value={order.id}/>
          </div>
        </div>
        <div className='h700'></div>
        <div>End. </div>
      </div>
      <div className='do-printButton'>
        <Tooltip title="Imprimer" placement="top">
          <Fab onClick={printOrder}>
            <PrintIcon fontSize="small" />
          </Fab>
        </Tooltip>
      </div>
    </div>
  )
}

export default DeliveryOrder