import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

export default function DecksReducer (state = {decksList:[]}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        decksList: action.decks,
      }
    case ADD_DECK :
      state.decksList.push(action.deck)
      return {
        ...state,
      }
    case ADD_CARD:
      const newDecks = state.decksList.map((deck) => {
        if (deck.title === action.deckTitle) {
          deck.questions.push(action.card)
        }
        return deck
      })
      return {
        ...state,
        decksList: newDecks
      }
    default :
      return state
  }
}
