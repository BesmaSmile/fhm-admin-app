import {firebase} from './firebase';

export const storageService={
  getFileUrl,
  uploadFile
}

function getFileUrl(path){
  const storage=firebase.storage();
  return storage.ref(path).getDownloadURL()
  .then(result => result)
  .catch(error => {
    console.log(error)
  });
}

function uploadFile(path, file){
  let storageRef =firebase.storage().ref(path)
  return storageRef.put(file)
}