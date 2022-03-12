import firebase from '../firebase/config';

let result = {};
export const reCaptCha = async (phoneNumber) => {
  const appVerifier = new firebase.auth.RecaptchaVerifier('button-signin');
  console.log(appVerifier)
  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      result = confirmationResult
      console.log(result)
    }).catch(error => {
      console.log(error)
      // Error SMS not sent
    })
}

export const confirmCode = (code) => {
  result.confirm(code).then((r) => {
    console.log(r)
    console.log(r.user.za)
    // ...
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
  });
    // window.confirmationResult = confirmationResult
  // ...
}
