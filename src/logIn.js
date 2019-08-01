//En pagina logIn crea la foto, mail y el id
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        // already signed in
        const dataPerfil= {
            name: user.displayName,
            email: user.email,
            img: user.photoURL,
            id: user.uid

        }
        console.log('El usuario activo es: '+dataPerfil.name+ dataPerfil.email+dataPerfil.img+dataPerfil.id);
        document.querySelector('.photo').innerHTML=`<img class="photoProfile" src="${dataPerfil.img}" alt="photo">`;
        document.querySelector('.name   ').innerHTML=`<h2>${dataPerfil.name}</h2>`;
        const setUidUsuario=firebase.firestore().collection('usuarios').doc (dataPerfil.id);
        setUidUsuario.set({
            wallUsuario:[],
            media:"",
            name:user.displayName,
            email: user.email

        });
    }
});




//AQUI INICIA DATABASE- FIRESTORE
let firestore= firebase.firestore();



//Siempre se va alternar entre colecciones y documentos const docReference= firestore.collection('samples').doc('laMeraData');
  const docReference= firestore.collection('usuarios').doc('cy3F2GksmFbRRm7L4exWPnCwoQh1'); 
    
  const outputH1= document.querySelector('#outputH1');
  const inputText=document.querySelector('#latest');
  const buttonSave=document.querySelector('#saveButton');


  buttonSave.addEventListener('click',function(){
    const textToSave=inputText.value;
    console.log('Guardando '+textToSave+' a Firestore');
    return docReference.update({  
        wallUsuario:firebase.firestore.FieldValue.arrayUnion(textToSave)

    }).then(function(){
        console.log('Post Guardado!!');
    }).catch(function(error){
        console.log('Existe un error', error);
    })
});



//imprimir publicacion en tiempo real
postEnTiempoReal = function(){
    docReference.onSnapshot(function(doc){
      if(doc && doc.exists){
          const dataUsuario= doc.data();
          console.log('Verificando la data que estoy recibiendo: ',doc);
          console.log(dataUsuario);
          outputH1.innerHTML=''+dataUsuario.wallUsuario;
      }

    })
}

postEnTiempoReal();


  //para boton logOut devuelva a index.html
document.getElementById('loguedOut').addEventListener('click',function(){
    firebase.auth().signOut();
    location.href='http://localhost:5000/src/';
});


 /* buttonSave.addEventListener('click',function(){
      const textToSave=inputText.value;
      const otroText=elOtroBoton.value;
      console.log('Guardando '+textToSave+' a Firestore');
      docReference.set({    
          losPosts: textToSave,
          misFotos: otroText

      })    .then(function(){
          console.log('Post Guardado!!');
      }).catch(function(error){
          console.log('Existe un error', error);
      })
  });
*/
  /*Esta es la otra forma de imprimir en HTML a traves de un evento del boton "load"
  buttonLoad.addEventListener('click',function(){
      docReference.get().then(function(doc){
          if(doc && doc.exists){
              const myData= doc.data();
              outputH1.innerHTML='Mi post es: '+myData.primerPost;
          }
      }).catch(function(error){
          console.log('Hay un error:'+error);
      })
  });*/
//Funcion para imprimir en tiempo real los cambios


//-------------------------------------------------------------------------------
/*firestore.collection("usuarios").valueChanges().map(document => {
    return document(a => {
      const data = a.payload.doc.data();//Here is your content
      const id = a.payload.doc.id;//Here is the key of your document
      return { id, ...data };
    });
});*/
/*firestore.collection('usuarios').get().then((onSnapshot)=>{
    //onSnapshot.docs.forEach(doc=>{
        console.log(onSnapshot.docs[0]);
    //})
});*/
/*
//obteniendo el input y el boton
const inputPost=document.querySelector('#inputUsuario');
const btnPostear=document.querySelector('#btnPublicar');
//Obteniendo el uid del usuario
let uidDeUsuario= firestore.r;
console.log(uidDeUsuario);
//console.log(uidDeUsuario);
//let nameUsuario=firebase.auth().displayName;
//console.log(uidDeUsuario);
//fijando nombre de coleccion
const referenciaUsuario= firebase.firestore().collection('usuarios').doc(uidDeUsuario);


btnPostear.addEventListener('click',function(){
    let elNuevoInput=inputPost.value;  
    
    //fijando nombre de documento
    referenciaUsuario.set({
        elementosPosteados: elNuevoInput
    }).then(function(){
        console.log('Se ha guardado tu publicacion!!');
    }).catch(function(error){
        console.log('Hubo un error', error);
    })

});
const imprimirPost=document.querySelector('#imprimirPublicacion');

//imprimir publicacion en tiempo real
postEnTiempoReal = function(){
    referenciaUsuario.onSnapshot(function(doc){
      if(doc && doc.exists){
          const dataUsuario= doc.data();
          console.log('Verificando la data que estoy recibiendo: ',doc);
          console.log(dataUsuario);
          imprimirPost.innerHTML='Mi post es: '+dataUsuario.elNuevoInput;
      }

    })
}

postEnTiempoReal();
*/













