let isDragging = false;
let offsetX, offsetY;

const draggableDiv = document.getElementsByClassName('draggable');

// Event listeners
Array.from(draggableDiv).forEach(e => e.addEventListener('mousedown', startDragging));
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

// Functions
/**
 * 
 * @param {MouseEvent} e event
 */
function startDragging(e) {
    isDragging = true;
    offsetX = e.clientX - e.target.getBoundingClientRect().left;
    offsetY = e.clientY - e.target.getBoundingClientRect().top;
}

function drag(e) {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    e.target.style.left = x + 'px';
    e.target.style.top = y + 'px';
}

function stopDragging() {
    isDragging = false;
}

