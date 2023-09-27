let isDragging = false;
let xOffset, yOffset;
const card = document.getElementById('draggable');

card.addEventListener('mousedown', (e) => {
    isDragging = true;
    xOffset = e.clientX - card.offsetLeft;
    yOffset = e.clientY - card.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        card.style.left = `${e.clientX - xOffset}px`;
        card.style.top = `${e.clientY - yOffset}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});
