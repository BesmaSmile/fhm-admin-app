import React, {useState} from 'react';
import TabPanels from 'components/misc/TabPanels/TabPanels';
import PurchaseOrder from 'components/misc/PurchaseOrder/PurchaseOrder';
import DeliveryOrder from 'components/misc/DeliveryOrder/DeliveryOrder';

const PrintForm=props=>{
  const tabs=[
    {label : 'Bon de commande', content : <PurchaseOrder order={props.order}/>},
    {label: 'Bon de livraison', content : <DeliveryOrder order={props.order}/>}
  ]
  return(
    <TabPanels tabs={tabs} className='w700'/>
  )
}

export default PrintForm