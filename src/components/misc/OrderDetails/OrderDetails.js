import React from 'react';
import moment from 'moment';
import './OrderDetails.scss';
import TableList from 'components/misc/TableList/TableList';

const OrderDetails=props=>{
  const {order}=props
  const columns = [
    { key: 'product', name: 'Produit' },
    { key: 'origin', name: 'Importation/Locale'},
    { key: 'unitPrice', name: 'Prix unitaire' },
    { key: 'quantity', name: 'Quantité' },
    { key: 'montant', name: 'Montant' },   
  ]

  const rows=[...order.articles, { isTotalRow:true}].map(article=>{
    return{
      product : { render : <div className={`od-articleCell ${article.isTotalRow ? 'bold' : ''}`}>{article.isTotalRow ? 'Total' : article.product}</div>},
      origin : { render : <div className='od-articleCell'>{!article.isTotalRow && (article.imported ? 'Importation' : 'Local')}</div>},
      unitPrice : { render : <div className='od-articleCell txtar'>{!article.isTotalRow && `${article.price} DA`}</div>},
      quantity : { render : <div className='od-articleCell txtac'>{!article.isTotalRow && article.quantity}</div>},
      montant : { render : <div className={`od-articleCell ${article.isTotalRow ? 'bold' : ''}`}>{article.isTotalRow ? order.mount : article.price*article.quantity} DA</div>},
    }
  })
  return(
    <div className='OrderDetails w550 pad20'>
    <div className='medium fs16'>N° {order.id}</div>
    <div className='medium fs14 cbleu marb20'>{order.articles.length} article(s)</div>
    <div className='flex row jcsb'>
      <div className='fs14 marb20'>
        <div className='od-dateTitle'>Date de la commande</div>
        <div className='od-dateTitle'>Livraison effectuée le </div>
        <div className='od-dateTitle'>Paiement effectué le</div>
      </div>
      <div className='medium fs14 txtar'>
        <div className='od-dateValue'>{moment(order.date).format('DD/MM/YYYY HH:mm')}</div>
        <div className='od-dateValue'>{order.deliveredAt ? moment(order.deliveredAt).format('DD/MM/YYYY HH:mm') : '----'} </div>
        <div className='od-dateValue'>{order.paidAt ? moment(order.paidAt).format('DD/MM/YYYY HH:mm') : '----'}</div>
      </div>
    </div>

    <TableList title="Articles"
      columns={columns}
      rows={rows}
      showAll={true}/>
    
    </div>
  )
}

export default OrderDetails