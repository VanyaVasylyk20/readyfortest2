const menuItems = [
    { name: "5 клас", link: "title5cl.html" },
    { name: "6 клас", link: "title6cl.html" },
    { name: "7 клас", link: "title7cl.html"},
    { name: "8 клас", link: "title8cl.html"},
    { name: "9 клас", link: "title9cl.html"},
];
document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('circular-menu');
    const numItems = menuItems.length;
    let angle = 0;
    const totalAngle = 360;

    menuItems.forEach((item, index) => {
        const element = document.createElement('div');
        element.className = 'menu-item';
        element.textContent = item.name;
        element.setAttribute('data-link', item.link);
        menu.appendChild(element);
    });

    const items = menu.getElementsByClassName('menu-item');

    function positionItems() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = Math.min(centerX, centerY) * 1.3;
        const itemAngle = totalAngle / items.length;

        for (let i = 0; i < items.length; i++) {
            const x = Math.cos(angle * Math.PI / 180) * radius + centerX;
            const z = Math.sin(angle * Math.PI / 180) * radius;
            items[i].style.left = `${x - 50}px`; 
            items[i].style.top = `${centerY - 50}px`;
            items[i].style.transform = `translateZ(${z}px) rotateY(${90 - angle}deg)`;
            angle += itemAngle;
        }
    }

    // Вращение меню
    let isDragging = false;
    let startAngle, startMouseX;

    menu.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    function startDrag(e) {
        isDragging = true;
        startAngle = angle;
        startMouseX = e.clientX;
    }

    function drag(e) {
        if (!isDragging) return;
        const mouseDiff = e.clientX - startMouseX;
        angle = startAngle + mouseDiff * 0.5; // Уменьшен коэффициент для более плавного вращения
        positionItems();
    }

    function stopDrag() {
        isDragging = false;
    }

    // Обработка кликов
    menu.addEventListener('click', function(e) {
        if (e.target.classList.contains('menu-item')) {
            const link = e.target.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        }
    });

    // Начальное расположение элементов
    positionItems();

    // Обновление позиций при изменении размера окна
    window.addEventListener('resize', positionItems);
});