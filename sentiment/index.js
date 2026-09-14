import natural from 'natural'

const tokenizer = new natural.WordTokenizer()

export function tokenizeText(text) {
  return tokenizer.tokenize(text)
}