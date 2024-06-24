const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const fullName = document.getElementById("fullname")
const emailAddress = document.getElementById("email")
const phoneNumber = document.getElementById("phone")
const emailSubject = document.getElementById("subject")
const emailMessage = document.getElementById("message")
const submitMessageButton = document.getElementById("submitmessage-btn")

const token = localStorage.getItem('access_token')

// update student comment
const sendMessage = (messageInfo) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/user/sendMessage`, messageInfo,
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
                text: response.data
            });
            fullName.value = "";
            emailAddress.value = "";
            phoneNumber.value = "";
            emailSubject.value = "";
            emailMessage.value = "";
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

//submit message click 
submitMessageButton.addEventListener("click", (e) => {
    e.preventDefault();
    let   fullname = fullName.value
    let   email = emailAddress.value
    let    phone = phoneNumber.value
    let    subject = emailSubject.value
    let    message = emailMessage.value

    if (fullname =="" || email =="" || subject =="" || message ==""){
        Swal.fire({
            icon: "error",
            title: "Empty input detected",
            text: "Please check that all required fields are filled correctly"
        });
    }
    else{
    let formData = {
        fullname,
        email,
        phone,
        subject,
        message
      };
      sendMessage(formData)
    }
});