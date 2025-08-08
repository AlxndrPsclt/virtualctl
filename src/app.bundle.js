//const OSC = require('osc-js')
//const plugin = new OSC.WebsocketClientPlugin({ host: '192.168.8.123', port: 8080 })
var plugin = {};
var osc ={};
//const osc = new OSC({ plugin: plugin })

//osc.open(); // connect by default to ws://localhost:8080

/**
 * Creates a div with a specified number of knobs.
 * @param {number} numKnobs - The number of knobs to create.
 */
function createKnobs(numKnobs) {
    // Remove existing knobs div if it exists
    removeKnobs();

    // Create the container div
    const knobsDiv = document.createElement('div');
    knobsDiv.className = 'knobs';

    // Generate the knobs
    for (let i = 1; i <= numKnobs; i++) {
        const knob = document.createElement('webaudio-knob');
        knob.id = `knob${i}`;
        knob.setAttribute('min', '0');
        knob.setAttribute('max', '1');
        knob.setAttribute('step', '0.001');
        knob.setAttribute('colors', '#81a1c1;#4c566a;#444');
        knob.setAttribute('width', '46');
        knob.setAttribute('height', '46');

        knobsDiv.appendChild(knob);
    }

    // Add the knobs div to the app container
    const app = document.querySelector('.app');
    if (app) {
        app.appendChild(knobsDiv);
    } else {
        console.error('No element with class "app" found.');
    }
}

/**
 * Removes the knobs div from the DOM.
 */
function removeKnobs() {
    const knobsDiv = document.querySelector('.knobs');
    if (knobsDiv) {
        knobsDiv.remove();
    }
}

async function sendOSC(path, value) {
  try {
		const ip = document.getElementById('hostaddr').value;
    const response = await fetch(`http://${ip}:8080/osc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path, value })
    })

    if (!response.ok) {
      console.error('Failed to send OSC:', await response.text())
    }
  } catch (err) {
    console.error('HTTP request failed:', err)
  }
}

//osc.open({ port: 9000 })

createKnobs(128);
// Add event listeners to all knobs
//for (let i = 1; i <= 128; i++) {
//  const knob = document.getElementById(`knob${i}`);
//  if (knob) {
//    knob.addEventListener("input", (event) => {
//      const value = parseFloat(event.target.value);
//      const path = `/virtualctl/K${String(i.toString(16)).padStart(2, "0")}`; // e.g., /virtualctl/k01
//      console.log(`Sending OSC: ${path} ${value}`);
//
//      // Send the OSC message
//      const message = new OSC.Message(path, parseFloat(value));
//      osc.send(message)
//    });
//  }
//}

for (let i = 1; i <= 128; i++) {
  const knob = document.getElementById(`knob${i}`)
  if (knob) {
    knob.addEventListener('input', (event) => {
      const value = parseFloat(event.target.value)
      const path = `/virtualctl/K${String(i.toString(16)).padStart(2, '0')}`
      console.log(`Sending OSC: ${path} ${value}`)
      sendOSC(path, value)
    })
  }
}

//// Register the service worker for PWA
async function registerSW() {
  console.log("Registering");
  console.log(navigator);
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register(new URL('./sw.js', import.meta.url));
    } catch(e) {
      console.log("Service Worker registration failed:", e);
    }
  }
}

function connect(ip) {
  plugin = new OSC.WebsocketClientPlugin({ host: ip, port: 8080 })
  osc = new OSC({ plugin: plugin })
  osc.open(); // connect by default to ws://localhost:8080
}

window.addEventListener('load',() => {
  const ip = document.getElementById('hostaddr').value;
  console.log("C'est parti!!");
  console.log(ip);
  connect(ip);
  registerSW();
});

const ipElement = document.getElementById('hostaddr');

ipElement.addEventListener("change", (event) => {
  console.log("Changed IP, reconnecting");
  console.log(event.target.value);
  connect(event.target.value);
});




window.onbeforeunload = function() { console.log("Your work will be lost."); };

window.addEventListener('popstate', () => {
  console.log('User clicked back button');
});
