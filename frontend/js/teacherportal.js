const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const sidebartoggler = document.getElementById("sidebar-toggler")
const toggler = document.getElementById("toggler-icon")

const addScoresForm = document.getElementById("addscores-form")
const reportScoresForm = document.getElementById("reportscores-form")
const viewStudentsLink = document.getElementById("view-students")
const sidebar = document.getElementById("bsbSidebar1")
const viewStudentsForm = document.getElementById("viewstudent-form")
const closeViewStudentBtn = document.getElementById("vstdclose-icon")
const pstdNumber = document.getElementById("student-number")

const logoutLink= document.getElementById("logout")
const admissionNumber= document.getElementById("admNumber")
const schoolSession= document.getElementById("session")
const schoolTerm= document.getElementById("term")
let studentTableBody = document.getElementById("studenttbl-body")

const nameOfClass= document.getElementById("classname")
const nameOfProgramme= document.getElementById("progname")
const subjectOffered= document.getElementById("subject")
const otherSubjectOffered= document.getElementById("othersubject")
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


const viewStudentPageNext = document.getElementById("viewstd-pagenext")
const viewStudentPagePrevious = document.getElementById("viewstd-pageprevious")
let studentpage = [];
let lastpage = [];

const token = localStorage.getItem('access_token')

//displat sidebar
toggler.addEventListener("click", (e) => {
    sidebar.style.display = "block"
});

// get teacher's class
const getTeacherClass = () => {
    let errorMsg;
    axios
        .get(`${baseUrl}/staff/getClass`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            nameOfClass.value = response.data.teacher.teacherClass
            nameOfClass.setAttribute("disabled",true)
            // nameOfProgramme.value = response.data.teacher.teacherProgramme
            return
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
            sidebartoggler.style.display = "none";
            addScoresForm.style.display = "none";
            reportScoresForm.style.display = "none";
            // nameOfClass.setAttribute("disabled",true)
        });
};

document.addEventListener("DOMContentLoaded", () => {
    getTeacherClass()
  });

//   nameOfClass.addEventListener("click", (e) => {
//     e.preventDefault();
//     getTeacherClass()
// });

// display all students
const displayStudentsByClass = (page) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/student/byClass/${page}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            pstdNumber.innerText = `${response.data.noOfStudents} registered students found.  Page ${response.data.page}`
            for (let i = 0; i < response.data.studentsperpage.length; i++) {
                // serial_no++;
                let tblrow = document.createElement("tr")
                let tblcol0 = document.createElement("td")
                let tblcol1 = document.createElement("td")
                let tblcol2 = document.createElement("td")
                let tblcol3 = document.createElement("td")
                let tblcol4 = document.createElement("td")
                let tblcol5 = document.createElement("td")
                let tblcol6 = document.createElement("td")
                let tblcol7 = document.createElement("td")
                let tblcol8 = document.createElement("td")
                let tblcol9 = document.createElement("td")
                let tblcol10 = document.createElement("td")
                let tblcol11 = document.createElement("td")
                // let tblcol12 = document.createElement("td")
                // let tblcol13 = document.createElement("td")
                // let tblcol14 = document.createElement("td")
                tblcol0.innerText = response.data.studentsperpage[i].serialNo
                tblcol1.innerText = response.data.studentsperpage[i].admNo
                tblcol2.innerText = response.data.studentsperpage[i].firstName
                tblcol3.innerText = response.data.studentsperpage[i].lastName
                tblcol4.innerText = response.data.studentsperpage[i].gender
                tblcol5.innerText = response.data.studentsperpage[i].entryClass
                tblcol6.innerText = response.data.studentsperpage[i].address
                tblcol7.innerText = response.data.studentsperpage[i].phoneNumber
                tblcol8.innerText = response.data.studentsperpage[i].email
                tblcol9.innerText = response.data.studentsperpage[i].parentEmail
                tblcol10.innerText = response.data.studentsperpage[i].stateOfOrigin
                tblcol11.innerText = response.data.studentsperpage[i].maritalStatus
                // tblcol12.innerText = response.data.studentsperpage[i].programme
                // tblcol13.innerText = response.data.studentsperpage[i].presentClass
                // tblcol14.innerText = response.data.studentsperpage[i].dateOfRegistration
                tblrow.appendChild(tblcol0)
                tblrow.appendChild(tblcol1)
                tblrow.appendChild(tblcol2)
                tblrow.appendChild(tblcol3)
                tblrow.appendChild(tblcol4)
                tblrow.appendChild(tblcol5)
                tblrow.appendChild(tblcol6)
                tblrow.appendChild(tblcol7)
                tblrow.appendChild(tblcol8)
                tblrow.appendChild(tblcol9)
                tblrow.appendChild(tblcol10)
                tblrow.appendChild(tblcol11)
                // tblrow.appendChild(tblcol12)
                // tblrow.appendChild(tblcol13)
                // tblrow.appendChild(tblcol14)
                studentTableBody.appendChild(tblrow)
            }
            console.log("response says page is ", response.data.page)
            studentpage.push(response.data.page)
            lastpage.push(response.data.pgnum)

            // disable next button if end of page is reached
            if (response.data.pgnum === response.data.page) {
                viewStudentPageNext.classList.add("disable")
            }
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

// display view students form
viewStudentsLink.addEventListener("click", (e) => {
    e.preventDefault();
    viewStudentsForm.style.display = "block"
    sidebar.style.display = "none"
    // viewStudentPage1.style.backgroundColor = "green"
    page = displayStudentsByClass(1)
});

// close view student form
closeViewStudentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    studentTableBody.innerHTML = "";
    viewStudentsForm.style.display = "none"
});


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
            teacherComment.value ="";
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

// click add comment button 
addCommentButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    let admNo = admissionNumber.value;
    let comment = teacherComment.value;
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


// add student scores
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
            // studentNameBar.style.display = "block";
            // nameBar.innerText = `Inputting scores for ${response.data.alreadyHasScores.student_name}`
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

//click button to add scores
addScoresButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    let admNo = admissionNumber.value;
    let sessionName = schoolSession.value;
    let className = nameOfClass.value;
    let termName = schoolTerm.value;

    let subjectName = subjectOffered.value;
    if (otherSubjectOffered.value != "") subjectName = otherSubjectOffered.value;
    let testScore = subjTestScore.value;
    let examScore = subjExamScore.value;
    let totalScore = subjTotalScore.value;
    let remark = scoreRemark.value;
    let comment = teacherComment.value;
    if (admNo == "" || sessionName =="" || className =="" || termName =="" || subjectName =="" || testScore =="" || examScore==""){
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please fill out all fields"
        });
    }
    else{
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
}
});

// add exam and test scores
subjTotalScore.addEventListener("focus", (e) => {
           e.preventDefault();
           if (subjExamScore.value.length >= 1)
        subjTotalScore.value = +subjTestScore.value + (+subjExamScore.value);
    })

    // display next students list page
viewStudentPageNext.addEventListener("click", (e) => {
    e.preventDefault();
    let maxpage = lastpage[lastpage.length - 1]
    let pageNumber = studentpage.pop()
    if (pageNumber <= maxpage) {
        viewStudentPagePrevious.classList.remove("disable")
        studentTableBody.innerHTML = ""
        // let pageNumber = studentpage.pop()
         displayStudentsByClass(pageNumber+1)
    }
    else {
        lastpage.push(maxpage)
        Swal.fire({
            icon: "error",
            title: "End of File Reached",
            text: "The page requested does not exist"
        });
    }
   
});

// display previous students list page
viewStudentPagePrevious.addEventListener("click", (e) => {
    e.preventDefault();
    viewStudentPageNext.classList.remove("disable")
    // console.log(studentpage)
    let pageNumber = studentpage.pop()
    // console.log("page is ", pageNumber)
    if (pageNumber == 1) {
        // studentpage.push(1)
        viewStudentPagePrevious.classList.add("disable")
        Swal.fire({
            icon: "error",
            title: "Beginning of File Reached",
            text: "The page requested does not exist"
        });
    }
    else {
        studentTableBody.innerHTML = "";
        displayStudentsByClass(pageNumber-1)
    }
});

// logout
logoutLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
});

// REPORT ********************************************************************
// ***************************************************************************

const admissionNumberForReport = document.getElementById("admNo-forreport")
const termForReport = document.getElementById("term-forreport")
const sessionForReport = document.getElementById("session-forreport")
const viewReportButton = document.getElementById("viewreport-btn")
const resultBody= document.getElementById("result-body")
const studentCommentReport= document.getElementById("comment-report")

// add student scores
const viewScores = (admNo, term, session) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/scores/viewScores/?admNo=${admNo}&termName=${term}&sessionName=${session}`,
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
            for (let i = 0; i < response.data.result.length; i++) {
                // serial_no++
                let tblrow = document.createElement("tr") 
                let tblserialno = document.createElement("th") 
                let tblsubject = document.createElement("td") 
                let tbltestscore = document.createElement("td") 
                let tblexamscore = document.createElement("td") 
                let tbltotalscore = document.createElement("td") 
                let tblremark = document.createElement("td") 
                tblserialno.innerText = i+1
                tblsubject.innerText = response.data.result[i].subjectName
                tbltestscore.innerText = response.data.result[i].testScore
                tblexamscore.innerText = response.data.result[i].examScore
                tbltotalscore.innerText = response.data.result[i].totalScore
                tblremark.innerText = response.data.result[i].remark
                tblrow.appendChild(tblserialno)
                tblrow.appendChild(tblsubject)
                tblrow.appendChild(tbltestscore)
                tblrow.appendChild(tblexamscore)
                tblrow.appendChild(tbltotalscore)
                tblrow.appendChild(tblremark)
                resultBody.appendChild(tblrow)
            }
            studentCommentReport.value = response.data.comment
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


// view report
viewReportButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    resultBody.innerHTML="";
   const admNo = admissionNumberForReport.value;
   const term = termForReport.value;
   const session = sessionForReport.value;

   if (admNo == "" || session =="" || term ==""){
    Swal.fire({
        icon: "error",
        title: "Empty input detected",
        text: "Please fill out all required fields"
    });
}
else
   viewScores(admNo, term, session)

});


