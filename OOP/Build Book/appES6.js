class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Constructor
class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const tr = document.createElement("tr");
    tr.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>`;
    list.appendChild(tr);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  showAlert(msg, classes) {
    const div = document.createElement("div");
    div.className = `alert ${classes}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

class Store {
  static displayBooks() {
    const books = this.getBook();
    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = this.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static removeBook(isbn) {
    const books = this.getBook();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks());

//Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);

    Store.addBook(book);

    ui.showAlert("Book added Successfuly", "success");

    ui.clearFields();
  }

  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert("Book Deleted", "success");
  e.preventDefault();
});
