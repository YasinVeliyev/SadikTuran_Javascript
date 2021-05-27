let form = document.querySelector('form')
let input = document.querySelector('#taskName')
let btnAddNewTask = document.querySelector("#btnAddNewTask")
let btnDeleteAll = document.querySelector("#btnDeleteAll")
let ul = document.querySelector("#task-list")

eventListener()

function eventListener(){
    form.addEventListener('submit',addNewItem)
    ul.addEventListener('click', deleteItem)
    btnDeleteAll.addEventListener('click',deleteAllItems)
    addItems()
}

function addNewItem(event){
    event.preventDefault()
    if(input.value === ''){
        alert('Ad New Item')
    }
    
    let a = document.createElement('a')
    a.className = 'delete-item float-right'
    a.href = "#"
    a.innerHTML = "<i class='fas fa-times'></i>"

    let li = document.createElement('li')
    li.className = 'list-group-item list-group-item-secondary'
    li.innerText = input.value
    localStorage.setItem(localStorage.length,input.value)
    input.value = ''
    li.appendChild(a)
    ul.appendChild(li)
    
}

function deleteItem(event){
    
    event.preventDefault()
    if (event.target.className == "fas fa-times"){
        if(confirm('Are you sure?')){
            event.target.parentElement.parentElement.remove()
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
    for(let i = 0;i<localStorage.length;i++){
        let a = document.createElement('a')
        a.className = 'delete-item float-right'
        a.href = "#"
        a.innerHTML = "<i class='fas fa-times'></i>"
    
        let li = document.createElement('li')
        li.className = 'list-group-item list-group-item-secondary'
        li.innerText = localStorage.getItem(i)
        console.log(localStorage.getItem(i))
        // localStorage.setItem(localStorage.length,input.value)
        // input.value = ''
        li.appendChild(a)
        ul.appendChild(li)
    }

}

