import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from '/js/upload.js'
const firebaseConfig = {
    apiKey: "AIzaSyBEQgz67IeULJwaeexWycRpai25RZvoSrg",
    authDomain: "js-fileupload.firebaseapp.com",
    projectId: "js-fileupload",
    storageBucket: "js-fileupload.appspot.com",
    messagingSenderId: "263313782411",
    appId: "1:263313782411:web:f4da92f790176510fb868e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage()
console.log(storage)


console.log('%c run app.js', 'background: #222; color: #bada55; padding:15px')
upload('#file', {
    multi:true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks){
    files.forEach((file, index) =>{
        const ref = storage.ref(`images/${file.name}`)
        const task = ref.put(file)
        task.on('state_changed', snapshot =>{
            const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(0)
            const block = blocks[index].querySelector('.preview-info-progress')
            
            block.textContent = percentage + '%'
            block.style.width = percentage + '%'
            console.log(percentage)
        }, error => {
            console.log(error)
        },
        ()=>{
            console.log('Complete')
        })
    })
    }
})