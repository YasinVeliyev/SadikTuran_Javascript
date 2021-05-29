let form = document.forms[0]
let username = document.querySelector("#username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let confirm_password = document.querySelector("#confirm_password")


function check(elem, validator, message){
    if(elem.value == ''){
        elem.className = 'form-control is-invalid'
        elem.nextElementSibling.innerText = `${elem.id} Tələb olunur`
        elem.nextElementSibling.className = 'invalid-feedback'
    }

    else if (validator.hasOwnProperty('length')){
        if (elem.value.length >= validator['length']){
            elem.nextElementSibling.innerText = ''
            elem.className = 'form-control is-valid'}

        else{
            elem.className = 'form-control is-invalid'}
            elem.nextElementSibling.innerText = message
            elem.nextElementSibling.className = 'invalid-feedback'
        }

    else if (validator.hasOwnProperty('equalto')){
            if (elem.value == validator['equalto'].value){
                elem.nextElementSibling.innerText = ''
                elem.className = 'form-control is-valid'}
    
            else{
                elem.className = 'form-control is-invalid'}
                elem.nextElementSibling.innerText = message
                elem.nextElementSibling.className = 'invalid-feedback'
            }
            
    else if(validator.hasOwnProperty('email')){

        let reg = /^[A-Z]+\W*\w*@[A-Z]+\.[A-Z]{2,}$/gi

        if(reg.test(elem.value)){
            elem.className = 'form-control is-valid'
            elem.nextElementSibling.innerText = ''}

        else{
            elem.className = 'form-control is-invalid'}
            elem.nextElementSibling.innerText = message
            elem.nextElementSibling.className = 'invalid-feedback'
        }
}

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    check(username, {'length':6}, message='İstifadeçi adının uzunluğu 6 dən çox olmalıdır')
    check(email,validator = {'email':true}, message='Düzgün Email Daxil Edin')
    check(password, {'length':6}, message='Şifrənin uzunluğu 6 dən çox olmalıdır')
    check(confirm_password, {'equalto':password}, message='Şifrələr Uygun deyil')
})