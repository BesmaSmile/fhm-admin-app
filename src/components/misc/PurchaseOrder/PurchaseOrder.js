import React, { useRef } from 'react';
import Logo from 'components/misc/Logo/Logo';
import { Fab, Tooltip } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import TableList from 'components/misc/TableList/TableList';
import QRCode from 'qrcode.react';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';
import { useReactToPrint } from "react-to-print";
import moment from 'moment';
import _ from 'lodash';
import './PurchaseOrder.scss';

const PurchaseOrder = props => {

  const { order, isDeliveryOrder, close } = props
  const docRef = useRef()

  const printOrder = useReactToPrint({
    content: () => docRef.current,
    documentTitle: `FHM - Commande N° ${order.id} (${isDeliveryOrder ? 'bon de livraison' : 'bon de commande'})`,
    onAfterPrint: () => close()
  })

  const columns = [
    { key: 'product', name: 'Produit' },
    { key: 'origin', name: 'Importation/Locale' },
    ...(isDeliveryOrder ? [{ key: 'unitPrice', name: 'Prix unitaire' }] : []),
    { key: 'quantity', name: 'Quantité' },
    ...(isDeliveryOrder ? [{ key: 'montant', name: 'Montant' }] : []),
  ]

  const rows = [...order.articles, ...(isDeliveryOrder ? [{ isTotalRow: true }] : [])].map(article => {
    return {
      product: { render: <div className={`${article.isTotalRow ? 'bold cstrongblue fs16' : 'po-articleCell'}`}>{article.isTotalRow ? 'Total' : article.product}</div> },
      origin: { render: <div className='po-articleCell'>{!article.isTotalRow && (article.imported ? 'Importation' : 'Local')}</div> },
      unitPrice: { render: <div className='po-articleCell txtar'>{!article.isTotalRow && `${article.price} DA`}</div> },
      quantity: { render: <div className='po-articleCell txtac'>{!article.isTotalRow && article.quantity}</div> },
      montant: { render: <div className={`${article.isTotalRow ? 'bold cstrongblue fs16' : 'po-articleCell'}`}>{article.isTotalRow ? order.mount : article.price * article.quantity} DA</div> },
    }
  })

  const province = _.get(order.client, 'address.province')
  const municipality = _.get(order.client, 'address.municipality')
  const city = (province || municipality) && `${province ? province + ',' : ''} ${municipality}`

  return (
    <div className='PurchaseOrder'>
      <div className='po-docContainer relw100'>
        <div className='pad20 bgblue h1020 flex col' ref={docRef}>
          <div className='flex row jcsb aifs aic mart15'>
            <Logo />
            <div className='fs30 bold cstrongblue'>{isDeliveryOrder ? "Bon de livraison" : "Bon de commande"}</div>
          </div>
          <div className='flex row jcsb marv30'>
            <div className='flex col fs14 cstronggrey'>
              <span className='medium cblack'>Coopérative El Amel Lot J9 Villa Jolie Vue</span>
              <span className='medium cblack'>16006 - Kouba Alger</span>
              <span className='extralight fs12 mart20'>Tél : (213)23 71 93 22</span>
              <span className='extralight fs12'>Email :lecact_03@yahoo.fr</span>
            </div>
            <div className='flex row fs12'>
              <div className='flex col medium cblack aife'>
                <div>Commande N° : </div>
                <div>Date : </div>
                <div className='mart20'>Client : </div>
              </div>
              <div className='flex col cstronggrey marl10'>
                <div className='extralight'>{order.id} </div>
                <div className='extralight'>{moment(order.createdAt).format('DD/MM/YYYY HH:mm')} </div>
                <div className='mart20'>
                  <div className='extralight'>{order.client.lastname} {order.client.firstname}</div>
                  <div className='extralight'>{city}</div>
                  <div className='extralight'>{order.client.phoneNumber}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='marb15 f1 flex aic'>
            <TableList title="Articles"
              columns={columns}
              rows={rows}
              showAll={true} />
          </div>
          {isDeliveryOrder &&
            <div className='flex jcfe marb30'>
              <QRCode value={order.id} />
            </div>
          }
        </div>
      </div>
      <div className='po-printButton'>
        <ButtonWrapper
          neededPermission={isDeliveryOrder ? permissionConstants.PRINT_DELIVERY_ORDER : permissionConstants.PRINT_PURCHASE_ORDER}
          button={(disabled) =>
            <Tooltip title="Imprimer" placement="top">
              <Fab disabled={disabled} onClick={printOrder}>
                <PrintIcon fontSize="small" />
              </Fab>
            </Tooltip>} />
      </div>
    </div>
  )
}

export default PurchaseOrder