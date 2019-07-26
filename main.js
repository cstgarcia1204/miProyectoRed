let firebaseConfig = {
    apiKey: "AIzaSyBAFtD0q9T97gN0BAqhdFtdFvHN4L47EvA",
    authDomain: "miproyectored.firebaseapp.com",
    databaseURL: "https://miproyectored.firebaseio.com",
    projectId: "miproyectored",
    storageBucket: "miproyectored.appspot.com",
    messagingSenderId: "309160575596",
    appId: "1:309160575596:web:d13b895d2100a14c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

//AQUI INICIA AUTH
// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
// Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
  window.location.assign('<your-privacy-policy-url>');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


//fin del codigo pagina firebaseUI

























  
//AQUI INICIA DATABASE- FIRESTORE

  let firestore= firebase.firestore();


/*const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBAFtD0q9T97gN0BAqhdFtdFvHN4L47EvA",
    authDomain: "miproyectored.firebaseapp.com",
    projectId: "miproyectored",
  });
  
  let db = firebase.firestore();
  */
  //Siempre se va alternar entre colecciones y documentos const docReference= firestore.collection('samples').doc('laMeraData');
  const docReference= firestore.doc('usuarioFer/suDesmadre'); 
  
  
  const outputH1= document.querySelector('#outputH1');
  const inputText=document.querySelector('#latest');
  const buttonSave=document.querySelector('#saveButton');
  const buttonLoad=document.querySelector('#loadButton');

  buttonSave.addEventListener('click',function(){
      const textToSave=inputText.value;
      console.log('Im going to save '+textToSave+' to Firestore');
      docReference.set({    
          miDiario: textToSave

      })    .then(function(){
          console.log('Post Guardado!!');
      }).catch(function(error){
          console.log('Existe un error', error);
      })
  })

  /*buttonLoad.addEventListener('click',function(){
      docReference.get().then(function(doc){
          if(doc && doc.exists){
              const myData= doc.data();
              outputH1.innerHTML='Mi post es: '+myData.primerPost;
          }
      }).catch(function(error){
          console.log('Hay un error:'+error);
      })
  });*/

  obtenerDatosEnTiempoReal = function(){
      docReference.onSnapshot(function(doc){
        if(doc && doc.exists){
            const myData= doc.data();
            console.log('Verificando la data que estoy recibiendo: ',doc);
            outputH1.innerHTML='Mi post es: '+myData.miDiario;
        }

      })
  }

  obtenerDatosEnTiempoReal();