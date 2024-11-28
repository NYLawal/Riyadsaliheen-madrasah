
const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const sidebar = document.getElementById("bsbSidebar1")
const toggler = document.getElementById("toggler-icon")

const viewStaffLink = document.getElementById("view-staff")
const viewStaffForm = document.getElementById("viewstaff-form")
const viewStaffSelect = document.getElementById("viewstaff-select")
const viewStudentSelect = document.getElementById("viewstudent-select")
const viewStudentsLink = document.getElementById("view-students")
const viewStudentsForm = document.getElementById("viewstudent-form")


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

const studentPaymentStatus = document.getElementById("search-paymentstatus")

const studentViewPagination = document.getElementById("stdview-pagination")
const viewStudentPageRequest = document.getElementById("viewstd-pagerequest")
const viewStudentPageNext = document.getElementById("viewstd-pagenext")
const viewStudentPagePrevious = document.getElementById("viewstd-pageprevious")
const viewStaffPageNext = document.getElementById("viewstaff-pagenext")
const viewStaffPagePrevious = document.getElementById("viewstaff-pageprevious")
const tabDisabledPrevious = document.getElementById("tab-disabled")
const stftabDisabledPrevious = document.getElementById("stftab-disabled")

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
            console.log("response says page is ", response.data.page)
            staffpage.push(response.data.page)
            stafflastpage.push(response.data.pgnum)

            // disable next button if end of page is reached
            if (response.data.pgnum === response.data.page) {
                viewStaffPageNext.classList.add("disable")
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
            // tClass.appendChild(tProgrammeHeading)
            tProgrammeHeading.style.display = "inline-block";
            tProgrammeHeading.innerHTML = "Programme";
            tProgrammeHeading.style.borderBottom = "none";
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
                let tblcol9 = document.createElement("td")
                tblcol0.innerText = serial_no;
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
            console.log("response says ast page is ", response.data.pagenum)
            staffpage.push(response.data.page)
            stafflastpage.push(response.data.pgnum)

            // disable next button if end of page is reached
            if (response.data.pgnum === response.data.page) {
                viewStaffPageNext.classList.add("disable")
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
// close view staff form
closeViewStaffBtn.addEventListener("click", (e) => {
    e.preventDefault();
    staffTableBody.innerHTML = ""
    viewStaffForm.style.display = "none"
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
        searchMe.innerHTML = `<input type = "text" name="stdsearchvalue" placeholder="Input your search term" id="searchstud-value"/>`
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
                 <option value="barnomij">Barnomij</option>
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
    else if (studSearchKey.value == "paymentStatus") {
        searchMe.innerHTML =
            `<select id="searchstud-status">
                 <option value="owing">Owing</option>
                 <option value="balanced">Balanced</option>
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
const wklyAttendanceLabel = document.getElementById("wklyattendance-label")
const downloadClassReportButton = document.getElementById("downloadclassreport-btn")


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


// download class report
downloadClassReportButton.addEventListener("click", (e) => {
    e.preventDefault();
    const className = classnameForWklyAttendance.value
    const programme = programmeForWklyAttendance.value
    const sessionName = sessionForWklyAttendance.value
    const termName = termForWklyAttendance.value
    if (tableBodyForWklyAttendance.childElementCount == "") {
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
    // Get the table head row data excluding attendance dates, then each column data
    let rowshead = tableHeadWklyAttendance.firstElementChild.children;
    let csvrow = [];
    for (let k = 1; k < 3; k++) {
        csvrow.push(rowshead[k].innerText);
    }
    // Combine each column value with comma
    csv_data.push(csvrow.join(","));

    // Get each table body row data
    let rows = tableBodyForWklyAttendance.children;
    for (let i = 0; i < rows.length; i++) {
        // Get each column data
        let cols = rows[i].children;

        // Stores each csv row data excluding attendance status
        let csvrow = [];
        for (let j = 1; j < 3; j++) {

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
    let filename = `${sessionName} ${termName} Term Attendance Report for ${className} ${programme}`

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


//  **************************** BILLINGS *********************************
// ********************************************************************************************
const billingForm = document.getElementById("bill-form")
const prepareBillLink = document.getElementById("billing")
const billFormCloseBtn = document.getElementById("bill-icon")
const billingAdmissionNumber = document.getElementById("admNo-forbill")
const billingClassNameSelect = document.getElementById("classname-forbill")
const billingProgrammeSelect = document.getElementById("programme-forbill")
const billingSessionSelect = document.getElementById("session-forbill")
const billingTermSelect = document.getElementById("term-forbill")
const billingTaskChoiceSelect = document.getElementById("choice-forbill")
const billingFeeChoiceSelect = document.getElementById("feechoice-forbill")
const billingAmountInput = document.getElementById("amount-forbill")
const billingViewStudentsBtn = document.getElementById("viewstudentsforbill-btn")
const billingSetFeeBtn = document.getElementById("setbilldetails-btn")
const billingUpdateBtn = document.getElementById("updatebill-btn")
const billingGenerateTotalsBtn = document.getElementById("generatetotal-btn")
const billingTable = document.getElementById("billing-table")
const billingTableHead = document.getElementById("billing-tblhead")
const billingTableBody = document.getElementById("billing-tblbody")
const billingAdmissionNumberDiv = document.getElementById("admno-biilingdiv")
const billingClassNameDiv = document.getElementById("classname-biilingdiv")
const billingProgrammeDiv = document.getElementById("programme-biilingdiv")
const billingForClassSelect = document.getElementById("billingforclass")
const billingForTermSelect = document.getElementById("billingforterm")
const billingForSessionInput = document.getElementById("billingforsession")
// for bill view
const billingViewLink = document.getElementById("billing-view")
const billingViewForm = document.getElementById("studentbill-form")
const billingViewAdmNo = document.getElementById("billview-admNumber")
const billingViewLastPayment = document.getElementById("billview-lastpay")
const billingViewBalanceDue = document.getElementById("billview-baldue")
const billingViewGenerateBtn = document.getElementById("billview-btn")
const billingUpdateLastPayBtn = document.getElementById("billupdatepayment-btn")
const billingViewCloseForm = document.getElementById("billviewform-closebtn")
const billingViewTableBody = document.getElementById("billingview-tbody")
const billingViewStudentName = document.getElementById("detail-name")
const billingViewClassName = document.getElementById("detail-class")
const billingViewSession = document.getElementById("detail-session")
const billingViewTerm = document.getElementById("detail-term")


// open billing form
prepareBillLink.addEventListener("click", (e) => {
    e.preventDefault();
    billingForm.style.display = "block";
    sidebar.style.display = "none";
});

// close billing form
billFormCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    billingAdmissionNumber.value = "";
    billingTableBody.innerHTML = "";
    billingAmountInput.value = "";
    billingForm.style.display = "none";
});

// change class on billing form
billingClassNameSelect.addEventListener("change", (e) => {
    e.preventDefault();
    billingTableBody.innerHTML = "";
});

// change task on billing form
billingTaskChoiceSelect.addEventListener("change", (e) => {
    e.preventDefault();
    if (billingTaskChoiceSelect.value == "student bill") {
        billingClassNameDiv.style.display = "none";
        billingProgrammeDiv.style.display = "none";
        billingAdmissionNumberDiv.style.display = "block";
        billingTable.style.height = "100px";
    }
    else if (billingTaskChoiceSelect.value == "class bill") {
        billingClassNameDiv.style.display = "block";
        billingProgrammeDiv.style.display = "block";
        billingAdmissionNumberDiv.style.display = "none";
        billingTable.style.height = "400px";
    }
});

// change fee type on billing form
billingFeeChoiceSelect.addEventListener("change", (e) => {
    e.preventDefault();
    billingAmountInput.value = ""
    billingAmountInput.focus()
});

// display one student to prepare bill for
const viewStudent = (admNo) => {
    let errorMsg;
    let serial_no = 1;
    axios
        .get(`${baseUrl}/student/one/?admNo=${admNo}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            // pstdNumber.innerText = `${response.data.noOfStudents} registered students found.  Page ${response.data.page}`
            // serial_no++
            billingTableBody.innerHTML = "";
            let tblrow = document.createElement("tr")
            tblrow.style.maxHeight = "30px"
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
            let tblcol15 = document.createElement("td")
            let tblcol16 = document.createElement("td")
            tblcol0.innerText = serial_no
            tblcol1.innerText = response.data.student.admNo
            tblcol2.innerText = response.data.student.firstName + " " + response.data.student.lastName
            tblcol3.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="tuition"/>`
            tblcol4.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="textbook"/>`
            tblcol5.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="devpfee"/>`
            tblcol6.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="gradfee"/>`
            tblcol7.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="portalfee"/>`
            tblcol8.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="examfee"/>`
            tblcol9.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="uniform"/>`
            tblcol10.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="balance"/>`
            tblcol11.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="tahfeez"/>`
            tblcol12.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="admissionfee"/>`
            tblcol13.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="pdiscount"/>`
            tblcol14.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="stfdiscount"/>`
            tblcol15.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="scholarship"/>`
            tblcol16.innerHTML = `<input type = "number" min="0" value="0" class="fees" id="totalfee"/>`
            tblcol16.style.color = "green"
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
            tblrow.appendChild(tblcol15)
            tblrow.appendChild(tblcol16)
            billingTableBody.appendChild(tblrow)
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

// display students to prepare bill for
const viewStudents = (classname, programme, session, term) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/attendance/viewAttendance/?programme=${programme}&className=${classname}&termName=${term}&sessionName=${session}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            console.log(response)
            billingTableBody.innerHTML = "";
            for (let i = 0; i < response.data.attendanceExists.length; i++) {
                let tblrow = document.createElement("tr")
                tblrow.style.maxHeight = "30px"
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
                let tblcol15 = document.createElement("td")
                let tblcol16 = document.createElement("td")

                tblcol0.innerText = i + 1
                tblcol1.innerText = response.data.attendanceExists[i].admissionNumber
                tblcol2.innerText = response.data.attendanceExists[i].student_name
                tblcol3.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="tuition"/>`
                tblcol4.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="textbook"/>`
                tblcol5.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="devpfee"/>`
                tblcol6.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="gradfee"/>`
                tblcol7.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="portalfee"/>`
                tblcol8.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="examfee"/>`
                tblcol9.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="uniform"/>`
                tblcol10.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="balance"/>`
                tblcol11.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="tahfeez"/>`
                tblcol12.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="admissionfee"/>`
                tblcol13.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="pdiscount"/>`
                tblcol14.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="stfdiscount"/>`
                tblcol15.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="scholarship"/>`
                tblcol16.innerHTML = `<input type = "number" min="0" class="fees" value="0" id="totalfee"/>`
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
                tblrow.appendChild(tblcol15)
                tblrow.appendChild(tblcol16)
                billingTableBody.appendChild(tblrow)
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

// view student(s) to set their bill
billingViewStudentsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const admno = billingAdmissionNumber.value
    const className = billingClassNameSelect.value
    const programme = billingProgrammeSelect.value
    const sessionName = billingSessionSelect.value
    const termName = billingTermSelect.value

    if (billingAdmissionNumberDiv.style.display == "block") {
        if (billingAdmissionNumber.value == "") {
            Swal.fire({
                icon: "error",
                title: "Empty Input Detected",
                text: "Admission number cannot be empty"
            });
        }
        else {
            viewStudent(admno)
        }
    }
    else if (billingAdmissionNumberDiv.style.display == "") {
        if (programme == "select a programme" || className == "select a class") {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Check the programme or class you entered"
            });
        }
        else {
            viewStudents(className, programme, sessionName, termName)
        }
    }
});

// click set fee button
billingSetFeeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let feeAmount = billingAmountInput.value
    let feeName = billingFeeChoiceSelect.value
    if (billingTableBody.childElementCount == "") {
        Swal.fire({
            icon: "error",
            title: "Invalid Request",
            text: "No students to set fees for"
        });
    }
    else if (feeName == "Select Fee") {
        Swal.fire({
            icon: "error",
            title: "Invalid Request",
            text: "Select the fee name"
        });
    }
    else if (feeAmount == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "Input the amount"
        });
    }
    else {
        for (let count = 0; count < billingTableBody.childElementCount; count++) {
            let admNoTD = billingTableBody.children[count].firstElementChild.nextElementSibling;
            let admNo = admNoTD.innerText;
            let studentNameTD = admNoTD.nextElementSibling
            let studentName = studentNameTD.innerText;
            let tuitionTD = studentNameTD.nextElementSibling
            let tuition = tuitionTD.firstElementChild
            let textbookTD = tuitionTD.nextElementSibling
            let textbook = textbookTD.firstElementChild
            let devpTD = textbookTD.nextElementSibling
            let devptfee = devpTD.firstElementChild
            let gradTD = devpTD.nextElementSibling
            let gradtnfee = gradTD.firstElementChild
            let portalTD = gradTD.nextElementSibling
            let portalfee = portalTD.firstElementChild
            let examTD = portalTD.nextElementSibling
            let examfee = examTD.firstElementChild
            let uniformTD = examTD.nextElementSibling
            let uniformfee = uniformTD.firstElementChild
            let ltbalTD = uniformTD.nextElementSibling
            let lastermbal = ltbalTD.firstElementChild
            let tahfizTD = ltbalTD.nextElementSibling
            let tahfizfee = tahfizTD.firstElementChild
            let admformTD = tahfizTD.nextElementSibling
            let admform = admformTD.firstElementChild
            let parentdiscountTD = admformTD.nextElementSibling
            let parentdiscount = parentdiscountTD.firstElementChild
            let staffdiscountTD = parentdiscountTD.nextElementSibling
            let staffdiscount = staffdiscountTD.firstElementChild
            let scholarshipTD = staffdiscountTD.nextElementSibling
            let scholarship = scholarshipTD.firstElementChild

            if (feeName == "tuition") tuition.value = feeAmount
            if (feeName == "textbook") textbook.value = feeAmount
            if (feeName == "development") devptfee.value = feeAmount
            if (feeName == "graduation") gradtnfee.value = feeAmount
            if (feeName == "portal") portalfee.value = feeAmount
            if (feeName == "exam") examfee.value = feeAmount
            if (feeName == "uniform") uniformfee.value = feeAmount
            if (feeName == "balance") lastermbal.value = feeAmount
            if (feeName == "tahfiz") tahfizfee.value = feeAmount
            if (feeName == "admission form") admform.value = feeAmount
            if (feeName == "parent discount") parentdiscount.value = feeAmount
            if (feeName == "staff discount") staffdiscount.value = feeAmount
            if (feeName == "scholarship") scholarship.value = feeAmount
        }
    }
});

// click generate totals button
billingGenerateTotalsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (billingTableBody.childElementCount == "") {
        Swal.fire({
            icon: "error",
            title: "Invalid Request",
            text: "No fees displayed, view students first and set their bill details"
        });
    }
    else {
        for (let count = 0; count < billingTableBody.childElementCount; count++) {
            let admNoTD = billingTableBody.children[count].firstElementChild.nextElementSibling;
            let admNo = admNoTD.innerText;
            let studentNameTD = admNoTD.nextElementSibling
            let studentName = studentNameTD.innerText;
            let tuitionTD = studentNameTD.nextElementSibling
            let tuition = tuitionTD.firstElementChild
            let textbookTD = tuitionTD.nextElementSibling
            let textbook = textbookTD.firstElementChild
            let devpTD = textbookTD.nextElementSibling
            let devptfee = devpTD.firstElementChild
            let gradTD = devpTD.nextElementSibling
            let gradtnfee = gradTD.firstElementChild
            let portalTD = gradTD.nextElementSibling
            let portalfee = portalTD.firstElementChild
            let examTD = portalTD.nextElementSibling
            let examfee = examTD.firstElementChild
            let uniformTD = examTD.nextElementSibling
            let uniformfee = uniformTD.firstElementChild
            let ltbalTD = uniformTD.nextElementSibling
            let lastermbal = ltbalTD.firstElementChild
            let tahfizTD = ltbalTD.nextElementSibling
            let tahfizfee = tahfizTD.firstElementChild
            let admformTD = tahfizTD.nextElementSibling
            let admform = admformTD.firstElementChild
            let parentdiscountTD = admformTD.nextElementSibling
            let parentdiscount = parentdiscountTD.firstElementChild
            let staffdiscountTD = parentdiscountTD.nextElementSibling
            let staffdiscount = staffdiscountTD.firstElementChild
            let scholarshipTD = staffdiscountTD.nextElementSibling
            let scholarship = scholarshipTD.firstElementChild
            let totalfeeTD = scholarshipTD.nextElementSibling
            let totalFees = totalfeeTD.firstElementChild

            totalFees.value = +tuition.value + (+textbook.value) + (+devptfee.value) + (+gradtnfee.value) + (+portalfee.value) + (+examfee.value) + (+uniformfee.value) +
                (+lastermbal.value) + (+tahfizfee.value) + (+admform.value) - (+parentdiscount.value) - (+staffdiscount.value) - (+scholarship.value)
        }
    }
});

// update bill
const updateBill = (billInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/billing/makebill/`, billInfo,
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

// click update bill button
billingUpdateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let studentsbills = []
    let formdata = {
        studentsbills,
        classname: billingForClassSelect.value,
        term: billingForTermSelect.value,
        session: billingForSessionInput.value
    }
    if (billingTableBody.childElementCount == "") {
        Swal.fire({
            icon: "error",
            title: "Invalid Request",
            text: "No students displayed, view students first and set their bill details"
        });
    }
    if (billingForClassSelect.value == "select a class" || billingForSessionInput.value == "") {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Check that you have the correct class and session set"
        });
    }
    else {
        Swal.fire({
            title: "Have you generated totals, and set the class, term and session you're billing for?",
            text: `Bill will be set as prepared for all students on the list`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, go ahead!"
        }).then((result) => {
            if (result.isConfirmed) {
                for (let count = 0; count < billingTableBody.childElementCount; count++) {
                    let admNoTD = billingTableBody.children[count].firstElementChild.nextElementSibling;
                    let admNo = admNoTD.innerText;
                    let studentNameTD = admNoTD.nextElementSibling
                    let studentName = studentNameTD.innerText;
                    let tuitionTD = studentNameTD.nextElementSibling
                    let tuition = tuitionTD.firstElementChild
                    let textbookTD = tuitionTD.nextElementSibling
                    let textbook = textbookTD.firstElementChild
                    let devpTD = textbookTD.nextElementSibling
                    let devptfee = devpTD.firstElementChild
                    let gradTD = devpTD.nextElementSibling
                    let gradtnfee = gradTD.firstElementChild
                    let portalTD = gradTD.nextElementSibling
                    let portalfee = portalTD.firstElementChild
                    let examTD = portalTD.nextElementSibling
                    let examfee = examTD.firstElementChild
                    let uniformTD = examTD.nextElementSibling
                    let uniformfee = uniformTD.firstElementChild
                    let ltbalTD = uniformTD.nextElementSibling
                    let lastermbal = ltbalTD.firstElementChild
                    let tahfizTD = ltbalTD.nextElementSibling
                    let tahfizfee = tahfizTD.firstElementChild
                    let admformTD = tahfizTD.nextElementSibling
                    let admform = admformTD.firstElementChild
                    let parentdiscountTD = admformTD.nextElementSibling
                    let parentdiscount = parentdiscountTD.firstElementChild
                    let staffdiscountTD = parentdiscountTD.nextElementSibling
                    let staffdiscount = staffdiscountTD.firstElementChild
                    let scholarshipTD = staffdiscountTD.nextElementSibling
                    let scholarship = scholarshipTD.firstElementChild
                    let totalfeeTD = scholarshipTD.nextElementSibling
                    let totalFees = totalfeeTD.firstElementChild

                    let stdbill = {
                        admNo,
                        studentName,
                        tuitionfee: +tuition.value,
                        txtbkfee: +textbook.value,
                        developmentfee: +devptfee.value,
                        graduationfee: +gradtnfee.value,
                        portalfee: +portalfee.value,
                        examfee: +examfee.value,
                        uniformfee: +uniformfee.value,
                        lasttermbal: +lastermbal.value,
                        fulltahfizfee: +tahfizfee.value,
                        admissionformfee: +admform.value,
                        parentdiscount: +parentdiscount.value,
                        staffdiscount: +staffdiscount.value,
                        scholarshipgrant: +scholarship.value,
                        totalfeesdue: +totalFees.value
                    }
                    studentsbills.push(stdbill)
                }
                updateBill(formdata)
            }
        })
    }
});

// ******************* VIEW BILL **************
// ********************************************
// show bill
billingViewLink.addEventListener("click", (e) => {
    e.preventDefault();
    billingViewForm.style.display = "block";
    sidebar.style.display = "none";
});

// close bill
billingViewCloseForm.addEventListener("click", (e) => {
    e.preventDefault();
    billingViewAdmNo.value = "";
    billingViewLastPayment.value = ""
    billingViewBalanceDue.value = ""
    for (let i = 0; i < billingViewTableBody.childElementCount; i++) {
        console.log(billingViewTableBody.children[i])
        console.log(billingViewTableBody.children[i].children[1])
        if (billingViewTableBody.children[i].children[1]) {
            billingViewTableBody.children[i].children[1].innerText = ""
        }
    }
    billingViewForm.style.display = "none";
});

//  view a student's bill
const viewBill = (admNo) => {
    let errorMsg;
    axios
        .get(`${baseUrl}/billing/viewbill/?admNo=${admNo}`, {
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

            billingViewStudentName.innerText = response.data.astudentbill.studentName
            billingViewClassName.innerText = response.data.astudentbill.classname
            billingViewSession.innerText = response.data.astudentbill.session
            billingViewTerm.innerText = response.data.astudentbill.term
            billingViewLastPayment.value = response.data.astudentbill.lastpaymentmade
            billingViewBalanceDue.value = response.data.astudentbill.balancedue

            let tblrowtuition = billingViewTableBody.children[0]
            let tblcoltuition = document.createElement("td")
            tblcoltuition.innerText = response.data.astudentbill.latestBill.tuitionfee
            tblrowtuition.appendChild(tblcoltuition)

            let tblrowtxtbk = billingViewTableBody.children[1]
            let tblcoltxtbk = document.createElement("td")
            tblcoltxtbk.innerText = response.data.astudentbill.latestBill.txtbkfee
            tblrowtxtbk.appendChild(tblcoltxtbk)

            let tblrowdevp = billingViewTableBody.children[2]
            let tblcoldevp = document.createElement("td")
            tblcoldevp.innerText = response.data.astudentbill.latestBill.developmentfee
            tblrowdevp.appendChild(tblcoldevp)

            let tblrowgrad = billingViewTableBody.children[3]
            let tblcolgrad = document.createElement("td")
            tblcolgrad.innerText = response.data.astudentbill.latestBill.graduationfee
            tblrowgrad.appendChild(tblcolgrad)

            let tblrowptl = billingViewTableBody.children[4]
            let tblcolptl = document.createElement("td")
            tblcolptl.innerText = response.data.astudentbill.latestBill.portalfee
            tblrowptl.appendChild(tblcolptl)

            let tblrowexam = billingViewTableBody.children[5]
            let tblcolexam = document.createElement("td")
            tblcolexam.innerText = response.data.astudentbill.latestBill.examfee
            tblrowexam.appendChild(tblcolexam)

            let tblrowufrm = billingViewTableBody.children[6]
            let tblcolufrm = document.createElement("td")
            tblcolufrm.innerText = response.data.astudentbill.latestBill.uniformfee
            tblrowufrm.appendChild(tblcolufrm)

            let tblrowltbal = billingViewTableBody.children[7]
            let tblcolltbal = document.createElement("td")
            tblcolltbal.innerText = response.data.astudentbill.latestBill.lasttermbalance
            tblrowltbal.appendChild(tblcolltbal)

            let tblrowtahfiz = billingViewTableBody.children[8]
            let tblcoltahfiz = document.createElement("td")
            tblcoltahfiz.innerText = response.data.astudentbill.latestBill.fulltahfizfee
            tblrowtahfiz.appendChild(tblcoltahfiz)

            let tblrowadm = billingViewTableBody.children[9]
            let tblcoladm = document.createElement("td")
            tblcoladm.innerText = response.data.astudentbill.latestBill.admissionformfee
            tblrowadm.appendChild(tblcoladm)

            let tblrowprtdt = billingViewTableBody.children[10]
            let tblcolprtdt = document.createElement("td")
            tblcolprtdt.innerText = response.data.astudentbill.latestBill.parentdiscount
            tblrowprtdt.appendChild(tblcolprtdt)

            let tblrowstfdt = billingViewTableBody.children[11]
            let tblcolstfdt = document.createElement("td")
            tblcolstfdt.innerText = response.data.astudentbill.latestBill.staffdiscount
            tblrowstfdt.appendChild(tblcolstfdt)

            let tblrowsch = billingViewTableBody.children[12]
            let tblcolsch = document.createElement("td")
            tblcolsch.innerText = response.data.astudentbill.latestBill.scholarshipgrant
            tblrowsch.appendChild(tblcolsch)

            let tblrowtotal = billingViewTableBody.children[13]
            let tblcoltotal = document.createElement("td")
            tblcoltotal.innerText = response.data.astudentbill.latestBill.totalfeesdue
            tblcoltotal.style.fontWeight = "Bold"
            tblcoltotal.style.color = "rgb(4, 109, 4)"
            tblrowtotal.appendChild(tblcoltotal)

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

// view bill for a student
billingViewGenerateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    billingViewLastPayment.value = ""
    billingViewBalanceDue.value = ""
    for (let i = 0; i < billingViewTableBody.childElementCount; i++) {
        if (billingViewTableBody.children[i].children[1]) {
            billingViewTableBody.children[i].children[1].innerText = ""
            billingViewTableBody.children[i].removeChild(billingViewTableBody.children[i].children[1])
        }
    }
    const admno = billingViewAdmNo.value
    if (admno == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "Admission number cannot be empty"
        });
    }
    else {
        viewBill(admno)
    }
});

//  update student's last payment and balance
const updateLastPay = (admNo, paydetails) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/billing/updatepayment/?admNo=${admNo}`, paydetails, {
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

// update bill on last payment for a student
billingUpdateLastPayBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const admno = billingViewAdmNo.value
    const lastpay = billingViewLastPayment.value
    const balancedue = billingViewBalanceDue.value

    if (admno == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "Admission number cannot be empty"
        });
    }
    if (lastpay == "" || balancedue == "") {
        Swal.fire({
            icon: "error",
            title: "Empty Input Detected",
            text: "You haven't inputted the details of payment"
        });
    }
    else {
        let formdata = {
            lastpay,
            balancedue
        }
        updateLastPay(admno, formdata)
    }
});

// calcuate balance after last payment is inputted
billingViewBalanceDue.addEventListener("click", (e) => {
    e.preventDefault();
    if (billingViewLastPayment.value != 0 ) {
        billingViewBalanceDue.value = (+billingViewBalanceDue.value) - (+billingViewLastPayment.value); 
    }
});



// logout ********************************************************************
logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear()
    window.location.href = "https://riyadarabicschool.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
});
