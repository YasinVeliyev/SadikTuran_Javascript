function Course(title, instructor, image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

function UI(){

}

UI.prototype.addCourseToList = function(course){
    let list = document.querySelector("#course-list")
    let html = `
        <tr>
            <td><img src="img/${course.image}" style="width:100px"></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class ="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>   
    `
    list.innerHTML += html
}

UI.prototype.clearControls = function(){
    let title = document.getElementById('title').value = ''
    let instructor = document.getElementById('instructor').value = ''
    let image = document.getElementById('image').value = ''

}

UI.prototype.deleteCourse = function(element){
    element.parentElement.parentElement.remove()
}

UI.prototype.showAlert = function(message, className){
    let alert = `
        <div class ="alert alert-${className}">
            ${message}
        </div>
    `;
    let row = document.querySelector('.row')
    row.insertAdjacentHTML('beforeBegin', alert)
    setTimeout(function(){
        document.querySelector('.alert').remove()
    },1000)
}

let form = document.getElementById('new-course')
form.addEventListener('submit', function(e){
    e.preventDefault();
    let title = document.getElementById('title').value;
    let instructor = document.getElementById('instructor').value;
    let image = document.getElementById('image').value;
   
    
    let course = new Course(title, instructor, image);
    let ui = new UI()
    
    if(title === ''||instructor===''||image===''){
        ui.showAlert('Please complete the form','warning')
    }
    else {
        ui.addCourseToList(course)
        ui.clearControls()
        ui.showAlert('Course has been added','success')
    }
    
})


document.getElementById('course-list').addEventListener('click',function(e){
    let ui = new UI()
    if(e.target.classList.contains('delete')){
        ui.deleteCourse(e.target)
        ui.showAlert('','danger')
    }
})