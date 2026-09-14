export function largestProduct(input: string, span: number) {
  if(/\D/g.test(input))   throw new Error('Digits input must only contain digits');
  if(span < 0)            throw new Error('Span must not be negative');
  if(span > input.length) throw new Error('Span must not exceed string length');

  let listOfseries: string[] = [];
  for(let i = 0; i < input.length; i++) {
    const endPoint = i + span;
    if(endPoint > input.length) break;
    listOfseries.push(
      input.substring(i, endPoint)
    );
  }

  let products: number[] = listOfseries.map(series => series
                                                            .split('')
                                                            .reduce((acc, item) => acc *= Number(item), 1));
  return Math.max(...products);
}