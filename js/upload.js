function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (!bytes ){ 
        return '0 Byte'
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
 }
export function upload(selector, options = {}){
const input = document.querySelector(selector)
const preview = document.createElement('div')
preview.classList.add('preview')

const open = document.createElement('button')
open.classList.add('btn', 'btn-primary')
open.textContent = 'Открыть'

if(options.multi){
    input.setAttribute('multiple', true)
}
if(options.accept && Array.isArray(options.accept)){
    input.setAttribute('accept', options.accept.join(','))
}

input.insertAdjacentElement('afterend', preview)
input.insertAdjacentElement('afterend', open)

const triggerInput = () => input.click()
const changeHandler = event =>{
    if(!event.target.files.length){
        return
    }
    const files = Array.from(event.target.files)
    preview.innerHTML = ''
    files.forEach(file=>{
        if(!file.type.match('image')){
            return
        }
        //console.log(file)
        const reader = new FileReader()
        reader.onload = ev =>{
            const imageSrc = ev.target.result
            console.log(ev.target.result)
            preview.insertAdjacentHTML('afterbegin', `
            <div class="preview-image">
            <div class="preview-remove">&times;</div>
            <img src="${imageSrc}" alt="${file.name}" />
            <div class="preview-info">
            <span>${file.name}</span>
            <span>${bytesToSize(file.size)}</span>
            </div>
            </div>
            `)
        }
        reader.readAsDataURL(file)
    })
    
}
  

open.addEventListener('click', triggerInput)
input.addEventListener('change', changeHandler)
}