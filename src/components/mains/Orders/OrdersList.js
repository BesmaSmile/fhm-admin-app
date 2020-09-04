import React, {useEffect} from 'react';
//import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from 'components/misc/Map/Map';
import TableList from 'components/misc/TableList/TableList';
import {useDialog} from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import  _ from 'lodash'; 
import moment from 'moment';
import './Orders.scss';


const OrderCard=(props)=>{
  const {order}=props

  return(
    <div className='ord-orderCard h100 relw100  flex'>
      <div className='flex row mar20 aic relw100'>
        <div className='flex col marh10'>
        
          <div className='medium fs14 cstronggrey'>{order.id}</div>
          <div className='medium fs14 cstronggrey'>{order.client.firstname} {order.client.lastname}</div>
          <div className='fs14 cblue'>{order.articles.length} article(s)</div>
          <div className='extralight fs12 cstronggrey'>{moment(order.date).format('DD/MM/YYYY')}</div>
        </div>
        {/*<div className='flex row f1 jcfe'>
          <div className={`clt-detailContainer ${_.get(client, 'address.location') ? 'pointer' :''}`} onClick={handlePositionClick}>
            <div className='clt-datailTop'><SvgIcon name='mapLocation' color={_.get(client, 'address.location') ? 'var(--green)' : 'var(--lightgrey)'}/></div>
            <div className='clt-datailText'> {city} </div>
          </div>
          <div className='clt-detailContainer'>
            <div className='clt-datailTop fs25 lh25 bold cgreen'>{client.orders && client.orders.length}</div>
            <div className='clt-datailText'>Commandes</div>
          </div>
          <div className='clt-detailContainer pointer' onClick={handleAccountClick}>
            <div className='clt-datailTop'>
              {!activateAccountRequest.pending &&<SvgIcon name={client.active ? 'valid' : 'invalid'}/>}
              {activateAccountRequest.pending && <CircularProgress size={20}/>}
            </div>

            <div className='ord-datailText'>
            {!activateAccountRequest.pending && client.active && 'Activé'}
            {!activateAccountRequest.pending && !client.active && 'Désactivé'}
            {activateAccountRequest.pending  && 'En cours...'}
            </div>
        </div>

        </div>*/}
      </div>
    </div>
  )
}

const OrdersList=(props)=>{
  const columns=[
    {key : 'id', name: 'ID'},
    {key : 'date', name: 'Date'},
    {key : 'client', name:'Client'},
    {key : 'articles', name:'Articles'}
  ]

  const raws=props.orders.map(order=>{
    return{
      id : <div className='clt-orderCell'>{order.id}</div>,
      date : <div className='clt-orderCell'>{moment(order.date).format('DD/MM/YYYY')}</div>,
      client : <div className='clt-orderCell'>{order.client.lastname} {order.client.firstname}</div>,
      articles : <div className='clt-orderCell'>{order.articles.length}</div>
    } 

  })

  return(
    <div className='ord-ordersList brad15 bwhite'>
    <TableList title='Commandes' 
        subTitle={`${props.orders.length} commandes(s)`}
        columns={columns}
        raws={raws}/>
    </div>
  )
}

export default OrdersList;