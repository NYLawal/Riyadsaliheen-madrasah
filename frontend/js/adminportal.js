const baseUrl = "https://result-proc-system.onrender.com/api/v1"

const submitButton = document.getElementById("submit-btn")
const emailInput = document.getElementById("email")
const nameInput = document.getElementById("staffName")
const staffRole = document.getElementById("role-drpdwn")


const addStaff = (staffInfo) => {
    axios
        .post(`${baseUrl}/user/addStaff`, staffInfo)
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
