const start_btn = document.querySelector(".start-button button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = document.querySelector('.timer_sec');
const time_line = document.querySelector('header .time_line');
const time_text = document.querySelector('.time_text')

const option_list = document.querySelector(".option_list");

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  que_counter(1);
  startTimer(15);
  startTimerLine(0)
};

let que_count = 0;
let que_numb = 1;
let counter;
let timevalue = 15;
let widthvalue = 0;
let userScore = 0;

const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector('.result_box');
const restart_quiz = result_box.querySelector('.buttons .restart')
const quit_quiz =  result_box.querySelector('.buttons .quit')

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    que_counter(que_numb);
    clearInterval(counter);
    startTimer(timevalue);
    clearInterval(counterLine);
    startTimerLine(widthvalue);
    next_btn.style.display = 'none';
  } else {
    console.log("Questions completed");
    showResultBox();
  }
};

quit_quiz.onclick = () => {
    window.location.reload();
}
restart_quiz.onclick = () => {
    window.location.reload();
}

function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  const option_list = document.querySelector(".option_list");
  time_text.innerHTML = "Time left"
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon =
  '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

function optionSelected(options) {
    clearInterval(counter);
    clearInterval(counterLine);
    time_text.innerHTML = "Time left"
  let userAns = options.textContent;
  let correct_ans = questions[que_count].answer;
  let allOptions = option_list.children.length;
  if (userAns == correct_ans) {
    userScore += 1,
    console.log(userScore)
    options.classList.add("correct");
    console.log("answer is correct");
    options.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    options.classList.add("incorrect");
    console.log("answer is incorrect");
    options.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correct_ans) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function que_counter(index) {
  const bottom_ques_counter = document.querySelector(".total_que");
  let total_que_tag =
    "<span><p>" +
    index +
    " </p><p>of</p><p>" +
    questions.length +
    "</p>Questions</span>";
  bottom_ques_counter.innerHTML = total_que_tag;
}

function  showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add('activeResult');
    let scoreText = document.querySelector('.score_text');
    if (userScore > 8){
        let scoreTag = '<span>and Congrats 😎,You got <p> '+ userScore +' </p>out of<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 5){
        let scoreTag = '<span>and nice 😎,You got <p> '+ userScore +' </p>out of<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>You got only <p> '+ userScore +' </p>out of<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

    }

function startTimer(time){
   counter = setInterval(timer, 1000);
   function timer () {
    timeCount.textContent = time;
    time--;
    if (time < 9){
        let addZero = timeCount.textContent;
        timeCount.textContent = "0" + addZero
    }
    if (time < 0) {
        clearInterval(counter);
        timeCount.textContent = '00';
        time_text.innerHTML = "Time off"

        let correct_ans = questions[que_count].answer;
        let allOptions = option_list.children.length;

        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correct_ans) {
              option_list.children[i].setAttribute("class", "option correct");
              option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
          }
          for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
            next_btn.style.display = 'block'
          }
    }
   }
   
}
let media;

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer () {
     time += 1;
     time_line.style.width = time + 'px'
     if (time > 549 ) {
         clearInterval(counterLine);
         
     }
    }
 }
