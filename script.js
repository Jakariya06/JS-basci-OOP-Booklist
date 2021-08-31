class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  //ADD BOOK
  addBook(book) {
    const list = document.getElementById("book-list"),
          row = document.createElement("tr");

    row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td> <a href="" class="delete"> x </a> </td>
        <td> <a href="" class="edit"> &#10004; </a> </td>
    `;

    list.appendChild(row);
  }

  //ASHOW ALERT
  showAlert(message, className) {
    const div = document.createElement('div')
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')

    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    container.insertBefore(div, form)

    setTimeout(()=> document.querySelector('.alert').remove(), 2000)
  }

  //DELETE BOOK
  deleteBook(target) {
    if(target.className === 'delete'){
        const result = confirm('sure??')
        if(result) {
            target.parentElement.parentElement.remove()
        } else{
            return false
        }
        
    }
  }

  //EDIT BOOK
  editBook(target) {
    if(target.className === 'edit'){
        const element = target.parentElement.parentElement,
            editElement = target.parentElement.previousElementSibling.previousElementSibling

        console.log(editElement)
    }
  }

  //CLEAR INPUT FIELDS
  clearFields() {
    let inputs = document.querySelectorAll("[type=text]");
     inputs.forEach((input) => (input.value = ""));
  }
}



//EVENT LISTENER FORM
document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value,
    book = new Book(title, author, isbn),
    ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("fill the form dude", "error");
  } else {
    ui.addBook(book);

    ui.showAlert("Book added", "success");
    ui.clearFields();
  }

  e.preventDefault();
});

//EVENT LISTENER DELETE
document.getElementById("book-list").addEventListener("click", (e) => {
  const ui = new UI(),
        konfirmasi = ui.deleteBook(e.target);

 if(konfirmasi === undefined){
    ui.showAlert("book removed", "success");
 }
  
 ui.editBook(e.target)
  e.preventDefault();
});
