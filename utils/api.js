import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'Udacity:flashcards'

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results)
    })
}

export function getDeck(id) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[id]
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: [],
      numberQuestions: 0
    }
  }))
}

export function addCardToDeck(title, card) {
  return getDeck(title).then((deck) => {
    deck.questions.push(card)
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
      [title]: deck
    }))
  })
  
}
