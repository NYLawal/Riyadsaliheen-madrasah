const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const addStafferLink= document.getElementById("add-staffer")
const addStafferForm = document.getElementById("staffadd-form")
const addStudentLink= document.getElementById("add-student")
const addStudentForm = document.getElementById("studentadd-form")

const submitButton = document.getElementById("submit-btn")
const emailInput = document.getElementById("email")
const nameInput = document.getElementById("staffName")
const staffRole = document.getElementById("role-drpdwn")
const logoutLink= document.getElementById("logout")
const cancelLink= document.getElementById("cancel-btn")
const closeLink= document.getElementById("close-btn")
const clearStdFrmLink= document.getElementById("clearfrm-btn")
const closeStdFrmLink= document.getElementById("closefrm-btn")

// display add staffer form
addStafferLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    addStafferForm.style.display = "block"
});

// display add student form
addStudentLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    addStudentForm.style.display = "block"
});

// add a staff member - admin, bursar or teacher
const token = localStorage.getItem('access_token')
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

submitButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    const email = emailInput.value;
    const stafferName = nameInput.value;
    const stafferRole = staffRole.value;
    
        const formData = {
            email, 
            stafferName,
            stafferRole
        }
        addStaff(formData);    
});

logoutLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    localStorage.clear()
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
});

cancelLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    emailInput.value = "";
    nameInput.value = "";
    staffRole.value = ""
});

closeLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    addStafferForm.style.display = "none"
});

clearStdFrmLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    // emailInput.value = "";
    // nameInput.value = "";
    // staffRole.value = ""
});

closeStdFrmLink.addEventListener("click", (e) => {
    e.preventDefault(); 
    addStudentForm.style.display = "none"
});
