const addBooks = document.querySelector('.addBook');
const booksList = document.querySelector('.books-list');
const remover = document.getElementsByClassName('remover');
const newB = document.getElementsByClassName('thebook');
const list = document.getElementsByClassName('list');
const main = document.getElementsByClassName('main');
const time = document.getElementsByClassName('time');
// eslint-disable-next-line no-plusplus
for (let g = 0; g < time.length; g++) {
  time[g].innerHTML = Date();
}

// eslint-disable-next-line no-plusplus
for (let i = 0; i < list.length; i++) {
  list[i].addEventListener('click', () => {
  // eslint-disable-next-line no-plusplus
    for (let j = 0; j < main.length; j++) {
      if (list[i].dataset.id === main[j].dataset.id) {
        // eslint-disable-next-line no-plusplus
        for (let m = 0; m < main.length; m++) {
          if (main[m].classList.contains('active')) {
            main[m].classList.remove('active');
          }
        }
        // eslint-disable-next-line no-plusplus
        for (let d = 0; d < list.length; d++) {
          if (list[d].classList.contains('active_link')) {
            list[d].classList.remove('active_link');
          }
        }
        main[j].classList.add('active');
        list[j].classList.add('active_link');
      }
    }
  });
}
const newBooks = JSON.parse(localStorage.getItem('mydata')) || [];

class Book {
  constructor(name, title) {
    this.name = name;
    this.title = title;
    this.id = Math.random();
  }

  static bookAdder() {
    newBooks.forEach((book) => {
      booksList.innerHTML += `<div class="newBook thebook">
        <h2 class="name">"${this.name}" by &nbsp;</h2>
        <h2 class="title">${this.title}</h2>
        <button class="remover" id=${book.id}>Remove</button>
    </div>`;
    });
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < newB.length; i++) {
      if (i % 2 !== 0) {
        newB[i].classList.add('backgroundColor');
      }
    }
  }

  static bookCreator() {
    const inputTitle = document.querySelector('.txtTitle');
    const inputAuthor = document.querySelector('.txtAuthor');
    const bookFunction = new Book(inputAuthor.value, inputTitle.value);
    newBooks.push(bookFunction);
    localStorage.setItem('mydata', JSON.stringify(newBooks));
    booksList.innerHTML = '';
    inputTitle.value = '';
    inputAuthor.value = '';
  }
}

function bookRemover() {
  for (let i = 0; i < remover.length; i += 1) {
    remover[i].addEventListener('click', (e) => {
      if (newBooks !== []) {
        const foundId = newBooks.find((x) => x.id === remover[i].id);
        const index = newBooks.indexOf(foundId);
        newBooks.splice(index, 1);
        localStorage.setItem('mydata', JSON.stringify(newBooks));
        const mytar = e.target.parentNode;
        mytar.classList.add('remove');
      }
    });
  }
}

Book.bookAdder();
bookRemover();

addBooks.addEventListener('click', (e) => {
  e.preventDefault();
  Book.bookCreator();
  Book.bookAdder();
  bookRemover();
});