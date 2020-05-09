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
    //----------------------------------------------
    // Firebase UIの設定
    //----------------------------------------------
    var uiConfig = {
      // ログイン完了時のリダイレクト先
      signInSuccessUrl: '/auth/multi/',

      // 利用する認証機能
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {provider:firebase.auth.PhoneAuthProvider.PROVIDER_ID, defaultCountry:'JP'},
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],

      // 利用規約のURL(任意で設定)
      tosUrl: 'http://example.com/kiyaku/',
      // プライバシーポリシーのURL(任意で設定)
      privacyPolicyUrl: 'https://miku3.net/privacy.html'
  };

  //----------------------------------------------
  // ログイン状態のチェック
  //----------------------------------------------
  firebase.auth().onAuthStateChanged( (user) => {
    // ログイン済み
    if(user) {
      showLogin('Login Complete!', `${user.displayName}さんがログインしました<br>(${user.uid})`);
      console.log(user);
    }
    // 未ログイン
    else {
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });

  //----------------------------------------------
  // ログアウト
  //----------------------------------------------
  document.querySelector('#logout').addEventListener("click", ()=>{
    firebase.auth().signOut().then(()=>{
        showLogout("Firebase Auth Sample", "");
      })
      .catch( (error)=>{
        alert(`ログアウトできませんでした(${error})`);
      });
  });

  /**
   * ログイン時の各種表示
   */
  function showLogin(title, msg){
    document.querySelector('h1').innerHTML    = title;
    document.querySelector('#info').innerHTML = msg;
    document.querySelector('#logout').classList.remove("hide");
  }

  /**
   * ログアウト時の各種表示
   */
   function showLogout(title, msg){
    document.querySelector('h1').innerHTML    = title;
    document.querySelector('#info').innerHTML = msg;
    document.querySelector('#logout').classList.add("hide");
  }
});