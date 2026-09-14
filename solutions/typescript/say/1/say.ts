export function sayInEnglish(num: number): string {
  if(num < 0 || num > 999999999999) throw new Error('Number must be between 0 and 999,999,999,999.');
  if(num < 20) return nums.get(num)!;
  
  const thouMillBill: string[] = [ 'thousand', 'million', 'billion' ];
  const arr: string[] = numSeparator(num).map(item => hundredsToString(item));
  let result: string = arr[0];
  console.log(result)

  for(let i = 1; i < arr.length; i++) {
    if(arr[i] !== '') {
      const numPart: string = `${arr[i]} ${thouMillBill[i - 1]} `;
      result = numPart + result
    }
  }
  
  return result.trim();
}

function numSeparator(num: number): number[] {
  const str: string = num.toString();
  const result: number[] = []
  
  for(let i = str.length; i >= 0; i -= 3) {
    const start: number = i < 3 ? 0 : i - 3;
    const numPart: number = Number(str.substring(start, i));
    result.push(numPart);
  }

  return result
}

function hundredsToString(num: number): string {
  if(num > 999) throw new Error('Number must be less 1000');

  let result: string = '';
  let degree: number = 10;
  let dozensNum: number = num % 100;

  if(num > 99) {
    const hundreds: number = (num - dozensNum) / 100;
    result += `${nums.get(hundreds)} hundred`;
    if(dozensNum > 0) {
      result += ' ';
    }
  }
  
  if(dozensNum > 19 && dozensNum % 10 !== 0) {
    const unit: number = dozensNum % 10;
    const dozen: number = dozensNum - (unit);
    result += `${nums.get(dozen)}-${nums.get(unit)}`;
  } 
  else if(dozensNum > 0) {
    result += nums.get(dozensNum);
  }

  return result;
}

const nums = new Map<number, string>([
  [0, 'zero'], [1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], 
  [5, 'five'], [6, 'six'], [7, 'seven'], [8, 'eight'], [9, 'nine'], 
  [10, 'ten'], [11, 'eleven'], [12, 'twelve'], [13, 'thirteen'], [14, 'fourteen'],
  [15, 'fifteen'], [16, 'sixteen'], [17, 'seventeen'], [18, 'eighteen'], [19, 'nineteen'],
  [20, 'twenty'], [30, 'thirty'], [40, 'forty'], [50, 'fifty'], [60, 'sixty'], [70, 'seventy'], [80, 'eighty'], [90, 'ninety']
]);