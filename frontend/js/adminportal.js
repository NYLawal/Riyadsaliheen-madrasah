
const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const sidebar = document.getElementById("bsbSidebar1")
const toggler = document.getElementById("toggler-icon")

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
    let serial_no = 0;
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
            for (let i = 0; i < response.data.staff.length; i++) {
                serial_no++;
                let tblrow = document.createElement("tr")
                let tblcol0 = document.createElement("td")
                let tblcol1 = document.createElement("td")
                let tblcol2 = document.createElement("td")
                let tblcol3 = document.createElement("td")
                let tblcol4 = document.createElement("td")
                let tblcol5 = document.createElement("td")
                let tblcol6 = document.createElement("td")
                let tblcol7 = document.createElement("td")
                tblcol0.innerText = serial_no
                tblcol1.innerText = response.data.staff[i].stafferName
                tblcol2.innerText = response.data.staff[i].email
                tblcol3.innerText = response.data.staff[i].gender
                tblcol4.innerText = response.data.staff[i].address
                tblcol5.innerText = response.data.staff[i].phoneNumber
                tblcol6.innerText = response.data.staff[i].role
                tblcol7.innerText = response.data.staff[i].isAdmin
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
    let serial_no = 0;
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
            tProgrammeHeading.style.display = "inline-block";
            tProgrammeHeading.innerHTML = "Programme";
            tProgrammeHeading.style.borderBottom = "none";
            for (let i = 0; i < response.data.teachers.length; i++) {
                serial_no++;
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
                tblcol0.innerText = serial_no;
                tblcol1.innerText = response.data.teachers[i].stafferName
                tblcol2.innerText = response.data.teachers[i].email
                tblcol3.innerText = response.data.teachers[i].gender
                tblcol4.innerText = response.data.teachers[i].address
                tblcol5.innerText = response.data.teachers[i].phoneNumber
                tblcol6.innerText = response.data.teachers[i].role
                tblcol7.innerText = response.data.teachers[i].isAdmin
                tblcol8.innerText = response.data.teachers[i].teacherClass
                tblcol9.innerText = response.data.teachers[i].teacherProgramme
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
    // page = displayAllStudents(1)
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
    <option value="tamhidi">tamhidi</option>
    <option value="hadoonah">hadoonah</option>
    <option value="rawdoh">rawdoh</option>
    <option value="awwal ibtidaahiy">awwal ibtidaahiy</option>
    <option value="thaani ibtidaahiy">thaani ibtidaahiy</option>
    <option value="thaalith ibtidaahiy">thaalith ibtidaahiy</option>
    <option value="raabi ibtidaahiy">raabi ibtidaahiy</option>
    <option value="khaamis ibtidaahiy">khaamis ibtidaahiy</option>
    <option value="awwal idaadiy">awwal idaadiy</option>
    <option value="thaani idaadiy">thaani idaadiy</option>
    <option value="thaalith idaadiy">thaalith idaadiy</option>
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
                 <option value="barnamij">Barnamij</option>
               </select>`
    }
    else if (studSearchKey.value == "studentStatus") {
        searchMe.innerHTML = ""
    }
    else if (studSearchKey.value == "presentClass") {
        searchMe.innerHTML =
            `<select id="searchstud-presentclass">
    <option value="tamhidi">tamhidi</option>
    <option value="hadoonah">hadoonah</option>
    <option value="rawdoh">rawdoh</option>
    <option value="awwal ibtidaahiy">awwal ibtidaahiy</option>
    <option value="thaani ibtidaahiy">thaani ibtidaahiy</option>
    <option value="thaalith ibtidaahiy">thaalith ibtidaahiy</option>
    <option value="raabi ibtidaahiy">raabi ibtidaahiy</option>
    <option value="khaamis ibtidaahiy">khaamis ibtidaahiy</option>
    <option value="awwal idaadiy">awwal idaadiy</option>
    <option value="thaani idaadiy">thaani idaadiy</option>
    <option value="thaalith idaadiy">thaalith idaadiy</option>
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
                    viewStudentsPresentClass.style.display = "none";
                    tblcol13.style.display = "none";
                    // add status to table heading for the first student iteration only, to avoid duplication
                    if (i == 0) {
                        let tblheadstatus = document.createElement("th");
                        tblheadstatus.innerText = "Status"
                        viewStudentsTableHead.appendChild(tblheadstatus)
                    }
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

//close student form
closeStdFrmLink.addEventListener("click", (e) => {
    e.preventDefault();
    addStudentForm.style.display = "none"
});

// redirect to teacher's portal to be able to add scores for student
addStudentScores.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "https://riyadarabicschool.netlify.app/frontend/teacherPortal.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/teacherPortal.html"
});


// ***************************************************************************************
// SECTION 2 - EDIT, PROMOTE, REMOVE ....
// ***************************************************************************************
const editStaffQueryForm = document.getElementById('staffedit-queryform')
const closeEditButtonIcon = document.getElementById('editstfclose-icon')
const closeRemoveButtonIcon = document.getElementById('removestfclose-icon')
const closeAssignButtonIcon = document.getElementById('assignteacherclose-icon')
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
const submitDeAssignTeacher = document.getElementById('submitdeassignteacher-btn')

const updateStaffForm = document.getElementById('staffupdate-form')
const assignTeacherForm = document.getElementById('teacherassign-form')
const removeStaffForm = document.getElementById('staffremove-form')
const cancelUpdateButton = document.getElementById('cancelupdate-btn')
const closeUpdateButton = document.getElementById('closeupdate-btn')
const UpdateButton = document.getElementById('update-btn')

const staffEmailUpdate = document.getElementById("upd-staffemail")
const staffNameUpdate = document.getElementById("upd-staffname")
const staffGenderUpdate = document.getElementById("upd-staffgender")
const staffAddressUpdate = document.getElementById("upd-staffaddress")
const staffPhoneUpdate = document.getElementById("upd-staffphone")
const staffRoleUpdate = document.getElementById("upd-staffrole")
const staffOtherRoleUpdate = document.getElementById("upd-staffotherrole")
const classLabelUpdate = document.getElementById("upd-classlabel")
const teacherClassUpdate = document.getElementById("upd-teacherclass")
const programmeLabelUpdate = document.getElementById("upd-programmelabel")
const teacherProgrammeUpdate = document.getElementById("upd-teacherprogramme")
const updateItTeacherClass = document.getElementById("updateit-teacherclass")
const updateItTeacherProgramme = document.getElementById("updateit-teacherprogramme")

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
            staffOtherRoleUpdate.value = response.data.user.otherRole
            teacherClassUpdate.value = response.data.staffer.teacherClass;
            teacherProgrammeUpdate.value = response.data.staffer.teacherProgramme;

            if (response.data.staffer.role == "teacher") {
                classLabelUpdate.style.display = "block";
                teacherClassUpdate.style.display = "block";
                updateItTeacherClass.style.display = "block";
                programmeLabelUpdate.style.display = "block";
                teacherProgrammeUpdate.style.display = "block";
                updateItTeacherProgramme.style.display = "block";
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
            staffOtherRoleUpdate.value = "";
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
    let other_role = staffOtherRoleUpdate.value;
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
        other_role,
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

//click assign teacher button
submitAssignTeacher.addEventListener("click", (e) => {
    e.preventDefault();
    const email = teacherEmailToAssign.value;
    const teacherClass = assignTeacherClassSelect.value;
    const teacherProgramme = assignTeacherProgrammeSelect.value;
    if (email == "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Input a valid email"
        });
    }
    else {
        const formData = {
            email,
            teacherClass,
            teacherProgramme
        }
        assignTeacher(formData);
    }
});

//click deassign teacher button
submitDeAssignTeacher.addEventListener("click", (e) => {
    e.preventDefault();
    const email = teacherEmailToAssign.value;
    const teacherClass = assignTeacherClassSelect.value;
    const teacherProgramme = assignTeacherProgrammeSelect.value;
    if (email == "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Input a valid email"
        });
    }
    else {
        const formData = {
            email,
            teacherClass,
            teacherProgramme
        }
        deassignTeacher(formData);
    }
});

// deassign staff as teacher from a class
const deassignTeacher = (staffInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/staff/deassignTeacher`, staffInfo, {
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

// close assignteacher query form
closeAssignButtonIcon.addEventListener("click", (e) => {
    e.preventDefault();
    assignTeacherForm.style.display = "none";
    teacherEmailToAssign.value = "";
});


const promoteStudentsButtonIcon = document.getElementById('promotestudents-closeicon')
const promoteStudentsForm = document.getElementById('promotestudents-form')
const promoteStudentsSessionLabel = document.getElementById("promotestudents-sessionlabel")
const promoteStudentsSessionSelect = document.getElementById("promotestudents-sessionselect")
const promoteStudentsProgrammeSelect = document.getElementById("promotestudents-programmeselect")
const promoteStudentsChoiceSelect = document.getElementById("promotestudents-choiceselect")
const promoteStudentsAdmissionNumberLabel = document.getElementById("promotestudents-admnolabel")
const promoteStudentsAdmissionNumber = document.getElementById("promotestudents-admno")
const promoteStudentsMinScoreLabel = document.getElementById("promotestudents-minscorelabel")
const promoteStudentsMinScore = document.getElementById("promotestudents-minscore")
const promoteStudentsSubmitButton = document.getElementById("promotestudents-btn")
const demoteStudentsSubmitButton = document.getElementById("demotestudents-btn")


//promote one student who meet the criteria or on probation
const promoteStudentsOne = (studInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/student/promoteOneStudent`, studInfo, {
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

//promote all students who meet the criteria
const promoteStudents = (sessionInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/student/promoteStudents`, sessionInfo, {
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

// click to make a choice of students to promote
promoteStudentsChoiceSelect.addEventListener("change", (e) => {
    e.preventDefault();
    if (promoteStudentsChoiceSelect.value == "all") {
        promoteStudentsAdmissionNumberLabel.style.display = "none";
        promoteStudentsAdmissionNumber.style.display = "none";
        promoteStudentsMinScoreLabel.style.display = "block";
        promoteStudentsMinScore.style.display = "block";
        promoteStudentsSessionLabel.style.display = "block";
        promoteStudentsSessionSelect.style.display = "block";

    }
    else if (promoteStudentsChoiceSelect.value == "one") {
        promoteStudentsAdmissionNumberLabel.style.display = "block";
        promoteStudentsAdmissionNumber.style.display = "block";
        promoteStudentsMinScoreLabel.style.display = "none";
        promoteStudentsMinScore.style.display = "none";
        promoteStudentsSessionLabel.style.display = "none";
        promoteStudentsSessionSelect.style.display = "none";
    }
});

// click promote students link to display form
promoteStudentsLink.addEventListener("click", (e) => {
    e.preventDefault();
    promoteStudentsForm.style.display = "block";
    sidebar.style.display = "none";
});

// click promote students button to promote students
promoteStudentsSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const promotionChoice = promoteStudentsChoiceSelect.value;
    const sessionName = promoteStudentsSessionSelect.value;
    const admNo = promoteStudentsAdmissionNumber.value;
    const minscore = promoteStudentsMinScore.value;
    const programme = promoteStudentsProgrammeSelect.value;

    if (promotionChoice == "all" && minscore == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Check that you have valid inputs for all fields"
        });
    }
    else if (promotionChoice == "one" && admNo == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Admission number cannot be empty"
        });
    }
    else {
        const formData = {
            programme,
            sessionName,
            minscore
        }
        const formDataOne = {
            admNo,
            programme
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
                if (promotionChoice == "all") promoteStudents(formData)
                else promoteStudentsOne(formDataOne);
            }
        });
    }

});

// click demote students button to demote students
demoteStudentsSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const sessionName = promoteStudentsSessionSelect.value;
    const admNo = promoteStudentsAdmissionNumber.value;
    const programme = promoteStudentsProgrammeSelect.value;

    if (promoteStudentsChoiceSelect.value == "all") {
        Swal.fire({
            icon: "error",
            title: "Invalid Request",
            text: "You cannot demote all students at once"
        });
    }
    else if (admNo == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Admission number cannot be empty"
        });
    }
    else {
        const formDataOne = {
            admNo,
            programme
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, demote student"
        }).then((result) => {
            if (result.isConfirmed) {
                demoteStudent(formDataOne);
            }
        });
    }
});

//demote a student
const demoteStudent = (studInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/student/demoteStudent`, studInfo, {
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

// close promote students form
promoteStudentsButtonIcon.addEventListener("click", (e) => {
    e.preventDefault();
    promoteStudentsAdmissionNumber.value = "";
    promoteStudentsMinScore.value = "";
    promoteStudentsForm.style.display = "none";
});

// VIEW CLASS ASSIGNED TO STAFF***************************************************************
// ****************************************************************************
const viewAssignedClassesLink = document.getElementById("viewclassesassigned-link");
const assignedClassesForm = document.getElementById("classesassigned-form");
const assignedClassesCloseIcon = document.getElementById("assignedclassesclose-icon");
const stafferEmailForClassesAssigned = document.getElementById("classesassignedto-staffemail");
const submitViewAssignedClasses = document.getElementById("viewassignedclasses-btn");
const assignedClassesTblBody = document.getElementById("assignedclasses-tblbody");

// display assignteacher query form
viewAssignedClassesLink.addEventListener("click", (e) => {
    e.preventDefault();
    assignedClassesForm.style.display = "block"
    sidebar.style.display = "none";
});

// get classes assigned to staffer
const getAssignedClasses = (email) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/staff/getClassesAssigned/?email=${email}`, {
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
            stafferEmailForClassesAssigned.value = "";
            assignedClassesTblBody.innerHTML = "";

            //append classes assigned to table
            for (k = 0; k < response.data.assignedClasses.length; k++) {
                let tblrow = document.createElement("tr")
                let tblcolotherclass = document.createElement("td")
                tblcolotherclass.innerText = response.data.assignedClasses[k].class
                let tblcolotherprg = document.createElement("td")
                tblcolotherprg.innerText = response.data.assignedClasses[k].programme
                tblrow.appendChild(tblcolotherclass)
                tblrow.appendChild(tblcolotherprg)
                assignedClassesTblBody.appendChild(tblrow)
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

//click get assigned classes button
submitViewAssignedClasses.addEventListener("click", (e) => {
    e.preventDefault();
    assignedClassesTblBody.innerHTML = "";
    const email = stafferEmailForClassesAssigned.value;
    if (email == "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Input a valid email"
        });
    }
    else getAssignedClasses(email);
});

// close view assigned classes form
assignedClassesCloseIcon.addEventListener("click", (e) => {
    e.preventDefault();
    assignedClassesForm.style.display = "none";
    stafferEmailForClassesAssigned.value = "";
    assignedClassesTblBody.innerHTML = "";
});

// ****************************************************


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



// ************************** STUDENTS *****************************************
const editStudentLink = document.getElementById('edit-students')
const updateStudentForm = document.getElementById('studentupdate-form')
const cancelStudentUpdateButton = document.getElementById('clearstdupdfrm-btn')
const closeStudentUpdateButton = document.getElementById('closestdupdfrm-btn')
const UpdateStudentButton = document.getElementById('studupd-btn')
const studentStatusUpdateButton = document.getElementById('statusupd-btn')
const editStudentStatusButton = document.getElementById('editstudentstatus-btn')
const editStudentStatusCloseIcon = document.getElementById('editstudentstatus-closeicon')
const editStudentStatusForm = document.getElementById('editstudentstatus-form')
const admNoForNonStudentStatus = document.getElementById('admnofor-nonstudentstatus')
const selectForNonStudentStatus = document.getElementById('nonstudentstatus-select')
const selectForStudentStatus = document.getElementById('studentstatus-select')
const goArrow = document.getElementById('go_arrow')

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

//submit studentupdate query form on pressing Enter key
studentAdmNoToEdit.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.code === "Enter" && studentAdmNoToEdit.value != "") {
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

//submit studentupdate query form on clicking go arrow
goArrow.addEventListener("click", (e) => {
    e.preventDefault();
    if (studentAdmNoToEdit.value != "") {
        const admNo = studentAdmNoToEdit.value;
        const formData = {
            admNo
        }
        QueryStudentUpdate(formData);
    }
    else if (studentAdmNoToEdit.value == "") {
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

// click edit status button on the main edit page to display the edit form
studentStatusUpdateButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (studentAdmNoToEdit.value == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "You need to input the student's admission number"
        });
    }
    else {
        editStudentStatusForm.style.display = "block";
        admNoForNonStudentStatus.value = studentAdmNoToEdit.value;
        studentAdmNoToEdit.value = "";
        updateStudentForm.style.display = "none";
        sidebar.style.display = "none";
    }
});

// close edit students status form
editStudentStatusCloseIcon.addEventListener("click", (e) => {
    e.preventDefault();
    editStudentStatusForm.style.display = "none";
});


// update student status
const editStudentStatus = (admNo, studentstatus) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/student/updateStatus/?admNo=${admNo}`, studentstatus, {
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
            admNoForNonStudentStatus.value = "";
            selectForNonStudentStatus.value = "";
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

// click edit status button to update student status
selectForStudentStatus.addEventListener("change", (e) => {
    e.preventDefault();
    const status = selectForStudentStatus.value
    if (status == "current") {
        selectForNonStudentStatus.setAttribute("disabled", true)
    }
    else if (status == "past") {
        selectForNonStudentStatus.removeAttribute("disabled")
    }
});

// click edit status button to update student status
editStudentStatusButton.addEventListener("click", (e) => {
    e.preventDefault();
    const admNo = admNoForNonStudentStatus.value
    const status = selectForStudentStatus.value
    const statusReason = selectForNonStudentStatus.value
    const formdata = {
        status,
        statusReason
    }
    if (admNo == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "You need to input the student's admission number"
        });
    }
    else
        editStudentStatus(admNo, formdata)
});


// ************************************************************************
// ADD OR REMOVE CLASS
// *************************************************************************

const classAddLink = document.getElementById("add-class");
const classAddForm = document.getElementById("classadd-form");
const classAddCloseButton = document.getElementById("addclassclose-icon");
const classnameForClassAdd = document.getElementById("addclass-classname");
const programmeForClassAdd = document.getElementById("addclass-programme");
const classAddSubmitButton = document.getElementById("submitaddclass-btn");
const classRemoveSubmitButton = document.getElementById("submitremoveclass-btn");

// display class add/remove form
classAddLink.addEventListener("click", (e) => {
    e.preventDefault();
    classAddForm.style.display = "block"
    sidebar.style.display = "none";
});

// close class add/remove form
classAddCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    classAddForm.style.display = "none";
    classnameForClassAdd.value = ""
    programmeForClassAdd.value = ""
});

// add a class
const addClass = (classInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/class/addClass/`, classInfo,
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

// submit request to add class
classAddSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const className = classnameForClassAdd.value;
    const programme = programmeForClassAdd.value;
    if (className == "" || programme == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "Check that you have inputted both the classname and programme"
        });
    }
    else {
        const formdata = {
            className,
            programme
        }
        addClass(formdata)
    }
});

// remove a class
const removeClass = (payload) => {
    let errorMsg;
    axios
    .delete(`${baseUrl}/class/removeClass/`,
        {
                data: payload,
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

// submit request to remove class
classRemoveSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const className = classnameForClassAdd.value;
    const programme = programmeForClassAdd.value;
    if (className == "" || programme == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "Check that you have inputted both the classname and programme"
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
                removeClass(formData);
            }
        });
    }
    const formData = {
         className,
         programme
    }
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
const principalCommentDiv = document.getElementById("pcomment-div")
const principalComment = document.getElementById("principalcomment")
const addPrincipalCommentBtn = document.getElementById("addprincipalcomment-btn")
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

// submit request to add principal's comment
addPrincipalCommentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const admNo = admissionNumberForReport.value;
    const term = termForReport.value;
    const session = sessionForReport.value;
    const ameedComment = principalComment.value;

    if (admNo == "" || session == "" || term == "" || ameedComment == "") {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please fill out all required fields"
        });
    }
    else {
        const formdata = {
            ameedComment
        }
        addPrincipalComment(admNo, term, session, formdata)
    }
});

// add principal comment
const addPrincipalComment = (admNo, term, session, comment) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/scores/addComment/?admNo=${admNo}&termName=${term}&sessionName=${session}`, comment,
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


//  **************************** WEEKLY ATTENDANCE REPORT *********************************
// ********************************************************************************************
const wklyAttendanceForm = document.getElementById("wklyattendance-form")
const closeWklyAttendanceFormBtn = document.getElementById("wklyattendance-icon")
const viewWklyAttendanceReportLink = document.getElementById("weeklyattendance")
const classnameForWklyAttendance = document.getElementById("classname-forwklyattendancereport")
const programmeForWklyAttendance = document.getElementById("programme-forwklyattendancereport")
const termForWklyAttendance = document.getElementById("term-forwklyattendancereport")
const sessionForWklyAttendance = document.getElementById("session-forwklyattendancereport")
const tableWklyAttendance = document.getElementById("wklyattendancereport-table")
const tableHeadWklyAttendance = document.getElementById("wklyattendance-tblhead")
const tableBodyForWklyAttendance = document.getElementById("wklyattendance-tblbody")
const viewWklyAttendanceReportButton = document.getElementById("viewwklyattendancereport-btn")
const deleteAttendanceButton = document.getElementById("deleteattendance-btn")
const wklyAttendanceLabel = document.getElementById("wklyattendance-label")


// open weekly attendance report form
viewWklyAttendanceReportLink.addEventListener("click", (e) => {
    e.preventDefault();
    wklyAttendanceForm.style.display = "block";
    sidebar.style.display = "none";
});

// close weekly attendance report form
closeWklyAttendanceFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tableBodyForWklyAttendance.innerHTML = "";
    tableHeadWklyAttendance.innerHTML = "";
    wklyAttendanceLabel.style.display = "none";
    tableWklyAttendance.style.display = "none";
    wklyAttendanceForm.style.display = "none";
});

// display weekly attendance report
const displayWklyAttendanceReport = (classname, programme, term, session) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/attendance/viewAttendance/?className=${classname}&programme=${programme}&termName=${term}&sessionName=${session}`,
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
            tableWklyAttendance.style.display = "block"
            wklyAttendanceLabel.style.display = "block"
            let atdtblrowhead = document.createElement("tr")
            let atdtblserialnohead = document.createElement("th")
            let atdtbladmnohead = document.createElement("th")
            let atdtblnamehead = document.createElement("th")
            atdtblserialnohead.innerText = "Serial No"
            atdtbladmnohead.innerText = "Admission No"
            atdtblnamehead.innerText = "Name"
            atdtblrowhead.appendChild(atdtblserialnohead)
            atdtblrowhead.appendChild(atdtbladmnohead)
            atdtblrowhead.appendChild(atdtblnamehead)
            tableHeadWklyAttendance.appendChild(atdtblrowhead)

            for (let i = 0; i < response.data.attendanceExists.length; i++) {
                let atdtblrow = document.createElement("tr")
                let atdtblserialno = document.createElement("th")
                let atdtbladmno = document.createElement("td")
                let atdtblname = document.createElement("td")
                atdtblserialno.innerText = i + 1
                atdtbladmno.innerText = response.data.attendanceExists[i].admissionNumber
                atdtblname.innerText = response.data.attendanceExists[i].student_name
                atdtblrow.appendChild(atdtblserialno)
                atdtblrow.appendChild(atdtbladmno)
                atdtblrow.appendChild(atdtblname)

                //attendance
                const requestedsessionatd = response.data.attendanceExists[i].attendanceRecord.find(asession => asession.sessionName == session)
                const requestedtermatd = requestedsessionatd.term.find(aterm => aterm.termName == term)
                if (i == 0) {  //adding term dates as heading for attendance table
                    for (let k = 0; k < requestedtermatd.attendance.length; k++) {
                        const dateToAdd = requestedtermatd.attendance[k].termdate
                        let tbldate = document.createElement("th")
                        tbldate.innerText = dateToAdd
                        atdtblrowhead.appendChild(tbldate)
                    }
                }
                for (let k = 0; k < requestedtermatd.attendance.length; k++) {
                    const presentStatus = requestedtermatd.attendance[k].presence
                    let tblpresence = document.createElement("td")
                    if (presentStatus == 'yes') {
                        tblpresence.innerText = "Present"
                        tblpresence.style.backgroundColor = "#368014"
                        tblpresence.style.color = "#ffffff"
                    }
                    else {
                        tblpresence.innerText = "-"
                        tblpresence.style.backgroundColor = "#970202"
                        tblpresence.style.color = "#FFFFFF"
                    }
                    atdtblrow.appendChild(tblpresence)
                }
                tableBodyForWklyAttendance.appendChild(atdtblrow)
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
             tableWklyAttendance.style.display = "none";
        });
};

// display weekly attendance on click of button
viewWklyAttendanceReportButton.addEventListener("click", (e) => {
    e.preventDefault();
    tableBodyForWklyAttendance.innerHTML = "";
    tableHeadWklyAttendance.innerHTML = "";
    wklyAttendanceLabel.style.display = "none";
    const className = classnameForWklyAttendance.value
    const programme = programmeForWklyAttendance.value
    const sessionName = sessionForWklyAttendance.value
    const termName = termForWklyAttendance.value

    if (programme == "select a programme" || className == "select a class") {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Check the programme or class you entered"
        });
    }
    else
        displayWklyAttendanceReport(className, programme, termName, sessionName)
});

// clear table body when class is changed
classnameForWklyAttendance.addEventListener("change", (e) => {
    e.preventDefault();
    tableBodyForWklyAttendance.innerHTML = "";
    tableHeadWklyAttendance.innerHTML = "";
    tableWklyAttendance.style.display = "none";
    wklyAttendanceLabel.style.display = "none";
});

// delete attendance
const deleteAttendance = (programme, term, session) => {
    let errorMsg;
    axios
        .delete(`${baseUrl}/attendance/deleteTermAttendance/?programme=${programme}&termName=${term}&sessionName=${session}`,
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

// display weekly attendance on click of button
deleteAttendanceButton.addEventListener("click", (e) => {
    e.preventDefault();
    tableBodyForWklyAttendance.innerHTML = "";
    tableHeadWklyAttendance.innerHTML = "";
    wklyAttendanceLabel.style.display = "none";
    const programme = programmeForWklyAttendance.value
    const sessionName = sessionForWklyAttendance.value
    const termName = termForWklyAttendance.value

    if (programme == "select a programme") {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Check the programme or class you entered"
        });
    }
    else {
        Swal.fire({
            title: "Are you sure?",
            text: `You're about to delete ${termName} term ${sessionName} attendance for ${programme}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAttendance(programme, termName, sessionName)
            }
        });

    }
});


// ***************************************** CLASS REPORT ***************************
// **********************************************************************************
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
const downloadClassReportButton = document.getElementById("downloadclassreport-btn")
const ameedCommentonReportButton = document.getElementById("ameedcomment-btn")
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
            let tblcomment = document.createElement("th")
            tblmarksobtained.innerText = "Mark Obtained"
            tblavgpercentage.innerText = "Average Percentage"
            tblcomment.innerText = "Ameed's Comment"
            tableHeadRowClassReport.appendChild(tblmarksobtained)
            tableHeadRowClassReport.appendChild(tblavgpercentage)
            tableHeadRowClassReport.appendChild(tblcomment)

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

                const requestedsession = response.data.classExists[i].scores.find(asession => asession.sessionName == session)
                const requestedterm = requestedsession.term.find(aterm => aterm.termName == term)
                if (!requestedterm) continue;  //if student has no report for the term, continue to the next
                for (let k = 3; k < tableHeadRowClassReport.children.length - 3; k++) {
                    const subjectToAdd = requestedterm.subjects.find(asubject => asubject.subjectName == tableHeadRowClassReport.children[k].innerText)
                    let tbltotalscore = document.createElement("td")
                    if (subjectToAdd == undefined) { tbltotalscore.innerText = "" }
                    else tbltotalscore.innerText = subjectToAdd.totalScore
                    tblrow.appendChild(tbltotalscore)
                }
                let tblmark = document.createElement("td")
                let tblpercentage = document.createElement("td")
                tblmark.innerText = requestedterm.marksObtained.toFixed(2)
                tblpercentage.innerText = requestedterm.avgPercentage.toFixed(2)
                tblrow.appendChild(tblmark)
                tblrow.appendChild(tblpercentage)
               
                tableBodyForClassReport.appendChild(tblrow)
            }
            // Sort the class report table according to average percentage descending
            let classAverages = []
            for (n = 0; n <= tableBodyForClassReport.childElementCount - 1; n++) {
                classAverages.push(tableBodyForClassReport.children[n].lastElementChild.innerText)
            }
            let sorted_array = classAverages.sort((a, b) => b - a);
            let newClassReportTable = document.createElement("tbody")
            for (let n = 0; n <= sorted_array.length; n++) {
                for (let m = 0; m <= tableBodyForClassReport.childElementCount - 1; m++) {
                    if (tableBodyForClassReport.children[m].lastElementChild.innerText == sorted_array[n]) {
                        tableBodyForClassReport.children[m].firstElementChild.innerText = n + 1
                        newClassReportTable.appendChild(tableBodyForClassReport.children[m])
                    }
                }
            }
            tableBodyForClassReport.innerHTML = newClassReportTable.innerHTML

            // add comment dropdown to each student row in the report
            for (let p = 0; p <= tableBodyForClassReport.childElementCount - 1; p++){
                let tblpcomment = document.createElement("td")
                tableBodyForClassReport.children[p].appendChild(tblpcomment)
                tableBodyForClassReport.children[p].lastElementChild.innerHTML = `<select id="amdcomment">
                     <option value="نشاط ممتاز، بارك الله فيك. An excellent result keep it up.">نشاط ممتاز، بارك الله فيك. An excellent result keep it up</option>
                     <option value="نشاط جيد جداً، يمكنك الحصول على درجات أعلى في الفترة المقبلة. A very good result, you can score higher next term.">نشاط جيد جداً، يمكنك الحصول على درجات أعلى في الفترة المقبلة. A very good result, you can score higher next term.</option>
                     <option value="نشاط جيد، يمكنك الحصول على درجات أعلى في الفترة المقبلة. A good result, you can score higher next term.">نشاط جيد، يمكنك الحصول على درجات أعلى في الفترة المقبلة. A good result, you can score higher next term.</option>
                     <option value="نشاط لا بأس به، اهتم بدرسك. An average result, pay attention to your studies.">نشاط لا بأس به، اهتم بدرسك. An average result, pay attention to your studies.</option>
                     <option value="نشاط ضعيف، اهتم بدرسك.  A poor result, pay attention to your studies.">نشاط ضعيف، اهتم بدرسك.  A poor result, pay attention to your studies.</option>
                     <option value="نشاط ضعيف جداً، اهتم بدرسك. A very poor result, pay attention to your studies.">نشاط ضعيف جداً، اهتم بدرسك. A very poor result, pay attention to your studies.</option>
                     <option value="انتقل إلى الفصل التالي. Promoted to the next class.">انتقل إلى الفصل التالي. Promoted to the next class.</option>
                     <option value="انتقلي إلى الفصل التالي. Promoted to the next class">انتقلي إلى الفصل التالي. Promoted to the next class.</option>
                     <option value="سيعيد الفصل. To repeat the class.">سيعيد الفصل. To repeat the class.</option>
                     <option value="ستعيد الفصل. To repeat the class.">ستعيد الفصل. To repeat the class.</option>
                  </select>`
            }

            //for attendance
            for (let i = 0; i < response.data.attendanceExists.length; i++) {
                let atdtblrow = document.createElement("tr")
                let atdtblserialno = document.createElement("th")
                let atdtbladmno = document.createElement("td")
                let atdtblname = document.createElement("td")
                atdtblserialno.innerText = i + 1
                atdtbladmno.innerText = response.data.attendanceExists[i].admissionNumber
                atdtblname.innerText = response.data.attendanceExists[i].student_name
                atdtblrow.appendChild(atdtblserialno)
                atdtblrow.appendChild(atdtbladmno)
                atdtblrow.appendChild(atdtblname)

                //attendance
                const requestedsessionatd = response.data.attendanceExists[i].attendanceRecord.find(asession => asession.sessionName == session)
                const requestedtermatd = requestedsessionatd.term.find(aterm => aterm.termName == term)
                if (i == 0) {  //adding term dates as heading for attendance table
                    for (let k = 0; k < requestedtermatd.attendance.length; k++) {
                        const dateToAdd = requestedtermatd.attendance[k].termdate
                        let tbldate = document.createElement("th")
                        tbldate.innerText = dateToAdd
                        attendanceTableHeadRow.appendChild(tbldate)
                    }
                }
                for (let k = 0; k < requestedtermatd.attendance.length; k++) {
                    const presentStatus = requestedtermatd.attendance[k].presence
                    let tblpresence = document.createElement("td")
                    if (presentStatus == 'yes') {
                        tblpresence.innerText = "ح"
                    }
                    else {
                        tblpresence.innerText = "-"
                    }
                    atdtblrow.appendChild(tblpresence)
                }
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

//add principal's comment for students in a class at once
const addAmeedComment = ({...stdcomments}, classname, term, session) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/scores/addComments/?className=${classname}&termName=${term}&sessionName=${session}`, stdcomments, {
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

// add comment for students via class report on click of button
ameedCommentonReportButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (tableBodyForClassReport.childElementCount == "") {
        Swal.fire({
            icon: "error",
            title: "Invalid Request",
            text: "No class report dsiplayed"
        });
    }
    else {
    const className = classnameForReportSelect.value
    const sessionName = sessionForClassReport.value
    const termName = termForClassReport.value
    let stdscomments = []
    let formdata = {
        stdscomments
    }
    for (let count = 0; count < tableBodyForClassReport.childElementCount; count++) {
        let admNoTD = tableBodyForClassReport.children[count].firstElementChild.nextElementSibling;
        let admNo = admNoTD.innerText;
        let commentTD = tableBodyForClassReport.children[count].lastElementChild.firstElementChild
        let comment = commentTD.value
        let stdcomment = {
            admNo,
            comment
        }
        stdscomments.push(stdcomment)
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You are about to add comments for students of this class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add the comments"
    }).then((result) => {
        if (result.isConfirmed) {
           addAmeedComment(formdata, className, termName, sessionName)
        }
    });
}
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

// download class report
downloadClassReportButton.addEventListener("click", (e) => {
    e.preventDefault();
    const className = classnameForReportSelect.value
    const programme = programmeForReportSelect.value
    const sessionName = sessionForClassReport.value
    const termName = termForClassReport.value
    if (tableBodyForClassReport.childElementCount == "") {
        Swal.fire({
            icon: "error",
            title: "Invalid Request",
            text: "Click the view report button to display the report before downloading"
        });
    }
    else
        tableToCSV(className, programme, sessionName, termName)
});

function tableToCSV(className, programme, sessionName, termName) {

    // Variable to store the final csv data
    let csv_data = [];
    // Get the table head row data, then each column data  and 
    let rowshead = tableHeadRowClassReport.children;
    let csvrow = [];
    for (let k = 0; k < rowshead.length-1; k++) {
        csvrow.push(rowshead[k].innerText);
    }
    // Combine each column value with comma
    csv_data.push(csvrow.join(","));


    // Get each table body row data
    let rows = tableBodyForClassReport.children;
    for (let i = 0; i < rows.length; i++) {
        // Get each column data
        let cols = rows[i].children;

        // Stores each csv row data
        let csvrow = [];
        for (let j = 0; j < cols.length-1; j++) {

            // Get the text data of each cell of
            // a row and push it to csvrow
            csvrow.push(cols[j].innerText);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }
    // Combine each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file  
    downloadCSVFile(csv_data, className, programme, sessionName, termName);
}

function downloadCSVFile(csv_data, className, programme, sessionName, termName) {
    // Create CSV file object and feed our
    // csv_data into it
    CSVFile = new Blob([csv_data], { type: "text/csv" });

    // Create to temporary link to initiate
    // download process
    let temp_link = document.createElement('a');

    //create filename to reflect variables
    let filename = `${sessionName} ${termName} Term Report for ${className} ${programme}`

    // Download csv file
    temp_link.download = filename + ".csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to trigger download 
    temp_link.click();
    document.body.removeChild(temp_link);
}


// VIEW SUBJECTS***************************************************************
// ****************************************************************************
const viewClassSubjectsLink = document.getElementById("viewclassubjects-link");
const viewSubjectsFormCloseIcon = document.getElementById("subjectviewclose-icon");
const viewSubjectsForm = document.getElementById("subjectview-form");
const viewSubjectsClass = document.getElementById("viewsubject-classelect");
const viewSubjectsProgramme = document.getElementById("viewsubject-programmeselect");
const viewSubjectsSubmitButton = document.getElementById("viewsubjects-btn");
const viewSubjectsTableBody = document.getElementById("subjectsviewtblbody");


// click view subjects link to display form
viewClassSubjectsLink.addEventListener("click", (e) => {
    e.preventDefault();
    viewSubjectsForm.style.display = "block";
    sidebar.style.display = "none";
});

// close view subjects form
viewSubjectsFormCloseIcon.addEventListener("click", (e) => {
    e.preventDefault();
    viewSubjectsForm.style.display = "none";
});

//view class  subjects
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
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Successful! See subjects below"
            });
            for (k = 0; k < response.data.classExists.subjects.length; k++) {
                let tblrow = document.createElement("tr")
                let tblcol = document.createElement("td")
                tblcol.innerText = response.data.classExists.subjects[k]
                tblrow.appendChild(tblcol)
                viewSubjectsTableBody.appendChild(tblrow)
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

// click viewsubjects button
viewSubjectsSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    viewSubjectsTableBody.innerHTML = ""
    const className = viewSubjectsClass.value;
    const programme = viewSubjectsProgramme.value;
    if (viewSubjectsClass.value == "select one" || viewSubjectsProgramme.value == "select one") {
        Swal.fire({
            icon: "error",
            title: "Invalid input detected",
            text: "Please check that you selected a class and programme"
        });
    }
    else {
        getClassSubjects(className, programme)
    }
});

// EDIT SUBJECTS***************************************************************
// ****************************************************************************
const editSubjectsFormCloseIcon = document.getElementById("subjecteditclose-icon");
const editSubjectsForm = document.getElementById("subjectedit-form");
const editClassSubjectsLink = document.getElementById("editclassubjects-link");
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
    let subject = editSubjectsSubject.value;
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
    let subject = editSubjectsSubject.value;
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

// allow or deny other subject input
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
// SET ASSESSMENT
// *************************************************************************

const setAssessmentLink = document.getElementById("setassessment-link");
const setQuizForm = document.getElementById("setquiz-form");
const quizLink = document.getElementById("quizlink");
const setQuizButton = document.getElementById("setquiz-btn");
const editQuizButton = document.getElementById("editquiz-btn");
const clearQuizFormButton = document.getElementById("clearquizform-btn");
const closeQuizFormButton = document.getElementById("closequizform-btn");

// display set quiz form
setAssessmentLink.addEventListener("click", (e) => {
    e.preventDefault();
    setQuizForm.style.display = "block"
    sidebar.style.display = "none";
});

// close quiz form
closeQuizFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    setQuizForm.style.display = "none";
    quizLink.value = ""
});

// clear quiz form
clearQuizFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    quizLink.value = ""
});

// submit request to set quiz
setQuizButton.addEventListener("click", (e) => {
    e.preventDefault();
    const quizlink = quizLink.value;
    if (quizlink == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "Check that you have inputted a link for the quiz"
        });
    }
    else {
        const formData = {
            quizlink
        }
        setQuiz(formData);
    }
});

// submit request to edit quiz
editQuizButton.addEventListener("click", (e) => {
    e.preventDefault();
    const quizlink = quizLink.value;
    if (quizlink == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "You need to input the new link for the quiz"
        });
    }
    else {
        const formData = {
            quizlink
        }
        editQuiz(formData);
    }
});

// set quiz
const setQuiz = (quizInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/assessment/setQuiz/`, quizInfo,
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

// edit quiz
const editQuiz = (quizInfo) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/assessment/editQuiz/`, quizInfo,
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
const PDFdownloadbtn = document.getElementById("pdfdownload-btn")
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
//     for (i=0; i<detailRightArabic.length; i++){
//         detailRightArabic[i].style.display = "none"
//     }
//     for (j=0; j<arabicDetail.length; j++){
//         arabicDetail[j].style.display = "none"
//     }
//     window.jsPDF = window.jspdf.jsPDF;
//     var docPDF = new jsPDF(); 

// function downloadPDF(){
//     let pdfform = document.querySelector("#student-reportcard");
//     docPDF.html(pdfform, {
//         callback: function(docPDF) {
//             docPDF.save('result.pdf');
//         },
//         x: 15,
//         y: 15,
//         width: 170,
//         windowWidth: 650
//     });
// }
// downloadPDF()

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
            // set max height for signatures
            reportCardTeacherSignature.classList.add("signatureimages")
            reportCardPrincipalSignature.classList.add("signatureimages")
            reportCardProprietorSignature.classList.add("signatureimages")
            // to ensure signature is not loaded from cache, in case there's a change
            let timestamp = new Date().getTime();
            reportCardTeacherSignature.innerHTML = `<img crossorigin="anonymous" src= "${response.data.teacherSignature}?t= + ${timestamp}" alt="teacher signature" width="60">`
            reportCardPrincipalSignature.innerHTML = `<img crossorigin="anonymous" src= "${response.data.principalSign}?t= + ${timestamp}" alt="principal signature" width="60">`
            reportCardProprietorSignature.innerHTML = `<img crossorigin="anonymous" src= "${response.data.proprietorSign}?t= + ${timestamp}" alt="proprietor signature" width="60">`
    
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
                    ttblrow.appendChild(tblfirstterm)
                    ttblrow.appendChild(tblsecondterm)
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

// *********************************************************************************************
// SET CLASS DETAILS
// ************************************************************************************************
const setClassDetailsLink = document.getElementById("setclassdetails")
const setEOTDetailsForm = document.getElementById("class-detailsform")
const formToSubmitDetails = document.getElementById("form-classdetails")
const selectTaskForReport = document.getElementById("selecttask-forreportcard")
const selectProgrammeForReport = document.getElementById("selectprogramme-forreportcard")
const maxTermAttendance = document.getElementById("maxAttendance")
const nextTermBegins = document.getElementById("date-inputfield")
const imgFilePrincipal = document.getElementById("imgfileprincipal")
const imgFileProprietor = document.getElementById("imgfileproprietor")
const closeSign = document.getElementById("closesign")
const setDetailsButton = document.getElementById("setclassdetails-btn")
const closeDetailsButton = document.getElementById("closeclassdetails-btn")
let imagesArray = []


// display set card details form
setClassDetailsLink.addEventListener("click", (e) => {
    e.preventDefault();
    setEOTDetailsForm.style.display = "block"
    sidebar.style.display = "none";
});

// close set card details form
closeDetailsButton.addEventListener("click", (e) => {
    e.preventDefault();
    setEOTDetailsForm.style.display = "none";
});

// select task to perform for setting card details
selectTaskForReport.addEventListener("change", (e) => {
    e.preventDefault();
    if (selectTaskForReport.value == "maxattendance") {
        maxTermAttendance.removeAttribute("disabled")
        nextTermBegins.removeAttribute("disabled")
        imgFilePrincipal.setAttribute("disabled", true)
        imgFileProprietor.setAttribute("disabled", true)
    }
    else if (selectTaskForReport.value == "principalsign") {
        maxTermAttendance.setAttribute("disabled", true)
        maxTermAttendance.setAttribute("placeholder", "")
        nextTermBegins.setAttribute("disabled", true)
        imgFilePrincipal.removeAttribute("disabled")
        imgFileProprietor.setAttribute("disabled", true)
    }
    else if (selectTaskForReport.value == "proprietorsign") {
        maxTermAttendance.setAttribute("disabled", true)
        maxTermAttendance.setAttribute("placeholder", "")
        nextTermBegins.setAttribute("disabled", true)
        imgFilePrincipal.setAttribute("disabled", true)
        imgFileProprietor.removeAttribute("disabled")
    }
});

// preview signature chosen
function displayImages() {
    let images = ""
    const output = document.getElementById("output")
    imagesArray.forEach((image, index) => {
        images += `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                  <span id="closesign" onclick="deleteImage(${index})">&times;</span>
                </div>`
    })
    output.innerHTML = images
}
// request for signature preview when input for principal signature changes
imgFilePrincipal.addEventListener("change", () => {
    const file = imgFilePrincipal.files
    imagesArray.push(file[0])
    displayImages()
})
// request for signature preview when input for proprietor signature changes
imgFileProprietor.addEventListener("change", () => {
    const file = imgFileProprietor.files
    imagesArray.push(file[0])
    displayImages()
})

// delete signature chosen when cancel button is clicked
function deleteImage(index) {
    imagesArray.splice(index, 1)
    displayImages()
}

//set maximum attendance and next term begins
const setDetails = (formData, programme) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/staff/setDetails/?programme=${programme}`, formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                    // "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(function (response) {
            console.log(response);
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

//set principal's signature
const setPrincipalSignature = (formData, programme) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/class/principalSignature/?programme=${programme}`, formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(function (response) {
            console.log(response);
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

//set proprietor's signature
const setProproprietorSignature = (formData, programme) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/class/proprietorSignature/?programme=${programme}`, formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(function (response) {
            console.log(response);
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

// request to set details
formToSubmitDetails.addEventListener("submit", (e) => {
    e.preventDefault()
    const maxAttendance = maxTermAttendance.value;
    const nextTermDate = nextTermBegins.value;
    const programme = selectProgrammeForReport.value
    if (selectTaskForReport.value == "select a task") {
        Swal.fire({
            icon: "error",
            title: "Invalid input detected",
            text: "You have not selected any task"
        });
    }
    else if (selectProgrammeForReport.value == "select your programme") {
        Swal.fire({
            icon: "error",
            title: "Invalid input detected",
            text: "You have not selected any programme"
        });
    }
    else if (selectTaskForReport.value == "maxattendance" && (maxAttendance == "" || nextTermDate == "")) {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please check that you have inputs for each active field"
        });
    }
    else if (selectTaskForReport.value == "principalsign" && (imgFilePrincipal.value == "")) {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please check that you have inputs for principal's signature"
        });
    }
    else if (selectTaskForReport.value == "proprietorsign" && (imgFileProprietor.value == "")) {
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please check that you have inputs for proprietor's signature"
        });
    }
    else {
        const formData = new FormData(formToSubmitDetails);
        const formDataObj = {};
        formData.forEach((value, key) => (formDataObj[key] = value));
        if (selectTaskForReport.value == "principalsign") {
            setPrincipalSignature(formDataObj, programme)
        }
        else if (selectTaskForReport.value == "proprietorsign") {
            setProproprietorSignature(formDataObj, programme)
        }
        else if (selectTaskForReport.value == "maxattendance")
            setDetails(formDataObj, programme);
    }
});


// DELETE TERM SCORES ********************************************************************
const deleteScoresForm = document.getElementById("deletescores-form")
const closeDeleteScoresFormBtn = document.getElementById("deletescores-closeicon")
const deleteScoresLink = document.getElementById("deletescores")
const admNoForDeleteScores = document.getElementById("admno-fordeletescores")
const programmeForDeleteScores = document.getElementById("programme-fordeletescores")
const termForDeleteScores = document.getElementById("term-fordeletescores")
const sessionForDeleteScores = document.getElementById("session-fordeletescores")
const deleteScoresSubmitButton = document.getElementById("deletescores-btn")

// open delete scores form
deleteScoresLink.addEventListener("click", (e) => {
    e.preventDefault();
    deleteScoresForm.style.display = "block";
    sidebar.style.display = "none";
});

// close delete scores form
closeDeleteScoresFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    admNoForDeleteScores.value = "";
    deleteScoresForm.style.display = "none";
});

// delete scores
const deleteScores = (admNo, programme, term, session) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/scores/deleteScores/?admNo=${admNo}&programme=${programme}&termName=${term}&sessionName=${session}`,
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


// delete scores on click of button
deleteScoresSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const admNo = admNoForDeleteScores.value
    const programme = programmeForDeleteScores.value
    const sessionName = sessionForDeleteScores.value
    const termName = termForDeleteScores.value

    if (programme == "select a programme" || admNo == "") {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Check that you have valid inputs"
        });
    }
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
            deleteScores(admNo, programme, termName, sessionName)
        }
    });

});


// DELETE STUDENT ********************************************************************
//************************************************************************************
const deleteStudentForm = document.getElementById("deletestudent-form")
const closeDeleteStudentFormBtn = document.getElementById("deletestudent-closeicon")
const deleteStudentLink = document.getElementById("deletestudent")
const admNoForDeleteStudent = document.getElementById("admno-fordeletestudent")
// const programmeForDeleteStudent = document.getElementById("programme-fordeletestudent")
const deleteStudentSubmitButton = document.getElementById("deletestudent-btn")

// open delete student form
deleteStudentLink.addEventListener("click", (e) => {
    e.preventDefault();
    deleteStudentForm.style.display = "block";
    sidebar.style.display = "none";
});

// close delete student form
closeDeleteStudentFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    admNoForDeleteStudent.value = "";
    deleteStudentForm.style.display = "none";
});

// delete student
const deleteStudent = (admNo) => {
    let errorMsg;
    axios
        .delete(`${baseUrl}/student/deleteStudent/?admNo=${admNo}`,
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
            admNoForDeleteStudent.value = "";
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

// delete student on click of button
deleteStudentSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const admNo = admNoForDeleteStudent.value

    if (admNo == "") {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Check that you have valid input for admission number"
        });
    }
    else
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
                deleteStudent(admNo)
            }
        });

});


// ******************** DEMOTE STUDENTS FROM CLASS **************************************
// **************************************************************************************

const changeClassForm = document.getElementById("changeclass-form")
const changeClassCloseIcon = document.getElementById("changeclass-icon")
const changeClassLink = document.getElementById("changeclass")
const classnameForClassChangeSelect = document.getElementById("classname-fordemote")
const proposedClassForClassChangeSelect = document.getElementById("proposedclass-fordemote")
const programmeForClasssChangeSelect = document.getElementById("programme-fordemote")
const tableHeadClassChange = document.getElementById("changestdsclass-tblhead")
const tableHeadRowClassChange = document.getElementById("changestdsclass-tblheadrow")
const tableBodyForClassChange = document.getElementById("changestdsclass-tblbody")
const viewStudentsForClassChangeButton = document.getElementById("viewstdsforclasschange-btn")
const changeStudentsClassButton = document.getElementById("changestdsclass-btn")


// open class change form
changeClassLink.addEventListener("click", (e) => {
    e.preventDefault();
    changeClassForm.style.display = "block";
    sidebar.style.display = "none";
});

// view students in present class chosen
viewStudentsForClassChangeButton.addEventListener("click", (e) => {
    e.preventDefault();
    //clear table if already populated
    tableBodyForClassChange.innerHTML = "";
    tableHeadRowClassChange.innerHTML = "";
    tableHeadClassChange.innerHTML = "";
    let presentclass = classnameForClassChangeSelect.value;
    let programme = programmeForClasssChangeSelect.value;
    displayStudentsByClass(presentclass, programme)
});


// display students in class chosen
const displayStudentsByClass = (presentclass, programme) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/student/byClass/1/?presentClass=${presentclass}&programme=${programme}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            // studentTableBody.innerHTML = "";
            let studentNamesStore = [];
            for (let j = 0; j < response.data.students.length; j++) {
                // add student name and admission number to an array
                studentNamesStore[j] = {
                    admission_number: response.data.students[j].admNo,
                    student_name: response.data.students[j].firstName + " " + response.data.students[j].lastName
                }
            }
            //populate table with fresh data
            let tblserialnohead = document.createElement("th")
            let tbladmNohead = document.createElement("th")
            let tblnamehead = document.createElement("th")
            let tblpresent = document.createElement("th")
            tblserialnohead.innerText = "Serial No"
            tbladmNohead.innerText = "Adm No"
            tblnamehead.innerText = "Name"
            tblpresent.innerText = "Change Class"
            tableHeadRowClassChange.appendChild(tblserialnohead)
            tableHeadRowClassChange.appendChild(tbladmNohead)
            tableHeadRowClassChange.appendChild(tblnamehead)
            tableHeadRowClassChange.appendChild(tblpresent)
            for (let j = 0; j < studentNamesStore.length; j++) {
                let tblrow = document.createElement("tr")
                let tblserialno = document.createElement("th")
                let tblatdadmno = document.createElement("td")
                let tblname = document.createElement("td")
                let tblpresence = document.createElement("td")
                tblserialno.innerText = j + 1
                tblatdadmno.innerText = studentNamesStore[j].admission_number
                tblname.innerText = studentNamesStore[j].student_name
                tblpresence.innerHTML = `<i class="fa fa-check ispresenticon" id="ispresenticon"></i>`
                tblrow.appendChild(tblserialno)
                tblrow.appendChild(tblatdadmno)
                tblrow.appendChild(tblname)
                tblrow.appendChild(tblpresence)
                tableBodyForClassChange.appendChild(tblrow)
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

// click to indicate addition or removal of student from list of those to change class for
tableBodyForClassChange.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("fa-check")) {
        e.target.classList.remove("fa-check")
    }
    else if (e.target.firstElementChild.classList.contains("fa")) {
        e.target.innerHTML = `<i class="fa fa-check ispresenticon" id="ispresenticon"></i>`
    }

});

// close change class form
changeClassCloseIcon.addEventListener("click", (e) => {
    e.preventDefault();
    tableBodyForClassChange.innerHTML = "";
    tableHeadRowClassChange.innerHTML = "";
    tableHeadClassChange.innerHTML = "";
    changeClassForm.style.display = "none";
});

// change class 
const changeStudentsClass = (studsdata, proposedclass) => {
    let errorMsg;
    axios
        .patch(`${baseUrl}/student/changeClass/${proposedclass}`, studsdata,
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


// change class for students selected on click of button
changeStudentsClassButton.addEventListener("click", (e) => {
    e.preventDefault();
    let studentsList = []
    let admissionNumber;

    const proposedclass = proposedClassForClassChangeSelect.value

    for (let i = 0; i < tableBodyForClassChange.childElementCount; i++) {
        admissionNumber = tableBodyForClassChange.children[i].children[1].innerText
        if (tableBodyForClassChange.children[i].children[3].firstElementChild.classList.contains("fa-check")) {
            studentsList.push(admissionNumber)
        }
    }
    const formdata = {
        studentsList
    }
    changeStudentsClass(formdata, proposedclass)
});




// ************************************************************************
// logout
logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear()
    window.location.href = "https://riyadarabicschool.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
});

// ********************************************************************************
// TROUBLESHOOTING FOR DUPLICATES IN SCORES DATABASE
// ********************************************************************************
// const getduplicatesbtn = document.getElementById("duplicates")

// getduplicatesbtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     getDuplicates()
// });


// const getDuplicates = () => {
//     let errorMsg;
//     axios
//         .get(`${baseUrl}/scores/getDupl/`, {
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             }
//         })
//         .then(function (response) {
//             console.log(response)
//             Swal.fire({
//                 icon: "success",
//                 title: "Successful",
//                 text: "Successful! See details below"
//             });
//             // for (k = 0; k < response.data.classExists.subjects.length; k++) {
                
//             // }
//         })
//         .catch(function (error) {
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.log(error.response.data);
//                 console.log(error.response.status);
//                 console.log(error.response.headers);
//                 errorMsg = error.response.data.message
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                 // http.ClientRequest in node.js
//                 console.log(error.request);
//                 errorMsg = "Network Error"
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log('Error', error.message);
//                 errorMsg = error.message
//             }
//             Swal.fire({
//                 icon: "error",
//                 title: "Error Processing Input",
//                 text: errorMsg
//             });
//         });
// };