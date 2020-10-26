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
                    "It's Always Sunny in Philadelphia",
                    "Arrested Development"
                ]
            },
            {
            
                num: 4,
                qTitle: "Bla de Bla Bla bla",
                answer: "What?",
                options: [
                    "What?",
                    "I dont agree",
                    "Maybe?",
                    "This is definitely not the answer",

                ]
            },
            {
            
                num: 5,
                qTitle: "How is this class compared to the full-time one?",
                answer: "This one is hard and the full-time one is for people who eat, breathe and sleep code",
                options: [
                    "They are both easy",
                    "Full time is easier",
                    "Who cares I only do work the night before anyway",
                    "This one is hard and the full-time one is for people who eat, breathe and sleep code",
                ]
            }

]

// Global variables used for scores, timer display, initials
var score = 0;
var highScore = 0;
var timeReset = 0
var timerDisplay = 0;
var curQ = 0;
var startBtn = document.querySelector("#start-test")
var scoreNumber = document.querySelector("#high-number")
var restart = false

var mainBoard = document.querySelector("#details");

var saveScoreInitial = 
    {
     initial : '', 
     nameScore : 0,
    }


// initialize everything
function init()
{
    // reset timer
    clearInterval(timeReset)

    // reset score
    score = 0;

    // reset time display
    timerDisplay = 100;

    // set first question to 0
    curQ = 0;

    

    // remove these buttons only if restarting
    if(restart)
    {
      //  document.querySelector('#resetBtn').remove()
     //   document.querySelector('#clearBtn').remove()    
    }
    else{
        // remove button on first try
        document.querySelector('#start-test').remove()
    }

    
    
}

// logic for when the start test button is clicked
function startTest(){

    wipe()

    init()

    // debug console
    console.log("restarting")

    
    // setup the questions
    setUpQuestions(curQ)

    // run timer every second
   timeReset = setInterval(timer, 1000)
    
}

// timer at the top for quiz
function timer(){

    // lower by one every second
    timerDisplay--

    // assign variable to time and score for updates
    var timeShow = document.querySelector("#time-number")
   
   
    // update timer display
    timeShow.innerHTML = timerDisplay 
    
    //update score display
    scoreNumber.innerHTML = score;

    //console.log(timeShow.innerHTML)
   
    // if timer reaches 0
    if(timerDisplay <= 0)
    {
        clearInterval(timeReset)
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

    // get rid of instructions and remove button
    document.querySelector("h1").innerHTML = ''
    document.querySelector('h4').innerHTML = ''
  

     // set the question title
     questionTitle = document.createElement("h2")
     questionTitle.setAttribute("Question", questionList[currentQ].qTitle)
     questionTitle.textContent = questionList[currentQ].qTitle
     mainBoard.appendChild(questionTitle)

     // set up start of list of questions
    var choiceBox = document.createElement("ul")
    //choiceBox.setAttribute("id", "choiceBox");
    mainBoard.appendChild(choiceBox)

    
    // Make a new list for each set of questions
  for (var i = 0; i < questionList[currentQ].options.length; i++) 
  {
      // add new list items
      var listQ = document.createElement("li")

      // add bootstrap button class for easier clicking 
      listQ.classList.add('btn-outline-primary')
      
      // put the content of the possible answer in this list item
      listQ.textContent = questionList[currentQ].options[i]

      // add list item for display
      choiceBox.appendChild(listQ)

      
  }

  console.log("clicky")

    // add eventlistener for clicked answer
    choiceBox.addEventListener("click", function () { evalAnswer(currentQ)})
}

// logic to evaluate answers
function evalAnswer(currentQ){
    
    // declare variable of clicked target
    var selection = event.target

    // boolean for correct or not
    
    
    // check to see if user clicked on correct answer
    if(selection.matches('.btn-outline-primary'))
    {
        // declare correct/incorrect element
        var selectedItem = selection.textContent

        // logic for getting answer right 
        if(selectedItem === questionList[currentQ].answer)
        {
            // increase score by 10 for correct answers
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
            document.getElementById("answer").textContent = ''
            endGame()
        }


    }   
    
}

// endgame logic, include getting initials and putting into localStorage
function endGame()
{

//update score display
scoreNumber.innerHTML = score;

// set restart boolean to true for proper button resets
restart = true

  // wipe the board
wipe()

// stop the timer
clearInterval(timeReset)


  // title for high score
  showTitle = document.createElement("h5")
  showTitle.innerHTML = "Saved High Score"
  mainBoard.appendChild(showTitle)

  // show last score
  var lastScore = JSON.parse(localStorage.getItem("saved"))

  // make sure there is something is saved
  if(lastScore != null)
  {
    showLastScore = document.createElement("p")
    showLastScore.textContent = "Initials : " + lastScore.initial + "Score: " + lastScore.nameScore
    mainBoard.appendChild(showLastScore)
  }
  
  // create variable for initials input box
  var initials = document.createElement("INPUT")
  initials.setAttribute("id", "initialsID")
  initials.setAttribute("type", "text")

  //<input type="text" placeholder="Type " id="inputId">

  // SHow the user their score
  endSlogan = document.createElement("p")
  endSlogan.textContent = "GAME OVER ---  Your score is " + score
  mainBoard.appendChild(endSlogan)

  // create the submit button for the initials
  var submitButton = document.createElement('button')
  submitButton.textContent = "Submit Initials"
  submitButton.setAttribute("class", "btn btn-primary initials")

  
  // display the initials box and the submit button
  mainBoard.appendChild(initials)
  mainBoard.appendChild(submitButton)

  // logic to save score
  submitButton.addEventListener("click", function(initials){


    // debugging code
    console.log("This is the endgame")
    
    // create object to store initials and score 
    var scoreList =
    {  
        initial : document.getElementById('initialsID').value,
        nameScore : score
    }


    // set the initials into the local storage
    localStorage.setItem("saved", JSON.stringify(scoreList))


    // get the initials and score from the local storage for display, use parsing because of object
    scoreList = JSON.parse(localStorage.getItem("saved"))

    // show object for debugging
    console.log(scoreList)



    // show the initials I just submitted
    var showSaved = document.createElement("p")
    showSaved.textContent = "Name: " + scoreList.initial + "                           Score: " + scoreList.nameScore
    mainBoard.appendChild(showSaved)

    // clear highscores
    clearBtn = document.createElement("button")
    clearBtn.textContent = "Clear High Scores"
    clearBtn.setAttribute("id", "clearBtn")
    mainBoard.appendChild(clearBtn)
    clearBtn.addEventListener("click", function(){
        localStorage.clear()
        showSaved.textContent = ''
    })


    // create new Button to start the game over
    resetBtn = document.createElement("button")
    resetBtn.setAttribute("id", "start-test")
    resetBtn.textContent = "Start Test Again"
    resetBtn.setAttribute("id", "resetBtn")
    mainBoard.appendChild(resetBtn)
    resetBtn.addEventListener("click", startTest)

  })

}


// add an onclick event listener for first start button
startBtn.addEventListener("click", startTest);


