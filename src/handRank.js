import { array } from "prop-types"

let user1 = 1
let user2 = 2
let user3 = 3

breakdownObjects = (hand) => {
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
    return [numberObj, suitObj]
}

faceCardAdjuster = (number, ace) => {
    let adjustedNumber = number
        if (isNaN(parseInt(adjustedNumber))) {
            switch (adjustedNumber) {
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
                    adjustedNumber = ace
            }
        }
    return parseInt(adjustedNumber)
}

fourKindCheck = (numberObj) => {
    fourKind = Object.values(numberObj).some(element => element == 4)
    let adjustedNumber = faceCardAdjuster(Object.keys(numberObj).find(key => numberObj[key] == 4), 14)
    let highCard = Math.max(...Object.keys(numberObj).map(key => faceCardAdjuster(key, 14)).filter(number => number != adjustedNumber))
    return fourKind ? (adjustedNumber + highCard) : false
}

handEvaluator = (hand) => {
    let handType
    let straight = false

    let numberObj = breakdownObjects(hand)[0]
    let suitObj = breakdownObjects(hand)[1]

    fourKindCheck(numberObj) ? handType = [7, parseInt(fourKindCheck(numberObj))] : handType

    let threeCheck = Object.keys(numberObj).filter(key => numberObj[key] == 3)
    if (threeCheck.length >= 1 && !fourKindCheck(numberObj)) {
        let pairCheck = Object.keys(numberObj).filter(key => numberObj[key] == 2)
        adjustedTrips = threeCheck.map(number => faceCardAdjuster(number, 14))
        if (threeCheck.length === 1 && pairCheck.length === 0) {
            let highCards = Object.keys(numberObj).map(key => faceCardAdjuster(key, 14)).filter(number => number != faceCardAdjuster(threeCheck[0], 14)).sort((a, b) => b - a)
            handType = [3, (faceCardAdjuster(threeCheck[0], 14) + highCards[0] + highCards[1])]
        } 
        else if (threeCheck.length === 2) {
            handType = [6, (Math.max(...adjustedTrips) * 1000) + (Math.min(...adjustedTrips) * 10)]
        }
        else {
            adjustedPairs = pairCheck.map(number => faceCardAdjuster(number, 14))
            handType = [6, (faceCardAdjuster(threeCheck[0]) * 1000) + (Math.max(...adjustedPairs) * 10)]
        }
    }

    let flush = Object.values(suitObj).some(element => element >= 5)
    if (flush) {
        let suit = Object.keys(suitObj).find(key => suitObj[key] >= 5)
        let suitedCards = hand.filter(card => {
            return card[1] === suit
        })
        let numbers = suitedCards.map(card => {
            return card[0]
        })
        if ([...numbers].sort().splice(-5).join("") == 'AJKQT') {
            handType = [9, 14]
        }
        else {
            let allNumbers = numbers.map(number => {
                return faceCardAdjuster(number, 1)
            }).sort((a,b) => a - b)
            let sfChecker = 4
            sfArray = []
            for(i = 0; i < allNumbers.length; i++) {
                if (allNumbers[i + 1] - allNumbers[i] == 1) {
                    sfChecker--
                    sfArray.push(allNumbers[i])
                }
            }
            allNumbers.length < 6 ? sfArray.push(allNumbers[allNumbers.length - 1]) : sfArray.push(allNumbers[allNumbers.length - 2])
            sfChecker > 0 ? handType = [5, allNumbers.includes(1) ? 14 : Math.max(...allNumbers)] : handType = [8, Math.max(...sfArray)]
        }
    }

    if (!flush) {
        let numbers = hand.map(card => {
            return card[0]
        })
        let allNumbers = numbers.map(number => {
            return faceCardAdjuster(number, 1)
        }).sort((a,b) => a - b)
        
        allNumbers[allNumbers.length - 1] == 13 && allNumbers.includes(1) && allNumbers.includes(12) && allNumbers.includes(11) ? allNumbers.push(14) : null

        let unique = allNumbers.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })

        let straightArray = unique.filter((number, index) => {
            return (number - unique[index - 2] == 2) || (number + 2 == unique[index + 2])
        })

        let fiveCard = straightArray.slice(-5)
        if (straightArray.length >= 5) {
            handType = [4, Math.max(...fiveCard)] 
            straight = true
        }
    }

    if (!flush && !straight && !fourKindCheck(numberObj) && threeCheck.length === 0) {
        let pairs = Object.keys(numberObj).filter(key => numberObj[key] >= 2).map(number => faceCardAdjuster(number, 14))

        if (pairs.length === 0) {
            let highCard = Object.keys(numberObj).map(number => faceCardAdjuster(number, 14))
            handType = [0, Math.max(...highCard)]
        }
        else {
            if (pairs.length < 2) {
                let highCards = Object.keys(numberObj).map(key => faceCardAdjuster(key, 14)).filter(number => number != pairs[0]).sort((a, b) => b - a)
                handType = [1, (pairs[0] + highCards[0] + highCards[1] + highCards[2])]
            }
            else {
                let highCard = Math.max(...Object.keys(numberObj).map(key => faceCardAdjuster(key, 14)).filter(number => number != pairs[0] && number != pairs[1]))
                handType = [2, (Math.max(...pairs) + highCard)]
            }
        }
    }
    return handType
}

winner = (hands) => {
    handNames = {
        "Royal Flush": 9,
        "Straight Flush": 8,
        "Four of a Kind": 7,
        "Full House": 6,
        "Flush": 5,
        "Straight": 4,
        "Three of a Kind": 3,
        "Two Pair": 2,
        "Pair": 1,
        "High Card": 0
    }
    let handEvaluations = hands.map(hand => {
        return [...handEvaluator(hand[0]), hand[1]]
    })
    let ranks = handEvaluations.map(hand => [hand[0], hand[2]])
    let highestRanked = Math.max(...ranks.map(rank => rank[0]))
    let potentialWinners = handEvaluations.filter(hand => hand[0] === highestRanked)
    let winningRank = Object.keys(handNames).find(key => handNames[key] === potentialWinners[0][0])

    if (potentialWinners.length === 1) {
        return [winningRank, [potentialWinners[0][2]]]
    }
    else if (potentialWinners.every(hand => hand[1] === potentialWinners[0][1])) {
        let winningIds = potentialWinners.map(hand => hand[2])
        return [winningRank, winningIds]
    }
    else {
        let highCard = Math.max(...potentialWinners.map(hand => hand[1]))
        return [winningRank, [potentialWinners.filter(hand => hand[1] === highCard)[0][2]]] 
    }
}

console.log(winner([[["7s","7d", "7c", "7h", "3s"], user1], [["7s","7d", "7c", "7h", "6c"], user2]]))