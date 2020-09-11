import {apiConstants} from 'consts';
import {handleResponse} from 'functions';

export const authService={
  checkSuperUser,
  login
}

function checkSuperUser(){
  return fetch(`${apiConstants.URL}/checkSuperAdmin`)
  .then(handleResponse)
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
    console.log(error)
    let msg=''
    switch(error){
      case 'invalid_credentials' :
      msg="Nom d'utilisateurs ou mot de passe incorrecte !"
      break;
      case 'disabled_account' :
      msg="Votre compte a été désactivé. Contacter le Super-admin pour plus de détails !"
      break;
      default :
      msg='Une erreur est survenue !'
    }
    throw msg
  })
}

