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