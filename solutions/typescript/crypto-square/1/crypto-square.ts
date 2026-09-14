const compose = (...fnc: Function[]) => (initValue: any) => fnc.reduce((currentArg, currentFnc) => {
  return currentFnc(currentArg);
}, initValue)
type Rectangle = {
  c: number,
  r: number
};

type PassedData = {
  rec: Rectangle,
  text: string
};

const normalize = (text: string): string => {
  return text.toLowerCase().replace(/[^\w\s]/g, '').split(' ').join('');
}

const calculateRowsColumns = (text: string): PassedData => {
  const rootOfTextLength = Math.sqrt(text.length);
  const c = Math.ceil(rootOfTextLength);
  const lowerR = Math.floor(rootOfTextLength);
  const upperR = c;
  const lowerRGap = Math.abs((lowerR * c) - text.length);
  const upperRGap = Math.abs((upperR * c) - text.length);

  return {
    rec: {
      c,
      r: lowerRGap < upperRGap ? lowerR : upperR
    },
    text
  }
}

const paddingText = (fncParams: PassedData): PassedData => {
  const {
    rec
  } = fncParams;
  return {
    rec,
    text: rec.c * rec.r !== fncParams.text.length
      ? fncParams.text + ' '.repeat(rec.c * rec.r - fncParams.text.length)
      : fncParams.text
  };
}

const splitTextByRectangle = (rec: Rectangle): any => (text: string): string[] => {
  const {
    c: columns,
    r: rows
  } = rec;
  const result: string[] = [];

  for (let i = 0; i < rows; i++) {
    const splittedText = text.slice(i * columns, i * columns + columns);
    result.push(splittedText);
  }
  return result;
}

const encodeColumns = (columns: number): any => (splittedTextArray: string[]): string => {
  const totalRows: number = splittedTextArray.length;
  let result: string = '';
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < totalRows; j++) {
      result = result + splittedTextArray[j][i];
    }
  }
  return result;
}

const normalizeEncodedText = (splittedTextArray: string[]): string => {
  return splittedTextArray.join(' ');
}

const encode = (fncParams: PassedData): string => {
  const {
    rec: {
      c,
      r
    },
    text
  } = fncParams;
  return compose(
    splitTextByRectangle({
      c,
      r
    }),
    encodeColumns(c),
    splitTextByRectangle({
      c: r,
      r: c
    }),
    normalizeEncodedText,
  )(text);
}

const encrypt = (text: string): string => {
  return compose(
    normalize,
    calculateRowsColumns,
    paddingText,
    encode,
  )(text);
}

export class Crypto {
  private _encryptedText: string;

  constructor(plainText: string) {
    this._encryptedText = encrypt(plainText);
  }

  get ciphertext(): string {
    return this._encryptedText;
  }
}