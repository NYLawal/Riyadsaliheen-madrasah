// const baseUrl = "http://localhost:3000/api/v1"
const baseUrl = "https://easymart-gap9.onrender.com/api/v1"

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("passwd");

function Redirect() {
    window.location.href = "https://easymart-store.netlify.app/home-page.html"
    // window.location.href = "http://127.0.0.1:5500/Tech4Dev/Easymart-store/home-page.html"
     }

const logIn = (userData) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/user/login`, userData)
        .then(function (response) {
            setTimeout(function() {
                Redirect();
                 }, 1000);   
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

const login = document.getElementById("login-btn");
login.addEventListener("click", (e) => {
    e.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;
        const formData = {
            email,
            password,
        }
        logIn(formData);    
});

// const forgotPass = document.getElementById("forgot-password");
// forgotPass.addEventListener("click", (e) => {
//     // e.preventDefault
//     window.location.href = "https://easymart-store.netlify.app/forgot-passwd.html"
// })