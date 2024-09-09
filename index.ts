const books = [
  { title: 'TypeScript入門', author: '田中太郎', available: true },
  { title: 'TypeScript基礎', author: '山田花子', available: false },
  { title: 'Reactと実践', author: '鈴木一郎', available: true }
];

type Book = {
  title: string,
  author: string,
  available: boolean
}

const borrowedBooks = [];
let newBookId = 1;

// オブジェクト型の宣言
// book引数に渡されるオブジェクトの中身の型を宣言することもできる
function addNewBook(book: Book) {
  books.push(book);
  return book;
}

// title引数の型を文字列型で宣言している
// これにより文字列以外を引数に渡すとエラーが発生する
function borrowedBook(title :string) {
  const selectedBook = books.find(
    (book) => book.title === title && book.available
  );
  // タイプガード
  // undifinedによるエラーを防ぐことができる
  // undifinedだった場合の処理を定義している
  if (!selectedBook) {
    console.error("貸し出しできる本が見つかりませんでした")
    return
  }
  selectedBook.available = false;
  const newBorrowedBook = {
    id: newBookId++,
    book: selectedBook,
    status: 'borrowed'
  };
  borrowedBooks.push(newBorrowedBook);
  return selectedBook;
}

// bookId引数の型を数値型で宣言している
function returnBook(bookId: number) {
  const selectedBook = borrowedBooks.find((book) => book.id === bookId);
  // selectedBookがundifinedだった場合のエラーハンドリングを定義している 
  if(!selectedBook) {
    console.error("返却する本が見つかりませんでした")
    return
  }
  selectedBook.book.available = true;
  selectedBook.status = 'returned';
  return selectedBook;
}

addNewBook({
  title: 'Pythonで学ぶデータサイエンス',
  author: '伊藤花子',
  available: true
});
addNewBook({
  title: 'Vue.js入門',
  author: '鈴木一郎',
  available: true 
});

borrowedBook('TypeScript入門');
returnBook("1");

console.log(books);
console.log(borrowedBooks);
