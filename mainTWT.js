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

      firebase.auth().signInWithPopup(provider).then(function(result) {　   // ポップアップされる
        $('#RES').text('Logged Inn !');
        token = result.credential.accessToken;                              // アクセストークンを得てTwiiterAPIを利用できる
        secret = result.credential.secret;
        loggedInnUser = result.user;                                        // ユーザ情報
        $('.token').text(token);
        $('.secret').text(secret);
        // ...様々な処理...
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        // ...エラー処理...
      });
    }

});