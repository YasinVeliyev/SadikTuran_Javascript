let p = new Promise(function(resolve, reject){
    if(false){
        resolve('Success')
    }
    else{
        reject('Failure')
    }
})

p.then(console.log,console.log)

new Promise(function(resolve,reject){
    setTimeout(()=>{resolve(5)},1000)
})
.then(number=>{
    console.log(number)
    return number * number
})
.then(console.log)


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

let myObj = {
    // method : "POST",
    url:"https://randomuser.me/api/?results=5",
    // headers :[
    //     {"content-type":"application/json"}
    // ]
}

let request = obj => {
    return new Promise((resolve,reject)=>{

        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || 'GET', obj.url)

        if(obj.headers){
            console.log(xhr.responseText)
            Objecy.keys(object.headers).forEach(key => xhr.setRequestHeader(key, obj.headers[key]))
        }

        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300){
                resolve(xhr.responseText)
            }
            else{
                document.write(typeof xhr.status)
                reject(xhr.statusText)
            }
        }

        xhr.onerror = () => {
            reject(xhr.statusText)
        }

        xhr.send()
    })
}

request(myObj)
.then((data)=>console.log(JSON.parse(data, null, 4).results))
.catch(console.log)


async function getText(){
    let result = await fetch(myObj.url)
    let data = await result.json()
    console.log('Data',...data.results)
}

getText()