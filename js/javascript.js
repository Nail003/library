// Library 
let library = []

// Library functions
function addBookToLibrary(book) {
    library.push(book)
}

function fillTableFromLibrary() {
    const table = document.querySelector("tbody")
    let index = 1

    // Empty Table Body (Not Table Head)
    table.innerHTML = ""

    for (let book of library) {
        const tr = document.createElement("tr")

        // Indexing (backend does not have indexes so we do it here)
        const td = document.createElement("td")
        td.innerText = index++
        tr.appendChild(td.cloneNode(true))

        for (let key in book.info()) {
            const td = document.createElement("td")

            if (book.hasOwnProperty(key)) {
                if (key === "have_read") {
                    const button = document.createElement("button")
                    button.dataset.index = index - 2
                    button.addEventListener("click", toggleHaveRead)

                    if (book[key]) {
                        button.classList = "book_read"
                        button.innerText = "Yes"
                    } else {
                        button.innerText = "No"
                    }

                    td.appendChild(button)
                } else {
                    td.innerText = book[key]
                }
                tr.appendChild(td)
            }
        }

        td.innerText = ""
        const button = document.createElement("button")
        button.innerText = "Delete"
        button.dataset.index = index - 2
        button.addEventListener("click", deleteBook)
        td.appendChild(button)
        tr.appendChild(td)

        table.appendChild(tr)
    }
}

function refreshTable() {
    fillTableFromLibrary()
}

// Book Class

class Book {
    constructor(title, author, pages, have_read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.have_read = have_read
    }

    info() {
        return { title: this.title, author: this.author, pages: this.pages, have_read: this.have_read }
    }
}

// Event Listeners
// Shared DOM Elements
const createNewBookPanel = document.querySelector("#create_new_book_panel")

// Events
function assignEventListener() {
    const addBookButton = document.querySelector(".add_book_button")
    const createBookButton = document.querySelector("#create_book_button")
    const closeBookPanelButton = document.querySelector("#close_book_panel_button")
    const blurBackground = document.querySelector(".blur_background")

    // Open New Book Panel
    addBookButton.addEventListener("click", openNewBookPanel)

    // Close New Book Panel
    closeBookPanelButton.addEventListener("click", closeNewBookPanel)
    blurBackground.addEventListener("click", closeNewBookPanel)

    // Create New Book
    createBookButton.addEventListener("click", createNewBook)
}

function openNewBookPanel(e) {
    if (e) e.preventDefault()
    createNewBookPanel.classList = ""
}

function closeNewBookPanel(e) {
    if (e) e.preventDefault()
    createNewBookPanel.classList = "no_display"
}

function createNewBook(e) {
    e.preventDefault()

    const form = document.querySelector("form")
    const title = document.querySelector("#title")
    const author = document.querySelector("#author")
    const pages = document.querySelector("#pages")
    const haveRead = document.querySelector("#have_read")

    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }

    const newBook = new Book(title.value, author.value, pages.value, haveRead.checked)
    library.push(newBook)

    title.value = ""
    author.value = ""
    pages.value = ""

    closeNewBookPanel()

    refreshTable()
}

function deleteBook(e) {
    e.preventDefault()

    let index = e.target.dataset.index
    library.splice(index, 1)

    refreshTable()
}

function toggleHaveRead(e) {
    e.preventDefault()

    let index = e.target.dataset.index
    library[index].have_read = !library[index].have_read

    refreshTable()
}

// Mock Data
const book1 = new Book("Gintama", "Monkey", "323", true)
const book2 = new Book("One Punch Man", "One", "121", false)
const book3 = new Book("One Piece", "Oda", "1109", false)
const book4 = new Book("Isekai Ojisan", "Ojisan", "56", true)

addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book1)), book1))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book2)), book2))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book3)), book3))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book4)), book4))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book1)), book1))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book2)), book2))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book3)), book3))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book4)), book4))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book1)), book1))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book2)), book2))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book3)), book3))
addBookToLibrary(Object.assign(Object.create(Object.getPrototypeOf(book4)), book4))

fillTableFromLibrary()
assignEventListener()