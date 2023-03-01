// IIFE javascript design pattern used
(function() {

  // BACKGROUND MUSIC SECTION
  // ids of audio button and audio tag in index.html file
  const audio = document.querySelector('#audio');
  const audioButton = document.querySelector('#audioButton');


  // audios urls array
  const audioUrls = [
      "../assets/music/Apparition.mp3",
      "../assets/music/Avengers.mp3",
      "../assets/music/suicideSquad.mp3",
      "../assets/music/THE-BATMAN-Theme.mp3",
      "../assets/music/You-Have-Failed-This-City.mp3"
  ];


  // function to randomly pick one audio url from the array
  const randomAudio = () => {
    const index = Math.floor(Math.random() * audioUrls.length);
    const audioUrl = audioUrls[index];
    
    return audioUrl;
  }


  // function to play and shuffle the music by clicking the music icon
  audioButton.addEventListener("click", () => {
    audio.addEventListener("ended", () => {
      const audioUrl = randomAudio();
      
      const temp = new Audio();
      
      temp.addEventListener("loadeddata", () => {
        audio.src = audioUrl;
    });
      
      temp.src = audioUrl;
    })
    
    const audioUrl = randomAudio();
    
    audio.addEventListener("loadeddata", () => {
        audio.play();
    });
    
    audio.src = audioUrl;
    
  })


})();