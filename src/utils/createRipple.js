// adapted from: https://codepen.io/BretCameron/pen/ZEWJKbN
// detail: https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/

export function createRipple(event) {
  const button = event.currentTarget;

  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const circle = document.createElement('span');

  circle.style.width = circle.style.height = `${diameter}px`;
  if (event.key === 'Enter') {
    circle.style.left = 0;
    circle.style.top = 0;
  } else {
    circle.style.left = `${event.offsetX - radius}px`;
    circle.style.top = `${event.offsetY - radius}px`;
    // see https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/#comment-1764066
  }

  circle.classList.add('ripple');

  // remove `circle` once animation is over (see https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/#comment-1764053)
  circle.addEventListener('animationend', () => button.removeChild(circle));

  button.appendChild(circle);
}
