let quizData = [];
let current = 0;

function loadQuiz(subject) {

    fetch("quiz.json")
        .then(res => res.json())
        .then(data => {

            quizData = data[subject];
            current = 0;

        document.getElementById("currentSubject").innerText =
                "Current Subject: " + subject.toUpperCase();
                
        document.getElementById("info").style.display = "none";
        document.getElementById("quiz").style.display = "block";

            showQuestion();
        })
        .catch(err => {
            console.log("Error loading quiz:", err);
        });
}

function showQuestion() {

    let q = quizData[current];

    if (!q) return;

    document.getElementById("question").innerText =
        (current + 1) + ". " + q.question;

    let html = "";

    // create options
    q.options.forEach(opt => {
        html += `
        <label>
            <input type="radio" name="option" value="${opt}">
            ${opt}
        </label>
        <br>
        `;
    });

    // ✅ SIMPLE RESET METHOD (IMPORTANT)
    document.getElementById("options").innerHTML = html;

    updateButtons();
}

function next() {
    if (current < quizData.length - 1) {
        current++;
        showQuestion();
    }
}

function prev() {
    if (current > 0) {
        current--;
        showQuestion();
    }
}

function updateButtons() {

    document.getElementById("prevbtn").disabled = current === 0;
    document.getElementById("nextbtn").disabled = current === quizData.length - 1;
}