var config = {
  apiKey: "AIzaSyCAQ_TOCtBTXel87hCCRdXy-L4eUPt1UFg",
  authDomain: "gcmproject-141802.firebaseapp.com",
  databaseURL: "https://gcmproject-141802.firebaseio.com",
  projectId: "gcmproject-141802",
  storageBucket: "gcmproject-141802.appspot.com",
  messagingSenderId: "961587936477"
};

firebase.initializeApp(config);
let domain = document.domain;
let port   = (domain === 'localhost')?  5000:80;

document.addEventListener('DOMContentLoaded', function() {
    var uiConfig = {
      signInSuccessUrl: '/PWAmultiAuth/done.html',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {provider:firebase.auth.PhoneAuthProvider.PROVIDER_ID, defaultCountry:'JP'},
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      tosUrl: 'http://example.com/kiyaku/',
      privacyPolicyUrl: 'https://miku3.net/privacy.html'
  };


  firebase.auth().onAuthStateChanged( (user) => {
    // already logged inn
    if(user) {
      showLogin('Login Complete!', `${user.displayName}さんがログインしました<br>(${user.uid})`);
    }
    // not logged inn yet
    else {
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });

  //----------------------------------------------
  // log out
  //----------------------------------------------
  // document.querySelector('#logout').addEventListener("click", ()=>{
  //   firebase.auth().signOut().then(()=>{
  //       showLogout("Firebase Auth Sample", "");
  //     })
  //     .catch( (error)=>{
  //       alert(`couldn't log out(${error})`);
  //     });
  // });

  /**
   * contents after logged inn
   */
  function showLogin(title, msg){
    document.querySelector('h1').innerHTML    = title;
    document.querySelector('#info').innerHTML = msg;
    if (document.querySelector('#logout')) {
      document.querySelector('#logout').classList.remove("hide");
    }else{
      alert('in mainTWT');
      
      const logoutBtn = document.createElement('input');
      logoutBtn.type = 'button';
      logoutBtn.value = 'Log Out';
      logoutBtn.id = 'logout';
      document.body.appendChild(logoutBtn);
      logoutBtn.addEventListener('click', () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            showLogout('Firebase Auth Sample', '');
          })
          .catch((error) => {
            alert(`couldn't log out(${error})`);
          });
      });
    }
  }

  /**
   * contents when logging out
   */
   function showLogout(title, msg){
    document.querySelector('h1').innerHTML    = title;
    document.querySelector('#info').innerHTML = msg;
    document.querySelector('#logout').classList.add("hide");
  }
});