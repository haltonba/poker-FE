let deck = [
    "Ac", "Ad", "Ah", "As",
    "2c", "2d", "2h", "2s",
    "3c", "3d", "3h", "3s",
    "4c", "4d", "4h", "4s",
    "5c", "5d", "5h", "5s",
    "6c", "6d", "6h", "6s",
    "7c", "7d", "7h", "7s",
    "8c", "8d", "8h", "8s",
    "9c", "9d", "9h", "9s",
    "Tc", "Td", "Th", "Ts",
    "Jc", "Jd", "Jh", "Js",
    "Qc", "Qd", "Qh", "Qs",
    "Kc", "Kd", "Kh", "Ks",
]

let board = []
let seats = [
    {
        seatId: 1,
        hand: []
    },
    {
        seatId: 2,
        hand: []
    },
    {
        seatId: 3,
        hand: []
    }
]

randomCards = (number) => {
    let updatedDeck = deck.sort(() => Math.random() - 0.5)
    let dealt = updatedDeck.slice(0, number)
    updatedDeck.splice(0, number)
    deck = updatedDeck
    return dealt
}

dealCards = (handStatus) => {
    if (handStatus === "preflop") {
        let cardsToBeDealt = randomCards(seats.length * 2)
        let userHands = []
        for(let i = 0; i < cardsToBeDealt.length; i += 2) {
            userHands.push({
                seatId: seats[i / 2].seatId,
                hand: [cardsToBeDealt[i], cardsToBeDealt[i + 1]]
            })
        }
        seats = userHands
    }
    else if (handStatus === "flop") {
        let flop = randomCards(3)
        board = flop
    }
    else if (handStatus === "turn") {
        let turn = randomCards(1)[0]
        board = [...board, turn]
    }
    else if (handStatus === "river") {
        let river = randomCards(1)[0]
        board = [...board, river]
    }
}

dealCards("river")
console.log(board)
console.log(seats)
console.log(deck)