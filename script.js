 document.addEventListener("DOMContentLoaded", () => {
        const startButton = document.getElementById("start-btn");
        const stopButton = document.getElementById("stop-btn");
        const outputDiv = document.getElementById("output");

        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
          alert("Your browser does not support the Web Speech API.");
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = true;

        recognition.onstart = () => {
          outputDiv.textContent = "Listening...";
        };

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          outputDiv.textContent = transcript;
        };

        recognition.onerror = (event) => {
          console.error("Speech Recognition Error:", event.error);
          switch (event.error) {
            case "no-speech":
              outputDiv.textContent = "No speech detected. Please try again.";
              break;
            case "audio-capture":
              outputDiv.textContent =
                "Microphone not found or permission denied.";
              break;
            case "not-allowed":
              outputDiv.textContent =
                "Microphone access denied. Please allow it.";
              break;
            default:
              outputDiv.textContent = `An error occurred: ${event.error}`;
          }
        };

        recognition.onend = () => {
          outputDiv.textContent += " (Stopped listening)";
        };

        startButton.addEventListener("click", () => {
          recognition.start();
        });

        stopButton.addEventListener("click", () => {
          recognition.stop();
        });
      });