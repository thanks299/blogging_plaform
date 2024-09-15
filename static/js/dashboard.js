// Get the dashboard heading element
const dashboardHeading = document.querySelector('h1');

// Add an event listener to the dashboard heading
dashboardHeading.addEventListener('click', () => {
  // Toggle the heading's text color
  dashboardHeading.style.color = dashboardHeading.style.color === 'blue' ? 'black' : 'blue';
});

// Add a greeting message based on the current time
const currentTime = new Date().getHours();
let greetingMessage;

if (currentTime < 12) {
  greetingMessage = 'Good morning!';
} else if (currentTime < 18) {
  greetingMessage = 'Good afternoon!';
} else {
  greetingMessage = 'Good evening!';
}

// Display the greeting message
const greetingElement = document.createElement('p');
greetingElement.textContent = greetingMessage;
document.body.appendChild(greetingElement);
