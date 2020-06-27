import {apiConstants} from 'consts';
import {handleResponse} from 'helpers';

export const usersService={
  checkSuperUser,
  registerSuperAdmin
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
}