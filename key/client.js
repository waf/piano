window.addEventListener("load", function() {

    // request frequency from master
    var myFrequency = 0;
    var myName = "unnamed";
    var worker = new SharedWorker("../soundmaster.js");
    worker.port.onmessage = function(e) {
        myFrequency = e.data.frequency;
        myName = e.data.name;
        document.title = myName;
        document.getElementById("keyname").innerText = myName;
        document.getElementById("keyfreq").innerText = myFrequency;
    }

    // set up page visibility API
    document.addEventListener('webkitvisibilitychange', function(e) {
        if(document.webkitHidden) {
            console.log("pausing");
            worker.port.postMessage({command:"pause"});
        } else {
            if(myFrequency) {
                console.log("playing: " + myFrequency);
                worker.port.postMessage({command:"play", frequency:myFrequency});
            }
        }
    }, false);

}, false);
