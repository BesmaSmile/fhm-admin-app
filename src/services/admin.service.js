import {firebase} from './firebase';
import {apiConstants} from 'consts';
import {handleResponse} from 'functions';

export const adminService={
  getAdmins,
  registerAdmin,
  updateAdminStatus,
  updateAdminPermissions 
}

function getAdmins(){
  const db = firebase.firestore();
  return db.collection("administrators").get()
  .then((result)=> {
    const administrators= []
    result.forEach( admin=>{
      const adminData=admin.data()
      administrators.push({
        ...adminData,
        createdAt : adminData.createdAt && adminData.createdAt.toDate(),
        updatedAt : adminData.updatedAt && adminData.updatedAt.toDate(),
        id : admin.id
      })
    })
    return administrators
  }).catch(error=>{
    console.log(error)
    throw 'Echec de chargement de la liste des administrateurs'
  })
}

function registerAdmin(user, isFirstAdmin, secretKey){
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({user,isFirstAdmin, secretKey})
  }
  return fetch(`${apiConstants.URL}/registerAdmin`, options)
  .then(handleResponse)
  .catch(error=>{
    let msg=''
    switch(error){
      case 'invalid_secret_key' :
      msg='La clé secrète est invalide'
      break;
      case 'existing_username' : 
      msg="Le nom d'utilisateur est déjà utilisé"
      break;
      default :
      msg='Une erreur est survenue !'
    }
    throw msg
  })
}

function updateAdminStatus(id, status){
  const db = firebase.firestore();
  const updatedAt = firebase.firestore.Timestamp.now()
  return db.collection('administrators').doc(id)
  .update({status, updatedAt})
  .then(()=>({status, updatedAt : updatedAt.toDate()}))
  .catch(error => {
    throw `Echec ${status==='enabled' ? "d'activation" : "de désactivation" } du compte administrateur`
  });
}

function updateAdminPermissions(id, permissions){
  const db = firebase.firestore();
  const updatedAt = firebase.firestore.Timestamp.now()
  return db.collection('administrators').doc(id)
  .update({permissions, updatedAt})
  .then(()=>({ permissions, updatedAt : updatedAt.toDate()}))
  .catch(error => {
    throw `Echec de modification des permissions d'administrateur`
  });
}