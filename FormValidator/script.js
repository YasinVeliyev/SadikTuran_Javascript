let form = document.forms[0]
let username = document.querySelector("#username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let confirm_password = document.querySelector("#confirm_password")

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    console.log(username.value)
})