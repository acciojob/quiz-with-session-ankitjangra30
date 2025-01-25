//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();




// Your JS code here.

// Load saved progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Event listener for radio button changes
document.addEventListener('change', () => {
  userAnswers = [];
  const radios = document.querySelectorAll('input[type="radio"]:checked');
  radios.forEach(radio => {
    const questionIndex = parseInt(radio.name.replace('question-', ''));
    userAnswers[questionIndex] = radio.value;
  });
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
});

// Create submit button and add event listener
const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.addEventListener('click', () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const resultElement = document.createElement('p');
  resultElement.textContent = `Your score is ${score} out of ${questions.length}`;
  questionsElement.appendChild(resultElement);

  // Store score in local storage
  localStorage.setItem('score', score);

  // Display stored score
  const storedScore = localStorage.getItem('score');
  if (storedScore) {
    const previousScoreElement = document.createElement('p');
    previousScoreElement.textContent = `Your previous score: ${storedScore}`;
    questionsElement.appendChild(previousScoreElement);
  }
});

// Add submit button to the page
questionsElement.appendChild(submitButton);

// Re-render questions to reflect saved progress
renderQuestions();
