function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1)
}

function numberOfBorrows(account, books) {
  let counter = 0
  books.forEach((book) => {
    counter += book.borrows.reduce((acc, borrow) => {
      if (borrow.id === account.id) {
        acc += 1
      }
      return acc
    }, 0)
  })
  return counter
}

function getBooksPossessedByAccount(account, books, authors) {
  let posessed = []
  books.filter((book) => {
    book.borrows.filter((borrow) => {
      if (borrow.id === account.id && !borrow.returned){
        let author = authors.find((author) => author.id === book.authorId)
        book.author = author
        posessed.push(book)
      }
    })
  })
  return posessed
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
