const addBooks = document.querySelector('.addBook');
const booksList = document.querySelector('.books-list');
const remover = document.getElementsByClassName('remover');
const newB = document.getElementsByClassName('thebook');
function Book(name, title) {
  this.name = name;
  this.title = title;
  this.id = Math.random();
}
const newBooks = JSON.parse(localStorage.getItem('mydata')) || [];

function bookAdder() {
  newBooks.forEach((book) => {
    booksList.innerHTML += `<div class="newBook thebook">
      <h2 class="name">"${book.name}" by &nbsp;</h2>
      <h2 class="title">${book.title}</h2>
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

function bookCreator() {
  const inputTitle = document.querySelector('.txtTitle');
  const inputAuthor = document.querySelector('.txtAuthor');
  const bookFunction = new Book(inputAuthor.value, inputTitle.value);
  newBooks.push(bookFunction);
  localStorage.setItem('mydata', JSON.stringify(newBooks));
  booksList.innerHTML = '';
  inputTitle.value = '';
  inputAuthor.value = '';
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

bookAdder();
bookRemover();

addBooks.addEventListener('click', (e) => {
  e.preventDefault();
  bookCreator();
  bookAdder();
  bookRemover();
});