let board = ["8h", "8c", "Kd", "As", "6c"]

totalHands = (twoCardHands) => {
    let fullHand = twoCardHands.map(hand => {
        return hand.concat(board)
    });
    console.log(fullHand)
    return fullHand
}


winningHand = (playerHands) => {

}

handEvaluator = (hand) => {
    let handType
    let straight = false

    let suitObj = {}
    let numberObj = {}

    hand.forEach(card => {
        if (numberObj[card[0]]) {
            numberObj[card[0]] ++
        }
        else {
            numberObj[card[0]] = 1
        }
        if (suitObj[card[1]]) {
            suitObj[card[1]] ++
        }
        else {
            suitObj[card[1]] = 1
        }
    });

    let fourKind = Object.values(numberObj).some(element => element == 4)
    fourKind ? handType = 7 : handType

    let threeCheck = Object.values(numberObj).some(element => element == 3)
    if (threeCheck && !fourKind) {
        Object.values(numberObj).some(element => element == 2) ? handType = 6 : handType = 3
    }

    let flush = Object.values(suitObj).some(element => element >= 5)
    if (flush) {
        let suit = Object.keys(suitObj).find(key => obj[key] >= 5)
        let suitedCards = hand.filter(card => {
            return card[1] === suit
        })
        let numbers = suitedCards.map(card => {
            return card[0]
        })
        if ([...numbers].sort().splice(-5).join("") == 'AJKQT') {
            handType = 9
        }
        else {
            let allNumbers = numbers.map(number => {
                let adjustedNumber = number
                    if (isNaN(parseInt(number))) {
                        switch (number) {
                            case "T":
                                adjustedNumber = 10
                                break;
                            case "J":
                                adjustedNumber = 11
                                break;
                            case "Q":
                                adjustedNumber = 12
                                break;
                            case "K":
                                adjustedNumber = 13
                                break;
                            case "A":
                                adjustedNumber = 14
                        }
                    }
                return parseInt(adjustedNumber)
            }).sort((a,b) => a-b)
            let sfChecker = 4
            for(i = 0; i < allNumbers.length; i++) {
                if (allNumbers[i + 1] - allNumbers[i] == 1) {
                    sfChecker--
                }
            }
            sfChecker > 0 ? handType = 5 : handType = 8
        }
    }

    if (!flush) {
        let numbers = hand.map(card => {
            return card[0]
        })
        let allNumbers = numbers.map(number => {
            let adjustedNumber = number
                if (isNaN(parseInt(number))) {
                    switch (number) {
                        case "T":
                            adjustedNumber = 10
                            break;
                        case "J":
                            adjustedNumber = 11
                            break;
                        case "Q":
                            adjustedNumber = 12
                            break;
                        case "K":
                            adjustedNumber = 13
                            break;
                        case "A":
                            adjustedNumber = 14
                    }
                }
            return parseInt(adjustedNumber)
        }).sort((a,b) => a-b)
        let straightChecker = 4
        for(i = 0; i < allNumbers.length; i++) {
            if (allNumbers[i + 1] - allNumbers[i] == 1) {
                straightChecker--
            }
        }
        if (straightChecker <= 0) {
            handType = 4
            straight = true
        }
    }

    if (!flush && !straight && !fourKind && !threeCheck) {
        let numberOfPairs = Object.keys(numberObj).filter(key => numberObj[key] >= 2).length

        let pairFound = Object.values(numberObj).some(element => element >= 2)

        if (!pairFound) {
            handType = 0
        }
        else {
            numberOfPairs < 2 ? handType = 1 : handType = 2
        }
    }

    console.log(handType)
    return handType
}

handEvaluator(["2h", "Ad", "4s", "Tc", "9s", "2c", "2h"])

// winningHand(totalHands([["7h", "9d"], ["Td", "3s"], ["4h", "Qd"]]))