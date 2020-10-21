
questionList = [ 
    {
        num: 1,
        qTitle: "What are the three major components of website building",
        answer: "HTML, CSS. Javascript",
        options: [
            "PHP, Java, HTML",
            "React, HTML, C++",
            "Wordpress, Servers, Blabla",
            "HTML, CSS, Javascript"
        ]
            },
            {
            
                num: 2,
                qTitle: "Bla de Bla Bla bla",
                answer: "Answer 1",
                options: [
                    "Answer 1",
                    "Answer 2",
                    "Answer 3",
                    "Answer 4",

                ]
            },
            {
                num: 3,
                qTitle: "What are the blahs of bla",
                answer: "Answer 3",
                options: [
                    "Answer 1",
                    "Answer 2",
                    "Answer 3",
                    "Answer 4"
                ]
            }

]


var score = 0;
var initialsList = ["PW", "ACE"]
var timerDisplay = 0;
var curQ = 0;
var startBtn = document.querySelector("#start-test")

var mainEl = document.querySelector("#details");

var choiceBox = document.createElement("ul")
choiceBox.setAttribute("id", "choiceBox");

mainEl.appendChild(choiceBox)


function init()
{
    clearInterval()
    score = 0;
    timerDisplay = 500;
    curQ = 0;

}

function startTest(){

    init()
    setUpQuestions(curQ)

    setInterval(timer, 1000)
    
}

function timer(){

    // lower by one every second
    timerDisplay--

    // 
    var timeShow = document.querySelector("#time-number")
   
    // update timer display
    timeShow.innerHTML = timerDisplay 

    console.log(timeShow.innerHTML)
   
   /* if(timerDisplay <= 0)
    {
        clearInterval()
        return
    }
    */
}

function setUpQuestions(currentQ)
{

    // set the question title
    questionTitle = document.createElement("h1")
    questionTitle.setAttribute("Question", questionList[currentQ].qTitle)
    questionTitle.textContent = questionList[currentQ].qTitle
    

    // Make a new li for each set of questions
  for (var i = 0; i < questionList[currentQ].options.length; i++) 
  {
      var listQ = document.createElement("li")
      listQ.setAttribute("choice-value", questionList[currentQ].options[i])
      listQ.textContent = questionList[currentQ].options[i]
      choiceBox.appendChild(listQ)

  }

   /*
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    todoList.appendChild(li);
    */

    // add eventlistener for clicked answer
    choiceBox.addEventListener("click", function () { evalAnswer(currentQ)})
}

function evalAnswer(currentQ){
    // declare variable of clicked target
    var selection = event.target
    
    // check to see if user clicked on correct answer
    if(selection.matches("li")){
        selectedItem = selection.textContent
        if(selectedItem == questionList[currentQ].answer){
        score += 5}
    }
        else{
            timerDisplay -= 15 
        }
    

}



startBtn.addEventListener("click", startTest);


