
const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const sidebar = document.getElementById("bsbSidebar1")
const toggler = document.getElementById("toggler-icon")
// const addNewSession = document.getElementById("addnewsession-link")

const addStudentScores = document.getElementById("add-scores")
const addStafferLink = document.getElementById("add-staffer")
const addStafferForm = document.getElementById("staffadd-form")
const addStudentLink = document.getElementById("add-student")
const addStudentForm = document.getElementById("studentadd-form")
const viewStaffLink = document.getElementById("view-staff")
const viewStaffForm = document.getElementById("viewstaff-form")
const viewStaffSelect = document.getElementById("viewstaff-select")
const viewStudentSelect = document.getElementById("viewstudent-select")
const viewStudentsLink = document.getElementById("view-students")
const viewStudentsForm = document.getElementById("viewstudent-form")
const promoteStudentsLink = document.getElementById("promotestudents-link")

const staffTitleInput = document.getElementById("staff-title")
const staffNameInput = document.getElementById("staff-name")
const staffEmailInput = document.getElementById("staff-email")
const staffGenderInput = document.getElementById("staff-gender")
const staffStreetlInput = document.getElementById("staff-street")
const staffCityInput = document.getElementById("staff-city")
const staffStateInput = document.getElementById("staff-state")
const staffPhoneInput = document.getElementById("staff-phone")
const classLabel = document.getElementById("class-label")
const teacherClassInput = document.getElementById("teacher-class")
const programmeLabel = document.getElementById("programme-label")
const teacherProgrammeInput = document.getElementById("teacher-prg")
const staffRole = document.getElementById("role-drpdwn")

const studentFNameInput = document.getElementById("stud-name-first")
const studentLNameInput = document.getElementById("stud-name-last")
const admissionNumber = document.getElementById("stud-admno")
const studentEmailInput = document.getElementById("stud-email")
const studentGenderInput = document.getElementById("stud-gender")
const studentStreetlInput = document.getElementById("stud-street")
const studentCityInput = document.getElementById("stud-city")
const studentStateInput = document.getElementById("stud-state")
const studentPhoneInput = document.getElementById("stud-phone")
const parentEmailInput = document.getElementById("stud-parent-email")
const studentEntryClass = document.getElementById("stud-entry-class")
const studentOrigin = document.getElementById("stud-origin")
const studentMaritalStatus = document.getElementById("stud-mstatus")
const studentProgramme = document.getElementById("stud-prg")

const cancelLink = document.getElementById("cancel-btn")
const closeLink = document.getElementById("close-btn")
const clearStdFrmLink = document.getElementById("clearfrm-btn")
const closeStdFrmLink = document.getElementById("closefrm-btn")

const submitButton = document.getElementById("submit-btn")
const sendButton = document.getElementById("send-btn")

const pNumber = document.getElementById("staff-number")
const pstdNumber = document.getElementById("student-number")
let staffTableBody = document.getElementById("stafftbl-body")
let studentTableBody = document.getElementById("studenttbl-body")
const staffTable = document.getElementById("viewstaff-table")
const tClass = document.getElementById("tclass")
const tClassHeading = document.getElementById("noclass")
const tProgrammeHeading = document.getElementById("noprg")
const closeViewStudentBtn = document.getElementById("vstdclose-icon")
const closeViewStaffBtn = document.getElementById("vstfclose-icon")

const studSearchDiv = document.getElementById("search-students")
const studSearchKey = document.getElementById("stud-searchkey")
const studSearchValue = document.getElementById("stud-searchvalue")
const searchStudentGender = document.getElementById("searchstud-gender")
const searchMe = document.getElementById("searchme")
const searchButton = document.getElementById("search-btn")
const studentStatus = document.getElementById("search-studstatus")

const studentViewPagination = document.getElementById("stdview-pagination")
// const viewStudentPage2 = document.getElementById("viewstd-page2")
// const viewStudentPage3 = document.getElementById("viewstd-page3")
const viewStudentPageRequest = document.getElementById("viewstd-pagerequest")
const viewStudentPageNext = document.getElementById("viewstd-pagenext")
const viewStudentPagePrevious = document.getElementById("viewstd-pageprevious")
const viewStaffPageNext = document.getElementById("viewstaff-pagenext")
const viewStaffPagePrevious = document.getElementById("viewstaff-pageprevious")
const tabDisabledPrevious = document.getElementById("tab-disabled")
const thHeading = document.getElementById("thheading")
const viewStudentsTableHead = document.getElementById("viewstd-tblhead")
const viewStudentsPresentClass = document.getElementById("stud-presentclass")

const logoutLink = document.getElementById("logout")
const token = localStorage.getItem('access_token')
// let tProgrammeHeading = document.createElement("th")
let studentpage = [];
let lastpage = [];
let staffpage = [];
let stafflastpage = [];


toggler.addEventListener("click", (e) => {
    sidebar.style.display = "block"
});

// display add staffer form
addStafferLink.addEventListener("click", (e) => {
    e.preventDefault();
    addStafferForm.style.display = "block"
    sidebar.style.display = "none"
});

// display add student form
addStudentLink.addEventListener("click", (e) => {
    e.preventDefault();
    addStudentForm.style.display = "block"
    sidebar.style.display = "none"
});

// display class input if role is teacher
staffRole.addEventListener("change", (e) => {
    e.preventDefault();
    if (staffRole.value == "teacher") {
        teacherClassInput.style.display = "block"
        classLabel.style.display = "block"
        teacherProgrammeInput.style.display = "block"
        programmeLabel.style.display = "block"
    }
    else {
        teacherClassInput.style.display = "none"
        classLabel.style.display = "none"
        teacherProgrammeInput.style.display = "none"
        programmeLabel.style.display = "none"
    }
});

// display all staff members
const displayAllStaff = (page) => {
    // let serial_no = 0;
    let errorMsg;
    axios
        .get(`${baseUrl}/staff/viewStaff/${page}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            pNumber.innerText = `${response.data.noOfStaff} registered staffers found`
            tClassHeading.style.display = "none"
            tClassHeading.innerHTML = ""
            tProgrammeHeading.style.display = "none";
            tProgrammeHeading.innerHTML = "";
            for (let i = 0; i < response.data.staff_list.length; i++) {
                // serial_no++
                let tblrow = document.createElement("tr")
                let tblcol0 = document.createElement("td")
                let tblcol1 = document.createElement("td")
                let tblcol2 = document.createElement("td")
                let tblcol3 = document.createElement("td")
                let tblcol4 = document.createElement("td")
                let tblcol5 = document.createElement("td")
                let tblcol6 = document.createElement("td")
                let tblcol7 = document.createElement("td")
                // tblcol0.innerText = serial_no
                tblcol0.innerText = response.data.staff_list[i].serialNo
                tblcol1.innerText = response.data.staff_list[i].stafferName
                tblcol2.innerText = response.data.staff_list[i].email
                tblcol3.innerText = response.data.staff_list[i].gender
                tblcol4.innerText = response.data.staff_list[i].address
                tblcol5.innerText = response.data.staff_list[i].phoneNumber
                tblcol6.innerText = response.data.staff_list[i].role
                tblcol7.innerText = response.data.staff_list[i].isAdmin
                tblrow.appendChild(tblcol0)
                tblrow.appendChild(tblcol1)
                tblrow.appendChild(tblcol2)
                tblrow.appendChild(tblcol3)
                tblrow.appendChild(tblcol4)
                tblrow.appendChild(tblcol5)
                tblrow.appendChild(tblcol6)
                tblrow.appendChild(tblcol7)
                staffTableBody.appendChild(tblrow)
            }
            console.log("response says page is ", response.data.page)
            console.log("response says pagenum is ", response.data.pgnum)
            staffpage.push(response.data.page)
            stafflastpage.push(response.data.pgnum)

            // disable next button if end of page is reached
            // if (response.data.pgnum === response.data.page) {
            //     viewStaffPageNext.classList.add("disable")
            // }
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

// display all teachers
const displayTeachers = (page) => {
    let errorMsg;
    // let serial_no = 0;
    axios
        .get(`${baseUrl}/staff/viewTeachers/${page}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            pNumber.innerText = `${response.data.noOfStaff} registered teachers found`
            tClassHeading.style.display = "inline-block";
            tClassHeading.innerHTML = "Class";
            tClassHeading.style.borderBottom = "none";
            // tClass.appendChild(tProgrammeHeading)
            tProgrammeHeading.style.display = "inline-block";
            tProgrammeHeading.innerHTML = "Programme";
            tProgrammeHeading.style.borderBottom = "none";
            for (let i = 0; i < response.data.teachers_list.length; i++) {
                // serial_no++
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
                // tblcol0.innerText = serial_no;
                tblcol0.innerText = response.data.teachers_list[i].serialNo
                tblcol1.innerText = response.data.teachers_list[i].stafferName
                tblcol2.innerText = response.data.teachers_list[i].email
                tblcol3.innerText = response.data.teachers_list[i].gender
                tblcol4.innerText = response.data.teachers_list[i].address
                tblcol5.innerText = response.data.teachers_list[i].phoneNumber
                tblcol6.innerText = response.data.teachers_list[i].role
                tblcol7.innerText = response.data.teachers_list[i].isAdmin
                tblcol8.innerText = response.data.teachers_list[i].teacherClass
                tblcol9.innerText = response.data.teachers_list[i].teacherProgramme
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
                staffTableBody.appendChild(tblrow)
            }
            console.log("response says page is ", response.data.page)
            console.log("response says pagenum is ", response.data.pgnum)
            staffpage.push(response.data.page)
            stafflastpage.push(response.data.pgnum)

            // disable next button if end of page is reached
            // if (response.data.pgnum === response.data.page) {
            //     viewStaffPageNext.classList.add("disable")
            // }
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
// display staff list all/teachers
viewStaffSelect.addEventListener("change", (e) => {
    e.preventDefault();
    staffTableBody.innerHTML = ""

    if (viewStaffSelect.value == "all") {
        displayAllStaff(1)
    }
    else if (viewStaffSelect.value == "teachers") {
        displayTeachers(1)
    }
});

// display view staff form
viewStaffLink.addEventListener("click", (e) => {
    e.preventDefault();
    viewStaffForm.style.display = "block"
    sidebar.style.display = "none"
    displayAllStaff(1)
});

// display next staff list page
viewStaffPageNext.addEventListener("click", (e) => {
    e.preventDefault();
    // let maxpage = stafflastpage[stafflastpage.length - 1]
    let maxpage = stafflastpage.pop()
    let pageNumber = staffpage.pop()
    if (pageNumber < maxpage) {
        viewStaffPagePrevious.classList.remove("disable")
        staffTableBody.innerHTML = ""
        // let pageNumber = studentpage.pop()
        if (viewStaffSelect.value == "all") {
            displayAllStaff(pageNumber + 1)
        }
        else if (viewStaffSelect.value == "teachers") {
            displayTeachers(pageNumber + 1)
        }
    }
    else {
        viewStaffPageNext.classList.add("disable")
        stafflastpage.push(maxpage)
        staffpage.push(pageNumber)
        Swal.fire({
            icon: "error",
            title: "End of File Reached",
            text: "The page requested does not exist"
        });
    }
});

// display previous staff list page
viewStaffPagePrevious.addEventListener("click", (e) => {
    e.preventDefault();
    viewStaffPageNext.classList.remove("disable")
    // console.log(staffpage)
    let pageNumber = staffpage.pop()
    console.log("page is ", pageNumber)
    if (pageNumber <= 1) {
        staffpage.push(1)
        viewStaffPagePrevious.classList.add("disable")
        Swal.fire({
            icon: "error",
            title: "Beginning of File Reached",
            text: "The page requested does not exist"
        });
    }
    else {
        staffTableBody.innerHTML = "";

        if (viewStaffSelect.value == "all") {
            displayAllStaff(pageNumber - 1)
        }
        else if (viewStaffSelect.value == "teachers") {
            displayTeachers(pageNumber - 1)
        }
    }
});

// close view staff form
closeViewStaffBtn.addEventListener("click", (e) => {
    e.preventDefault();
    staffTableBody.innerHTML = ""
    viewStaffForm.style.display = "none"
});

// add a staff member - admin, bursar or teacher
const addStaff = (staffInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/staff/addStaff`, staffInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
            //clear the form fields
            staffTitleInput.value = "";
            staffNameInput.value = "";
            staffEmailInput.value = "";
            staffGenderInput.value = "";
            staffStreetlInput.value = "";
            staffCityInput.value = "";
            staffStateInput.value = "";
            staffPhoneInput.value = "";
            staffRole.value = "";
            teacherClassInput.value = ""
            teacherProgrammeInput.value = ""
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

// submit staff form
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const stafferName = staffTitleInput.value + " " + staffNameInput.value;
    const email = staffEmailInput.value;
    const gender = staffGenderInput.value;
    const address = staffStreetlInput.value + " " + staffCityInput.value + " " + staffStateInput.value;
    const phoneNumber = "+234" + staffPhoneInput.value;
    let teacherClass = teacherClassInput.value;
    let teacherProgramme = teacherProgrammeInput.value;
    const role = staffRole.value;
    if (role != "teacher") {
        teacherClass = "nil"
        teacherProgramme = "nil"
    }

    const formData = {
        stafferName,
        email,
        gender,
        address,
        phoneNumber,
        teacherClass,
        teacherProgramme,
        role
    }
    addStaff(formData);
});


// register a new student
const registerStudent = (studentInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/student/registerStudent`, studentInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
            //clear the form fields after successful submission
            admissionNumber.value = "";
            studentFNameInput.value = ""
            studentLNameInput.value = "";
            studentEmailInput.value = "";
            studentGenderInput.value = "";
            studentStreetlInput.value = "";
            studentCityInput.value = "";
            studentStateInput.value = "";
            studentPhoneInput.value = "";
            parentEmailInput.value = "";
            studentEntryClass.value = "";
            studentOrigin.value = "";
            studentMaritalStatus.value = "";
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

// submit student form
sendButton.addEventListener("click", (e) => {
    e.preventDefault();
    const admNo = admissionNumber.value;
    const firstName = studentFNameInput.value
    const lastName = studentLNameInput.value;
    let email = studentEmailInput.value;
    const gender = studentGenderInput.value;
    const address = studentStreetlInput.value + " " + studentCityInput.value + " " + studentStateInput.value;
    const phoneNumber = studentPhoneInput.value;
    const parentEmail = parentEmailInput.value
    const entryClass = studentEntryClass.value
    const presentClass = studentEntryClass.value
    const stateOfOrigin = studentOrigin.value
    const maritalStatus = studentMaritalStatus.value
    const programme = studentProgramme.value
    if (email == "") email = "nothing@nil.com"
    const formData = {
        admNo,
        firstName,
        lastName,
        email,
        gender,
        address,
        phoneNumber,
        parentEmail,
        entryClass,
        stateOfOrigin,
        maritalStatus,
        programme,
        presentClass

    }
    registerStudent(formData);
});

// display all students
const displayAllStudents = (page) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/student/all/${page}`, {
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
                let tblcol12 = document.createElement("td")
                let tblcol13 = document.createElement("td")
                let tblcol14 = document.createElement("td")
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
                tblcol12.innerText = response.data.studentsperpage[i].programme
                tblcol13.innerText = response.data.studentsperpage[i].presentClass
                tblcol14.innerText = response.data.studentsperpage[i].dateOfRegistration
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
                tblrow.appendChild(tblcol12)
                tblrow.appendChild(tblcol13)
                tblrow.appendChild(tblcol14)
                studentTableBody.appendChild(tblrow)
            }
            console.log("response says page is ", response.data.page)
            studentpage.push(response.data.page)
            lastpage.push(response.data.pgnum)

            // disable next button if end of page is reached
            // if (response.data.pgnum === response.data.page) {
            //     viewStudentPageNext.classList.add("disable")
            // }
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
    page = displayAllStudents(1)
});

// close view student form
closeViewStudentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    studentTableBody.innerHTML = "";
    viewStudentsForm.style.display = "none"
});

// display student list all/by search/one
viewStudentSelect.addEventListener("change", (e) => {
    e.preventDefault();
    studentTableBody.innerHTML = ""
    pstdNumber.innerHTML = ""
    if (viewStudentSelect.value == "all") {
        studSearchDiv.style.display = "none"
        displayAllStudents()
    }
    else if (viewStudentSelect.value == "bycriteria") {
        studSearchDiv.style.display = "block";
        studSearchValue.focus()
    }
});

// display students by search key
studSearchKey.addEventListener("change", (e) => {
    e.preventDefault();
    studentTableBody.innerHTML = ""
    pstdNumber.innerHTML = ""
    if (studSearchKey.value == "admNo" || studSearchKey.value == "firstName" || studSearchKey.value == "lastName" || studSearchKey.value == "address" || studSearchKey.value == "stateOfOrigin") {
        searchMe.innerHTML = `<input type="text" name="stdsearchvalue" placeholder="Input your search term" id="searchstud-value"/>`
        const searchValueBox = document.getElementById("searchstud-value")
        searchValueBox.focus()
    }
    else if (studSearchKey.value == "gender") {
        searchMe.innerHTML =
            `<select id="searchstud-gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>`
    }
    else if (studSearchKey.value == "entryClass") {
        searchMe.innerHTML =
            `<select id="searchstud-entryclass">
    <option value="tamyidi">tamyidi</option>
    <option value="adonah">adonah</option>
    <option value="rawdoh">rawdoh</option>
    <option value="awwal ibtidaahi">awwal ibtidaahi</option>
    <option value="thaani ibtidaahi">thaani ibtidaahi</option>
    <option value="thaalith ibtidaahi">thaalith ibtidaahi</option>
    <option value="raabi ibtidaahi">raabi ibtidaahi</option>
    <option value="khaamis ibtidaahi">khaamis ibtidaahi</option>
    <option value="awwal idaadi">awwal idaadi</option>
    <option value="thaani idaadi">thaani idaadi</option>
    <option value="thaalith idaadi">thaalith idaadi</option>
  </select>`
    }
    else if (studSearchKey.value == "maritalStatus") {
        searchMe.innerHTML =
            `<select id="searchstud-mstatus">
                 <option value="married">Married</option>
                 <option value="single">Single</option>
               </select>`
    }
    else if (studSearchKey.value == "programme") {
        searchMe.innerHTML =
            `<select id="searchstud-prg">
                 <option value="children madrasah">Children Madrasah</option>
                 <option value="adult madrasah">Adult Madrasah</option>
                 <option value="female madrasah">Female Madrasah</option>
                 <option value="barnomij">Barnomij</option>
               </select>`
    }
    else if (studSearchKey.value == "studentStatus") {
        searchMe.innerHTML = ""
    }
    else if (studSearchKey.value == "presentClass") {
        searchMe.innerHTML =
            `<select id="searchstud-presentclass">
    <option value="tamyidi">tamyidi</option>
    <option value="adonah">adonah</option>
    <option value="rawdoh">rawdoh</option>
    <option value="awwal ibtidaahi">awwal ibtidaahi</option>
    <option value="thaani ibtidaahi">thaani ibtidaahi</option>
    <option value="thaalith ibtidaahi">thaalith ibtidaahi</option>
    <option value="raabi ibtidaahi">raabi ibtidaahi</option>
    <option value="khaamis ibtidaahi">khaamis ibtidaahi</option>
    <option value="awwal idaadi">awwal idaadi</option>
    <option value="thaani idaadi">thaani idaadi</option>
    <option value="thaalith idaadi">thaalith idaadi</option>
  </select>`
    }
    else if (studSearchKey.value == "classStatus") {
        searchMe.innerHTML =
            `<select id="searchstud-status">
                 <option value="promoted">Promoted</option>
                 <option value="repeated">Repeated</option>
               </select>`
    }
});
// clear table if search value changes
studSearchValue.addEventListener("change", (e) => {
    e.preventDefault();
    studentTableBody.innerHTML = ""
    pstdNumber.innerHTML = ""
})
let searchMeFirst = searchMe.firstChild
searchMeFirst.addEventListener("change", (e) => {
    e.preventDefault();
    studentTableBody.innerHTML = ""
    pstdNumber.innerHTML = ""
})
// display students by search key and value
const displayStudents = (key, value, page) => {
    let errorMsg;
    let serial_no = 0;
    axios
        .get(`${baseUrl}/student/${page}/?${key}=${value}`, {
            // params: { page} ,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            pstdNumber.innerText = `${response.data.noOfStudents} registered students found.  Page ${response.data.page}`
            for (let i = 0; i < response.data.studentsperpage.length; i++) {
                // serial_no++
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
                let tblcol12 = document.createElement("td")
                let tblcol13 = document.createElement("td")
                let tblcol14 = document.createElement("td")
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
                tblcol12.innerText = response.data.studentsperpage[i].programme
                tblcol13.innerText = response.data.studentsperpage[i].presentClass
                tblcol14.innerText = response.data.studentsperpage[i].dateOfRegistration
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
                tblrow.appendChild(tblcol12)
                tblrow.appendChild(tblcol13)
                tblrow.appendChild(tblcol14)
                if (value == "past") {
                    // remove present class from student's view
                    viewStudentsTableHead.removeChild(viewStudentsPresentClass)
                    tblrow.removeChild(tblcol13)
                    // add status to table heading
                    let tblheadstatus = document.createElement("th");
                    tblheadstatus.innerText = "Status"
                    viewStudentsTableHead.appendChild(tblheadstatus)
                    // add non-student status to table view
                    let tblcol15 = document.createElement("td");
                    tblcol15.innerText = response.data.studentsperpage[i].nonStudentStatus
                    tblrow.appendChild(tblcol15)
                }
                studentTableBody.appendChild(tblrow)
            }
            console.log("response says page is ", response.data.page)
            studentpage.push(response.data.page)
            lastpage.push(response.data.pgnum)

            // disable next button if end of page is reached
            // if (response.data.pgnum === response.data.page) {
            //     viewStudentPageNext.classList.add("disable")
            // }
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

// submit view student form
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    studentTableBody.innerHTML = ""
    pstdNumber.innerHTML = ""
    let key = studSearchKey.value;
    let value;
    if (key === "studentStatus") value = "past"
    else { value = searchMe.firstChild.value || studSearchValue.value }

    displayStudents(key, value, 1);
});

// view student pagination
// studentViewPagination.addEventListener("click", (e) => {
//     e.preventDefault();

//     let targetElement = e.target.id;
//     let target = e.target;
//     target.style.boxShadow = "none"
//     target.style.color = "green"

//     let page;
//     switch (targetElement) {
//         case "viewstd-page1":
//             page = 1;
//             break;
//         case "viewstd-page2":
//             page = 2;
//             break;
//         case "viewstd-page3":
//             page = 3
//             break;
//     }
//     if (targetElement == "viewstd-page1" || targetElement == "viewstd-page2" || targetElement == "viewstd-page3") {
//         let maxpage = lastpage[lastpage.length - 1]
//         // console.log("last page is ", maxpage)
//         // console.log("page is ", page)
//         if (page <= maxpage) {
//             studentTableBody.innerHTML = ""
//             viewStudentPagePrevious.classList.remove("disable")
//             viewStudentPageNext.classList.remove("disable")

//             if (viewStudentSelect.value == "all") {
//                 displayAllStudents(page)
//             }
//             else if (viewStudentSelect.value == "bycriteria") {
//                 const key = studSearchKey.value
//                 let value;
//                 if (key === "studentStatus") value = "past"
//                 else { value = searchMe.firstChild.value || studSearchValue.value }
//                 displayStudents(key, value, page);
//                 console.log(key, value, page)
//             }
//         }
//         // else  viewStudentPageNext.classList.add("disable")
//         else {
//             lastpage.push(maxpage)
//             Swal.fire({
//                 icon: "error",
//                 title: "End of File Reached",
//                 text: "The page requested does not exist"
//             });
//         }
//     }
// });


// display next students list page
viewStudentPageNext.addEventListener("click", (e) => {
    e.preventDefault();
    let maxpage = lastpage.pop()
    let pageNumber = studentpage.pop()
    if (pageNumber < maxpage) {
        viewStudentPagePrevious.classList.remove("disable")
        studentTableBody.innerHTML = ""
        if (viewStudentSelect.value == "all") {
            displayAllStudents(pageNumber + 1)
        }
        else if (viewStudentSelect.value == "bycriteria") {
            const key = studSearchKey.value
            let value;
            if (key === "studentStatus") value = "past"
            else { value = searchMe.firstChild.value || studSearchValue.value }
            displayStudents(key, value, pageNumber + 1);
            console.log(key, value, pageNumber)
        }
    }
    else {
        viewStudentPageNext.classList.add("disable")
        lastpage.push(maxpage)
        studentpage.push(pageNumber)
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
    let pageNumber = studentpage.pop()
    if (pageNumber <= 1) {
        studentpage.push(1)
        viewStudentPagePrevious.classList.add("disable")
        Swal.fire({
            icon: "error",
            title: "Beginning of File Reached",
            text: "The page requested does not exist"
        });
    }
    else {
        studentTableBody.innerHTML = "";

        if (viewStudentSelect.value == "all") {
            displayAllStudents(pageNumber - 1)
        }
        else if (viewStudentSelect.value == "bycriteria") {
            const key = studSearchKey.value
            let value;
            if (key === "studentStatus") value = "past"
            else { value = searchMe.firstChild.value || studSearchValue.value }
            displayStudents(key, value, pageNumber - 1);
            console.log(key, value, pageNumber)
        }
    }
});

// display students list by page requested
viewStudentPageRequest.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
        let maxpage = lastpage.pop()
        let pageNumber = viewStudentPageRequest.value
        if (pageNumber < 1) {
            Swal.fire({
                icon: "error",
                title: "Beginning of File Reached",
                text: "The page requested does not exist"
            });
        }
        else if (pageNumber > maxpage) {
            Swal.fire({
                icon: "error",
                title: "End of File Reached",
                text: "The page requested does not exist"
            });
        }
        else {
            studentTableBody.innerHTML = "";
            viewStudentPagePrevious.classList.remove("disable")
            viewStudentPageNext.classList.remove("disable")

            if (viewStudentSelect.value == "all") {
                displayAllStudents(pageNumber)
            }
            else if (viewStudentSelect.value == "bycriteria") {
                const key = studSearchKey.value
                let value;
                if (key === "studentStatus") value = "past"
                else { value = searchMe.firstChild.value || studSearchValue.value }
                displayStudents(key, value, pageNumber);
                console.log(key, value, pageNumber)
            }
        }
    }
});

//clear staff form
cancelLink.addEventListener("click", (e) => {
    e.preventDefault();
    staffTitleInput.value = "";
    staffNameInput.value = "";
    staffEmailInput.value = "";
    staffGenderInput.value = "";
    staffStreetlInput.value = "";
    staffCityInput.value = "";
    staffStateInput.value = "";
    staffPhoneInput.value = "";
    staffRole.value = "";
    teacherClassInput.value = ""
    teacherProgrammeInput.value = ""
});

//close staff form
closeLink.addEventListener("click", (e) => {
    e.preventDefault();
    addStafferForm.style.display = "none"
});

//clear student form
clearStdFrmLink.addEventListener("click", (e) => {
    e.preventDefault();
    admissionNumber.value = "";
    studentFNameInput.value = ""
    studentLNameInput.value = "";
    studentEmailInput.value = "";
    studentGenderInput.value = "";
    studentStreetlInput.value = "";
    studentCityInput.value = "";
    studentStateInput.value = "";
    studentPhoneInput.value = "";
    parentEmailInput.value = "";
    studentEntryClass.value = "";
    studentOrigin.value = "";
    studentMaritalStatus.value = "";
});

//clos e student form
closeStdFrmLink.addEventListener("click", (e) => {
    e.preventDefault();
    addStudentForm.style.display = "none"
});


// ***************************************************************************************
// SECTION 2 - EDIT, PROMOTE, REMOVE ....
// ***************************************************************************************
const editStaffQueryForm = document.getElementById('staffedit-queryform')
const closeEditButtonIcon = document.getElementById('editstfclose-icon')
const closeRemoveButtonIcon = document.getElementById('removestfclose-icon')
const closeAssignButtonIcon = document.getElementById('assignteacherclose-icon')
const promoteStudentsButtonIcon = document.getElementById('promotestudents-closeicon')
const editStaffLink = document.getElementById('edit-staff')
const removeStaffLink = document.getElementById('remove-staff')
const assignTeacherLink = document.getElementById('assign-teacher')
const staffNameToEdit = document.getElementById('toedit-staffname')
const staffEmailToEdit = document.getElementById('toedit-staffemail')
const staffEmailToRemove = document.getElementById('toremove-staffemail')
const teacherEmailToAssign = document.getElementById('toassignteacher-staffemail')
const assignTeacherClassSelect = document.getElementById('assignteacher-classelect')
const assignTeacherProgrammeSelect = document.getElementById('assignteacher-programmeselect')
const submitEditQuery = document.getElementById('submiteditquery-btn')
const submitRemoveQuery = document.getElementById('submitremovequery-btn')
const submitAssignTeacher = document.getElementById('submitassignteacher-btn')

const updateStaffForm = document.getElementById('staffupdate-form')
const assignTeacherForm = document.getElementById('teacherassign-form')
const removeStaffForm = document.getElementById('staffremove-form')
const promoteStudentsForm = document.getElementById('promotestudents-form')
const cancelUpdateButton = document.getElementById('cancelupdate-btn')
const closeUpdateButton = document.getElementById('closeupdate-btn')
const UpdateButton = document.getElementById('update-btn')

const staffEmailUpdate = document.getElementById("upd-staffemail")
const staffNameUpdate = document.getElementById("upd-staffname")
const staffGenderUpdate = document.getElementById("upd-staffgender")
const staffAddressUpdate = document.getElementById("upd-staffaddress")
const staffPhoneUpdate = document.getElementById("upd-staffphone")
const staffRoleUpdate = document.getElementById("upd-staffrole")
const classLabelUpdate = document.getElementById("upd-classlabel")
const teacherClassUpdate = document.getElementById("upd-teacherclass")
const programmeLabelUpdate = document.getElementById("upd-programmelabel")
const teacherProgrammeUpdate = document.getElementById("upd-teacherprogramme")
const updateItTeacherClass = document.getElementById("updateit-teacherclass")
const updateItTeacherProgramme = document.getElementById("updateit-teacherprogramme")

const promoteStudentsSessionSelect = document.getElementById("promotestudents-sessionselect")
const promoteStudentsTermSelect = document.getElementById("promotestudents-termselect")
const promoteStudentsSubmitButton = document.getElementById("promotestudents-btn")

// display editstaff query form
editStaffLink.addEventListener("click", (e) => {
    e.preventDefault();
    editStaffQueryForm.style.display = "block"
    sidebar.style.display = "none";
});

// close staffedit query form
closeEditButtonIcon.addEventListener("click", (e) => {
    e.preventDefault();
    editStaffQueryForm.style.display = "none";
    staffEmailToEdit.value = "";
    updateStaffForm.style.display = "none";
});

// submit query for staff edit
const QuerystaffEdit = (staffInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/staff/editStaff`, staffInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message + ". Use the form below to edit their details"
            });
            staffEmailToEdit.value = "";
            updateStaffForm.style.display = "block";
            staffEmailUpdate.value = response.data.staffer.email;
            staffNameUpdate.value = response.data.staffer.stafferName
            staffGenderUpdate.value = response.data.staffer.gender
            staffAddressUpdate.value = response.data.staffer.address
            staffPhoneUpdate.value = response.data.staffer.phoneNumber
            staffRoleUpdate.value = response.data.staffer.role

            if (response.data.staffer.role == "teacher") {
                classLabelUpdate.style.display = "block";
                teacherClassUpdate.style.display = "block";
                updateItTeacherClass.style.display = "block";
                programmeLabelUpdate.style.display = "block";
                teacherProgrammeUpdate.style.display = "block";
                updateItTeacherProgramme.style.display = "block";
                teacherClassUpdate.value = response.data.staffer.teacherClass;
                teacherProgrammeUpdate.value = response.data.staffer.teacherProgramme;
            }
            editStaffQueryForm.style.display = "none";
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

//submit staffedit query form
submitEditQuery.addEventListener("click", (e) => {
    e.preventDefault();
    const email = staffEmailToEdit.value;
    const formData = {
        email
    }
    QuerystaffEdit(formData);
});

// close staff update form
closeUpdateButton.addEventListener("click", (e) => {
    e.preventDefault();
    updateStaffForm.style.display = "none";
    staffEmailUpdate.value = "";
    staffNameUpdate.value = "";
    staffGenderUpdate.value = "";
    staffAddressUpdate.value = "";
    staffPhoneUpdate.value = "";
    staffRoleUpdate.value = "";
    classLabelUpdate.style.display = "none";
    teacherClassUpdate.style.display = "none";
    programmeLabelUpdate.style.display = "none";
    teacherProgrammeUpdate.style.display = "none";
    updateItTeacherClass.style.display = "none";
    updateItTeacherProgramme.style.display = "none";
    teacherClassUpdate.value = "";
    teacherProgrammeUpdate.value = "";
});

// cancel staff update form
cancelUpdateButton.addEventListener("click", (e) => {
    e.preventDefault();
    staffEmailUpdate.value = "";
    staffNameUpdate.value = "";
    staffGenderUpdate.value = "";
    staffAddressUpdate.value = "";
    staffPhoneUpdate.value = "";
    staffRoleUpdate.value = "";
    classLabelUpdate.style.display = "none";
    teacherClassUpdate.style.display = "none";
    programmeLabelUpdate.style.display = "none";
    teacherProgrammeUpdate.style.display = "none";
    updateItTeacherClass.style.display = "none";
    updateItTeacherProgramme.style.display = "none";
    teacherClassUpdate.value = "";
    teacherProgrammeUpdate.value = "";
});

//change teacher class when another is picked
updateItTeacherClass.addEventListener("change", (e) => {
    e.preventDefault();
    teacherClassUpdate.value = updateItTeacherClass.value;
});

//change teacher programme when another is picked
updateItTeacherProgramme.addEventListener("change", (e) => {
    e.preventDefault();
    teacherProgrammeUpdate.value = updateItTeacherProgramme.value;
});

// display class select when the user presses enter key on the keyboard after inputting role as teacher
staffRoleUpdate.addEventListener("keyup", function (e) {
    // if (e.key === "Enter" && staffRoleUpdate.value == "teacher") {
    if (staffRoleUpdate.value == "teacher") {
        e.preventDefault();
        classLabelUpdate.style.display = "block";
        teacherClassUpdate.style.display = "block";
        updateItTeacherClass.style.display = "block";
        programmeLabelUpdate.style.display = "block";
        teacherProgrammeUpdate.style.display = "block";
        updateItTeacherProgramme.style.display = "block";
    }
    else {
        classLabelUpdate.style.display = "none";
        teacherClassUpdate.style.display = "none";
        updateItTeacherClass.style.display = "none";
        programmeLabelUpdate.style.display = "none";
        teacherProgrammeUpdate.style.display = "none";
        updateItTeacherProgramme.style.display = "none";
    }
});

// update a staffer info
const updateStaffDetails = (staffInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/staff/updateStaff`, staffInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Update Successful",
                text: response.data.message
            });
            staffEmailUpdate.value = "";
            staffNameUpdate.value = "";
            staffGenderUpdate.value = "";
            staffAddressUpdate.value = "";
            staffPhoneUpdate.value = "";
            staffRoleUpdate.value = "";
            classLabelUpdate.style.display = "none";
            teacherClassUpdate.style.display = "none";
            programmeLabelUpdate.style.display = "none";
            teacherProgrammeUpdate.style.display = "none";
            updateItTeacherClass.style.display = "none";
            updateItTeacherProgramme.style.display = "none";
            teacherClassUpdate.value = "";
            teacherProgrammeUpdate.value = "";
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

// submit request to update staff
UpdateButton.addEventListener("click", (e) => {
    e.preventDefault();
    let email = staffEmailUpdate.value;
    let stafferName = staffNameUpdate.value;
    let gender = staffGenderUpdate.value;
    let address = staffAddressUpdate.value;
    let phoneNumber = staffPhoneUpdate.value;
    let role = staffRoleUpdate.value;
    let teacherClass = teacherClassUpdate.value;
    let teacherProgramme = teacherProgrammeUpdate.value;

    if (role == "teacher" && (teacherClass == "" || teacherProgramme == "")) {
        Swal.fire({
            icon: "error",
            title: "Invalid Entry",
            text: "A teacher must be assigned a class and a programme"
        });
    }

    const formData = {
        email,
        stafferName,
        gender,
        address,
        phoneNumber,
        role,
        teacherClass,
        teacherProgramme
    }
    updateStaffDetails(formData);
});

// display assignteacher query form
assignTeacherLink.addEventListener("click", (e) => {
    e.preventDefault();
    assignTeacherForm.style.display = "block"
    sidebar.style.display = "none";
});

// assign staff as teacher
const assignTeacher = (staffInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/staff/assignTeacher`, staffInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
            teacherEmailToAssign.value = "";
            assignTeacherClassSelect.value = "";
            assignTeacherProgrammeSelect.value = "";
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

//submit assign teacher form
submitAssignTeacher.addEventListener("click", (e) => {
    e.preventDefault();
    const email = teacherEmailToAssign.value;
    const teacherClass = assignTeacherClassSelect.value;
    const teacherProgramme = assignTeacherProgrammeSelect.value;
    const formData = {
        email,
        teacherClass,
        teacherProgramme
    }
    assignTeacher(formData);
});

// close assignteacher query form
closeAssignButtonIcon.addEventListener("click", (e) => {
    e.preventDefault();
    assignTeacherForm.style.display = "none";
    teacherEmailToAssign.value = "";
});

// display removestaff query form
removeStaffLink.addEventListener("click", (e) => {
    e.preventDefault();
    removeStaffForm.style.display = "block"
    sidebar.style.display = "none";
});

// close staffedit query form
closeRemoveButtonIcon.addEventListener("click", (e) => {
    e.preventDefault();
    removeStaffForm.style.display = "none";
    staffEmailToRemove.value = "";
});

// remove staff
const removeStaff = (payload) => {
    let errorMsg;

    axios
        .delete(`${baseUrl}/staff/deleteStaff`, {
            data: payload,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
            staffEmailToRemove.value = "";
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

//submit staffremove query form
submitRemoveQuery.addEventListener("click", (e) => {
    e.preventDefault();
    const email = staffEmailToRemove.value;
    if (staffEmailToRemove.value == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "Staffer email is required for the query"
        });
    }
    else {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                removeStaff(formData);
            }
        });
    }
    const formData = {
        email
    }

});

//promote students
const promoteStudents = (termInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/student/promoteStudents`, termInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
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

// click promote students link to display form
promoteStudentsLink.addEventListener("click", (e) => {
    e.preventDefault();
    promoteStudentsForm.style.display = "block";
    sidebar.style.display = "none";
});

// click promote students button to promote students
promoteStudentsSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const termName = promoteStudentsTermSelect.value;
    const sessionName = promoteStudentsSessionSelect.value;
    const formData = {
        termName,
        sessionName
    }
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, promote students"
    }).then((result) => {
        if (result.isConfirmed) {
            promoteStudents(formData)
        }
    });

});

// close promote students form
promoteStudentsButtonIcon.addEventListener("click", (e) => {
    e.preventDefault();
    promoteStudentsForm.style.display = "none";
});


// ************************** STUDENTS *****************************************
const editStudentLink = document.getElementById('edit-students')
const updateStudentForm = document.getElementById('studentupdate-form')
const cancelStudentUpdateButton = document.getElementById('clearstdupdfrm-btn')
const closeStudentUpdateButton = document.getElementById('closestdupdfrm-btn')
const UpdateStudentButton = document.getElementById('studupd-btn')

const studentAdmNoToEdit = document.getElementById('studupd-admno')
const studentFirstNameUpdate = document.getElementById("studupd-firstname")
const studentLastNameUpdate = document.getElementById("studupd-lastname")
const studentGenderUpdate = document.getElementById("studupd-gender")
const studentAddressUpdate = document.getElementById("studupd-address")
const studentPhoneUpdate = document.getElementById("studupd-phone")
const studentEntryClassUpdate = document.getElementById("studupd-entryclass")
const studentEntryClassUpdateSelect = document.getElementById("studupd-entryclassselect")
const studentEmailUpdate = document.getElementById("studupd-email")
const studentParentEmailUpdate = document.getElementById("studupd-parentemail")
const studentOriginUpdate = document.getElementById("studupd-origin")
const studentMStatusUpdate = document.getElementById("studupd-mstatus")
const studentProgrammeUpdate = document.getElementById("studupd-programme")
const studentProgrammeUpdateSelect = document.getElementById("studupd-prgselect")


// display update student form
editStudentLink.addEventListener("click", (e) => {
    e.preventDefault();
    updateStudentForm.style.display = "block"
    sidebar.style.display = "none";
});


// submit query for student edit
const QueryStudentUpdate = (studentInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/student/editStudent`, studentInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message + ". Edit their details in the form below"
            });
            studentFirstNameUpdate.value = response.data.student.firstName
            studentLastNameUpdate.value = response.data.student.lastName
            studentGenderUpdate.value = response.data.student.gender
            studentAddressUpdate.value = response.data.student.address
            studentPhoneUpdate.value = response.data.student.phoneNumber
            studentEntryClassUpdate.value = response.data.student.entryClass
            studentEmailUpdate.value = response.data.student.email
            studentParentEmailUpdate.value = response.data.student.parentEmail
            studentOriginUpdate.value = response.data.student.stateOfOrigin
            studentMStatusUpdate.value = response.data.student.maritalStatus
            studentProgrammeUpdate.value = response.data.student.programme
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

//submit studentupdate query form
studentAdmNoToEdit.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && studentAdmNoToEdit.value != "") {
        e.preventDefault();
        const admNo = studentAdmNoToEdit.value;
        const formData = {
            admNo
        }
        QueryStudentUpdate(formData);
    }
    else if (e.key === "Enter" && studentAdmNoToEdit.value == "") {
        Swal.fire({
            icon: "error",
            title: "Error Processing Input",
            text: "A valid admission number is required for the query"
        });
    }
});

//change entry class when another is picked
studentEntryClassUpdateSelect.addEventListener("change", (e) => {
    e.preventDefault();
    studentEntryClassUpdate.value = studentEntryClassUpdateSelect.value;
});

//change programme when another is picked
studentProgrammeUpdateSelect.addEventListener("change", (e) => {
    e.preventDefault();
    studentProgrammeUpdate.value = studentProgrammeUpdateSelect.value;
});

// update student
const updateStudentDetails = (studentInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/student/updateStudent`, studentInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
            studentAdmNoToEdit.value = ""
            studentFirstNameUpdate.value = ""
            studentLastNameUpdate.value = ""
            studentGenderUpdate.value = ""
            studentAddressUpdate.value = ""
            studentPhoneUpdate.value = ""
            studentEntryClassUpdate.value = ""
            studentEmailUpdate.value = ""
            studentParentEmailUpdate.value = ""
            studentOriginUpdate.value = ""
            studentMStatusUpdate.value = ""
            studentProgrammeUpdate.value = ""
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

// submit request to update student
UpdateStudentButton.addEventListener("click", (e) => {
    e.preventDefault();
    const admNo = studentAdmNoToEdit.value;
    const firstName = studentFirstNameUpdate.value;
    const lastName = studentLastNameUpdate.value;
    const gender = studentGenderUpdate.value;
    const address = studentAddressUpdate.value;
    const phoneNumber = studentPhoneUpdate.value;
    const entryClass = studentEntryClassUpdate.value;
    let email = studentEmailUpdate.value;
    const parentEmail = studentParentEmailUpdate.value;
    const stateOfOrigin = studentOriginUpdate.value;
    const maritalStatus = studentMStatusUpdate.value;
    const programme = studentProgrammeUpdate.value;
    if (email == "") {
        email = "nothing@nil.com"
    }

    const formData = {
        admNo,
        firstName,
        lastName,
        gender,
        address,
        entryClass,
        email,
        parentEmail,
        phoneNumber,
        stateOfOrigin,
        maritalStatus,
        programme
    }
    updateStudentDetails(formData);
});

// close student update form
closeStudentUpdateButton.addEventListener("click", (e) => {
    e.preventDefault();
    updateStudentForm.style.display = "none";
    studentAdmNoToEdit.value = ""
    studentFirstNameUpdate.value = ""
    studentLastNameUpdate.value = ""
    studentGenderUpdate.value = ""
    studentAddressUpdate.value = ""
    studentPhoneUpdate.value = ""
    studentEntryClassUpdate.value = ""
    studentEmailUpdate.value = ""
    studentParentEmailUpdate.value = ""
    studentOriginUpdate.value = ""
    studentMStatusUpdate.value = ""
    studentProgrammeUpdate.value = ""
});

// clear student update form
cancelStudentUpdateButton.addEventListener("click", (e) => {
    e.preventDefault();
    studentAdmNoToEdit.value = ""
    studentFirstNameUpdate.value = ""
    studentLastNameUpdate.value = ""
    studentGenderUpdate.value = ""
    studentAddressUpdate.value = ""
    studentPhoneUpdate.value = ""
    studentEntryClassUpdate.value = ""
    studentEmailUpdate.value = ""
    studentParentEmailUpdate.value = ""
    studentOriginUpdate.value = ""
    studentMStatusUpdate.value = ""
    studentProgrammeUpdate.value = ""
});

// add student scores
addStudentScores.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/teacherPortal.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/teacherPortal.html"
});


// REPORT ********************************************************************
// ***************************************************************************

const reportScoresForm = document.getElementById("reportscores-form")
const closeStudentReportFormBtn = document.getElementById("closereportform-btn")
const viewReportButton = document.getElementById("viewreport-btn")
const viewStudentReportLink = document.getElementById("studentreport-link")
const admissionNumberForReport = document.getElementById("admNo-forreport")
const termForReport = document.getElementById("term-forreport")
const sessionForReport = document.getElementById("session-forreport")
const resultBody = document.getElementById("result-body")
const thirdTermResultBody = document.getElementById("thirdterm-resultbody")
const studentCommentReport = document.getElementById("comment-report")
const termGrandTotal = document.getElementById("grandtotal")
const termMarkObtained = document.getElementById("marksobtained")
const termAveragePercent = document.getElementById("avgpercent")
const tableReport = document.getElementById("table-report")
const thirdTermReportTable = document.getElementById("table-report-thirdterm")
const nameBar = document.getElementById("namebar")

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
            nameBar.innerText = `Displaying ${response.data.termName} term result for ${response.data.message}`
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
// change name
// admissionNumberForReport.addEventListener("change", (e) => {
//     e.preventDefault();
//     for (let i = 0; i < studentNamesStore.length; i++)
//         if (studentNamesStore[i].admission_number == admissionNumberForReport.value) {
//         nameBar.innerText = studentNamesStore[i].student_name
//         }
// });

// open report form
viewStudentReportLink.addEventListener("click", (e) => {
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

// CLASS REPORT ********************************************************************
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
const attendanceLabel = document.getElementById("attendance-label")
const attendanceTableHeadRow = document.getElementById("classattendance-tblheadrow")
const attendanceTableBodyRow = document.getElementById("classattendance-tblbodyrow")
const attendanceTableBody = document.getElementById("classattendance-tblbody")




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
    attendanceTableHeadRow.innerHTML = "";
    attendanceTableBody.innerHTML = "";
    attendanceLabel.style.display = "none";
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
            attendanceLabel.style.display = "block";
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
            //for attendance
            let atdtblserialnohead = document.createElement("th")
            let atdtbladmnohead = document.createElement("th")
            let atdtblnamehead = document.createElement("th")
            atdtblserialnohead.innerText = "Serial No"
            atdtbladmnohead.innerText = "Admission No"
            atdtblnamehead.innerText = "Name"
            attendanceTableHeadRow.appendChild(atdtblserialnohead)
            attendanceTableHeadRow.appendChild(atdtbladmnohead)
            attendanceTableHeadRow.appendChild(atdtblnamehead)

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
                //for attendance
                let atdtblrow = document.createElement("tr")
                let atdtblserialno = document.createElement("th")
                let atdtbladmno = document.createElement("td")
                let atdtblname = document.createElement("td")
                atdtblserialno.innerText = i + 1
                atdtbladmno.innerText = response.data.classExists[i].admissionNumber
                atdtblname.innerText = response.data.classExists[i].student_name
                atdtblrow.appendChild(atdtblserialno)
                atdtblrow.appendChild(atdtbladmno)
                atdtblrow.appendChild(atdtblname)

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
                //attendance
                for (let j = 0; j < response.data.classExists[i].scores.length; j++) {
                    let requestedterm = response.data.classExists[i].scores[j].term.find(aterm => aterm.termName == term)
                    if (i==0 && j == 0){  //adding term dates as heading for attendance table
                        for (let k = 0; k < requestedterm.attendance.length; k++) {
                            const dateToAdd = requestedterm.attendance[k].termdate
                            let tbldate = document.createElement("th")
                            tbldate.innerText = dateToAdd
                            attendanceTableHeadRow.appendChild(tbldate)
                        }
                    }
                    for (let k = 0; k < requestedterm.attendance.length; k++) {
                        const presentStatus = requestedterm.attendance[k].presence
                        let tblpresence = document.createElement("td")
                        if (presentStatus == 'yes'){
                             tblpresence.innerText = "ح"
                            // atdtblrow.appendChild(tblpresence)
                            }
                        else {
                             tblpresence.innerText = "-"
                            //  atdtblrow.appendChild(tblpresence)
                        }
                        // tblpresence.innerText = presentStatus
                        atdtblrow.appendChild(tblpresence)
                    }
                }
                tableBodyForClassReport.appendChild(tblrow)
                attendanceTableBody.appendChild(atdtblrow)
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
    attendanceTableHeadRow.innerHTML = "";
    attendanceTableBody.innerHTML = "";
    attendanceLabel.style.display = "none";
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
    attendanceTableHeadRow.innerHTML = "";
    attendanceTableBody.innerHTML = "";
    attendanceLabel.style.display = "none";
});

// EDIT SUBJECTS***************************************************************
// ****************************************************************************
const editSubjectsFormCloseIcon = document.getElementById("subjecteditclose-icon");
const editSubjectsForm = document.getElementById("subjectedit-form");
const editClassSubjectsLink = document.getElementById("editclassubjects-link");

// const editClassSubjectsForm = document.getElementById("edit-classubjects");
const editSubjectsClass = document.getElementById("editsubject-classelect");
const editSubjectsProgramme = document.getElementById("editsubject-programmeselect");
const editSubjectsSubject = document.getElementById("editsubject-subjectselect");
const editSubjectsSubjectOther = document.getElementById("editsubject-subjectotherselect");
const editSubjectsAddSubjectButton = document.getElementById("addnewsubject-btn");
const editSubjectsRemoveSubjectButton = document.getElementById("removenewsubject-btn");


//add new subject
const addSubject = (subjectInfo, className, programme) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/class/addSubject/?className=${className}&programme=${programme}`, subjectInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
            editSubjectsClass.value = "";
            editSubjectsProgramme.value = "";
            editSubjectsSubject.value = "";
            editSubjectsSubjectOther.value = "";
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

// click add subjects button
editSubjectsAddSubjectButton.addEventListener("click", (e) => {
    e.preventDefault();
    const className = editSubjectsClass.value;
    const programme = editSubjectsProgramme.value;
    const subject = editSubjectsSubject.value;
    if (editSubjectsSubject.value == "Other" && editSubjectsSubjectOther.value != "") subject = editSubjectsSubjectOther.value
    if (editSubjectsClass.value == "select one" || editSubjectsProgramme.value == "select one" || editSubjectsSubject.value == "select one") {
        Swal.fire({
            icon: "error",
            title: "Invalid input detected",
            text: "Please check that all inputs are valid"
        });
    }
    else {
        const formData = {
            subject
        }
        addSubject(formData, className, programme)
    }
});

//remove subject
const removeSubject = (subjectInfo, className, programme) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/class/removeSubject/?className=${className}&programme=${programme}`, subjectInfo, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: response.data.message
            });
            editSubjectsClass.value = "";
            editSubjectsProgramme.value = "";
            editSubjectsSubject.value = "";
            editSubjectsSubjectOther.value = "";
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

// click remove subjects button
editSubjectsRemoveSubjectButton.addEventListener("click", (e) => {
    e.preventDefault();
    const className = editSubjectsClass.value;
    const programme = editSubjectsProgramme.value;
    const subject = editSubjectsSubject.value;
    if (editSubjectsSubject.value == "Other" && editSubjectsSubjectOther.value != "") subject = editSubjectsSubjectOther.value
    if (editSubjectsClass.value == "select one" || editSubjectsProgramme.value == "select one" || editSubjectsSubject.value == "select one") {
        Swal.fire({
            icon: "error",
            title: "Invalid input detected",
            text: "Please check that all inputs are valid"
        });
    }
    else {
        const formData = {
            subject
        }
        removeSubject(formData, className, programme)
    }
});

// click edit subjects link to display form
editSubjectsSubject.addEventListener("change", (e) => {
    e.preventDefault();
    if (editSubjectsSubject.value == "Other") {
        editSubjectsSubjectOther.removeAttribute("disabled")
        editSubjectsSubjectOther.focus()
    }
    else {
        editSubjectsSubjectOther.value = "";
        editSubjectsSubjectOther.setAttribute("disabled", true)
    }
});

// click edit subjects link to display form
editClassSubjectsLink.addEventListener("click", (e) => {
    e.preventDefault();
    editSubjectsForm.style.display = "block";
    sidebar.style.display = "none";
});

// close edit subjects form
editSubjectsFormCloseIcon.addEventListener("click", (e) => {
    e.preventDefault();
    editSubjectsForm.style.display = "none";
});



// ************************************************************************
// logout
logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
});
