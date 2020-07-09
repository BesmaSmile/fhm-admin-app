import {firebase} from './firebase';

export const storageService={
  getPhotoUrl,
}

function getPhotoUrl(path){
  const storage=firebase.storage();
  return storage.ref(path).getDownloadURL()
  .then(result => result)
  .catch(error => {
    console.log(error)
  });
}