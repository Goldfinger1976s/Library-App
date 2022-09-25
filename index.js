"use strict";
// Button event listener selectors
const formContainer = document.querySelector("#container-form");
const form = document.querySelector("#add-book-form");
const addBookBtn = document.querySelector("#addbook-btn");
const overlay = document.querySelector("#overlay");
const bookshelf = document.querySelector("#container-shelf");
const booksGrid = document.querySelector("#books-grid");
let formOpen = false;

// Book constructor
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

//  Open new book
function openAddBook() {
  if (formOpen) {
    formContainer.classList.remove("active");
    addBookBtn.classList.remove("active");
    form.reset();
    overlay.classList.remove("active");
    formOpen = false;
  } else {
    formContainer.classList.add("active");
    addBookBtn.classList.add("active");
    overlay.classList.add("active");
    formOpen = true;
  }
}

// Close modal overlay
function closeModal() {
  formContainer.classList.remove("active");
  overlay.classList.remove("active");
  addBookBtn.classList.remove("active");
  form.reset();
  formOpen = false;
}

// Add new book to library
function addBookToLibrary(e) {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;
  myLibrary.push(new Book(title, author, pages, isRead));
  localStorage.setItem("library", JSON.stringify(myLibrary));
  form.reset();
  openAddBook();
  printBooks();
}

addBookBtn.onclick = openAddBook;
overlay.onclick = closeModal;
form.onsubmit = addBookToLibrary;

// Library array of default books
const myLibrary = JSON.parse(localStorage.getItem("library")) || [
  {
    title: "The Hobbit, or There and Back Again",
    author: "J.R.R. Tolkien",
    pages: 310,
    read: true,
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    pages: 374,
    read: false,
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
    pages: 870,
    read: true,
  },
];

// Creates the book element
function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttons = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  buttons.classList.add("buttons");
  readBtn.classList.add("btn");
  readBtn.classList.add("btn");
  removeBtn.classList.add("btn");


  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.isRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-light-green");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("btn-light-red");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttons.appendChild(readBtn);
  buttons.appendChild(removeBtn);
  bookCard.appendChild(buttons);
  booksGrid.appendChild(bookCard);

  // Function to update the books read status
  readBtn.addEventListener("click", () => {
    book.isRead = !book.isRead;
    saveLocal();
    printBooks();
  });

  // Remove books from Library
  removeBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    saveLocal();
    printBooks();
  });
}

// Prints all the books in the Library to the page
function printBooks() {
  booksGrid.innerHTML = "";
  myLibrary.forEach((book) => {
    createBookCard(book);
  });
  saveLocal();
}

// Setting Library to be stored in local storage
function saveLocal() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

printBooks();
