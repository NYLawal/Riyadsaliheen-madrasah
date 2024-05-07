
const anthemButton = document.getElementById("anthem-btn-show")
const anthem = document.getElementById("anthem-container")
const hideAnthem = document.getElementById("anthem-btn-hide")
const playAnthemButton = document.getElementById("anthem-btn-play")
const anthemAudio = document.getElementById("audio-container")


window.addEventListener("click", (e) => {
    e.preventDefault();
    const targetElement = e.target;
   if (targetElement == anthemButton){
        if (anthem.classList.contains("displayed")) {
            anthem.classList.remove("displayed")
        }
        else {
            anthem.classList.add("displayed")
        }
   }   
   if (targetElement == hideAnthem){
      anthem.classList.remove("displayed")       
   }     
   if (targetElement == playAnthemButton){
      anthemAudio.classList.add("displayed")       
      playAnthemButton.style.display = "none";    
   }     
})