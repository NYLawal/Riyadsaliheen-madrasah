
const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const forgotPasswordEmail = document.getElementById("forgotpassword-email");
const forgotPasswordSubmitBtn = document.getElementById("forgotpassword-submitbtn");

const forgotPassword = (userData) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/user/forgotPassword`, userData)
        .then(function (response) {
            Swal.fire({
                icon: "success",
                title: "Check Your Mail",
                text: response.data,
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

forgotPasswordSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const email = forgotPasswordEmail.value;

        const formData = {
            email
        }
        forgotPassword(formData);
 
});

