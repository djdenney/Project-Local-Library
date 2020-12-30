function totalBooksCount(books) {
  return books.length
}

function totalAccountsCount(accounts) {
  return accounts.length
}

function booksBorrowedCount(books) {
  let borrowed = []
  books.map((book) => {
    book.borrows.find((borrow) => {
      if (borrow.returned === false) {
        borrowed.push(book)
      }
    })
  })
  return borrowed.length
}

function getMostCommonGenres(books) {
let mostCommonGenres = []
let genreList = books.map((book) => book.genre)
let commonGenres = genreList.reduce((acc, genre) => {
  acc[genre] === undefined ? acc[genre] = 1 : acc[genre] += 1
  return acc
}, {})
for (let genre in commonGenres) {
  const count = commonGenres[genre]
  mostCommonGenres.push({name: genre, count: count})
}
mostCommonGenres.sort((genreA, genreB) => (genreA.count < genreB.count) ? 1 : -1)
let topFiveGenres = mostCommonGenres.filter((genre, index) => index < 5)
return topFiveGenres
}

function getMostPopularBooks(books) {
  let mostPopularBooks = []
  let bookList = books.sort((bookA, bookB) => (bookA.borrows.length < bookB.borrows.length ? 1 : -1))
  let truncatedList = bookList.filter((book, index) => index < 5)
  for (let book in truncatedList) {
    const title = truncatedList[book].title
    const count = truncatedList[book].borrows.length
    mostPopularBooks.push({name: title, count: count})
  }
  return mostPopularBooks
}

function getMostPopularAuthors(books, authors) {
  let getBooks = getMostPopularBooks(books)
  let bookList = getBookList(books, getBooks)
  let mostPopularAuthors = bookList.map((book) => {
    for (let author in authors) {
      const name = `${authors[author].name.first} ${authors[author].name.last}`
      const count = books.reduce((acc, book) => {
        if (book.authorId === authors[author].id) {
          acc += book.borrows.length
        }
        return acc
      }, 0)
      if (authors[author].id === book.authorId) {
        return {name: name, count: count}
      }
    }
  })
  return mostPopularAuthors
}

function getBookList(books, getBooks) {
  let result = books.filter((book) => {
    for (let title in getBooks) {
      if (getBooks[title].name === book.title) {
        return book
      }
    }
  })
  return result
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
