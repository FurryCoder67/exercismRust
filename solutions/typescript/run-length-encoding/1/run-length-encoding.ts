export function encode(input_string: string): string {
    if (!input_string) {
        return "";
    }

    let encoded = "";
    let count = 1;

    for (let i = 1; i < input_string.length; i++) {
        if (input_string[i] === input_string[i - 1]) {
            count++;
        } else {
            if (count > 1) {
                encoded += count.toString();
            }
            encoded += input_string[i - 1];
            count = 1;
        }
    }

    if (count > 1) {
        encoded += count.toString();
    }
    encoded += input_string.charAt(input_string.length - 1);

    return encoded;
}

export function decode(encoded_string: string): string {
    let decoded = "";
    let count = 0;

    for (let i = 0; i < encoded_string.length; i++) {
        const char = encoded_string[i];

        if (/[0-9]/.test(char)) {
            count = count * 10 + parseInt(char, 10);
        } else {
            if (count === 0) {
                count = 1;
            }
            decoded += char.repeat(count);
            count = 0;
        }
    }

    return decoded;
}