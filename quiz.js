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

const QS = [
    {
      title: "Why We Use <br> Element",
      answer_1: "To Make Text Bold",
      answer_2: "To Make Text Italic",
      answer_3: "To Add Breakline",
      answer_4: "To Create Horizontal Line",
      right_answer: "To Add Breakline"
    },
    {
      title: "Is <img> Element Has Attribute href",
      answer_1: "Yes",
      answer_2: "No Its For Anchor Tag <a>",
      answer_3: "All Elements Has This Attribute",
      answer_4: "Answer 1 And 3 Is Right",
      right_answer: "No Its For Anchor Tag <a>"
    },
    {
      title: "How Can We Make Element Text Bold",
      answer_1: "Putting It Inside <b> Tag",
      answer_2: "Putting It Inside <strong> Tag",
      answer_3: "Customizing It With Font-Weight Property In CSS",
      answer_4: "All Answers Is Right",
      right_answer: "All Answers Is Right"
    },
    {
      title: "What Is The Right Hierarchy For Creating Part Of Page",
      answer_1: "<h2> Then <p> Then <h1> Then <p> Then <h3> Then <p> Then <img>",
      answer_2: "<h1> Then <p> Then <h3> Then <p> Then <h2> Then <p> Then <img>",
      answer_3: "<h2> Then <p> Then <h3> Then <p> Then <h1> Then <p> Then <img>",
      answer_4: "All Solutions Is Wrong",
      right_answer: "All Solutions Is Wrong"
    },
    {
      title: "How Can We Include External Page Inside Our HTML Page",
      answer_1: "By Using Include in HTML",
      answer_2: "By Using Load In HTML",
      answer_3: "By Using iFrame Tag",
      answer_4: "All Solutions Is Wrong",
      right_answer: "By Using iFrame Tag"
    },
    {
      title: "What Is The Tag That Not Exists in HTML",
      answer_1: "<object>",
      answer_2: "<basefont>",
      answer_3: "<abbr>",
      answer_4: "All Tags Is Exists in HTML",
      right_answer: "All Tags Is Exists in HTML"
    },
    {
      title: "How We Specify Document Type Of HTML5 Page",
      answer_1: "<DOCTYPE html>",
      answer_2: "<DOCTYPE html5>",
      answer_3: "<!DOCTYPE html5>",
      answer_4: "<!DOCTYPE html>",
      right_answer: "<!DOCTYPE html>"
    },
    {
      title: "What Is The Element Thats Not Exists in HTML5 Semantics",
      answer_1: "<article>",
      answer_2: "<section>",
      answer_3: "<blockquote>",
      answer_4: "<aside>",
      right_answer: "<blockquote>"
    },
    {
      title: "In HTML Can We Use This Way To Add Attributes",
      answer_1: "<div class='class-name'>",
      answer_2: "<div class=class-name>",
      answer_3: "<div class=\"class-name\">",
      answer_4: "All Is Right",
      right_answer: "All Is Right"
    }
  ]

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
                    console.log(rightAnswers)
                    
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
        let endText = document.createTextNode(`you answerd correctly at ${rightAnswers++}/${qLength}`)
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










