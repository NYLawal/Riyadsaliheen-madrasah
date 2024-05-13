// const baseUrl = "http://localhost:5000/api/v1"
const baseUrl = "https://result-proc-system.onrender.com/api/v1"
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("passwd");
const passwordRepeatInput = document.getElementById("passwd-repeat");
const togglePassword = document.getElementById("p-icon");
const toggleRepeatPassword = document.getElementById("pr-icon");
const emailLogin = document.getElementById("user");
const passwdLogin = document.getElementById("pass");


const signUp = (userData) => {
    axios
        .post(`${baseUrl}/user/signup`, userData)
        .then(function (response) {
            console.log(response)
            Swal.fire({
                toast: true,
                icon: "success",
                title: "Signup successful, login to view your portal",
                animation: false,
                position: "center",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

        })
        .catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Error Processing Input",
                text: err.response.data.message,
            });
        });
};

const signup = document.getElementById("signup-btn");
signup.addEventListener("click", (e) => {
    e.preventDefault()
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordRepeat = passwordRepeatInput.value;

    if (password !== passwordRepeat) {
        Swal.fire({
            title: "Password Error",
            text: "Passwords do not match!",
            icon: "error",
        });
    } else {
        const formData = {
            email,
            password,
            passwordRepeat
        }
        signUp(formData);
    }
});

function Redirect() {
    window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/adminPortal.html"
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/adminPortal.html"
     }

const logIn = (userData) => {
    let errorMsg;
    axios
        .post(`${baseUrl}/user/login`, userData)
        .then(function (response) {
            console.log(response)
            let token = response.data.access_token;
            localStorage.setItem("access_token", token);
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

    const email = emailLogin.value;
    const password = passwdLogin.value;
        const formData = {
            email,
            password,
        }
        logIn(formData);    
});


togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
});
toggleRepeatPassword.addEventListener("click", function () {
    if (passwordRepeatInput.type === "password") {
        passwordRepeatInput.type = "text";
        toggleRepeatPassword.classList.remove("fa-eye");
        toggleRepeatPassword.classList.add("fa-eye-slash");
    } else {
        passwordRepeatInput.type = "password";
        toggleRepeatPassword.classList.remove("fa-eye-slash");
        toggleRepeatPassword.classList.add("fa-eye");
    }
});
