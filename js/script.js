// waiting until the document has loaded
document.addEventListener('DOMContentLoaded', init);

let introVideo, finalVideo, popup, loading;

let answer = {
    step: 0,
    spicy: 0
}

// two functions for the loading screen
function startLoading() {
    loading.style.opacity = 1;
    loading.style.pointerEvents = "all";
}

function stopLoading() {
    loading.style.opacity = 0;
    loading.style.pointerEvents = "none";
}

function init() {
    let title = document.querySelector('.main-title');
    loading = document.querySelector('.loading');
    introVideo = document.querySelector('.intro-video video');

    // removing the intro screen on click, starting loading screen
    // loading the first video
    // stopping loading screen
    title.addEventListener('click', () => {
        title.style.opacity = 0;
        startLoading();
        setTimeout(() => {
            title.style.pointerEvents = "none";
            introVideo.play();
            title.remove();
        }, 1000);
        introVideo.src = "videos/videos/First clip.mp4";
        introVideo.addEventListener("loadeddata", () => {
            stopLoading();
            introVideo.addEventListener("ended", introVideoEnd);
        })
    })
}

function introVideoEnd() {
    // showing the popup when the intro video ends
    popup = document.querySelector(".popup");
    let form = document.querySelector(".popup .container .spiciness");

    popup.style.pointerEvents = "all";
    popup.style.opacity = 1;

    form.addEventListener("submit", submitHandler);
}

function submitHandler(e) {
    startLoading();
    loading.innerHTML = "<img class='bg' src='images/bg.png'>Loading Story..";
    e.preventDefault();

    popup.style.pointerEvents = "none";

    // getting data from the form
    answer.step = document.querySelector('input[name="steps"]:checked').value;
    answer.spicy = document.querySelector('input[name="spicy"]:checked').value;
    finalVideo = document.querySelector(".final-video video");
    
    introVideo.remove();

    // selecting proper video depending on the answer
    if (answer.step == "Rice, Egg, Vegetables") {
        if (answer.spicy == "hot") {
            finalVideo.src = "videos/videos/rice, egg, spicy.mp4";
        } else {
            finalVideo.src = "videos/videos/rice, egg, mild.mp4";
        }
    } else if (answer.step == "Vegetables, Egg, Rice") {
        if (answer.spicy == "hot") {
            finalVideo.src = "videos/videos/vegetables first spicy.mp4";
        } else {
            finalVideo.src = "videos/videos/vegetables first mild.mp4";
        }
    } else if (answer.step == "Rice, Vegetables, Egg") {
        if (answer.spicy == "hot") {
            finalVideo.src = "videos/videos/rice, vegetable, spicy.mp4";
        } else {
            finalVideo.src = "videos/videos/rice, vegetable, mild.mp4";
        }
    }
    
    document.querySelector(".final-video").style.display = "block";
    popup.style.opacity = 0;
    
    finalVideo.play();
    // stoping the loading when final video has finished loading
    finalVideo.addEventListener("loadeddata", () => {
        stopLoading();    

        finalVideo.addEventListener("ended", theEnd);
    })
    
}

function theEnd() {
    // playing the ending audio at the end
    let bg = new Audio("audio/music.mp3");
    bg.volume = 0.5;
    bg.play();
    let ending = document.querySelector(".the-end");
    ending.style.opacity = 1;
    ending.style.pointerEvents = "all";
}
