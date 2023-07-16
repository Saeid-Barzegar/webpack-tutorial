import styles from "../styles/notification.module.css";
import CheckMarkIcon from "../../images/checkmark.svg";
import { getMotivationamPictures } from "./api";

export function renderTodos(todos) {
  const renderedItemArray = todos.map(function (todo) {
      const className = todo.completed ? 'completed' : ''
      const completionClass = todo.completed ? 'checked' : ''
      return `
          <li data-id="${todo.id}" class="${className}">
              <span class="custom-checkbox">
                  <img class="check" src="${CheckMarkIcon}" width="22" height="22"></img>
                  <input class="real-checkbox" type="checkbox" ${completionClass} />
              </span>
              <label>${todo.text}</label>
              <span class="delete"></span>
          </li>
      `
  })
  document.querySelector('.todo-list').innerHTML = renderedItemArray.join('');
  renderMotivationamPictures();
};

export function clearNewTodoInput() {
  document.querySelector('.new-todo').value = '';
  showNotification();
};

export function getTodoId(element) {
  return parseInt(
      element.dataset.id
      || element.parentNode.dataset.id
      || element.parentNode.parentNode.dataset.id
  , 10)
};

function showNotification() {
  // const notification = `<div class="${styles.notification}">Todo item added</div>`;
  // document.body.innerHTML += notification;
  const notificationElement = document.createElement('div');
  notificationElement.classList.add('alert', 'alert-success', styles.notification);
  notificationElement.setAttribute('role', 'alert');
  notificationElement.innerHTML = 'Todo item added';
  document.body.appendChild(notificationElement);
  setTimeout(() => {
    const notificationElement = document.querySelector(`.${styles.notification}`);
    notificationElement.parentNode.removeChild(notificationElement);
  }, 2000)
};


function renderMotivationamPictures() {
  getMotivationamPictures()
    .then(pictures => {
      const motivationalPictures = `
        <div class="motivational-pictures">
        ${pictures.map(picture => {
          return '<img class="header-image" src="'+ picture + '" alt="motivational picture" />'
        }).join('')}
        </div>
      `;
      const motivationalPicturesContainer = document.querySelector('.motivational-pictures-container');
      motivationalPicturesContainer.innerHTML = motivationalPictures;
    })
}