// Array of questions
questionList = [ 
    {
        num: 1,
        qTitle: "What are the three major components of website building",
        answer: "HTML, CSS, Javascript",
        options: [
            "PHP, Java, HTML",
            "React, HTML, C++",
            "Wordpress, Servers, Blabla",
            "HTML, CSS, Javascript"
        ]
            },
            {
            
                num: 2,
                qTitle: "What's My Name?",
                answer: "Pirooz Wallace",
                options: [
                    "David Blaine",
                    "Pirooz Wallace",
                    "Tom Cruise",
                    "William Wallace",

                ]
            },
            {
                num: 3,
                qTitle: "What is Bob Loblaws law blog from?",
                answer: "",
                options: [
                    "Family Guy",
                    "Modern Family",
                    "William Barr should arrest himself",
                    "Arrested Development"
                ]
            }
            {
            
                num: 2,
                qTitle: "Bla de Bla Bla bla",
                answer: "What?",
                options: [
                    "What?",
                    "I dont agree",
                    "Maybe?",
                    "This is definitely not the answer",

                ]
            },

]

// Global variables used for scores, timer display, initials
var score = 0;
var highScore = 0;
var initialsList = ["PW", "ACE"]
var timerDisplay = 0;
var curQ = 0;
var startBtn = document.querySelector("#start-test")

var mainBoard = document.querySelector("#details");

var saveScoreInitial = [
    {
     initial = '', 
     nameScore : 0,
    }

]


// initialize everything
function init()
{
    clearInterval()
    score = 0;
    timerDisplay = 200;
    curQ = 0;
}

// logic for when the start test button is clicked
function startTest(){

    init()
    setUpQuestions(curQ)

    // run timer
    setInterval(timer, 1000)
    
}

// timer at the top for quiz
function timer(){

    // lower by one every second
    timerDisplay--

    // assign variable to time and score for updates
    var timeShow = document.querySelector("#time-number")
    var scoreNumber = document.querySelector("#high-number")
   
    // update timer display
    timeShow.innerHTML = timerDisplay 
    
    //update score display
    scoreNumber.innerHTML = score;

    //console.log(timeShow.innerHTML)
   
    // if timer reaches 0
    if(timerDisplay <= 0)
    {
        clearInterval()
        wipe()
        endGame()
        return
    }

}

// wipe board
function wipe() {

    mainBoard.innerHTML = '';
    currentQ = 0
  }

  // logic to set up questions
function setUpQuestions(currentQ)
{

     // set the question title
     questionTitle = document.createElement("h2")
     questionTitle.setAttribute("Question", questionList[currentQ].qTitle)
     questionTitle.textContent = questionList[currentQ].qTitle
     mainBoard.appendChild(questionTitle)

     // set up start of list of questions
    var choiceBox = document.createElement("ul")
    choiceBox.setAttribute("id", "choiceBox");
    mainBoard.appendChild(choiceBox)

    

    // Make a new list for each set of questions
  for (var i = 0; i < questionList[currentQ].options.length; i++) 
  {
      var listQ = document.createElement("li")
      listQ.classList.add('btn-primary')
      
      listQ.textContent = questionList[currentQ].options[i]
      choiceBox.appendChild(listQ)

     // console.log(listQ.textContent)
      
  }

 // listQ.setAttribute("choice-value", questionList[currentQ].options[i])


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

// logic to evaluate answers
function evalAnswer(currentQ){
    // declare variable of clicked target
    var selection = event.target

    // boolean for correct or not
   // var results = false;
    
    // check to see if user clicked on correct answer
    if(selection.matches('.btn-primary'))
    {
        // declare correct/incorrect element
        var selectedItem = selection.textContent

        // logic for getting answer right 
        if(selectedItem === questionList[currentQ].answer)
        {
            score += 10
            
            // let the user know the answer is Correct
            document.getElementById("answer").textContent = "Correct"
            console.log(selectedItem)
        }
        // vs getting the question wrong
        else{
            console.log(selectedItem)

            // subtract 15 seconds for every wrong answer
            timerDisplay -= 15
            
            // let the user know for every correct answer
            document.getElementById("answer").textContent = "Incorrect"
            
            console.log(selectedItem)
        }

        // make sure not at the end then 
        // advance to the next question
        if(currentQ < questionList.length -1)
        {
            console.log(currentQ)
            console.log(questionList.length)
        
            wipe()
            currentQ++;
            setUpQuestions(currentQ)
            
        }
        // endgame if at end of questions
        else
        {
            wipe()
            clearInterval()
            endGame()
        }


    }   
    
}

// endgame logic, include getting initials and putting into localStorage
function endGame()
{
  wipe()

  var initials = document.createElement("INPUT")

  //<input type="text" placeholder="Type " id="inputId">

  var submitButton = document.createElement('button')
  submitButton.textContent = "Submit Initials"
  submitButton.setAttribute("class", "btn btn-primary initials")

  initials.setAttribute("type", "text")

  mainBoard.appendChild(initials)
  mainBoard.appendChild(submitButton)

  // logic to save score
  document.getElementsByClassName("ibtn btn-primary initials").addEventListener("click", function(){

    scoreList = localStorage.getItem("saveScoreInitial")


    newScoreInitial = saveScoreInitial
    newScoreInitial.nameInitial = initials.value
    newScoreInitial.nameScore = score
    saveScoreInitial.push(newScoreInitial)
        
    localStorage.setItem('saveScoreInitial', JSON.stringify(saveScoreInitial) )
  })

}


/* highscore = localStorage.getItem("highScore");

if(highscore !== null){
    if (score > highscore) {
        localStorage.setItem("highscore", score);      
    }
}
else{
    localStorage.setItem("highscore", score);
}

}


 */
startBtn.addEventListener("click", startTest);


