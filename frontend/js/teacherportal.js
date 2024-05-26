const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"


const logoutLink= document.getElementById("logout")
const admissionNumber= document.getElementById("admNumber")
const schoolSession= document.getElementById("session")
const schoolTerm= document.getElementById("term")

const nameOfClass= document.getElementById("classname")
const subjectOffered= document.getElementById("subject")
const subjTestScore= document.getElementById("testscore")
const subjExamScore= document.getElementById("examscore")
const subjTotalScore= document.getElementById("totalscore")
const scoreRemark= document.getElementById("remark")
const teacherComment= document.getElementById("comment")

const addScoresButton= document.getElementById("addscores-btn")
const addCommentButton= document.getElementById("addcomment-btn")
const createStudentButton= document.getElementById("createstudent-btn")
const studentNameBar= document.getElementById("student-namebar")
const nameBar= document.getElementById("namebar")

const token = localStorage.getItem('access_token')


// add student comment
const addComment = (commentInfo, admNo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/scores/addComment/?admNo=${admNo}`, commentInfo,
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                errorMsg = error.response.data.message
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                errorMsg = "Network Error"
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                errorMsg = error.message
            }
            Swal.fire({
                icon: "error",
                title: "Error Processing Input",
                text: errorMsg
            });
        });
};


addCommentButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    let comment = teacherComment.value;
    let admNo = admissionNumber.value;
    let sessionName = schoolSession.value;
    let className = nameOfClass.value;
    let termName = schoolTerm.value;

    const formData ={
       comment,
       sessionName,
       className,
       termName
    }
    addComment(formData, admNo);
});


// create student scores
const addScores = (scoreinfo, admNo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/scores/addScores/?admNo=${admNo}`, scoreinfo,
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
            subjTestScore.value ="";
            subjExamScore.value="";
            subjTotalScore.value="";
            studentNameBar.style.display = "block";
            nameBar.innerText = `Inputting scores for ${response.data.alreadyHasScores.student_name}`
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                errorMsg = error.response.data.message
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                errorMsg = "Network Error"
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                errorMsg = error.message
            }
            Swal.fire({
                icon: "error",
                title: "Error Processing Input",
                text: errorMsg
            });
        });
};

addScoresButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    let admNo = admissionNumber.value;
    let sessionName = schoolSession.value;
    let className = nameOfClass.value;
    let termName = schoolTerm.value;

    let subjectName = subjectOffered.value;
    let testScore = subjTestScore.value;
    let examScore = subjExamScore.value;
    let totalScore = subjTotalScore.value;
    let remark = scoreRemark.value;
    let comment = teacherComment.value;

    const formData = {
        sessionName,
        className,
        term: {
        termName, 
        subjects: {
        subjectName,
        testScore,
        examScore,
        totalScore,
        remark,
        },
        comment,
        },   
    }
    addScores(formData, admNo);
});


subjTotalScore.addEventListener("focus", (e) => {
           e.preventDefault();
           if (subjExamScore.value.length >= 1)
        subjTotalScore.value = +subjTestScore.value + (+subjExamScore.value);
    })



logoutLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/index.html"
});

