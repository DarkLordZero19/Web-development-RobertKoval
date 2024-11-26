document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messagesContainer');
    const preloader = document.getElementById('preloader');
    const errorContainer = document.getElementById('errorContainer');
    const messageForm = document.getElementById('messageForm');

    // Функция для получения сообщений
    const fetchMessages = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Сеть не доступна');
            }
            const data = await response.json();
            renderMessages(data);
        } catch (error) {
            console.error(error);
            preloader.classList.add('hidden');
            errorContainer.classList.remove('hidden');
        }
    };

    // Функция для отрисовки сообщений
    const renderMessages = (messages) => {
        preloader.classList.add('hidden');
        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.innerHTML = `<strong>${message.title}</strong><p>${message.body}</p>`;
            messagesContainer.appendChild(messageDiv);
        });
    };

    // Генерация псевдо-случайного URL
    const randomFilter = Math.random() > 0.5 ? '100' : '200';
    const fetchUrl = `https://jsonplaceholder.typicode.com/posts?_start=${randomFilter}&_limit=5`;

    // Инициализация запроса
    fetchMessages(fetchUrl);

    // Обработка отправки формы
    messageForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        // Отправка нового сообщения на сервер
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке сообщения');
            }

            const newMessage = await response.json();
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.innerHTML = `<strong>${newMessage.title}</strong><p>${newMessage.body}</p>`;
            messagesContainer.prepend(messageDiv); // Добавляем новое сообщение в начало
            messageForm.reset(); // Сбрасываем поля формы
        } catch (error) {
            console.error(error);
            errorContainer.classList.remove('hidden');
        }
    });
});

/*async/await: Позволяет писать асинхронный код более читабельно. Функция fetchMessages загружает сообщения по указанному URL.
fetch(url): Выполняет HTTP-запрос по указанному адресу.
response.json(): Преобразует ответ в формат JSON.
try...catch: Обрабатывает возможные ошибки при выполнении запросов. Если что-то пойдет не так, выводится сообщение об ошибке.
messages.forEach(...): Перебирает каждое сообщение в массиве и создает новый элемент div для каждого сообщения.
messageDiv.innerHTML: Устанавливает HTML-содержимое для каждого сообщения, включая заголовок и тело.
messagesContainer.appendChild(messageDiv): Добавляет созданный элемент в контейнер сообщений.
messageForm.addEventListener('submit', ...): Устанавливает обработчик для события отправки формы.
event.preventDefault(): Предотвращает стандартное поведение формы, чтобы страница не перезагружалась.
fetch(..., { method: 'POST', ... }): Отправляет POST-запрос на сервер с заголовками и телом запроса (в формате JSON).
messagesContainer.prepend(messageDiv): Добавляет новое сообщение в начало списка, чтобы последние сообщения были сверху.
messageForm.reset(): Очищает поля формы после отправки.*/