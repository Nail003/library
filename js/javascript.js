// Library 
let library = []

// Library functions
function addBookToLibrary(book) {
    library.push(book)
}

function fillTableFromLibrary() {
    const table = document.querySelector("tbody")
    let index = 1

    for (let book of library) {
        const tr = document.createElement("tr")

        // Indexing (backend does not have indexes so we do it here)
        const td = document.createElement("td")
        td.innerText = index++
        tr.appendChild(td)

        for (let key in book.info()) {
            const td = document.createElement("td")

            if (book.hasOwnProperty(key)) {
                if (key === "have_read") {
                    const button = document.createElement("button")
                    button.innerText = book[key]

                    if (book[key] === "Yes") {
                        button.classList = "book_read"
                    }

                    td.appendChild(button)
                } else {
                    td.innerText = book[key]
                }
                tr.appendChild(td)
            }
        }
        table.appendChild(tr)
    }
}

function refreshTable() {
    fillTableFromLibrary()
}

// Book Class
function Book(title, author, pages, have_read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.have_read = have_read
}

Book.prototype.info = function () {
    return { title: this.title, author: this.author, pages: this.pages, have_read: this.have_read }
}

// Event Listeners
function assignEventListener() {
    document.querySelector("add_book_button")
}

// Mock
const book1 = new Book("Gintama", "Monkey", "323", "Yes")
const book2 = new Book("One Punch Man", "One", "121", "Yes")
const book3 = new Book("One Piece", "Oda", "1109", "Yes")
const book4 = new Book("Isekai Ojisan", "Ojisan", "56", "No")

addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)
addBookToLibrary(book4)


fillTableFromLibrary()