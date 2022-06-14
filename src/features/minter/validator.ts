export function ValidateDecimalInput(input: string) {
    const lastChar = input[input.length - 1]

    if(lastChar === '.' || lastChar === ',') {
        return !isNaN(Number(input.slice(0, input.length - 1)));
    } else {
        return !isNaN(Number(input));
    }
}