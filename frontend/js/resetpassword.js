const baseUrl = "https://result-proc-system.onrender.com/api/v1"
// const baseUrl = "http://localhost:5000/api/v1"

const emailInput = document.getElementById("resetpassword-email");
const passwordInput = document.getElementById("password-reset");
const passwordRepeatInput = document.getElementById("passwordreset-repeat");
// const collection = document.getElementsByClassName("password");
const togglePassword = document.getElementById("p-icon");
const toggleRepeatPassword = document.getElementById("pr-icon");

document.addEventListener("DOMContentLoaded", () => {
    let queryDict = {};
    location.search
      .substring(1)
      .split("&")
      .forEach(function (item) {
        queryDict[item.split("=")[0]] = item.split("=")[1];
      });
    const userId = queryDict.userId;
    getUserEmail(userId)
});

const getUserEmail = (userId) => {
    let errorMsg;
  axios
    .post(`${baseUrl}/user/getEmail/${userId}`)
    .then(function (response) {
      console.log(response);
        emailInput.value = response.data.user.email;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMsg = !error.response.data.message  ? error.response.data : error.response.data.message ;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        errorMsg = "Network Error";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        errorMsg = error.message;
      }
      Swal.fire({
        icon: "error",
        title: "Error Processing Input",
        text: errorMsg,
      });
    });
};

const resetPassword = (userData, userId, token) => {
    let errorMsg;
  axios
    .post(`${baseUrl}/user/password-reset/${userId}/${token}`, userData)
    .then(function (response) {
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Successfully Reset",
        text: response.data,
      });
      Swal.fire({
        title: "Password reset is successful, you can now log in with your new password",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "OK",
        // denyButtonText: `No, ${userRole}`
    }).then((result) => {
        if (result.isConfirmed) {
              window.location.href = "https://madrasatu-riyadsaliheen.netlify.app/frontend/login.html"
            // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/login.html"
        
        }
    })
      emailInput.value = "";
      passwordInput.value = "";
      passwordRepeatInput.value = "";
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMsg = !error.response.data.message  ? error.response.data : error.response.data.message ;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        errorMsg = "Network Error";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        errorMsg = error.message;
      }
      Swal.fire({
        icon: "error",
        title: "Error Processing Input",
        text: errorMsg,
      });
    });
};

const resetPasswordButton = document.getElementById("resetpassword-btn");
resetPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordRepeat = passwordRepeatInput.value;

  if (password !== passwordRepeat) {
    Swal.fire({
      title: "Password Error",
      text: "Passwords do not match!",
      icon: "error",
    });
  } 
  else if (email == "") {
    Swal.fire({
      title: "Empty Input Detected",
      text: "Please input your email",
      icon: "error",
    });
  }
  else {
    const formData = {
    //   email,
      password,
    };
    let queryDict = {};
    location.search
      .substring(1)
      .split("&")
      .forEach(function (item) {
        queryDict[item.split("=")[0]] = item.split("=")[1];
      });
    const userId = queryDict.userId;
    const token = queryDict.token;
    resetPassword(formData, userId, token);
  }
});

togglePassword.addEventListener("click", function () {
    console.log("clicked")
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