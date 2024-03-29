//AQUI INICIA DATABASE- FIRESTORE
let firestore= firebase.firestore();
//Siempre se va alternar entre colecciones y documentos const docReference= firestore.collection('samples').doc('laMeraData');
  const docReference= firestore.collection('users'); 
    
  const outputH1= document.querySelector('#outputH1');
  const inputText=document.querySelector('#latest');
  const buttonSave=document.querySelector('#saveButton');

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
        console.log('El usuario activo es: '+dataPerfil.name+'br'+dataPerfil.email+'br'+dataPerfil.img+'br'+dataPerfil.id);
        document.querySelector('.photo').innerHTML=`<img class="photoProfile" src="${dataPerfil.img}" alt="photo">`;
        document.querySelector('.name   ').innerHTML=`<h2>${dataPerfil.name}</h2>`;
        const setUsuario=firestore.collection('users').doc();
        //const setUsuario=firestore.collection('users').doc('mensajes');
        setUsuario.set({
            wallUsuario:[''],
            uid: dataPerfil.id,
            email:dataPerfil.email

        });
        const referenceToUpdate=setUsuario.id;
        console.log(referenceToUpdate);
        buttonSave.addEventListener('click',function(){
            const textToSave=inputText.value;
            console.log('Guardando '+textToSave+' a Firestore');
            //actualizando en la carpeta con el id generado automaticamente
            return firestore.collection('users').doc(referenceToUpdate).update({  
                wallUsuario:firebase.firestore.FieldValue.arrayUnion(textToSave)
        
            }).then(function(){
                console.log('Post Guardado!!');
                inputText.value="";
            }).catch(function(error){
                console.log('Existe un error', error);
            })
            
            
        });
    }
});

/*inicia la parte de imprimir
//imprimir publicacion en tiempo real
function postEnTiempoReal(){
    firestore.collection('users').onSnapshot(function(doc){
        console.log(doc);
        if(doc && doc.exists){
            const dataUsuario= doc.data();
            console.log('Verificando la data que estoy recibiendo: ',doc);
            //console.log(dataUsuario);
          let impr=dataUsuario.wallUsuario;
          console.log(impr);
          //outputH1.innerHTML=''+dataUsuario.wallUsuario[impr.length-1];
          outputH1.innerHTML=''+dataUsuario.wallUsuario;    
      }else(console.log('No esta funcionando'));

    })
};
postEnTiempoReal();
*/

//inicia la parte de imprimir
//imprimir publicacion en tiempo real
function postEnTiempoReal(){
    firestore.collection('users').onSnapshot(snapshot =>{
        
        let changes= snapshot.docChanges();
        //console.log(changes);
        //console.log(change.doc.data());
        changes.forEach(change=>{

            console.log(change.doc.data());
            outputH1.innerHTML=`<section>${change.doc.data().wallUsuario[change.doc.data().wallUsuario.length-1]}</section>`;
        })   
    })
};
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













