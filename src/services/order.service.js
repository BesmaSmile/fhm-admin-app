import {firebase} from './firebase';

export const orderService={
  updateOrderStatus
}

function updateOrderStatus(clientId, orderId, status){
  const db = firebase.firestore();
  const date = firebase.firestore.Timestamp.now()
  return db.collection(`users/${clientId}/orders`)
  .doc(orderId).update({status, [`${status}At`] : date })
  .then(result=>({clientId, orderId, status, date :date.toDate() }))
  .catch(error => {
    throw `Echec d'approbation ${status==='delivered' ? 'de la livraion' : 'du paiement'} !`
  });
}

