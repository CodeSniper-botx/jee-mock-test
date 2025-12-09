function showQuestion() {
    const q = questions[currentQuestionIndex];

    questionElement.textContent = q.question;
    optionsContainer.innerHTML = "";

    const options = [
        q.optionA,
        q.optionB,
        q.optionC,
        q.optionD
    ];

    options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;   // A. Earth etc
        button.addEventListener("click", () => selectAnswer(option, index));
        optionsContainer.appendChild(button);
    });
}
function selectAnswer(selected, index) {

    const correct = questions[currentQuestionIndex].correctAnswer;

    const correctIndex = {
        A: 0,
        B: 1,
        C: 2,
        D: 3
    }[correct];

    if (index === correctIndex) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionContainer.style.display = "none";
        nextButton.style.display = "none";
        scoreElement.textContent = `Your score: ${score} / ${questions.length}`;
    }
}

