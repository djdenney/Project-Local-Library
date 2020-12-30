function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let borrowed = []
  let returned = []
  books.map((book) => {
    book.borrows.find((borrow) => {
      if (borrow.returned === false) {
        return borrowed.push(book)
      }
      else {
        return returned.push(book)
      }
    })
  })
  return [borrowed, returned]
}

function getBorrowersForBook(book, accounts) {
  let borrowers = []
  accounts.map((account) => {
    book.borrows.find((borrow) => {
      if (borrow.id === account.id) {
        if (borrowers.length < 10) {
          account.returned = borrow.returned
          borrowers.push(account)
        }
      }
    })
  })
  return borrowers
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
