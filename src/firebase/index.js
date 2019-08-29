import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDXapj8qbiQSDTKTNrma1i1uSMTI8B8224',
  authDomain: 'acrobatics-5a73f.firebaseapp.com',
  databaseURL: 'https://acrobatics-5a73f.firebaseio.com',
  projectId: 'acrobatics-5a73f',
  storageBucket: 'acrobatics-5a73f.appspot.com',
  messagingSenderId: '463704659823',
  appId: '1:463704659823:web:6f44dd33729223f2'
}

const parseResponse = (doc) => {
  if (!doc) {
    return null
  }

  return {
    id: doc.id,
    ...doc.data()
  }
}

const app = firebase.initializeApp(config)

export function getJumps() {
  return app.firestore().collection('jumps').get().then(res => res.docs.map(parseResponse))
}

export function createJump(jump) {
  return app.firestore().collection('jumps').add(jump)
}

export function updateJump(id, jump) {
  return app.firestore().collection('jumps').doc(id).update(jump)
}

export function deleteJump(id) {
  return app.firestore().collection('jumps').doc(id).delete()
}

export function getCombos() {
  return app.firestore().collection('combos').get().then(res => res.docs.map(parseResponse))
}

export function createCombo(combo) {
  return app.firestore().collection('combos').add(combo)
}

export function updateCombo(id, combo) {
  return app.firestore().collection('combos').doc(id).update(combo)
}

export function deleteCombo(id) {
  return app.firestore().collection('combos').doc(id).delete()
}

export function signIn(email, password) {
  return app.auth().signInWithEmailAndPassword(email, password)
}

export function signOut() {
  return app.auth().signOut()
}