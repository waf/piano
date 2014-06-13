function AudioLib() {
    var AudioContext = window.AudioContext || window.webkitAudioContext,
        context = new AudioContext(),
        oscillator = context.createOscillator(),
        amp = context.createGain();

    amp.gain.value = 0;
    oscillator.start(0);

    oscillator.connect(amp);
    amp.connect(context.destination);

    this.playFrequency = function(freq) {
        amp.gain.cancelScheduledValues(context.currentTime);
        oscillator.frequency.value = freq;
        amp.gain.linearRampToValueAtTime(1,context.currentTime);
        //amp.gain.value = 1;
    };

    this.mute = function() {
        amp.gain.linearRampToValueAtTime(0,context.currentTime);
        //amp.gain.value = 0;
    };
}

