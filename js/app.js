import {upload} from '/js/upload.js'

console.log('%c run app.js', 'background: #222; color: #bada55; padding:15px')
upload('#file', {
    multi:true,
    accept: ['.png', '.jpg', '.jpeg', '.gif']
})