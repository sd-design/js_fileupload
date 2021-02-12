import {upload} from '/js/upload.js'

console.log('%c run app.js', 'background: #222; color: #bada55; padding:15px')
upload('#file', {
    multi:true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, block){
        //загружаем файлы здесь
        const formData = new FormData()
        files.forEach((file, index) =>{
            formData.append('files[]', file)
            //console.log('Complete')     
    })
    fetch("http://ci-3/upload/do_upload_multi", {
        method: "post",
        body: formData
    })
    .then((response) => {
        return response.text()
    })
    .then((data) => {
        console.log(data);
        const answer = document.createElement('div')
        answer.innerHTML = data
        block.insertAdjacentElement('afterend', answer)
    })

    }
})