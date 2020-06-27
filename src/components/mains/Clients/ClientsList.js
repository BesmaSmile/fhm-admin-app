import React from 'react';
import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import './Clients.scss';

const ClientCard=(props)=>{
  const {client}=props
  return(
    <div className='clt-clientCard h100 relw100  flex'>
      <div className='flex row mar20 aic relw100'>
        <img className='h80 w80 marr15' src={client.avatar} alt=''/>
        <div className='flex col marh10'>
          <div className='bold fs18 cstronggrey'>{client.firstname} {client.lastname}</div>
          <div className='extralight fs14 cstronggrey'>{client.restaurant}</div>
          <div className='extralight fs14 cstronggrey'>{client.phoneNumber}</div>
        </div>
        <div className='flex row f1 jcfe'>
          <div className='clt-detailContainer'>
            <div className='clt-datailTop'><SvgIcon name='mapLocation' color='var(--green)'/></div>
            <div className='clt-datailText'> {client.commune} - {client.wilaya}</div>
          </div>
          <div className='clt-detailContainer'>
            <div className='clt-datailTop fs25 lh25 bold cgreen'>{client.ordersNumber}</div>
            <div className='clt-datailText'>Commandes</div>
          </div>
          {client.active && <div className='clt-detailContainer'>
            <div className='clt-datailTop'><SvgIcon name='valid'/></div>
            <div className='clt-datailText'>Validé</div>
          </div>
          }
           {!client.active && <div className='clt-detailContainer'>
            <div className='clt-datailTop'><SvgIcon name='invalid'/></div>
            <div className='clt-datailText'>En attente</div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}
ClientCard.defaultProps={
  client:{
    firstname : 'Ali',
    lastname: 'FACI',
    restaurant : 'El Kahina',
    wilaya :'Alger',
    commune : 'Ain Bénian', 
    avatar: avatar,
    phoneNumber:'+213 555 66 77 88',
    active : true,
    ordersNumber : 13
  }
}

const ClientsList=(props)=>{
  return(
    <div className='clt-clientsList brad15 bwhite'>
    {props.clients.map((client,i)=>(<ClientCard key={i} client={client}/>))}
    </div>
  )
}


ClientsList.defaultProps={
  clients:[
    {
      firstname : 'Ali',
      lastname: 'FACI',
      restaurant : 'El Kahina',
      wilaya :'Alger',
      commune : 'Ain Bénian', 
      avatar: avatar,
      phoneNumber:'+213 555 66 77 88',
      active : true,
      ordersNumber : 13
    },
    {
      firstname : 'Ahmed',
      lastname: 'HAMID',
      restaurant : 'Rokin bleu',
      wilaya :'Alger',
      commune : 'Chéraga', 
      avatar: avatar,
      phoneNumber:'+213 555 66 77 88',
      active : true,
      ordersNumber : 20
    },
    {
      firstname : 'Islam',
      lastname: 'SALMAN',
      restaurant : 'Best Food',
      wilaya :'Alger',
      commune : 'Staouali', 
      avatar: avatar,
      phoneNumber:'+213 555 66 77 88',
      active : false,
      ordersNumber : 0
    },
    {
      firstname : 'Mohamed',
      lastname: 'AHMED',
      restaurant : 'El Kahina',
      wilaya :'Alger',
      commune : 'Bab El Oued', 
      avatar: avatar,
      phoneNumber:'+213 555 66 77 88',
      active : true,
      ordersNumber : 6
    },
  ]
}
export default ClientsList;