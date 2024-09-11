import { Book } from "./book";
import { getBookDetail } from "./function";

// any型：全ての型を許容する

const books = [
  { id: 1, title: 'TypeScript入門', author: '田中太郎', available: true },
  { id: 2, title: 'TypeScript基礎', author: '山田花子', available: false },
  { id: 3, title: 'Reactと実践', author: '鈴木一郎', available: true }
];

// オブジェクト型はネストさせることができる
type BorrowedBook = {
  id: number;
  book: Book; // 上記のBook型を使用している
  // book?: Book,  bookの接尾辞に「?」をつけることで、bookが無くても許容されるようになる

  // リテラル（'borrowed', 'return'）：直接値を指定して、それ以外の値は入らないようにすること
  // ユニオン（ | ）：論理和と同じで'borrowed'または、'return'の値だけが許容される
  status: 'borrowed' | 'return';
};

// 配列の型宣言
const borrowedBooks: BorrowedBook[] = [];

let newBookId = 1;

// オブジェクト型の宣言
// book引数に渡されるオブジェクトの中身の型を宣言することもできる
// function addNewBook(book: Omit<Book, "id">): void { // voidを書くことで戻り値がないことを明示することができる
//   const newBook = {     // ↑ ユーティリティ型：オブジェクト型のプロパティを除外し、新たなオブジェクト型を作ることができる
//     id: newBookId++,
//     ...book // ネスレ構文（...）：値のコピーを作成することができる（この場合、idプロパティが除外されたBookオブジェクトのコピーを作成したことになる）
//   }
//   books.push(newBook);
// }

// ジェネリクス
// 以下のような引数の型だけが違っていて、それ以外は共通している場合に共通化させる方法としてジェネリクスという機能がある
// function addArray(array: String, item: String) {
//   array.push(item)
//   return array
// }
// function addArray(array: Number, item: Number) {
//   array.push(item)
//   return array
// }

// 　　　　　　　　　↓ 慣習的に <> の中は「T」にする                                                             ↓ ここ指定する型が引数で受け取れる型になる      
function addArray<T>(array: T[], item: T) { // 引数の型を「T」にすることで、addArrayを呼び出すときに「addArray<String>(第一引数, 第二引数) {...}」とすることで、
  array.push(item);                         // 第一引数と第二引数を文字列で受け取ることができる。
  return array;
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
  const newBorrowedBook: BorrowedBook = {
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
  if (!selectedBook) {
    console.error("返却する本が見つかりませんでした")
    return
  }
  selectedBook.book.available = true;
  selectedBook.status = 'return';
  return selectedBook;
}

addArray<Book>(books, {
  id: 4,
  title: 'Pythonで学ぶデータサイエンス',
  author: '伊藤花子',
  available: true
});
// addNewBook({
//   id: 5,
//   title: 'Vue.js入門',
//   author: '鈴木一郎',
//   available: true 
// });

borrowedBook('TypeScript入門');
returnBook(1);
getBookDetail("TypeScript入門", books);

console.log(books);
console.log(borrowedBooks);
