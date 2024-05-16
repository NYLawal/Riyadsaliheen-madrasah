// const baseUrl = "https://result-proc-system.onrender.com/api/v1"
const baseUrl = "http://localhost:5000/api/v1"

const sidebar = document.getElementById("bsbSidebar1")
const toggler= document.getElementById("toggler-icon")

const addStafferLink= document.getElementById("add-staffer")
const addStafferForm = document.getElementById("staffadd-form")
const addStudentLink= document.getElementById("add-student")
const addStudentForm = document.getElementById("studentadd-form")

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

const logoutLink= document.getElementById("logout")
const token = localStorage.getItem('access_token')


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

// add a staff member - admin, bursar or teacher
const addStaff = (staffInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/user/addStaff`, staffInfo, { 
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

// submit stafff form
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
            //clear the form fields
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
    const phoneNumber = "+" + studentPhoneInput.value;
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
    // emailInput.value = "";
    // nameInput.value = "";
    // staffRole.value = ""
});

//clos e student form
closeStdFrmLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    addStudentForm.style.display = "none"
});
