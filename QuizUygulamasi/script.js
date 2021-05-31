function Question(text, choices, answer){
    this.text = text
    this.choices = choices
    this.answer = answer
}

Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

function Quiz(questions){
    this.questions = questions
    this.score = 0
    this.questionIndex=0
}

Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex]
}

Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex
}

Quiz.prototype.guess = function(answer){
    let question = this.getQuestion()
    if(question.checkAnswer(answer)){
        this.score ++
    }
    this.questionIndex++
}

var q1 = new Question("what's the best programming language ?",["C#","javascript","pyhton","asp.net"],"javascript");

var q2 = new Question("what's the most popular programming language ?",["c#","visual basic","nodejs","javascript"],"javascript");

var q3 = new Question("what's the best modern programming language ?",["C#","javascript","pyhton","asp.net"],"javascript");

var q4 = new Question("what's language ?",["C#","javascript","css","asp.net"],"javascript");

var q5 = new Question("modern programming language ?",["C#","html","pyhton","pyhton"],"javascript");


let quiz = new Quiz([q1,q2,q3,q4,q5])

function loadQuiz(){
    if(quiz.isFinish()){
        document.querySelector('.card-body').innerHTML = `<h2>Score</h2><h4>${quiz.score}</h4>`
    }

    else {
        document.querySelector("#progress").innerHTML = `Question ${quiz.questionIndex+1} of ${quiz.questions.length }`;
        let question = quiz.getQuestion()
        document.querySelector('#question').innerText = question.text
        let choices = question.choices
        document.querySelectorAll('button').forEach((elem, index)=>{
            elem.firstElementChild.innerText = choices[index]
            guess(elem,choices[index])
        })
    }
    

}

function guess(btn,guess){
    btn.onclick = function (){
        quiz.guess(guess)
        loadQuiz()
    }
}

function showScore(){
    let html = `<h2>Score</h2><h4>${quiz.score}</h4>`
}

loadQuiz()