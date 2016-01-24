var quiz = JSON.parse(window.localStorage.getItem('quiz'));
var minutes = 5;
var seconds = 0;

const randomizeQuiz = function(){
  var temp = quiz.slice(0);
  var used = quiz.map(() => 0);
  const numQn = quiz.length;
  var counter = 0;
  while(counter<numQn){
    var idx = Math.floor(Math.random()*numQn);
    if(!used[idx]){
      quiz[counter++] = temp[idx];
      used[idx] = 1;
    }
  }
};

const QuizStore = {
  getQuiz(){
    randomizeQuiz();
    return quiz;
  },
  setQuiz(newQuiz){
    quiz = newQuiz;
    window.localStorage.setItem('quiz', JSON.stringify(newQuiz));
  },
  getDuration(){
    return {
      minutes: minutes,
      seconds: seconds
    };
  },
  setDuration(m, s){
    if(m>=0 && m<60 && s>=0 && s<60){
      minutes = m;
      seconds = s;
    }
  }
};

module.exports = {
  QuizStore: QuizStore
};
