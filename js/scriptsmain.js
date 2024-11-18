(function() {
// Обработка активного состояния пунктов меню
function handleNavLinks() {
    const navLinks = document.querySelectorAll('.header__nav-link');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

var menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach(function(item) {
item.addEventListener("mouseenter", function() {
this.classList.add("hover");
});
item.addEventListener("mouseleave", function() {
this.classList.remove("hover");
});
});

var currentPage = document.location.pathname.split("/").pop();
var menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach(function(item) {
    var itemPage = item.getAttribute("data-page");
    if (itemPage === currentPage) {
    item.classList.add("active");
    } else {
    item.classList.remove("active");
    }
});

// Подписываемся на событие DOMContentLoaded, чтобы обработать активное состояние меню
document.addEventListener('DOMContentLoaded', handleNavLinks);
})();

// Immediately Invoked Function Expression (IIFE): Это самовызывающаяся функция, которая позволяет создать локальную область видимости, изолируя переменные и функции от глобального контекста. Это помогает избежать загрязнения глобального пространства имен.
// document.querySelectorAll(): Метод, который выбирает все элементы, соответствующие заданному селектору.
// window.location.pathname: Возвращает часть URL, которая указывает путь к текущему документу.
// .split('/'): Делит строку по указанному разделителю (в данном случае по слешу) и возвращает массив.
// .pop(): Извлекает последний элемент из массива.
// forEach(): Метод массива, который выполняет указанную функцию для каждого элемента массива.
// classList.add() и classList.remove(): Методы для добавления и удаления классов у элементов.
// addEventListener(): Метод, который добавляет обработчик события к элементу. В данном случае обрабатываются события mouseenter и mouseleave.
// getAttribute(): Метод, который возвращает значение указанного атрибута у элемента. Здесь используется для получения значения атрибута data-page.
// DOMContentLoaded: Событие, которое срабатывает, когда весь HTML был полностью загружен и разобран, без ожидания загрузки стилей и изображений. Это позволяет запускать код, который работает с элементами страницы.
