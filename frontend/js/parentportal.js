const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

// const checkresultLink = document.getElementById("resultcheck")
// const viewReportLink = document.getElementById("reportview")
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
const logoutLink = document.getElementById("logout")

//display sidebar
toggler.addEventListener("click", (e) => {
    sidebar.style.display = "block"
});

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
                text: "Scores returned for " + response.data.message
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
            // nameBar.innerText = `Displaying ${response.data.termName} term result for ${response.data.message}`

            for (let k = 0; k < response.data.attendance.length; k++) {
                let tblattdncdate = document.createElement("th")
                tblattdncdate.innerText = response.data.attendance[k].termdate
                attendanceTableHeadRow.appendChild(tblattdncdate)
                let tblattdncstatus = document.createElement("td")
                // tblattdncstatus.innerText = response.data.attendance[k].presence
                if (response.data.attendance[k].presence == 'yes') {
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
    // nameBar.innerText = "";
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
    attendanceTableHeadRow.innerHTML = "";
    attendanceTableBodyRow.innerHTML = "";
    termAveragePercent.value = "";
    termMarkObtained.value = "";
    termGrandTotal.value = ""
    // nameBar.innerText = "";
    studentCommentReport.value = "";
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


// PERFORMANCE REPORT ********************************************************************
// ***************************************************************************
const progressReportLink = document.getElementById("progressreport")
const performanceReportChart = document.getElementById("performance-report")
const performanceReportCloseBtn = document.getElementById("performancereportclose-icon")
const viewSelectForVisualReport = document.getElementById("viewselect-forvisualreport")
const admNoForVisualReport = document.getElementById("admNo-forvisualreport")
const sessionSelectForVisualReport = document.getElementById("sessionselect-forvisualreport")
const termSelectForVisualReport = document.getElementById("termselect-forvisualreport")
const performanceBarChart = document.getElementById("bsb-chart-4")
const performanceBarChartTermly = document.getElementById("bsb-chart-5")
const viewChartReportButton = document.getElementById("viewprogressreport-btn")


progressReportLink.addEventListener("click", (e) => {
    e.preventDefault()
    performanceReportChart.style.display = "block";
    sidebar.style.display = "none";
})

performanceReportCloseBtn.addEventListener("click", (e) => {
    e.preventDefault()
    // performanceBarChart.innerHTML = "";   
    performanceReportChart.style.display = "none";
})

viewSelectForVisualReport.addEventListener("change", (e) => {
    e.preventDefault()
    if (viewSelectForVisualReport.value == "session") {
        sessionSelectForVisualReport.style.display = "none";
        termSelectForVisualReport.style.display = "none";
    }
    else if (viewSelectForVisualReport.value == "term") {
        sessionSelectForVisualReport.style.display = "block";
        termSelectForVisualReport.style.display = "none";
    }
    else if (viewSelectForVisualReport.value == "subject") {
        sessionSelectForVisualReport.style.display = "block";
        termSelectForVisualReport.style.display = "block";
    }
})


// view student scores by subject
const visualReportScores = (admNo, term, session) => {
    let errorMsg;
    let subjectView;
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
            let xValues = [];
            let yValues = [];
            subjectView = [...response.data.report]
            
            for (let i = 0; i < subjectView.length; i++) {
                xValues.push(subjectView[i].subjectName)
                yValues.push(subjectView[i].totalScore)
            }
            let barColors = "#5ec52e";
            new Chart("progressChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        barThickness:36,
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: `${term} Term  ${session} Report for ${response.data.message}`
                    },
                    scales: {
                        yValues: {
                          beginAtZero: true
                        },
                    },
                }
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

viewChartReportButton.addEventListener("click", (e) => {
    e.preventDefault()
    if (viewSelectForVisualReport.value == "select view"){
        Swal.fire({
            icon: "error",
            title: "Invalid input detected",
            text: "You have not selected any view"
        });
    }
    if (viewSelectForVisualReport.value == "subject"){
        performanceBarChartTermly.style.display = "none";
        performanceBarChart.style.display = "block";
        let admNo = admNoForVisualReport.value;
        let term = termSelectForVisualReport.value;
        let session = sessionSelectForVisualReport.value;
        if (admNo == "" || session == "select session" || term == "select term"){
            Swal.fire({
                icon: "error",
                title: "Invalid input detected",
                text: "Please fill out the correct details for each field"
            });
        }
        else
        visualReportScores(admNo, term, session)
    }  
    else if (viewSelectForVisualReport.value == "term"){
        performanceBarChart.style.display = "none";
        performanceBarChartTermly.style.display = "block";
        let admNo = admNoForVisualReport.value;
        let session = sessionSelectForVisualReport.value;
        if (admNo == "" || session == "select session"){
            Swal.fire({
                icon: "error",
                title: "Invalid input detected",
                text: "Please fill out the correct details for each field"
            });
        }
        else
        visualReportByTerm(admNo, session)
    }  
    else if (viewSelectForVisualReport.value == "session"){
        performanceBarChart.style.display = "none";
        performanceBarChartTermly.style.display = "block";
        let admNo = admNoForVisualReport.value;
        if (admNo == ""){
            Swal.fire({
                icon: "error",
                title: "Invalid input detected",
                text: "Please fill out your ward's admission number"
            });
        }
        else
        visualReportBySession(admNo)
    }  
    
})

// view student scores by term
const visualReportBySession = (admNo) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/scores/viewScoresbySession/?admNo=${admNo}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        .then(function (response) {
            console.log(response)
            let xValues = [];
            let yValues = [];
            for (let j = 0; j < response.data.result.length; j++) {
               let finalTerm = response.data.result[j].term.find(aterm => aterm.termName == "third")
                yValues.push(finalTerm.avgPercentage.toFixed(2))
                xValues.push(response.data.result[j].sessionName)
            }
            
            let barColors = "#5ec52e";
            new Chart("progressChartTermly", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        barThickness:44,
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: { display: false },
                    scales: {
                        y: {
                          beginAtZero: true
                        },
                    },
                    title: {
                        display: true,
                        text: `Report by Session for ${response.data.message}`
                    }
                }
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
// view student scores by term
const visualReportByTerm = (admNo, session) => {
    let errorMsg;
    let subjectView;
    axios
        .get(`${baseUrl}/scores/viewTermlyScores/?admNo=${admNo}&sessionName=${session}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        .then(function (response) {
            console.log(response)
            let xValues = [];
            let yValues = [];
            subjectView = [...response.data.report]
            
            for (let i = 0; i < subjectView.length; i++) {
                xValues.push(subjectView[i].termName)
                yValues.push(subjectView[i].avgPercentage.toFixed(2))
            }
            let barColors = "#5ec52e";
            new Chart("progressChartTermly", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        barThickness:44,
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: { display: false },
                    scales: {
                        y: {
                          beginAtZero: true
                        },
                    },
                    title: {
                        display: true,
                        text: `${session} session Report for ${response.data.message}`
                    }
                }
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


// LOGOUT ********************************************************************
// ***************************************************************************

logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
});





