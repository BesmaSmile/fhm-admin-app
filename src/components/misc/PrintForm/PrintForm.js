import React, {useState} from 'react';
import TabPanels from 'components/misc/TabPanels/TabPanels';
import PurchaseOrder from 'components/misc/PurchaseOrder/PurchaseOrder';

const PrintForm=props=>{
  const tabs=[
    {label : 'Bon de commande', content : <PurchaseOrder order={props.order} close={props.close}/>},
    {label: 'Bon de livraison', content : <PurchaseOrder isDeliveryOrder={true} order={props.order} close={props.close}/>}
  ]
  return(
    <TabPanels tabs={tabs} className='w700'/>
  )
}

export default PrintForm