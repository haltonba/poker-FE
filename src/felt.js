import React, {Component} from "react"
import Board from "./board"
import SeatsContainer from "./seatsContainer"

export default class Felt extends Component {
    state = {
        handStatus: "standby",
        deck: [
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
        ],
        board: [],
        pot: 0,
        seats: [
            {
                seatId: 1,
                username: "hwb",
                hand: [],
                chips: 1000,
                handStatus: "yet to act"
            },
            {
                seatId: 2,
                username: "alk",
                hand: [],
                chips: 1001,
                handStatus: "yet to act"
            },
            {
                seatId: 3,
                username: "nrs",
                hand: [],
                chips: 1000,
                handStatus: "yet to act"
            }
        ],
        buttons: {
            bigBlind: 3,
            smallBlind: 2,
            dealer: 1
        },
        currentPlayer: 3,
        currentBet: 0
    }

    randomCards = (number) => {
        let updatedDeck = this.state.deck.sort(() => Math.random() - 0.5)
        let dealt = updatedDeck.slice(0, number)
        updatedDeck.splice(0, number)
        this.setState({deck: updatedDeck})
        return dealt
    }

    dealCards = (handStatus) => {
        if (handStatus === "preflop") {
            let cardsToBeDealt = this.randomCards(this.state.seats.length * 2)
            let userHands = []
            for(let i = 0; i < cardsToBeDealt.length; i += 2) {
                userHands.push({
                    seatId: this.state.seats[i / 2].seatId,
                    username: this.state.seats[i / 2].username,
                    hand: [cardsToBeDealt[i], cardsToBeDealt[i + 1]],
                    chips: this.state.seats[i / 2].chips
                })
            }
            this.setState({seats: userHands})
        }
        else if (handStatus === "flop") {
            let flop = this.randomCards(3)
            this.setState({board: flop})
        }
        else if (handStatus === "turn") {
            let turn = this.randomCards(1)
            this.setState({board: [...this.state.board, turn]})
        }
        else if (handStatus === "river") {
            let river = this.randomCards(1)
            this.setState({board: [...this.state.board, river]})
        }
    }

    handleClick = async () => {
        await this.setState({handStatus: "preflop"})
        this.dealCards(this.state.handStatus)
    }

    handleActionSubmit = (event, bet, seatId, actionType) => {
        event.preventDefault()
        let seats = [...this.state.seats]
        let nextTurn = this.state.currentPlayer + 1
        if (nextTurn > this.state.seats.length) {
            nextTurn = 1
        }
        if (actionType === "bet") {
            for(let i = 0; i < seats.length; i++) {
                if (seats[i].seatId === seatId) {
                    seats[i].chips -= bet
                    seats[i].handStatus = "just bet"
                }
            }
            this.setState({
                pot: this.state.pot += bet,
                currentBet: bet,
                currentPlayer: nextTurn,
                seats: seats
            })
            event.target.reset()
        }
        else if (actionType === "call") {
            for(let i = 0; i < seats.length; i++) {
                if (seats[i].seatId === seatId) {
                    seats[i].chips -= bet
                    seats[i].handStatus = "call/check"
                }
            }
            this.setState({
                pot: this.state.pot += bet,
                currentPlayer: nextTurn,
                seats: seats
            })
        }
        else if (actionType === "check") {
            for(let i = 0; i < seats.length; i++) {
                if (seats[i].seatId === seatId) {
                    seats[i].handStatus = "call/check"
                }
            }
            this.setState({
                currentPlayer: nextTurn,
                seats: seats
            })
        }
    }

  render() {
      console.log(this.state.seats)
    return (
      <div>
          <Board board={this.state.board} pot={this.state.pot} handleClick={this.handleClick} currentBet={this.state.currentBet}/>
          <SeatsContainer seats={this.state.seats} buttons={this.state.buttons} currentPlayer={this.state.currentPlayer} currentBet={this.state.currentBet} handleActionSubmit={this.handleActionSubmit} />
      </div>
    )
  }

}