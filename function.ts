import { Book } from "./book";

export function getBookDetail(identifier: string | number, books: Book[]): Book { // 「)」と「{」の間に戻り値の型を宣言することができる 
  // 引数の受け取り値の型によって処理を書くことをNarrowingという
  // if (typeof identifier === 'string') {
  //   return books.find((book) => book.title === identifier);
  // } else {
  //   return books.find((book) => book.id === identifier);
  // }

  // 上記のif文のままではタイプガードが書けないため三項演算子に書き換えている
  const book =
    typeof identifier === 'number'
      ? books.find((book) => book.id === identifier)
      : books.find((book) => book.title === identifier);

  if (!book) {
    throw new Error("本が見つかりませんでした");
  }

  return book
}
