const viewArabicQuizbtn = document.getElementById("arabicquiz-view")
const viewEnglishQuizbtn = document.getElementById("englishquiz-view")
const arabicQuizSection = document.getElementById("arabic-quiz")
const englishQuizSection = document.getElementById("english-quiz")
const arabicQuizForm = document.getElementById("quizform-arabic")
const englishQuizForm = document.getElementById("quizform-english")
const arabicQuizSubmitBtn = document.getElementById("submitquiz-arabic")
const englishQuizSubmitBtn = document.getElementById("submitquiz-english")
const result = document.getElementById("quizresult")

const correctAnswersArabic = ['B', 'C', 'C', 'B', 'A', 'A', 'C', 'A', 'A', 'B']
const correctAnswersEnglish = ['C', 'A', 'B', 'B', 'C', 'A', 'C', 'B', 'B', 'C']

//view arabic quiz
viewArabicQuizbtn.addEventListener("click", (e) => {
    e.preventDefault();
    result.classList.add('d-none')
    arabicQuizSection.style.display = "block";
    englishQuizSection.style.display = "none";
});

//view english quiz
viewEnglishQuizbtn.addEventListener("click", (e) => {
    e.preventDefault();
    result.classList.add('d-none')
    englishQuizSection.style.display = "block";
    arabicQuizSection.style.display = "none";
});

//submit arabic quiz
arabicQuizSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let score = 0;
    const userAnswers = [arabicQuizForm.q1.value,
    arabicQuizForm.q2.value,
    arabicQuizForm.q3.value,
    arabicQuizForm.q4.value,
    arabicQuizForm.q5.value,
    arabicQuizForm.q6.value,
    arabicQuizForm.q7.value,
    arabicQuizForm.q8.value,
    arabicQuizForm.q9.value,
    arabicQuizForm.q10.value
    ]
    //check answers
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswersArabic[index]) {
            score += 10;
        }
    });
    // show result
    scrollTo(0, 0)
    result.classList.remove('d-none')

    let output = 0;
    const timer = setInterval(() => {
        result.querySelector('span').textContent = ` ${output}%`
        if (output === score) {
            clearInterval(timer)
        }
        else {
            output++
        }
    }, 30)

});

//submit english quiz
englishQuizSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let score = 0;
    const userAnswers = [englishQuizForm.qe1.value,
        englishQuizForm.qe2.value,
        englishQuizForm.qe3.value,
        englishQuizForm.qe4.value,
        englishQuizForm.qe5.value,
        englishQuizForm.qe6.value,
        englishQuizForm.qe7.value,
        englishQuizForm.qe8.value,
        englishQuizForm.qe9.value,
        englishQuizForm.qe10.value
    ]
    //check answers
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswersEnglish[index]) {
            score += 10;
        }
    });
    // show result
    scrollTo(0, 0)
    result.classList.remove('d-none')

    let output = 0;
    const timer = setInterval(() => {
        result.querySelector('span').textContent = ` ${output}%`
        if (output === score) {
            clearInterval(timer)
        }
        else {
            output++
        }
    }, 30)

});