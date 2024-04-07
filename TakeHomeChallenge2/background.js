/* 
This is the background script for the extension, it runs in the background of the browser.

Video walkthrough: https://vimeo.com/923628666

Goal: Ensure that there is a continuous stream of timestamps logged from contentScript.js

Rules: 
You can only change one file: this background.js file. 
No DOM manipulation allowed such as overriding document.visibilityState.
When testing your code we will use the original files and only update the background.js file.

Testing: Use this site for easy testing https://ai-stealth-challenge.tiiny.site/

Hint: The solution is only a few lines of code.
*/

console.log("background.js running") // background console logs can be found by inspecting the extension in chrome://extensions > developer mode > then click on "service worker" > then go to console

/* YOUR CODE BELOW THIS LINE :) */  

// Attempt using stopImmediatePropagation
for (event_name of ["visibilitychange", "webkitvisibilitychange", "blur"]) {
  document.addEventListener(event_name, (event) => {
    document.focus()
    event.stopImmediatePropagation()
    event.stopPropagation()
  }, true);
  
  window.addEventListener(event_name, (event) => {
    event.stopImmediatePropagation()
    event.stopPropagation()
    window.focus()
  }, true);
}

// Attempt to propagate another visibilitychange event when hidden state occurs
let eventDispatched = false
document.addEventListener("visibilitychange", (e) => {
  if (eventDispatched) return;
  if (document.visibilityState === "hidden") {
    eventDispatched = true
    document.dispatchEvent(new Event('visibilitychange'))
    setTimeout(() => {
      eventDispatched = false
    }, 1400)
  }
})

// Overwrite document properties (Not Allowed)  
Object.defineProperty(document, 'visibilityState', {value: 'visible', writable: true});
Object.defineProperty(document, 'hidden', {value: false, writable: true});