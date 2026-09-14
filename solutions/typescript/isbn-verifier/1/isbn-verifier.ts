export function isValid(isbn: string): boolean {
  const currentIsbn: string = isbn.replace(/-/g, '');
  const digits: string = currentIsbn.substring(0, 9);
  const checkDigit: string = currentIsbn[9];
  
  if(
    currentIsbn.length !== 10 ||
    /[a-zA-Z]/.test(digits) ||
    !/[X0-9]/.test(checkDigit)
  ) return false;

  let sum: number = 0;
  let step: number = 10;
  for(let i = 0; i < 10; i++) {
    if(i === 9 && checkDigit === 'X') sum += 10; 
    else sum += Number(currentIsbn[i]) * step;
    step--;
  }
  
  return sum % 11 === 0;
}