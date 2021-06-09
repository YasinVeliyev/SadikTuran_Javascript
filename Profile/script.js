let searchProfile = document.getElementById('searchProfile')

class Profile{
    constructor(){
        this.clientid = ''
        this.clientSecret = ''
    }

    async getProfile(username){
        let user = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
        let profile = await user.json()
        let todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`)
        let todo = await todoResponse.json()
        return {profile,todo}
    }
}

class UI{
    constructor(){
        this.profileContainer = document.getElementById("profileContainer")
        this.alert = document.querySelector('.alert')
    }

    showProfile(profile){
        this.profileContainer.innerHTML = `
        <div class="card card-body">
        <div class="row">
            <div class="col-md-3">
                <img src="https://via.placeholder.com/150" alt="" class="img-thumbnail">
            </div>
            <div class="col-md-9">
                <h4>Contact</h4>
                <ul class='list-group'>
                    <li class="list-group-item">Name: ${profile.name}</li>
                    <li class="list-group-item">Username: ${profile.username}</li>
                    <li class="list-group-item">Email: ${profile.email}</li>
                    <li class="list-group-item">Adress:
                        ${profile.address.city},
                        ${profile.address.zipcode},
                        ${profile.address.street},
                        ${profile.address.suite},
                    </li>
                    <li class="list-group-item">Phone: ${profile.phone}</li>
                    <li class="list-group-item">Website: ${profile.website}</li>
                    <li class="list-group-item">Company: ${profile.company.name}</li>
                </ul>
                <h4>Todo List</h4>
                <ul id="todo" class='list-group'>
                    
                </ul>
            </div>
        </div>
    </div>`}

    showAlert(text){
        this.alert.style.display='block'
        this.alert.innerHTML = `${text} is not found`
    }
    clear(){
        this.alert.style.display= 'none'
        this.alert.innerHTML = ''
    }
    showToDo(todo){
        let html = '';
        todo.forEach(todo => {
            if(todo.completed){
                html+= `<li class="list-group-item bg-success">${todo.title}</li>`
            }
            else{
                html+= `<li class="list-group-item bg-secondary">${todo.title}</li>`
            }
        })
        this.profileContainer.querySelector("#todo").innerHTML = html
    }

}

let profile = new Profile();
let ui = new UI()

searchProfile.addEventListener('keyup', (event)=>{
    let text = event.target.value;
    if(text){
        profile.getProfile(text).then(res=>{
            if(res.profile.length){
                ui.showProfile(res.profile[0])
                ui.showToDo(res.todo)
            }
            else{
                ui.showAlert(text)
            }
        }).catch(err=>{
            ui.showAlert(text)
        })  
    }
    ui.clear()
})