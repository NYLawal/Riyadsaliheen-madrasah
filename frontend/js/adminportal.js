const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const sidebar = document.getElementById("bsbSidebar1")
const toggler= document.getElementById("toggler-icon")

const addStafferLink= document.getElementById("add-staffer")
const addStafferForm = document.getElementById("staffadd-form")
const addStudentLink= document.getElementById("add-student")
const addStudentForm = document.getElementById("studentadd-form")
const viewStaffLink = document.getElementById("view-staff")
const viewStaffForm= document.getElementById("viewstaff-form")
const viewStaffSelect= document.getElementById("viewstaff-select")

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

const cancelLink= document.getElementById("cancel-btn")
const closeLink= document.getElementById("close-btn")
const clearStdFrmLink= document.getElementById("clearfrm-btn")
const closeStdFrmLink= document.getElementById("closefrm-btn")

const submitButton = document.getElementById("submit-btn")
const sendButton = document.getElementById("send-btn")

const pNumber = document.getElementById("staff-number")
let staffTableBody = document.getElementById("stafftbl-body")
const staffTable = document.getElementById("viewstaff-table")
const tClassHeading = document.getElementById("noclass")
const logoutLink= document.getElementById("logout")
const token = localStorage.getItem('access_token')

// let tblrow;
// tblrow = document.createElement("tr")
                

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
    if (staffRole.value == "teacher"){
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
            tClassHeading.style.display= "none"
             tClassHeading.innerHTML=""
            for (let i=0; i< response.data.staff_list.length; i++){
                let tblrow = document.createElement("tr")
                let tblcol1 = document.createElement("td")
                let tblcol2 = document.createElement("td")
                let tblcol3 = document.createElement("td")
                let tblcol4 = document.createElement("td")
                let tblcol5 = document.createElement("td")
                let tblcol6 = document.createElement("td")
                let tblcol7 = document.createElement("td")
                tblcol1.innerText = response.data.staff_list[i].stafferName
                tblcol2.innerText = response.data.staff_list[i].email
                tblcol3.innerText = response.data.staff_list[i].gender
                tblcol4.innerText = response.data.staff_list[i].address
                tblcol5.innerText = response.data.staff_list[i].phoneNumber
                tblcol6.innerText = response.data.staff_list[i].role
                tblcol7.innerText = response.data.staff_list[i].isAdmin
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
                text:  errorMsg
            });
        });
};

// display all teachers
const displayTeachers = () => {
    let errorMsg;
    axios
        .get(`${baseUrl}/staff/viewTeachers`, { 
            headers: {
              'Authorization': 'Bearer ' + token
            } 
}) 
        .then(function (response) {
            console.log(response)
            pNumber.innerText = `${response.data.noOfStaff} registered teachers found`
            tClassHeading.style.display= "block";
            tClassHeading.innerHTML="Class";
            tClassHeading.style.borderBottom = "none";
            for (let i=0; i< response.data.teachers_list.length; i++){
                
                let tblrow = document.createElement("tr")
                let tblcol1 = document.createElement("td")
                let tblcol2 = document.createElement("td")
                let tblcol3 = document.createElement("td")
                let tblcol4 = document.createElement("td")
                let tblcol5 = document.createElement("td")
                let tblcol6 = document.createElement("td")
                let tblcol7 = document.createElement("td")
                let tblcol8 = document.createElement("td")
                tblcol1.innerText = response.data.teachers_list[i].stafferName
                tblcol2.innerText = response.data.teachers_list[i].email
                tblcol3.innerText = response.data.teachers_list[i].gender
                tblcol4.innerText = response.data.teachers_list[i].address
                tblcol5.innerText = response.data.teachers_list[i].phoneNumber
                tblcol6.innerText = response.data.teachers_list[i].role
                tblcol7.innerText = response.data.teachers_list[i].isAdmin
                tblcol8.innerText = response.data.teachers_list[i].teacherClass
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
                text:  errorMsg
            });
        });
};
// display staff list all/teachers
viewStaffSelect.addEventListener("change", (e) => {
    e.preventDefault();
    staffTableBody.innerHTML =""
   
    if (viewStaffSelect.value == "all"){
        displayAllStaff()
    }
    else if (viewStaffSelect.value == "teachers"){
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
                text:  response.data.message
            });
            //clear the form fields
            staffTitleInput.value="";
            staffNameInput.value="";
            staffEmailInput.value="";
            staffGenderInput.value="";
            staffStreetlInput.value="";
            staffCityInput.value="";
            staffStateInput.value="";
            staffPhoneInput.value="";
            staffRole.value="";
            teacherClassInput.value=""
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
                text:  errorMsg
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
                text:  response.data.message
            });
            //clear the form fields after successful submission
     admissionNumber.value = "";
     studentFNameInput.value = ""
     studentLNameInput.value = "";
     studentEmailInput.value = "";
     studentGenderInput.value = "";
     studentStreetlInput.value = "" ;
     studentCityInput.value = "";
     studentStateInput.value = "";
     studentPhoneInput.value = "";
     parentEmailInput.value = "";
     studentEntryClass.value = "";
     studentOrigin.value = "";
     studentMaritalStatus.value= "";
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
                text:  errorMsg
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

// logout
logoutLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/index.html"
});

//clear staff form
cancelLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    staffTitleInput.value="";
            staffNameInput.value="";
            staffEmailInput.value="";
            staffGenderInput.value="";
            staffStreetlInput.value="";
            staffCityInput.value="";
            staffStateInput.value="";
            staffPhoneInput.value="";
            staffRole.value="";
            teacherClassInput.value=""
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
     studentStreetlInput.value = "" ;
     studentCityInput.value = "";
     studentStateInput.value = "";
     studentPhoneInput.value = "";
     parentEmailInput.value = "";
     studentEntryClass.value = "";
     studentOrigin.value = "";
     studentMaritalStatus.value= "";
});

//clos e student form
closeStdFrmLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    addStudentForm.style.display = "none"
});
