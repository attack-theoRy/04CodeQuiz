
questionList = [ 
    {
        num: 1,
        question: "What are the three major components of website building",
        answer: "HTML, CSS. Javascript",
        options: [
            "PHP, Java, HTML",
            "React, HTML, C++",
            "Wordpress, Servers, Blabla",
            "HTML, CSS, Javascript"
        ]
            }
            {
                num: 2,
                question: "Bla de Bla Bla bla",
                answer: "Answer 1",
                options: [
                    "Answer 1",
                    "Answer 2",
                    "Answer 3",
                    "Answer 4",

                ]
            }

]

var score = 0;
var initialsList = ["PW", "ACE"]
var timerDisplay = 0;


function init()
{
    clearInterval()
    score = 0;
    timerDisplay = 500;

}

function startTest(){

    init()

    setInterval(timer(), 1000)
    
}

function timer(){

    timerDisplay--
    var timeShow = document.querySelector("time-left")
    timeShow.textContent = timerDisplay
    if(timerDisplay <= 0)
    {
        clearInterval()
        return
    }

}

document.getElementById("button").addEventListener("click", startTest);


