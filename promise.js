let p = new Promise(function(resolve, reject){
    if(false){
        resolve('Success')
    }
    else{
        reject('Failure')
    }
})

p.then(msg=>console.log(msg),err=>console.log(err))