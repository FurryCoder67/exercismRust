type Card =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A"

type Result = {
  status: "finished" | "loop"
  cards: number
  tricks: number
}

const penaltyValue = (card: Card): number => {
  switch (card) {
    case "J":
      return 1
    case "Q":
      return 2
    case "K":
      return 3
    case "A":
      return 4
    default:
      return 0
  }
}

const isPaymentCard = (card: Card): boolean => {
  return card === "J" || card === "Q" || card === "K" || card === "A"
}

const stateKey = (a: Card[], b: Card[]): string => {
  const normalize = (deck: Card[]) =>
    deck
      .map(card => (isPaymentCard(card) ? card : "N"))
      .join("")

  return `${normalize(a)}|${normalize(b)}`
}

export const simulateGame = (
  playerA: unknown,
  playerB: unknown,
): Result => {
  const decks: Card[][] = [
    [...(playerA as Card[])],
    [...(playerB as Card[])],
  ]

  let pile: Card[] = []
  let currentPlayer = 0

  let payingPlayer = -1
  let penalty = 0

  let cardsPlayed = 0
  let tricks = 0

  const totalCards = decks[0].length + decks[1].length

  const seen = new Set<string>()

  // The initial configuration is a valid game state.
  seen.add(stateKey(decks[0], decks[1]))

  while (true) {
    // If the current player has no card to play,
    // the opponent collects the pile.
    if (decks[currentPlayer].length === 0) {
      const collector = 1 - currentPlayer

      decks[collector].push(...pile)
      pile = []

      tricks++

      // One player now owns the entire deck.
      if (decks[collector].length === totalCards) {
        return {
          status: "finished",
          cards: cardsPlayed,
          tricks,
        }
      }

      currentPlayer = collector
      payingPlayer = -1
      penalty = 0

      const key = stateKey(decks[0], decks[1])

      if (seen.has(key)) {
        return {
          status: "loop",
          cards: cardsPlayed,
          tricks,
        }
      }

      seen.add(key)

      continue
    }

    // Play the top card.
    const card = decks[currentPlayer].shift()!
    pile.push(card)
    cardsPlayed++

    // Payment card starts or changes a penalty.
    if (isPaymentCard(card)) {
      penalty = penaltyValue(card)
      payingPlayer = 1 - currentPlayer
      currentPlayer = payingPlayer

      continue
    }

    // If someone is paying a penalty, this card counts
    // toward the payment.
    if (payingPlayer !== -1) {
      penalty--

      if (penalty === 0) {
        // The player who played the payment card
        // collects the pile.
        const collector = 1 - payingPlayer

        decks[collector].push(...pile)
        pile = []

        tricks++

        if (decks[collector].length === totalCards) {
          return {
            status: "finished",
            cards: cardsPlayed,
            tricks,
          }
        }

        currentPlayer = collector
        payingPlayer = -1

        const key = stateKey(decks[0], decks[1])

        if (seen.has(key)) {
          return {
            status: "loop",
            cards: cardsPlayed,
            tricks,
          }
        }

        seen.add(key)
      } else {
        // Continue the penalty.
        currentPlayer = payingPlayer
      }

      continue
    }

    // Normal card: turn passes to the other player.
    currentPlayer = 1 - currentPlayer
  }
}