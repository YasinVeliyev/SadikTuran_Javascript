let p = new Promise(function(resolve, reject){
    if(false){
        resolve('Success')
    }
    else{
        reject('Failure')
    }
})

p.then(msg=>console.log(msg),err=>console.log(err))

new Promise(function(resolve,reject){
    setTimeout(()=>{
        resolve(5)
    },1000)
}).then(number=>{
    console.log(number)
    return number * number
}).then(number=>console.log(number))


let isMomHappy = true;

let willGetNewPhone = new Promise((resolve,reject)=>{
    if(isMomHappy){
        let phone = {
            name:'Iphone 8',
            price:4000,
            color:'silver'
        }
        resolve(phone)
    }
    else {
        let error = new Error('Mom is not happy')
        reject(error)
    }
})

const showToFriends = (phone) =>{
    const message = "Hi friends this my new phone "+phone.name;
    return Promise.resolve(message)
}

let askMom = () => {
    willGetNewPhone
    .then(showToFriends)
    .then(console.log)
    .catch(console.log)
}
askMom()