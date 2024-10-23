document.addEventListener("DOMContentLoaded", function() {
    const element = document.getElementById('typing-effect');
    const text = 'Hey There! \n Welcome to the Dashboard!';
    let index = 0;
  
    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100); // Continue typing
      } else {
        setTimeout(() => {
          element.innerHTML = '';
          index = 0;
          setTimeout(type, 500);  
        }, 2000); 
      }
    }
  
    type(); 
  });
  