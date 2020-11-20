import { firebase } from './firebase';

export const adminService = {
  getAdmins,
  registerAdmin,
  updateAdminStatus,
  updateAdminPermissions,
  changePassword
}

function getAdmins() {
  const db = firebase.firestore();
  return db.collection("administrators").get()
    .then((result) => {
      const administrators = []
      result.forEach(admin => {
        const adminData = admin.data()
        administrators.push({
          ...adminData,
          createdAt: adminData.createdAt && adminData.createdAt.toDate(),
          updatedAt: adminData.updatedAt && adminData.updatedAt.toDate(),
          id: admin.id
        })
      })
      return administrators.sort((admin1, admin2) => admin2.createdAt - admin1.createdAt)
    }).catch(error => {
      console.log(error.code)
      throw 'Echec de chargement de la liste des administrateurs'
    })
}

function registerAdmin(user) {
  return firebase.functions().httpsCallable('registerAdmin')(user)
    .then(result => result.data)
    .catch(error => {
      console.log(error.code)
      let msg = ''
      switch (error.code) {
        case 'already-exists':
          msg = "Le nom d'utilisateur est déjà utilisé"
          break;
        default:
          msg = 'Une erreur est survenue !'
      }
      throw msg
    })
}

function updateAdminStatus(id, status) {
  const db = firebase.firestore();
  const updatedAt = firebase.firestore.Timestamp.now()
  return db.collection('administrators').doc(id)
    .update({ status, updatedAt })
    .then(() => ({ status, updatedAt: updatedAt.toDate() }))
    .catch(error => {
      throw `Echec ${status === 'enabled' ? "d'activation" : "de désactivation"} du compte administrateur`
    });
}

function updateAdminPermissions(id, permissions) {
  const db = firebase.firestore();
  const updatedAt = firebase.firestore.Timestamp.now()
  return db.collection('administrators').doc(id)
    .update({ permissions, updatedAt })
    .then(() => ({ permissions, updatedAt: updatedAt.toDate() }))
    .catch(error => {
      throw `Echec de modification des permissions d'administrateur`
    });
}

function changePassword(id, password) {
  return firebase.functions().httpsCallable('changePassword')({ id, password })
    .then(result => ({ updatedAt: new Date(result.data.updatedAt) }))
      .catch(error => {
        throw `Echec de changement du mot de passe`
      });
}