const anthemButton = document.getElementById("anthem-btn-show")
const anthem = document.getElementById("anthem-container")
const hideAnthem = document.getElementById("anthem-btn-hide")
const playAnthemButton = document.getElementById("anthem-btn-play")
const anthemAudioContainer = document.getElementById("audio-container")
const anthemAudio = document.getElementById("anthem-play")


anthemButton.addEventListener("click", (e) => {
    e.preventDefault();
        if (anthem.classList.contains("displayed")) {
            anthem.classList.remove("displayed")
        }
        else {
            anthem.classList.add("displayed")
        }
})

hideAnthem.addEventListener("click", (e) =>{
    e.preventDefault();
     anthem.classList.remove("displayed")         
})

playAnthemButton.addEventListener("click", (e) =>{
    e.preventDefault();
     anthemAudioContainer.classList.add("displayed") 
    anthemAudio.setAttribute("autoplay", true)
    anthemAudio.load();
    playAnthemButton.style.display = "none";              
})

programmeButton = document.getElementById("hero-button");
programmeButton.addEventListener("click", (e) =>{
    e.preventDefault();
    window.location.href = "https://riyadarabicschool.netlify.app/frontend/programmes.html"      
    // window.location.href = "http://127.0.0.1:5500/RiyadNew/frontend/programmes.html"      
})
