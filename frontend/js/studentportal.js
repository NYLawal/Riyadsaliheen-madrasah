const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const sidebartoggler = document.getElementById("sidebar-toggler")
const toggler = document.getElementById("toggler-icon")
const sidebar = document.getElementById("bsbSidebar1")

const reportScoresForm = document.getElementById("reportscores-form")
const closeStudentReportFormBtn = document.getElementById("closereportform-btn")
const viewReportLink = document.getElementById("resultcheck")
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

const token = localStorage.getItem('access_token')

//display sidebar
toggler.addEventListener("click", (e) => {
    sidebar.style.display = "block"
});

// TAKE ASSESSMENT ********************************************************************
// ***************************************************************************
const studentAssessmentLink = document.getElementById("studentassessment-link")
const monthlyQuizLink = document.getElementById("monthlyquiz-link")
const getQuizForm = document.getElementById("getquiz-form");
const studentAssessmentForm = document.getElementById("studentassessment-form")
const submitDetailsForAssessmentBtn = document.getElementById("assessment-btn")
const cancelAssessmentBtn = document.getElementById("cancelassessment-btn")
const closeAssessmentBtn = document.getElementById("closeassessment-btn")
const takeAssessmentStdProgramme = document.getElementById("takeassessment-studentprogramme")
const takeAssessmentStdClass = document.getElementById("takeassessment-studentclass")
const getAssessmentLinkText = document.getElementById("assessmentlink-text")
const tableOfLessons = document.getElementById("tableOfLessons")
const tableOfLessonsBody = document.getElementById("tableofLessonsBody")
const tableOfLessonsHeading = document.getElementById("tableOfLessonsHead")

const closeQuizFormButton = document.getElementById("closequizform-btn");
const clearQuizFormButton = document.getElementById("clearquizform-btn");
const quizLink = document.getElementById("quizlink");


// display check assessment form
studentAssessmentLink.addEventListener("click", (e) => {
    e.preventDefault();
    studentAssessmentForm.style.display = "block"
    getAssessmentLinkText.style.display = "none";
    sidebar.style.display = "none";
});

// close assessmnent form
closeAssessmentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    takeAssessmentStdClass.value = "select your class"
    takeAssessmentStdProgramme.value = "select your programme"
    studentAssessmentForm.style.display = "none";
    getAssessmentLinkText.style.display = "none";
    tableOfLessonsHeading.innerHTML = "";
    tableOfLessonsBody.innerHTML = "";
});

// reload view assessmnent form
cancelAssessmentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const stdClass = takeAssessmentStdClass.value;
    const programme = takeAssessmentStdProgramme.value;
    getAssessmentLink(stdClass, programme)
});

// submit request to get assessment
submitDetailsForAssessmentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const stdClass = takeAssessmentStdClass.value;
    const programme = takeAssessmentStdProgramme.value;
    if (stdClass == "select class" || programme == "select programme") {
        Swal.fire({
            icon: "error",
            title: "Inavlid Input Detected",
            text: "Check the class or programme you selected"
        });
    }
    else
        getAssessmentLink(stdClass, programme);
});

// get assessment link
const getAssessmentLink = (className, programme) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/assessment/getLink/?className=${className}&programme=${programme}`,
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
            tableOfLessonsHeading.innerHTML = "";
            tableOfLessonsBody.innerHTML = "";
            submitDetailsForAssessmentBtn.style.display = "none";
            getAssessmentLinkText.style.display = "block";
            const tblhead1 = document.createElement("th")
            const tblhead2 = document.createElement("th")
            const tblhead3 = document.createElement("th")
            tblhead1.innerText = "Subject"
            tblhead2.innerText = "lesson Link"
            tblhead3.innerText = "Assessment Link"
            tableOfLessonsHeading.appendChild(tblhead1)
            tableOfLessonsHeading.appendChild(tblhead2)
            tableOfLessonsHeading.appendChild(tblhead3)
            for (let count = 0; count < response.data.lessons.length; count++) {
                const tblrow = document.createElement("tr")
                const tblcol1 = document.createElement("td")
                const tblcol2 = document.createElement("td")
                const tblcol3 = document.createElement("td")
                tblcol1.innerText = response.data.lessons[count].subjectName
                tblcol2.innerText = response.data.lessons[count].lessonLink
                tblcol3.innerText = response.data.lessons[count].assessmentLink
                tblrow.appendChild(tblcol1)
                tblrow.appendChild(tblcol2)
                tblrow.appendChild(tblcol3)
                tableOfLessonsBody.appendChild(tblrow)
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

// close quiz form
closeQuizFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    getQuizForm.style.display = "none";
    quizLink.value = ""
});

// clear quiz form
clearQuizFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    quizLink.value = ""
});

// monthly quiz form
monthlyQuizLink.addEventListener("click", (e) => {
    e.preventDefault();
    getQuizForm.style.display = "block"
    sidebar.style.display = "none";
    getQuiz()
});


// get quiz
const getQuiz = () => {
    let errorMsg;
    axios
        .get(`${baseUrl}/assessment/getQuiz/`,
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
            quizLink.value = response.data.quizPresent.quizlink
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


// REPORT CARD ********************************************************************
// ***************************************************************************
const resultSheet = document.getElementById("resultsheet")
const stdResultSheetForm = document.getElementById("studentresult-form")
const resultSheetAdmNo = document.getElementById("resultsheet-admNumber")
const resultSheetTerm = document.getElementById("resultsheet-term")
const resultSheetSession = document.getElementById("resultsheet-session")
const generateResultBtn = document.getElementById("genresult-btn")
const firstSecondTermTbl = document.getElementById("firstsecondterm-table")
const thirdTermTbl = document.getElementById("thirdterm-table")
const dwnresultBody = document.getElementById("result-bodydwn")
const thirddwnresultBody = document.getElementById("thirdterm-resultbodydwn")
const downloadbtn = document.getElementById("dwnbtn")
// const PDFdownloadbtn = document.getElementById("pdfdownload-btn")
const closeResultSheetBtn = document.getElementById("closeresultsheet-btn")
const myform = document.getElementById("student-reportcard")
const tableReportdwn = document.getElementById("table-reportdwn")
const thirdTermReportTabledwn = document.getElementById("table-report-thirdtermdwn")
const arabicDetail = document.getElementsByClassName("arabic-detail")
const detailRightArabic = document.getElementsByClassName("detail-right")


const reportCardName = document.getElementById("detail-name")
const reportCardPercentage = document.getElementById("detail-avgpercent")
const reportCardClass = document.getElementById("detail-class")
const reportCardSession = document.getElementById("detail-session")
const reportCardTerm = document.getElementById("detail-term")
const reportCardPresent = document.getElementById("detail-present")
const reportCardAbsent = document.getElementById("detail-absent")
const reportCardMaxAttendance = document.getElementById("detail-maxattendance")
const reportCardClassNumber = document.getElementById("detail-classnumber")
const reportCardTeacherComment = document.getElementById("detail-tcomment")
const reportCardAmeedComment = document.getElementById("detail-ameedcomment")
const reportCardTeacherSignature = document.getElementById("detail-tsignature")
const reportCardPrincipalSignature = document.getElementById("detail-principalsign")
const reportCardProprietorSignature = document.getElementById("detail-proprietorsign")
const reportCardNextTermBegins = document.getElementById("detail-nexttermdate")

// open result sheet
resultSheet.addEventListener("click", (e) => {
    e.preventDefault();
    stdResultSheetForm.style.display = "block";
    sidebar.style.display = "none";
    firstSecondTermTbl.style.display = "none";
    thirdTermTbl.style.display = "none";
});

// close result sheet
closeResultSheetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    stdResultSheetForm.style.display = "none";
    resultSheetAdmNo.value = "";
});

// submit details to populate result sheet
generateResultBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let admNo = resultSheetAdmNo.value;
    let termName = resultSheetTerm.value;
    let sessionName = resultSheetSession.value;
    dwnresultBody.innerHTML = "";
    thirddwnresultBody.innerHTML = "";


    if (termName == "first" || termName == "second") {
        thirdTermTbl.style.display = "none";
        firstSecondTermTbl.style.display = "block";
    }
    else if (termName == "third") {
        firstSecondTermTbl.style.display = "none";
        thirdTermTbl.style.display = "block";
    }
    if (admNo == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please fill out the admission number field"
        });
    }
    else {
        downloadScores(admNo, termName, sessionName)
    }
});


// take screesnshot of form and download as image
downloadbtn.addEventListener("click", (e) => {
    e.preventDefault();
    // downloadPDF()
    html2canvas(myform, { logging: true, letterRendering: 1, allowTaint: true, useCORS: true }).then(function (canvas) {
        var anchorTag = document.createElement("a");
        document.body.appendChild(anchorTag);
        //  document.getElementById("previewImg").appendChild(canvas);
        anchorTag.download = "resultsheet.jpg";
        anchorTag.href = canvas.toDataURL();
        anchorTag.target = '_blank';
        anchorTag.click();
    });
});


// download form pdf
// PDFdownloadbtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     for (i = 0; i < detailRightArabic.length; i++) {
//         detailRightArabic[i].style.display = "none"
//     }
//     for (j = 0; j < arabicDetail.length; j++) {
//         arabicDetail[j].style.display = "none"
//     }
//     window.jsPDF = window.jspdf.jsPDF;
//     var docPDF = new jsPDF();

//     function downloadPDF() {
//         let pdfform = document.querySelector("#student-reportcard");
//         docPDF.html(pdfform, {
//             callback: function (docPDF) {
//                 docPDF.save('result.pdf');
//             },
//             x: 15,
//             y: 15,
//             width: 170,
//             windowWidth: 650
//         });
//     }
//     downloadPDF()
   
// });

// view student result
const downloadScores = (admNo, term, session) => {
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
                text: "Scores returned for " + response.data.message
            });
            // fill in details of student/class on the form
            reportCardName.innerText = response.data.message
            reportCardPercentage.innerText = response.data.avgPercentage.toFixed(2) + "%"
            reportCardClass.innerText = response.data.className
            reportCardSession.innerText = response.data.sessionName
            reportCardTerm.innerText = response.data.termName
            reportCardClassNumber.innerText = response.data.noInClass
            reportCardMaxAttendance.innerText = response.data.maxAttendance
            reportCardTeacherComment.innerText = response.data.comment
            reportCardAmeedComment.innerText = response.data.ameedComment
            reportCardNextTermBegins.innerText = response.data.nextTermDate
            reportCardTeacherSignature.innerHTML = `<img crossorigin="anonymous" src= ${response.data.teacherSignature} alt="teacher signature" width="60">`
            reportCardPrincipalSignature.innerHTML = `<img crossorigin="anonymous" src= ${response.data.principalSign} alt="teacher signature" width="60">`
            reportCardProprietorSignature.innerHTML = `<img crossorigin="anonymous" src= ${response.data.proprietorSign} alt="teacher signature" width="60">`
            function calculateAttendance() {
                let maxAttendance = response.data.maxAttendance;
                let timesPresent = 0;
                let timesAbsent = 0;
                for (let i = 0; i < response.data.attendance.length; i++) {
                    if (response.data.attendance[i].presence == 'yes') {
                        timesPresent = timesPresent + 1
                    }
                } reportCardMaxAttendance.innerText = maxAttendance
                reportCardAbsent.innerText = maxAttendance - timesPresent
                reportCardPresent.innerText = timesPresent
            }
            calculateAttendance()

            // append student scores to report sheet
            for (let i = 0; i < response.data.report.length; i++) {
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
                dwnresultBody.appendChild(tblrow)
                if (response.data.termName == 'third') {
                    // firstSecondTermTbl.style.display = "none";
                    // thirdTermTbl.style.display = "block";
                    let ttblrow = document.createElement("tr")
                    let tblserialno = document.createElement("th")
                    let tblsubject = document.createElement("td")
                    let tbltestscore = document.createElement("td")
                    let tblexamscore = document.createElement("td")
                    let tbltotalscore = document.createElement("td")
                    let tblsecondterm = document.createElement("td")
                    let tblfirstterm = document.createElement("td")
                    let tblcumscore = document.createElement("td")
                    let tblcumaverage = document.createElement("td")
                    let tblremark = document.createElement("td")
                    tblserialno.innerText = i + 1
                    tblsubject.innerText = response.data.report[i].subjectName
                    tbltestscore.innerText = response.data.report[i].testScore
                    tblexamscore.innerText = response.data.report[i].examScore
                    tbltotalscore.innerText = response.data.report[i].totalScore || 0
                    tblsecondterm.innerText = response.data.secondTermScore[i]
                    tblfirstterm.innerText = response.data.firstTermScore[i]
                    tblcumscore.innerText = response.data.report[i].cumulativeScore
                    tblcumaverage.innerText = response.data.report[i].cumulativeAverage.toFixed(2)
                    // add remark according to avrage score
                    if (tblcumaverage.innerText >= 85) {
                        tblremark.innerText = "ممتاز"
                    }
                    else if (tblcumaverage.innerText >= 75 && tblcumaverage.innerText < 85) {
                        tblremark.innerText = "جيد جدا"
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
                    ttblrow.appendChild(tblsecondterm)
                    ttblrow.appendChild(tblfirstterm)
                    ttblrow.appendChild(tblcumscore)
                    ttblrow.appendChild(tblcumaverage)
                    ttblrow.appendChild(tblremark)
                    thirddwnresultBody.appendChild(ttblrow)
                }
            }
            let tblrowtotal = document.createElement("tr")
            let tblrowmark = document.createElement("tr")
            let tblcoltotalhead = document.createElement("th")
            let tblcolmarkhead = document.createElement("th")
            let tblcoltotal = document.createElement("td")
            let tblcolmark = document.createElement("td")
            tblcoltotalhead.innerText = "GrandTotal"
            tblcolmarkhead.innerText = "Marks Obtained"
            tblcoltotal.innerText = response.data.grandTotal
            tblcolmark.innerText = response.data.marksObtained.toFixed(2)
            tblcoltotalhead.colSpan = 4
            tblcolmarkhead.colSpan = 4
            tblcoltotal.colSpan = 2
            tblcolmark.colSpan = 2
            tblrowtotal.appendChild(tblcoltotalhead)
            tblrowtotal.appendChild(tblcoltotal)
            tblrowmark.appendChild(tblcolmarkhead)
            tblrowmark.appendChild(tblcolmark)
            if (response.data.termName == 'third') {
                tblcoltotalhead.colSpan = 8
                tblcolmarkhead.colSpan = 8

                thirddwnresultBody.appendChild(tblrowtotal)
                thirddwnresultBody.appendChild(tblrowmark)
            }
            else if (response.data.termName == 'first' || response.data.termName == 'second') {
                dwnresultBody.appendChild(tblrowtotal)
                dwnresultBody.appendChild(tblrowmark)
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






// LOGOUT ********************************************************************
// ***************************************************************************

const logoutLink= document.getElementById("logout")
logoutLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/index.html"
});

