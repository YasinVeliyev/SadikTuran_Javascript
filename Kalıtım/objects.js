function Person(name){
    this.name=name;
}
Person.prototype.introduce = function(){
        console.log(`Hello my name is ${this.name}`)
}

let p1 = new Person("Yasin")
p1.introduce()

function Teacher(name, branch){
    Person.call(this,name)
    this.branch=branch;
}
Teacher.prototype = Object.create(Person.prototype)
Teacher.prototype.constructor = Teacher;
Teacher.prototype.teach = function(){
    console.log(`I teach ${this.branch}`)
}

let t1 = new Teacher('Sadik', 'math')
t1.introduce()
t1.teach()

function Student(name,number){
    Person.call(this,name)
    this.number=number
}
console.log(Student.prototype)

Student.prototype.__proto__ = Person.prototype

Student.prototype.study=function(){
    console.log(`My student number is ${this.number} I have already studied hard`)
}

console.log(Student.prototype.constructor)

let st = new Student('Asif',1)
console.log(st.name)
st.study()

function HeadMaster(name,branch){
    Teacher.call(this,name,branch)
}
HeadMaster.prototype.__proto__=Teacher.prototype
HeadMaster.prototype.shareTask = function(){
    console.log('I have already shared all the work')
}

h1 = new HeadMaster('Yasin','math')
h1.introduce()
h1.teach()
h1.shareTask()  