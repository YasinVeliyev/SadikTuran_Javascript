document.querySelector("#getEmployees").addEventListener('click', loadEmployee)


function loadEmployee(){
    let loadImage = document.querySelector("#loading")
    loadImage.style.display = 'block'
    let xhr = new XMLHttpRequest()
    xhr.open('GET','employees.json',true)
    
    setTimeout(()=>{
        xhr.onload = function(){
            if (this.status === 200){
                loadImage.style.display = 'none'
                let employees = JSON.parse(this.responseText)
                for(let employee of employees.employees){
                    let html = `
                            <tr>
                                <td>${employee.firstName}</td>
                                <td>${employee.lastName}</td>
                                <td>${employee.age}</td>
                                <td>${employee.retired}</td>
                            </tr>`
                    document.querySelector("tbody").innerHTML += html
                }  
            }
        }
        xhr.send()
    },1000)
    
   
}

