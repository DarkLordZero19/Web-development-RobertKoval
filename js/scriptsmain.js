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