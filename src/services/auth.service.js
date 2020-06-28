import {apiConstants} from 'consts';
import {handleResponse} from 'helpers';

export const authService={
  checkSuperUser,
  registerSuperAdmin,
  login
}

function checkSuperUser(){
  return fetch(`${apiConstants.URL}/checkSuperAdmin`)
  .then(handleResponse)
}

function registerSuperAdmin(user, secretKey){
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({user, secretKey})
  }
  return fetch(`${apiConstants.URL}/registerSuperAdmin`, options)
  .then(handleResponse)
  .catch(error=>{
    let msg=''
    switch(error){
      case 'invalid_secret_key' :
      msg='La clé secrète est invalide'
      break;
      default :
      msg='Une erreur est survenue !'
    }
    throw msg
  })
}

function login(user){
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(user)
  }
  return fetch(`${apiConstants.URL}/auth`, options)
  .then(handleResponse)
  .catch(error=>{
    let msg=''
    switch(error){
      case 'invalid_credentials' :
      msg="Nom d'utilisateurs ou mot de passe incorrecte !"
      break;
      default :
      msg='Une erreur est survenue !'
    }
    throw msg
  })
}

