const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const sidebartoggler = document.getElementById("sidebar-toggler")
const toggler = document.getElementById("toggler-icon")

const updateScoresLink = document.getElementById("updatescores-link")
const addScoresForm = document.getElementById("addscores-form")
const updateScoresForm = document.getElementById("updatescores-form")
const reportScoresForm = document.getElementById("reportscores-form")
const viewStudentsLink = document.getElementById("view-students")
const sidebar = document.getElementById("bsbSidebar1")
const viewStudentsForm = document.getElementById("viewstudent-form")
const closeViewStudentBtn = document.getElementById("vstdclose-icon")
const pstdNumber = document.getElementById("student-number")

const logoutLink = document.getElementById("logout")
const admissionNumber = document.getElementById("admNumber")
const schoolSession = document.getElementById("session")
const schoolTerm = document.getElementById("term")
let studentTableBody = document.getElementById("studenttbl-body")

const addClass = document.getElementById("addclass")
const addAdmNo = document.getElementById("addadmno")
const addName = document.getElementById("addname")

const nameOfClass = document.getElementById("classname")
const nameOfProgramme = document.getElementById("progname")
const subjectOffered = document.getElementById("subject")
const otherSubjectOffered = document.getElementById("othersubject")
const subjTestScore = document.getElementById("testscore")
const subjExamScore = document.getElementById("examscore")
const subjTotalScore = document.getElementById("totalscore")
const scoreRemark = document.getElementById("remark")
const teacherComment = document.getElementById("comment")
const updateScoresButton = document.getElementById("updatescores-btn")
const closeStudentUpdateFormButton = document.getElementById("closeupdateform-btn")

const createStudentButton = document.getElementById("createstudent-btn")
const studentNameBar = document.getElementById("student-namebar")
const nameBar = document.getElementById("namebar")

const viewStudentPageNext = document.getElementById("viewstd-pagenext")
const viewStudentPagePrevious = document.getElementById("viewstd-pageprevious")
const viewStudentPageOne = document.getElementById("viewstd-page1")
const addNewSession = document.getElementById("addnewsession-link")

let studentpage = [];
let lastpage = [];
let studentNamesStore = [];
let classSubjectsReturned = [];

const token = localStorage.getItem('access_token')

//display sidebar
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
            addClass.value = response.data.teacher.teacherClass
            classnameForReportSelect.value = response.data.teacher.teacherClass
            programmeForReportSelect.value = response.data.teacher.teacherProgramme
            classnameForAttendanceSelect.value = response.data.teacher.teacherClass
            programmeForAttendanceSelect.value = response.data.teacher.teacherProgramme
            nameOfClass.setAttribute("disabled", true)
            addClass.setAttribute("disabled", true)
            classnameForReportSelect.setAttribute("disabled", true)
            programmeForReportSelect.setAttribute("disabled", true)
            classnameForAttendanceSelect.setAttribute("disabled", true)
            programmeForAttendanceSelect.setAttribute("disabled", true)

            const teacherClass = response.data.teacher.teacherClass
            const teacherProgramme = response.data.teacher.teacherProgramme
            console.log(teacherClass, teacherProgramme)
            getClassSubjects(teacherClass, teacherProgramme)

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
                if (error.response.data.message == "Error: unauthorised access! Log in to resume your tasks")
                    window.location.href =  "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
                    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
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
// get class subjects
const getClassSubjects = (teacherClass, teacherProgramme) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/class/getSubjects/?className=${teacherClass}&programme=${teacherProgramme}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            // for (let i=0; i < response.data.classExists.subjects.length;i++){
            //     classSubjectsReturned.push(response.data.classExists.subjects[i])
            // }
            classSubjectsReturned = [...response.data.classExists.subjects];
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

document.addEventListener("DOMContentLoaded", () => {
    getTeacherClass()
    displayStudentsByClass(1)
});

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
            for (let j = 0; j < response.data.students.length; j++) {
                let option = document.createElement("option")
                option.innerText = response.data.students[j].admNo
                addAdmNo.appendChild(option)
                // add student name and admission number to an array
                studentNamesStore[j] = {
                    admission_number: response.data.students[j].admNo,
                    student_name: response.data.students[j].firstName + " " + response.data.students[j].lastName
                }
            }
            for (let j = 0; j < response.data.students.length; j++) {
                let option = document.createElement("option")
                option.innerText = response.data.students[j].admNo
                admissionNumberForReport.appendChild(option)
                studentNamesStore[j] = {
                    admission_number: response.data.students[j].admNo,
                    student_name: response.data.students[j].firstName + " " + response.data.students[j].lastName
                }
            }
            addName.value = studentNamesStore[0].student_name;
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
viewStudentPageOne.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(pstdNumber.innerText)
    let plength = pstdNumber.innerText.slice(29)
    console.log(plength)
    if (plength != "Page 1") {
        studentTableBody.innerHTML = ""
        displayStudentsByClass(1)
    }
});

// open view student form
viewStudentsLink.addEventListener("click", (e) => {
    e.preventDefault();
    sidebar.style.display = "none"
    viewStudentsForm.style.display = "block"
    displayStudentsByClass(1)
});

// close view student form
closeViewStudentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    studentTableBody.innerHTML = "";
    viewStudentsForm.style.display = "none"
});

// display next students list page
viewStudentPageNext.addEventListener("click", (e) => {
    e.preventDefault();
    let maxpage = lastpage[lastpage.length - 1]
    let pageNumber = studentpage.pop()
    if (pageNumber <= maxpage) {
        viewStudentPagePrevious.classList.remove("disable")
        studentTableBody.innerHTML = ""
        // let pageNumber = studentpage.pop()
        displayStudentsByClass(pageNumber + 1)
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
        displayStudentsByClass(pageNumber - 1)
    }
});


// EDIT SCORES ********************************************************************
// ***************************************************************************

updateScoresLink.addEventListener("click", (e) => {
    e.preventDefault();
    // if (updateScoresForm.style.display = "block"){
    //     updateScoresForm.style.display = "none";
    //     sidebar.style.display = "none"
    // }
    updateScoresForm.style.display = "block";
    sidebar.style.display = "none"
});

// on change of subject selection to other, enable the other subject input field
subjectOffered.addEventListener("change", (e) => {
    e.preventDefault();
    //allow subject to be selected from list or inputted if 'other' is chosen from list of subjects
    if (subjectOffered.value == "Other") {
        otherSubjectOffered.removeAttribute("disabled")
        otherSubjectOffered.focus()
    }
    else {
        otherSubjectOffered.value = "";
        otherSubjectOffered.setAttribute("disabled", true)
    }
})

// on click of total field, check for errors in subject and scores input
subjTotalScore.addEventListener("click", (e) => {
    e.preventDefault();
    let subjectSelected = subjectOffered.value
    if (subjectSelected == "Other") subjectSelected = otherSubjectOffered.value

    if (subjectOffered.value == "select one" || (subjectOffered.value == "Other" && otherSubjectOffered.value == "")) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input!",
            text: "Input a valid subject"
        });
    }
    // if subject is not registered for the class, display error
    else if (!classSubjectsReturned.includes(subjectSelected)) {
        Swal.fire({
            icon: "error",
            title: "Sorry",
            text: `${subjectSelected} is not a valid subject for your class`
        });
    }
    else if (+subjTestScore.value > 40 || +subjExamScore.value > 60) {
        Swal.fire({
            icon: "error",
            title: "Invalid Score!",
            text: "Please check the test or exam score inputted"
        });
    } else {
        subjTotalScore.value = +subjTestScore.value + (+subjExamScore.value);
        //display appropriate remark according to the score
        if (subjTotalScore.value >= 85) {
            scoreRemark.value = "ممتاز"
        }
        else if (subjTotalScore.value >= 75 && subjTotalScore.value < 85) {
            scoreRemark.value = "جيد جيدا"
        }
        else if (subjTotalScore.value >= 65 && subjTotalScore.value < 75) {
            scoreRemark.value = "جيد"
        }
        else if (subjTotalScore.value >= 50 && subjTotalScore.value < 65) {
            scoreRemark.value = "ناجح"
        }
        else if (subjTotalScore.value >= 0 && subjTotalScore.value < 50) {
            scoreRemark.value = "راسب"
        }
    }
})


// update student comment
const updateScores = (scoreInfo, admNo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/scores/updateScores/?admNo=${admNo}`, scoreInfo,
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
            admissionNumber.value = "";
            teacherComment.value = "";
            otherSubjectOffered.value = "";
            subjTestScore.value = "";
            subjExamScore.value = "";
            subjTotalScore.value = "";
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

//click button to update scores
updateScoresButton.addEventListener("click", (e) => {
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
    if (admNo == "" || sessionName == "" || className == "" || termName == "" || subjectName == "" || testScore == "" || examScore == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please fill out all necessary fields"
        });
    }
    else {
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
        updateScores(formData, admNo);
    }
});

// click updatestudent form button 
closeStudentUpdateFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    admissionNumber.value = "";
    teacherComment.value = "";
    otherSubjectOffered.value = "";
    subjTestScore.value = "";
    subjExamScore.value = "";
    subjTotalScore.value = "";
    updateScoresForm.style.display = "none";
});



// REPORT ********************************************************************
// ***************************************************************************

const closeStudentReportFormBtn = document.getElementById("closereportform-btn")
const viewReportLink = document.getElementById("viewreport-link")
const admissionNumberForReport = document.getElementById("admNo-forreport")
const termForReport = document.getElementById("term-forreport")
const sessionForReport = document.getElementById("session-forreport")
const viewReportButton = document.getElementById("viewreport-btn")
const resultBody = document.getElementById("result-body")
const thirdTermResultBody = document.getElementById("thirdterm-resultbody")
const studentCommentReport = document.getElementById("comment-report")
const termGrandTotal = document.getElementById("grandtotal")
const termMarkObtained = document.getElementById("marksobtained")
const termAveragePercent = document.getElementById("avgpercent")
const tableReport = document.getElementById("table-report")
const thirdTermReportTable = document.getElementById("table-report-thirdterm")
const attendanceTableHeadRow = document.getElementById("stdattendance-tblheadrow")
const attendanceTableBodyRow = document.getElementById("stdattendance-tblbodyrow")

// view student scores
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
                text: "Successfully returned " + response.data.message + "'s report"
            });
            // thirdTermReportTable.style.display = "none"
            for (let i = 0; i < response.data.report.length; i++) {
                // serial_no++
                // thirdTermReportTable.style.display = "none"
                let tblrow = document.createElement("tr")
                let tblserialno = document.createElement("th")
                let tblsubject = document.createElement("td")
                let tbltestscore = document.createElement("td")
                let tblexamscore = document.createElement("td")
                let tbltotalscore = document.createElement("td")
                let tblremark = document.createElement("td")
                tblserialno.innerText = i + 1
                tblsubject.innerText = response.data.report[i].subjectName
                tbltestscore.innerText = response.data.report[i].testScore
                tblexamscore.innerText = response.data.report[i].examScore
                tbltotalscore.innerText = response.data.report[i].totalScore
                tblremark.innerText = response.data.report[i].remark
                tblrow.appendChild(tblserialno)
                tblrow.appendChild(tblsubject)
                tblrow.appendChild(tbltestscore)
                tblrow.appendChild(tblexamscore)
                tblrow.appendChild(tbltotalscore)
                tblrow.appendChild(tblremark)
                resultBody.appendChild(tblrow)
                if (response.data.termName == 'third') {
                    // tableReport.style.display = "none"
                    // thirdTermReportTable.style.display = "block"
                    let ttblrow = document.createElement("tr")
                    let tblserialno = document.createElement("th")
                    let tblsubject = document.createElement("td")
                    let tbltestscore = document.createElement("td")
                    let tblexamscore = document.createElement("td")
                    let tbltotalscore = document.createElement("td")
                    let tblfirstterm = document.createElement("td")
                    let tblsecondterm = document.createElement("td")
                    let tblcumscore = document.createElement("td")
                    let tblcumaverage = document.createElement("td")
                    let tblremark = document.createElement("td")
                    tblserialno.innerText = i + 1
                    tblsubject.innerText = response.data.report[i].subjectName
                    tbltestscore.innerText = response.data.report[i].testScore
                    tblexamscore.innerText = response.data.report[i].examScore
                    tbltotalscore.innerText = response.data.report[i].totalScore || 0
                    tblfirstterm.innerText = response.data.firstTermScore[i]
                    tblsecondterm.innerText = response.data.secondTermScore[i]
                    tblcumscore.innerText = response.data.report[i].cumulativeScore
                    tblcumaverage.innerText = response.data.report[i].cumulativeAverage.toFixed(2)
                    // add remark according to avrage score
                    if (tblcumaverage.innerText >= 85) {
                        tblremark.innerText = "ممتاز"
                    }
                    else if (tblcumaverage.innerText >= 75 && tblcumaverage.innerText < 85) {
                        tblremark.innerText = "جيد جيدا"
                    }
                    else if (tblcumaverage.innerText >= 65 && tblcumaverage.innerText < 75) {
                        tblremark.innerText = "جيد"
                    }
                    else if (tblcumaverage.innerText >= 50 && tblcumaverage.innerText < 65) {
                        tblremark.innerText = "ناجح"
                    }
                    else if (tblcumaverage.innerText >= 0 && tblcumaverage.innerText < 50) {
                        tblremark.innerText = "راسب"
                    }

                    // tblremark.innerText = response.data.result[i].remark 
                    ttblrow.appendChild(tblserialno)
                    ttblrow.appendChild(tblsubject)
                    ttblrow.appendChild(tbltestscore)
                    ttblrow.appendChild(tblexamscore)
                    ttblrow.appendChild(tbltotalscore)
                    ttblrow.appendChild(tblfirstterm)
                    ttblrow.appendChild(tblsecondterm)
                    ttblrow.appendChild(tblcumscore)
                    ttblrow.appendChild(tblcumaverage)
                    ttblrow.appendChild(tblremark)
                    thirdTermResultBody.appendChild(ttblrow)
                }

            }
            studentCommentReport.value = response.data.comment
            termGrandTotal.value = response.data.grandTotal
            termMarkObtained.value = response.data.marksObtained.toFixed(2)
            termAveragePercent.value = response.data.avgPercentage.toFixed(2)
            nameBar.innerText = `Displaying ${response.data.termName} term result for ${response.data.message}`

            for (let k = 0; k < response.data.attendance.length; k++) {
                let tblattdncdate = document.createElement("th")
                tblattdncdate.innerText = response.data.attendance[k].termdate
                attendanceTableHeadRow.appendChild(tblattdncdate)
                let tblattdncstatus = document.createElement("td")
                // tblattdncstatus.innerText = response.data.attendance[k].presence
                if (response.data.attendance[k].presence == 'yes'){
                    tblattdncstatus.innerHTML = `<i class="fa fa-check ispresenticon" id="ispresenticon"></i>`
                    }
                else {
                    tblattdncstatus.innerHTML = `<i class="fa fa-minus isabsenticon" id="isabsenticon"></i>`
                }
                attendanceTableBodyRow.appendChild(tblattdncstatus)

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

// view report
viewReportButton.addEventListener("click", (e) => {
    e.preventDefault();
    resultBody.innerHTML = "";
    thirdTermResultBody.innerHTML = "";
    attendanceTableHeadRow.innerHTML = "";
    attendanceTableBodyRow.innerHTML = "";
    termAveragePercent.value = "";
    termMarkObtained.value = "";
    nameBar.innerText = "";
    studentCommentReport.value = "";
    termGrandTotal.value = ""
    const admNo = admissionNumberForReport.value;
    const term = termForReport.value;
    const session = sessionForReport.value;

    if (admNo == "" || session == "" || term == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please fill out all required fields"
        });
    }
    else {
        if (term != 'third') {
            tableReport.style.width = "100%"
            tableReport.style.display = "block"
            thirdTermReportTable.style.display = "none"
        }
        else {
            thirdTermReportTable.style.display = "block"
            tableReport.style.display = "none"
        }

        viewScores(admNo, term, session)
    }
});
// change student name if admission number is changed
admissionNumberForReport.addEventListener("change", (e) => {
    e.preventDefault();
    resultBody.innerHTML = "";
    thirdTermResultBody.innerHTML = "";
    termAveragePercent.value = "";
    termMarkObtained.value = "";
    termGrandTotal.value = ""
    nameBar.innerText = "";
    studentCommentReport.value = "";
    for (let i = 0; i < studentNamesStore.length; i++)
        if (studentNamesStore[i].admission_number == admissionNumberForReport.value) {
            nameBar.innerText = studentNamesStore[i].student_name
        }
        attendanceTableHeadRow.innerHTML = "";
        attendanceTableBodyRow.innerHTML = "";
});
// open report form
viewReportLink.addEventListener("click", (e) => {
    e.preventDefault();
    reportScoresForm.style.display = "block";
    sidebar.style.display = "none";
    thirdTermReportTable.style.display = "none"
});
// close report form
closeStudentReportFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    reportScoresForm.style.display = "none";
});

// ******************** ADD SCORES **************************************
// **********************************************************************

const addScoresLink = document.getElementById("addscores-link")
const closeAddScoresButton = document.getElementById("closeinputform-btn")

const addTerm = document.getElementById("addterm")
const addSession = document.getElementById("addsession")
// const addSubject= document.getElementById("addsubject")
const addOtherSubject = document.getElementById("addothersubject")
const addSubjectSelect = document.getElementById("addsubjectselect")
const addSubjecttest = document.getElementById("addtest")
const addSubjectexam = document.getElementById("addexam")
const addSubjecttotal = document.getElementById("addtotal")
const addSubjectremark = document.getElementById("addremark")
const addResultBody = document.getElementById("addresultbody")
const addTermComment = document.getElementById("addcomment")
const submitScoresButton = document.getElementById("submitscores-btn")
const deleteScoresIcon = document.getElementsByClassName("delsubjecticon")
const scoresTable = document.getElementById("scorestable")


// open add scores form
addScoresLink.addEventListener("click", (e) => {
    e.preventDefault();
    sidebar.style.display = "none"
    addScoresForm.style.display = "block"
});

// close addscores form
closeAddScoresButton.addEventListener("click", (e) => {
    e.preventDefault();
    addSubjecttest.value = "";
    addSubjectexam.value = "";
    addSubjecttotal.value = "";
    addSubjectremark.value = "";
    addTermComment.value = "";
    addResultBody.innerHTML = "";
    addScoresForm.style.display = "none";
});


// on change of admission number field, show student's name
addAdmNo.addEventListener("change", (e) => {
    e.preventDefault();
    for (let i = 0; i < studentNamesStore.length; i++)
        if (studentNamesStore[i].admission_number == addAdmNo.value) {
            addName.value = studentNamesStore[i].student_name
        }
})

// on change of subject selection to other, enable the other subject input field
addSubjectSelect.addEventListener("change", (e) => {
    e.preventDefault();
    //allow subject to be selected from list or inputted if 'other' is chosen from list of subjects
    if (addSubjectSelect.value == "Other") {
        addOtherSubject.removeAttribute("disabled")
        addOtherSubject.focus()
    }
    else {
        addOtherSubject.value = "";
        addOtherSubject.setAttribute("disabled", true)
    }
    // if subject is already on the table, reject same subject addition
    if (addResultBody.childElementCount >= 1) {
        for (let count = 0; count < addResultBody.childElementCount; count++) {
            if (addResultBody.children[count].firstElementChild.nextElementSibling.innerText == addSubjectSelect.value) {
                Swal.fire({
                    icon: "error",
                    title: "Hello!",
                    text: `You already inputted ${addSubjectSelect.value} scores for this student. Use the delete icon if you wish to cancel your previous input.`
                });
            }
        }
    }
})

// add scores to result body on click of total input field
addSubjecttotal.addEventListener("click", (e) => {
    e.preventDefault();
    let subjectSelected = addSubjectSelect.value
    if (subjectSelected == "Other") subjectSelected = addOtherSubject.value
    if (addSubjectSelect.value == "select one" || (addSubjectSelect.value == "Other" && addOtherSubject.value == "")) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input!",
            text: "Input a valid subject"
        });
    }
    else if (!classSubjectsReturned.includes(subjectSelected)) {
        Swal.fire({
            icon: "error",
            title: "Sorry",
            text: `${subjectSelected} is not a valid subject for your class`
        });
    }
    else if (+addSubjecttest.value > 40 || +addSubjectexam.value > 60) {
        Swal.fire({
            icon: "error",
            title: "Invalid Score!",
            text: "Please check the test or exam score inputted"
        });
    } else {
        addSubjecttotal.value = +addSubjecttest.value + (+addSubjectexam.value);
        //display appropriate remark according to the score
        if (addSubjecttotal.value >= 85) {
            addSubjectremark.value = "ممتاز"
        }
        else if (addSubjecttotal.value >= 75 && addSubjecttotal.value < 85) {
            addSubjectremark.value = "جيد جيدا"
        }
        else if (addSubjecttotal.value >= 65 && addSubjecttotal.value < 75) {
            addSubjectremark.value = "جيد"
        }
        else if (addSubjecttotal.value >= 50 && addSubjecttotal.value < 65) {
            addSubjectremark.value = "ناجح"
        }
        else if (addSubjecttotal.value >= 0 && addSubjecttotal.value < 50) {
            addSubjectremark.value = "راسب"
        }
        let tblrow = document.createElement("tr")
        let tblcol0 = document.createElement("th")
        let tblcol1 = document.createElement("td")
        let tblcol2 = document.createElement("td")
        let tblcol3 = document.createElement("td")
        let tblcol4 = document.createElement("td")
        let tblcol5 = document.createElement("td")
        let tblcol6 = document.createElement("td")
        tblcol0.innerText = addResultBody.children.length + 1
        tblcol1.innerText = addSubjectSelect.value
        if (addOtherSubject.value != "" && addSubjectSelect.value == "Other") tblcol1.innerText = addOtherSubject.value;
        tblcol2.innerText = addSubjecttest.value
        tblcol3.innerText = addSubjectexam.value
        tblcol4.innerText = addSubjecttotal.value
        tblcol5.innerText = addSubjectremark.value
        tblcol6.innerHTML = `<i class="fa fa-trash delsubjecticon" id="delsubjecticon"></i>`
        tblrow.appendChild(tblcol0)
        tblrow.appendChild(tblcol1)
        tblrow.appendChild(tblcol2)
        tblrow.appendChild(tblcol3)
        tblrow.appendChild(tblcol4)
        tblrow.appendChild(tblcol5)
        tblrow.appendChild(tblcol6)
        tblrow.classList.add("tablerows")

        for (let count = 0; count < addResultBody.childElementCount; count++) {
            if (addResultBody.children[count].firstElementChild.nextElementSibling.innerText == tblcol1.innerText) {
                Swal.fire({
                    icon: "error",
                    title: "Hello!",
                    text: `You already inputted ${addSubjectSelect.value} scores for this student. Use the delete icon if you wish to cancel your previous input.`
                });
                addResultBody.removeChild(tblrow)
            }

        }
        addResultBody.appendChild(tblrow)

    }

})

// listen for click on the table, if delete button is clicked, remove the row and adjust the numbering
scoresTable.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("fa-trash")) {
        let trparent = e.target.parentElement.parentElement
        trparent.remove()
        // serialno =0
    }
    for (let count = 0; count < addResultBody.childElementCount; count++) {
        addResultBody.children[count].firstElementChild.innerText = count + 1
    }
})

// add student scores
const addScores = ({ ...scoreinfo }, admNo) => {
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
            addSubjecttest.value = "";
            addSubjectexam.value = "";
            addSubjecttotal.value = "";
            addSubjectremark.value = "";
            addTermComment.value = "";
            addResultBody.innerHTML = "";
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

// listen for click on the submit scores button
submitScoresButton.addEventListener("click", (e) => {
    let scores = []
    e.preventDefault();
    let admNo = addAdmNo.value;
    let sessionName = addSession.value;
    let className = addClass.value;
    let termName = addTerm.value;
    let comment = addTermComment.value;
    let subjects = [];
    let formdata = {
        sessionName,
        className,
        term: {
            termName,
            subjects,
            comment
        }
    }
    if (admNo == "" || sessionName == "" || className == "" || termName == "" || comment == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please fill out all fields"
        });
    }
    else if (addResultBody.childElementCount != classSubjectsReturned.length) {
        Swal.fire({
            icon: "error",
            title: "Something missing",
            text: "Looks like you haven't inputted all subjects' scores for this student"
        });
    }
    else {
        for (let count = 0; count < addResultBody.childElementCount; count++) {
            let subjectNameTD = addResultBody.children[count].firstElementChild.nextElementSibling;
            let subjectName = subjectNameTD.innerText;
            let testScoreTD = subjectNameTD.nextElementSibling
            let testScore = testScoreTD.innerText
            let examScoreTD = testScoreTD.nextElementSibling
            let examScore = examScoreTD.innerText
            let totalScoreTD = examScoreTD.nextElementSibling
            let totalScore = totalScoreTD.innerText
            let remarkTD = totalScoreTD.nextElementSibling
            let remark = remarkTD.innerText

            if (testScore == "" || examScore == "") {
                Swal.fire({
                    icon: "error",
                    title: "Empty input detected",
                    text: "Please fill out all fields"
                });
            }
            else {
                let subject = {
                    subjectName,
                    testScore,
                    examScore,
                    totalScore,
                    remark
                }
                subjects.push(subject)
            }
        }
        addScores(formdata, admNo);
    }
})


// ******************** CLASS REPORT **************************************
// **********************************************************************
// const classReportLink = document.getElementById("viewclassreport-link")
const reportClassScoresForm = document.getElementById("viewclassscores-form")
const closeClassReportFormBtn = document.getElementById("viewclassreport-icon")
const viewClassReportLink = document.getElementById("classreport-link")
const classnameForReportSelect = document.getElementById("classname-forclassreport")
const programmeForReportSelect = document.getElementById("programme-forclassreport")
const termForClassReport = document.getElementById("term-forclassreport")
const sessionForClassReport = document.getElementById("session-forclassreport")
const tableHeadClassReport = document.getElementById("classreport-tblhead")
const tableHeadRowClassReport = document.getElementById("classreport-tblheadrow")
const tableBodyForClassReport = document.getElementById("classreport-tblbody")
const viewClassReportButton = document.getElementById("viewclassreport-btn")



// open class report form
viewClassReportLink.addEventListener("click", (e) => {
    e.preventDefault();
    reportClassScoresForm.style.display = "block";
    sidebar.style.display = "none";
});

// close report form
closeClassReportFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tableBodyForClassReport.innerHTML = "";
    tableHeadRowClassReport.innerHTML = "";
    reportClassScoresForm.style.display = "none";
});

// display class report
const displayClassReport = (classname, programme, term, session) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/scores/viewClassScores/?className=${classname}&programme=${programme}&termName=${term}&sessionName=${session}`,
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
                // text:  response.data.message
            });

            // console.log(response.data.classSubjects)
            let tblserialnohead = document.createElement("th")
            let tbladmnohead = document.createElement("th")
            let tblnamehead = document.createElement("th")
            tblserialnohead.innerText = "Serial No"
            tbladmnohead.innerText = "Admission No"
            tblnamehead.innerText = "Name"
            tableHeadRowClassReport.appendChild(tblserialnohead)
            tableHeadRowClassReport.appendChild(tbladmnohead)
            tableHeadRowClassReport.appendChild(tblnamehead)

            let theclassSubjects = response.data.classSubjects
            for (let j = 0; j < theclassSubjects.length; j++) {
                let tblsubject = document.createElement("th")
                tblsubject.innerText = theclassSubjects[j]
                tableHeadRowClassReport.appendChild(tblsubject)
            }
            let tblmarksobtained = document.createElement("th")
            let tblavgpercentage = document.createElement("th")
            tblmarksobtained.innerText = "Mark Obtained"
            tblavgpercentage.innerText = "Average Percentage"
            tableHeadRowClassReport.appendChild(tblmarksobtained)
            tableHeadRowClassReport.appendChild(tblavgpercentage)

            for (let i = 0; i < response.data.classExists.length; i++) {
                let tblrow = document.createElement("tr")
                let tblserialno = document.createElement("th")
                let tbladmno = document.createElement("td")
                let tblname = document.createElement("td")
                tblserialno.innerText = i + 1
                tbladmno.innerText = response.data.classExists[i].admissionNumber
                tblname.innerText = response.data.classExists[i].student_name
                tblrow.appendChild(tblserialno)
                tblrow.appendChild(tbladmno)
                tblrow.appendChild(tblname)

                for (let j = 0; j < response.data.classExists[i].scores.length; j++) {
                    const requestedterm = response.data.classExists[i].scores[j].term.find(aterm => aterm.termName == term)
                    for (let k = 3; k < tableHeadRowClassReport.children.length - 2; k++) {
                        const subjectToAdd = requestedterm.subjects.find(asubject => asubject.subjectName == tableHeadRowClassReport.children[k].innerText)
                        let tbltotalscore = document.createElement("td")
                        tbltotalscore.innerText = subjectToAdd.totalScore
                        tblrow.appendChild(tbltotalscore)
                    }
                    let tblmark = document.createElement("td")
                    let tblpercentage = document.createElement("td")
                    tblmark.innerText = requestedterm.marksObtained
                    tblpercentage.innerText = requestedterm.avgPercentage.toFixed(2)
                    tblrow.appendChild(tblmark)
                    tblrow.appendChild(tblpercentage)
                }
                tableBodyForClassReport.appendChild(tblrow)
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


// display class scores on click of button
viewClassReportButton.addEventListener("click", (e) => {
    e.preventDefault();
    tableBodyForClassReport.innerHTML = "";
    tableHeadRowClassReport.innerHTML = "";
    tableBodyForAttendance.innerHTML = "";
    tableHeadRowAttendance.innerHTML = "";
    const className = classnameForReportSelect.value
    const programme = programmeForReportSelect.value
    const sessionName = sessionForClassReport.value
    const termName = termForClassReport.value

    if (programme == "select a programme" || className == "select a class") {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Check the programme or class you entered"
        });
    }
    else
        displayClassReport(className, programme, termName, sessionName)
});

// clear table body when class is changed
classnameForReportSelect.addEventListener("change", (e) => {
    e.preventDefault();
    tableBodyForClassReport.innerHTML = "";
    tableHeadRowClassReport.innerHTML = "";
});



// ******************** ATTENDANCE **************************************
// **********************************************************************
// const classReportLink = document.getElementById("viewclassreport-link")
const attendanceForm = document.getElementById("markattendance-form")
const closeAttendanceFormIcon = document.getElementById("markattendance-icon")
const viewAttendanceLink = document.getElementById("markattendance-link")
const classnameForAttendanceSelect = document.getElementById("classname-forattendance")
const programmeForAttendanceSelect = document.getElementById("programme-forattendance")
const termForAttendance = document.getElementById("term-forattendance")
const sessionForAttendance = document.getElementById("session-forattendance")
const tableAttendance = document.getElementById("table-attendance")
const tableHeadAttendance = document.getElementById("markattendance-tblhead")
const tableHeadRowAttendance = document.getElementById("markattendance-tblheadrow")
const tableBodyForAttendance = document.getElementById("markattendance-tblbody")
const markAttendanceButton = document.getElementById("markattendance-btn")
const dateInputField = document.getElementById("date-inputfield")
const datepickIcon = document.getElementById("datepick-icon")



// open class attendance form
viewAttendanceLink.addEventListener("click", (e) => {
    e.preventDefault();
    attendanceForm.style.display = "block";
    sidebar.style.display = "none";

    //clear table if already populated
    tableBodyForAttendance.innerHTML = "";
    tableHeadRowAttendance.innerHTML = "";
    tableHeadAttendance.innerHTML = "";
    //populate with fresh data
    let tblserialnohead = document.createElement("th")
    let tblnamehead = document.createElement("th")
    let tblpresent = document.createElement("th")
    tblserialnohead.innerText = "Serial No"
    tblnamehead.innerText = "Name"
    tblpresent.innerText = "Present"
    tableHeadRowAttendance.appendChild(tblserialnohead)
    tableHeadRowAttendance.appendChild(tblnamehead)
    tableHeadRowAttendance.appendChild(tblpresent)
    for (let j = 0; j < studentNamesStore.length; j++) {
        let tblrow = document.createElement("tr")
        let tblserialno = document.createElement("th")
        // let tbladmno = document.createElement("td")
        let tblname = document.createElement("td")
        let tblpresence = document.createElement("td")
        tblserialno.innerText = j + 1
        // tbladmno.innerText = response.data.classExists[i].admissionNumber
        tblname.innerText = studentNamesStore[j].student_name
        tblpresence.innerHTML = `<i class="fa fa-check ispresenticon" id="ispresenticon"></i>`
        tblrow.appendChild(tblserialno)
        // tblrow.appendChild(tbladmno)
        tblrow.appendChild(tblname)
        tblrow.appendChild(tblpresence)
        tableBodyForAttendance.appendChild(tblrow)
    }
});

// click to indicate present or absent
tableBodyForAttendance.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("fa-check")) {
        e.target.classList.remove("fa-check")
    }
    else if (e.target.firstElementChild.classList.contains("fa")){  
        // console.log(e.target)
        // e.target.classList.add("fa-check")
        e.target.innerHTML = `<i class="fa fa-check ispresenticon" id="ispresenticon"></i>`
    }

});

// close report form
closeAttendanceFormIcon.addEventListener("click", (e) => {
    e.preventDefault();
    tableBodyForAttendance.innerHTML = "";
    tableHeadRowAttendance.innerHTML = "";
    tableHeadAttendance.innerHTML = "";
    attendanceForm.style.display = "none";
});

// display class report
const markAttendance = (stdattendance, classname, programme, term, session) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/scores/markAttendance/?className=${classname}&programme=${programme}&termName=${term}&sessionName=${session}`, stdattendance,
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
                text:  response.data.message
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


// mark attendance on click of button
markAttendanceButton.addEventListener("click", (e) => {
    e.preventDefault();
    let attendance = []
    let student_name
    let termdate = dateInputField.value;
    if (termdate == "mm/dd/yyyy") {
        Swal.fire({
            icon: "error",
            title: "Invalid input detected",
            text: "Please input a valid date, be sure to pick the correct one"
        });
    }
    else {
        const classname = classnameForAttendanceSelect.value
        const programme = programmeForAttendanceSelect.value
        const term = termForAttendance.value
        const session = sessionForAttendance.value

        for (let i = 0; i < tableBodyForAttendance.childElementCount; i++) {
            let presence
            student_name = tableBodyForAttendance.children[i].children[1].innerText
            if (tableBodyForAttendance.children[i].children[2].firstElementChild.classList.contains("fa-check")) {
                presence = "yes"
            }
            else { presence = "no" }
            let stdAttendance = {
                student_name,
                termdate,
                presence
            }
            attendance.push(stdAttendance)
        }
        markAttendance(attendance, classname, programme, term, session)
    }
});



// logout
logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
});