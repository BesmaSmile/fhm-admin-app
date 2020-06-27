import React from 'react';
import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import './Users.scss';

const UserCard=(props)=>{
  const {user}=props
  return(
    <div className='usr-userCard h100 relw100  flex'>
      <div className='flex row mar20 aic relw100'>
        <img className='h80 w80 marr15' src={user.avatar} alt=''/>
        <div className='flex col marh10'>
          <div className='bold fs18 cstronggrey'>{user.firstname} {user.lastname}</div>
          <div className='extralight fs14 cstronggrey'>{user.restaurant}</div>
          <div className='extralight fs14 cstronggrey'>{user.phoneNumber}</div>
        </div>
        <div className='flex row f1 jcfe'>
          <div className='usr-detailContainer'>
            <div className='usr-datailTop'><SvgIcon name='mapLocation' color='var(--green)'/></div>
            <div className='usr-datailText'> {user.commune} - {user.wilaya}</div>
          </div>
          <div className='usr-detailContainer'>
            <div className='usr-datailTop fs25 lh25 bold cgreen'>{user.ordersNumber}</div>
            <div className='usr-datailText'>Commandes</div>
          </div>
          {user.active && <div className='usr-detailContainer'>
            <div className='usr-datailTop'><SvgIcon name='valid'/></div>
            <div className='usr-datailText'>Validé</div>
          </div>
          }
           {!user.active && <div className='usr-detailContainer'>
            <div className='usr-datailTop'><SvgIcon name='invalid'/></div>
            <div className='usr-datailText'>En attente</div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}
UserCard.defaultProps={
  user:{
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

const UsersList=(props)=>{
  return(
    <div className='usr-usersList brad15 bwhite'>
    {props.users.map((user,i)=>(<UserCard key={i} user={user}/>))}
    </div>
  )
}


UsersList.defaultProps={
  users:[
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
export default UsersList;