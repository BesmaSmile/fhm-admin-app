
import {firebase} from './firebase';

export const authService={
  login
}

function login(user){
  return firebase.functions().httpsCallable('auth')(user)
  .then(result=>result.data)
  .catch(error=>{
    console.log(error.code)
    let msg=''
    switch(error.code){
      case 'invalid-argument' :
      msg="Nom d'utilisateurs ou mot de passe incorrecte !"
      break;
      case 'failed-precondition' :
      msg="Votre compte a été désactivé. Contacter le Super-admin pour plus de détails !"
      break;
      default :
      msg='Une erreur est survenue !'
    }
    throw msg
  })
}

