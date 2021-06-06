class Course{
    constructor(title, instructor, image){
        if(localStorage.getItem('courses')){
            this.courseId = JSON.parse(localStorage.getItem('courses')).length + 1;
        }
        else{
            this.courseId = 1
        }
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }  
}

class Storage{
    static getCourses(){
        let courses;
        if(localStorage.getItem('courses')){
            courses = JSON.parse(localStorage.getItem('courses'))
        }
        else{
            courses = []
        }
        return courses
    }

    static displayCourse(){
        let courses = Storage.getCourses();
        courses.forEach(course => {
            let ui = new UI()
            ui.addCourseToList(course)
        })
    }

    static addCourse(course){
        let courses = Storage.getCourses()
        courses.push(course)
        localStorage.setItem('courses', JSON.stringify(courses))
    }

    static deleteCourse(id){
        let courses = Storage.getCourses()
        courses.forEach((course,index)=>{
            if(course.courseId === id){
                courses.splice(index,1)
                localStorage.setItem('courses', JSON.stringify(courses))
            }
        })
    }
}

class UI{
    addCourseToList(course){
        let list = document.querySelector("#course-list")
        let html = `
            <tr>
                <td><img src="img/${course.image}" style="width:100px"></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" class ="btn btn-danger btn-sm delete" data-id = "${course.courseId}">Delete</a></td>
            </tr>   
        `
        list.innerHTML += html
    }

    clearControls(){
        let title = document.getElementById('title').value = ''
        let instructor = document.getElementById('instructor').value = ''
        let image = document.getElementById('image').value = ''
    
    }

    deleteCourse(element){
        element.parentElement.parentElement.remove()
    }

    showAlert(message, className){
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
}


document.addEventListener('DOMContentLoaded', Storage.displayCourse)

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
        Storage.addCourse(course)
        ui.clearControls()
        ui.showAlert('Course has been added','success')
    }
    
})


document.getElementById('course-list').addEventListener('click',function(e){
    let ui = new UI()
    if(e.target.classList.contains('delete')){
        ui.deleteCourse(e.target)
        Storage.deleteCourse(Number(e.target.getAttribute('data-id')))
        ui.showAlert('Course has been deleted','danger')
    }
})