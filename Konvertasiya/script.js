const rates = "http://api.exchangeratesapi.io/v1/latest?access_key=323aa7ce829776177c0d55926c30d8e7"
const symbol = "http://api.exchangeratesapi.io/v1/symbols?access_key=323aa7ce829776177c0d55926c30d8e7"

let el_currency_one = document.getElementById('currency_one')
let el_currency_two = document.getElementById('currency_two')
let amount = document.getElementById('amount')
let el_btn_calculate = document.getElementById('btn_calculate')
let el_result = document.getElementById('result')

var data;

fetch(symbol)
.then(res=>res.json())
.then(data=>{
    data = data.symbols
    for(let i in data){
        el_currency_one.innerHTML += `<option value=${i}>${data[i]}</option>`
        el_currency_two.innerHTML +=`<option value=${i}>${data[i]}</option>`
    }
})

async function exchange(from, to){
    let res = await fetch(rates)
    let data = await res.json()
    return data.rates[to]/data.rates[from]
}

el_btn_calculate.addEventListener('click', (e)=>{
    let from = el_currency_one.value
    let to = el_currency_two.value
    exchange(from, to).then((result)=>{
        el_result.innerText =  `${amount.value} ${from} = ${Number(amount.value * result).toPrecision(3)} ${to}`
    })
})

