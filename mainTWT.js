 var config = {
  apiKey: "AIzaSyCAQ_TOCtBTXel87hCCRdXy-L4eUPt1UFg",
  authDomain: "gcmproject-141802.firebaseapp.com",
};
firebase.initializeApp(config);
let domain = document.domain;
let port   = (domain === 'localhost')?  5000:80;

document.addEventListener('DOMContentLoaded', function() {
const provider = new firebase.auth.TwitterAuthProvider();
    //const messaging = firebase.messaging();
    let loggedInnUser;
    // ログイン結果表示初期化
    $('#RES').text('');

    firebase.auth().onAuthStateChanged(function(user) {                    // 以下のポップアップで許諾／拒否が行われた時のイベントハンドラ
      if (user) {
        loggedInnUser = user;
      } else {
        // No user is signed in.
      }
    });

    if(!loggedInnUser){
      // let res =firebase.auth().signInWithRedirect(provider)              // リダイレクトだとなぜかログインした状況判断ができないのでポップアップにしてる

    //----------------------------------------------
    // Firebase UIの設定
    //----------------------------------------------
    var uiConfig = {
      // ログイン完了時のリダイレクト先
      signInSuccessUrl: 'done.html',

      // 利用する認証機能
      signInOptions: [
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ],

      // 利用規約のURL(任意で設定)
      tosUrl: 'http://example.com/kiyaku/',
      // プライバシーポリシーのURL(任意で設定)
      privacyPolicyUrl: 'http://example.com/privacy'
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);

    }

});