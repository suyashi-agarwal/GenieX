let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    if ('speechSynthesis' in window) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.volume = 1;
        text_speak.lang = "en-IN";  // Updated to "hi-IN" for Hindi in India
        window.speechSynthesis.speak(text_speak);
    } else {
        console.log("SpeechSynthesis API not supported in this browser.");
    }
}

function wishMe(){
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12){
        speak("Good Morning");
    }
    else if (hours >= 12 && hours < 16){
        speak("Good Afternoon");
    }
    else {
        speak("Good Evening");
    }
}

// Trigger wishMe when the user clicks the button
// btn.addEventListener('click', () => {
//     wishMe();
// });

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}
btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})

function takeCommand(message){
    btn.style.display = "flex"
        voice.style.display="none"

    if(message.includes("hello")||message.includes("hey") ){
        speak("Hi,how can i help you?")
    }
    else if (message.includes("who are you")){
        speak("I am your virtual assistant,created by Suyashi")
    }
    else if (message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://www.youtube.com/","_blank")
    }
    else if (message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://www.instagram.com/","_blank")
    }
    else if (message.includes("open calculator")){
        speak("opening calculator...")
        window.open("calculator://")
    }
    else if (message.includes("open whatsapp")){
        speak("opening whatsapp...")
        window.open("whatsapp://")
    }
    else if (message.includes("what is the time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if (message.includes("what is the date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }



    else{
        let finalText ="this is what i found on the internet regarding"+ message.replace("genie","") 
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message}`,"_blank")
    }
}
