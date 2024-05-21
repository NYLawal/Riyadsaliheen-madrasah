
const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const sidebar = document.getElementById("bsbSidebar1")
const toggler = document.getElementById("toggler-icon")

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
const tClassHeading = document.getElementById("noclass")
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
const viewStudentPage1 = document.getElementById("viewstd-page1")
const viewStudentPage2 = document.getElementById("viewstd-page2")
const viewStudentPage3 = document.getElementById("viewstd-page3")
const viewStudentPageNext = document.getElementById("viewstd-pagenext")
const viewStudentPagePrevious = document.getElementById("viewstd-pageprevious")
const tabDisabledPrevious = document.getElementById("tab-disabled")

const logoutLink = document.getElementById("logout")
const token = localStorage.getItem('access_token')
let studentpage = [];
let lastpage = [];


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
    }
    else {
        teacherClassInput.style.display = "none"
        classLabel.style.display = "none"
    }
});

// display all staff members
const displayAllStaff = () => {
    let serial_no = 0;
    let errorMsg;
    axios
        .get(`${baseUrl}/staff/viewStaff`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            pNumber.innerText = `${response.data.noOfStaff} registered staffers found`
            tClassHeading.style.display = "none"
            tClassHeading.innerHTML = ""
            for (let i = 0; i < response.data.staff_list.length; i++) {
                serial_no++
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
const displayTeachers = () => {
    let errorMsg;
    let serial_no = 0;
    axios
        .get(`${baseUrl}/staff/viewTeachers`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            pNumber.innerText = `${response.data.noOfStaff} registered teachers found`
            tClassHeading.style.display = "block";
            tClassHeading.innerHTML = "Class";
            tClassHeading.style.borderBottom = "none";
            for (let i = 0; i < response.data.teachers_list.length; i++) {
                serial_no++
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
                tblcol0.innerText = serial_no;
                tblcol1.innerText = response.data.teachers_list[i].stafferName
                tblcol2.innerText = response.data.teachers_list[i].email
                tblcol3.innerText = response.data.teachers_list[i].gender
                tblcol4.innerText = response.data.teachers_list[i].address
                tblcol5.innerText = response.data.teachers_list[i].phoneNumber
                tblcol6.innerText = response.data.teachers_list[i].role
                tblcol7.innerText = response.data.teachers_list[i].isAdmin
                tblcol8.innerText = response.data.teachers_list[i].teacherClass
                tblrow.appendChild(tblcol0)
                tblrow.appendChild(tblcol1)
                tblrow.appendChild(tblcol2)
                tblrow.appendChild(tblcol3)
                tblrow.appendChild(tblcol4)
                tblrow.appendChild(tblcol5)
                tblrow.appendChild(tblcol6)
                tblrow.appendChild(tblcol7)
                tblrow.appendChild(tblcol8)
                staffTableBody.appendChild(tblrow)
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
// display staff list all/teachers
viewStaffSelect.addEventListener("change", (e) => {
    e.preventDefault();
    staffTableBody.innerHTML = ""

    if (viewStaffSelect.value == "all") {
        displayAllStaff()
    }
    else if (viewStaffSelect.value == "teachers") {
        displayTeachers()
    }
});

// display view staff form
viewStaffLink.addEventListener("click", (e) => {
    e.preventDefault();
    viewStaffForm.style.display = "block"
    sidebar.style.display = "none"
    displayAllStaff()
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
    const role = staffRole.value;
    if (role != "teacher") teacherClass = "nil"

    const formData = {
        stafferName,
        email,
        gender,
        address,
        phoneNumber,
        teacherClass,
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
    const stateOfOrigin = studentOrigin.value
    const maritalStatus = studentMaritalStatus.value
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
        maritalStatus
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

// submit student form
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
studentViewPagination.addEventListener("click", (e) => {
    e.preventDefault();

    let targetElement = e.target.id;
    let target = e.target;
    target.style.boxShadow = "none"
    target.style.color = "green"

    let page;
    switch (targetElement) {
        case "viewstd-page1":
            page = 1;
            break;
        case "viewstd-page2":
            page = 2;
            break;
        case "viewstd-page3":
            page = 3
            break;
    }
    if (targetElement == "viewstd-page1" || targetElement == "viewstd-page2" || targetElement == "viewstd-page3") {
        let maxpage = lastpage[lastpage.length - 1]
        // console.log("last page is ", maxpage)
        // console.log("page is ", page)
        if (page <= maxpage) {
            studentTableBody.innerHTML = ""
            viewStudentPagePrevious.classList.remove("disable")
            viewStudentPageNext.classList.remove("disable")

            if (viewStudentSelect.value == "all") {
                displayAllStudents(page)
            }
            else if (viewStudentSelect.value == "bycriteria") {
                const key = studSearchKey.value
                let value;
                if (key === "studentStatus") value = "past"
                else { value = searchMe.firstChild.value || studSearchValue.value }
                displayStudents(key, value, page);
                console.log(key, value, page)
            }
        }
        // else  viewStudentPageNext.classList.add("disable")
        else {
            lastpage.push(maxpage)
            Swal.fire({
                icon: "error",
                title: "End of File Reached",
                text: "The page requested does not exist"
            });
        }
    }
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
        lastpage.push(maxpage)
        Swal.fire({
            icon: "error",
            title: "End of File Reached",
            text: "The page requested does not exist"
        });
    }
    // displayAllStudents(pageNumber+1)
});

// display previous students list page
viewStudentPagePrevious.addEventListener("click", (e) => {
    e.preventDefault();
    viewStudentPageNext.classList.remove("disable")
    console.log(studentpage)
    let pageNumber = studentpage.pop()
    console.log("page is ", pageNumber)
    if (pageNumber == 1) {
        studentpage.push(1)
        viewStudentPagePrevious.classList.add("disable")
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
        // displayAllStudents(pageNumber-1)
    }
});

// logout
logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
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
// SECTION 2 - EDIT, PROMOTE ....
// ***************************************************************************************
const editStaffQueryForm = document.getElementById('staffedit-queryform')
// const cancelEditLink = document.getElementById('canceledit-btn')
const closeEditButtonIcon = document.getElementById('editstfclose-icon')
const editStaffLink = document.getElementById('edit-staff')
const staffNameToEdit = document.getElementById('toedit-staffname')
const staffEmailToEdit = document.getElementById('toedit-staffemail')
const submitEditQuery = document.getElementById('submiteditquery-btn')

const updateStaffForm = document.getElementById('staffupdate-form')
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
const updateItTeacherClass = document.getElementById("updateit-teacherclass")

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
            updateStaffForm.style.display = "block";
            staffEmailUpdate.value = response.data.staffer.email;
            staffNameUpdate.value = response.data.staffer.stafferName
            staffGenderUpdate.value =  response.data.staffer.gender
            staffAddressUpdate.value =  response.data.staffer.address
            staffPhoneUpdate.value =  response.data.staffer.phoneNumber
            staffRoleUpdate.value =  response.data.staffer.role

            if (response.data.staffer.role){
                classLabelUpdate.style.display = "block";
                teacherClassUpdate.style.display = "block";
                updateItTeacherClass.style.display = "block";
                teacherClassUpdate.value = response.data.staffer.teacherClass;
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
    staffGenderUpdate.value =  "";
    staffAddressUpdate.value =  "";
    staffPhoneUpdate.value =  "";
    staffRoleUpdate.value =  "";
    classLabelUpdate.style.display = "none";
    teacherClassUpdate.style.display = "none";
    updateItTeacherClass.style.display = "none";
    teacherClassUpdate.value = "";
});

// cancel staff update form
cancelUpdateButton.addEventListener("click", (e) => {
    e.preventDefault();
    staffEmailUpdate.value = "";
    staffNameUpdate.value = "";
    staffGenderUpdate.value =  "";
    staffAddressUpdate.value =  "";
    staffPhoneUpdate.value =  "";
    staffRoleUpdate.value =  "";
    classLabelUpdate.style.display = "none";
    teacherClassUpdate.style.display = "none";
    updateItTeacherClass.style.display = "none";
    teacherClassUpdate.value = "";
});

//change teacher class when another is picked
updateItTeacherClass.addEventListener("change", (e) => {
    e.preventDefault();
    teacherClassUpdate.value = updateItTeacherClass.value;
});

// display class select when the user presses enter key on the keyboard after inputting role as teacher
staffRoleUpdate.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && staffRoleUpdate.value == "teacher") {
      e.preventDefault();
      classLabelUpdate.style.display = "block";
      updateItTeacherClass.style.display = "block";
    }
  });

// update a staffer info
const updateStaffDetails = (staffInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/staff/updateStaff`, staffInfo, {
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
            staffGenderUpdate.value =  "";
            staffAddressUpdate.value =  "";
            staffPhoneUpdate.value =  "";
            staffRoleUpdate.value =  "";
            classLabelUpdate.style.display = "none";
            teacherClassUpdate.style.display = "none";
            updateItTeacherClass.style.display = "none";
            teacherClassUpdate.value = "";
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
    let teacherClass = updateItTeacherClass.value;

    if (role == "teacher" && teacherClass == ""){
        Swal.fire({
            icon: "error",
            title: "Invalid Entry",
            text: "A teacher must be assigned a class"
        });
    }

    const formData = {
        email,
        stafferName,
        gender,
        address,
        phoneNumber,
        role,
        teacherClass
    }
    updateStaffDetails(formData);
});
