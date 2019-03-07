export function flattenText(text) {
    let matches = text.match(/[^!.]+[!."]+|(\s+)/g)
    if (matches === null)
        return text

    return matches.map(s => s.trim()).reduce((a,b) => a + ' ' + b)
}

const leftShiftCharacters = [...'YUIOPHJKL:"NM<>?^&*()_+{}|'];
export function leftShiftsNumber(text) {
    return [...text].map(c => leftShiftCharacters.includes(c) ? 1 : 0).reduce((a, b) => a + b);
}

const rightShiftCharacters = [...'QWERTASDFGZXCVB!@#$%']
export function rightShiftsNumber(text) {
    return [...text].map(c => rightShiftCharacters.includes(c) ? 1 : 0).reduce((a, b) => a + b);
}