let form = document.querySelector('form')
let input = document.querySelector('#taskName')
let btnDeleteAll = document.querySelector("#btnDeleteAll")
let ul = document.querySelector("#task-list")

eventListener()

function eventListener(){
    form.addEventListener('submit',addNewItem)
    ul.addEventListener('click', deleteItem)
    btnDeleteAll.addEventListener('click',deleteAllItems)
    addItems()
}

function createTask(value,id){
    
    let a = document.createElement('a')
    a.className = 'delete-item float-right'
    a.href = "#"
    a.innerHTML = "<i class='fas fa-times'></i>"

    let li = document.createElement('li')
    li.setAttribute('data-id',id)
    li.className = 'list-group-item list-group-item-secondary'
    li.innerText = value
    
    li.appendChild(a)
    ul.appendChild(li)
    return ul
}

function addNewItem(event){
    event.preventDefault()
    if(input.value === ''){
        alert('Ad New Item')
    }
    else{
        createTask(value=input.value, id=localStorage.length)
        localStorage.setItem(localStorage.length, input.value)
        input.value = ''
    }   
    
}

function deleteItem(event){
    event.preventDefault()
    if (event.target.className == "fas fa-times"){
        if(confirm('Are you sure?')){
            let elem =  event.target.parentElement.parentElement;
            localStorage.removeItem(elem.getAttribute('data-id'))
            elem.remove()
            }  
        }
}

function deleteAllItems(event){
    event.preventDefault()
    if(confirm('Are you sure?')){
        ul.innerHTML = ''
        localStorage.clear()
    }

}

function addItems(){
    for(let i = 0; i<localStorage.length; i++){
        console.log(i)
       createTask(localStorage.getItem(i),id=i)
    }

}

