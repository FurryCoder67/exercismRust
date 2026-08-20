/*
 * If you create an ascii table with 32 columns, 
 * all alphabetic characters will start on the second column,
 * A=65, a=97, so by lopping off all bits except for the last 5,
 * you get a number from 1-26.
 * To turn the alphabet around, you just need to use the char code
 * of 'z'=122 plus one (=123) minus the character code & 31.
 */

const atbash = (c: string) =>
  String.fromCharCode(123 - (c.charCodeAt(0) & 31));

export const decode = (cipherText: string) =>
  cipherText.replace(/\W/g, '').replace(/[a-z]/ig, atbash);

export const encode = (plainText: string) =>
  decode(plainText).replace(/(.....)(?!$)/g, "$1 ");