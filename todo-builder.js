document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-builder-form');
    const container = document.getElementById('todo-list-container');

    // Load saved parameters from localStorage
    loadSavedParameters();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        const parameters = {
            name: formData.get('name'),
            password: formData.get('password'),
            color: formData.get('color'),
            maxTasks: formData.get('max-tasks'),
            daysPerWeek: formData.get('days-per-week'),
            language: formData.get('language')
        };

        // Generate Todo List
        generateTodoList(parameters, container);

        // Save parameters to localStorage
        saveTodoParameters(parameters);
    });
  });

  function loadSavedParameters() {
    const savedParameters = JSON.parse(localStorage.getItem('todoParameters'));
    if (savedParameters) {
        document.getElementById('name').value = savedParameters.name || '';
        document.getElementById('password').value = savedParameters.password || '';
        document.getElementById('color').value = savedParameters.color || '#000000';
        document.getElementById('max-tasks').value = savedParameters.maxTasks || 5;
        document.getElementById('days-per-week').value = savedParameters.daysPerWeek || 5;
        document.getElementById('language').value = savedParameters.language || 'en';
    }
  }

  function saveTodoParameters(parameters) {
    localStorage.setItem('todoParameters', JSON.stringify(parameters));
  }

  function generateTodoList(parameters, container) {
    const { maxTasks, daysPerWeek, name, color, language } = parameters;
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    const dayLabel = language === 'ru' ? 'День' : 'Day';

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>${dayLabel}</th>
      ${Array.from({ length: maxTasks }, (_, index) => `<th>Task ${index + 1}</th>`).join('')}
    `;
    tableBody.appendChild(headerRow);

    for (let day = 1; day <= daysPerWeek; day++) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td style="background-color: ${color};">${dayLabel} ${day}</td>
          ${Array.from({ length: maxTasks }, () => '<td></td>').join('')}
        `;
        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    container.innerHTML = '';
    container.appendChild(table);
  }

//const form = document.getElementById('todo-builder-form');: Получение элемента формы по ID.
//form.addEventListener('submit', (event) => {...}): Добавление обработчика события для отправки формы.
//event.preventDefault(): Отменяет стандартное поведение формы (перезагрузку страницы).
//const formData = new FormData(event.target);: Создание объекта FormData, который содержит данные из формы.
//localStorage.setItem('key', value): Сохраняет данные в локальном хранилище браузера.
//JSON.parse() и JSON.stringify(): Методы для преобразования объектов JavaScript в строку и обратно.
//generateTodoList(parameters, container): Функция, которая создает список задач на основе переданных параметров.
//Создание таблицы с динамическим количеством строк и столбцов.
//let и const: Оба используются для объявления переменных в JavaScript. let позволяет изменять значение, а const — нет.