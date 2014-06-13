window.addEventListener("load", function() {
    var audio = new AudioLib();
    var worker = new SharedWorker("soundmaster.js");
    worker.port.onmessage = function(e) {
        if(e.data.command == "play") {
            console.log("playing: " + e.data.frequency);
            audio.playFrequency(e.data.frequency);
        } else if (e.data.command == "pause") {
            console.log("pausing");
            audio.mute();
        }
    }
}, false);
