document.addEventListener("DOMContentLoaded", function() {
  const element = document.getElementById('typing-effect');
  
  element.style.fontSize = '48px';  
  element.style.fontWeight = 'bold'; 
  element.style.textAlign = 'center'; 
  element.style.whiteSpace = 'pre-line'; 
  element.style.display = 'flex'; 
  element.style.justifyContent = 'center'; 
  element.style.alignItems = 'center'; 
  element.style.height = '100vh'; 
  
  // Apply gradient text color using background and webkit clipping
  element.style.background = 'linear-gradient(90deg, aquamarine, #ff4d80)';
  element.style.webkitBackgroundClip = 'text';
  element.style.webkitTextFillColor = 'transparent';
  
  const text = 'Hey There! \n Welcome To Your Dashboard!';
  let index = 0;
  let cursorVisible = true;
  
  function type() {
    if (index < text.length) {
      element.innerHTML = text.slice(0, index + 1) + `<span id="cursor">|</span>`;
      index++;
      setTimeout(type, 100);
    } else {
      setTimeout(() => {
        element.innerHTML = '';
        index = 0;
        setTimeout(type, 500);   
      }, 2000);
    }
  }

  setInterval(() => {
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.style.visibility = cursorVisible ? 'visible' : 'hidden';
      cursorVisible = !cursorVisible;
    }
  }, 500);
  
  type();
});
