let title = document.querySelector(".title");
let answersArea = document.querySelector(".answers")
let bulletsArea = document.querySelector(".bullets")
let container = document.querySelector(".container")


let btn = document.getElementById("btn")
let start = document.querySelector(".start")
let startBtn = document.querySelector(".start span")
let endScreen = document.querySelector(".end")
let currentQuestion = 0;
let rightAnswers = 0;

//some animation
start.onclick = function bull() {
    startBtn.classList.add("ani");
    setTimeout(() => {
        start.remove()
        btn.classList.add("btn")
    }, 400);
}


function getquestion() {
    let xreq = new XMLHttpRequest()

    xreq.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            let questions = JSON.parse(xreq.responseText)
            let questionsCount = questions.length;
            let curr = questions[currentQuestion]
            
            let answers = document.getElementsByName("answer")
            getAnswers(curr,questionsCount);
            createBullets(questionsCount)
            
            btn.onclick = () =>{
                let right = questions[currentQuestion].right_answer;
                
                let chosenAnswer;
                for(i=0; i<answers.length;i++){
                    
                    if(answers[i].checked == true){
                        
                        chosenAnswer = answers[i].className;
                        answersArea.innerHTML = "";
                        title.innerHTML = "";
                        bulletsArea.innerHTML = ""
                        currentQuestion++
                        
                        
                        getAnswers(questions[currentQuestion],questionsCount);
                        createBullets(questionsCount)
                        currentBullet(questions[currentQuestion])
                        end(questionsCount)
                    }
                    
                    
                }
                if(chosenAnswer === right){
                    rightAnswers++
                    
                }

                
            }
            

        }
        
    }
    xreq.open("GET","quiz.json",true);
    xreq.send();

}
getquestion();


function getAnswers(curr,count){

    if(currentQuestion < count){
        let quizTitle = document.createTextNode(curr["title"])
        title.appendChild(quizTitle)
        for(i =1; i<=4; i++){
            
           let mainDiv = document.createElement("div");
            let input = document.createElement("input")
            input.type = "radio"
            input.name = "answer"
            input.id = `answer_${i}`;
            input.className = curr[`answer_${i}`]
    
    
    
            let label = document.createElement("label")
            label.htmlFor = `answer_${i}`;
            label.className = "Label-answers"
            let labelText = document.createTextNode(curr[`answer_${i}`])
            label.appendChild(labelText)
            
            
            mainDiv.appendChild(input);
            mainDiv.appendChild(label);
            answersArea.appendChild(mainDiv);
    
    }
    }
}
function createBullets(length){

    for(i=1; i<=length; i++){
        let bullet = document.createElement("span");
        bulletsArea.appendChild(bullet)
        currentBullet(bullet)
        
    }
    
}

function currentBullet(curr){
    let bulletsSpan = Array.from(document.querySelectorAll(".bullets span"));

    bulletsSpan.forEach((element,index) =>{
        if(index === currentQuestion){
            element.className ="on"
        }
    })
}



function end(qLength) {
    if(currentQuestion ===qLength){
        container.remove();
        endScreen.style.display = "flex"
        let endText = document.createTextNode(`you answerd correctly at ${rightAnswers}/${qLength}`)
        endScreen.appendChild(endText)
        let endBtn = document.createElement("span");
        let endBtnText= document.createTextNode("TryAgain")
        endBtn.appendChild(endBtnText)
        endScreen.appendChild(endBtn)

        endBtn.onclick = ()=>{
            location.reload()
        }

    }

    
}







