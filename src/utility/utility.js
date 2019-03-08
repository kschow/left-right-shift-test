const italicsRegex = new RegExp(/[_]([^\\W_]|\\s)+[_]/g)
const underscoreRegex = new RegExp(/_/g)

export function cleanText(text) {
    return text.replace(italicsRegex, r => r.replace(underscoreRegex, ''))
}

export function italicizeText(text) {
    return text.replace(italicsRegex, r => '<i>' + r.replace(/[_]/g, '') + '</i>')
}

export function flattenText(text) {
    let cleanedText = cleanText(text)
    let matches = cleanedText.match(/[^!.]+[!."]+|(\s+)/g)
    if (matches === null)
        return cleanedText

    return matches.map(s => s.trim()).reduce((a,b) => a + ' ' + b)
}

const leftShiftCharacters = [...'YUIOPHJKL:"NM<>?^&*()_+{}|'];
export function leftShiftsNumber(text) {
    return [...text].map(c => leftShiftCharacters.includes(c) ? 1 : 0).reduce((a, b) => a + b);
}

const rightShiftCharacters = [...'QWERTASDFGZXCVB!@#$%~']
export function rightShiftsNumber(text) {
    return [...text].map(c => rightShiftCharacters.includes(c) ? 1 : 0).reduce((a, b) => a + b);
}

export function breakText(text) {
    let matches = text.match(/(.+[\n]?)+[\n]{2,}/g)
    if (matches === null)
        return text

    let textLines = []
    matches.forEach(s => {
        if (s.length < 500 && s.length > 50) textLines.push(s.split('\n').join(' '))
    })
    return textLines
}