import React, {Component} from "react"
import Card from "./card"
import Actions from "./actions"

export default class Seat extends Component {

    renderHand = () => {
        return this.props.seat.hand.map((card, index) => <Card key={index} card={card}/>)
    }

  render() {
    return (
      <div>
          <div>
          Seat Id: {this.props.seat.seatId}<br/>
          {this.props.seat.seatId === this.props.buttons.bigBlind ? "Big Blind" : null}
          {this.props.seat.seatId === this.props.buttons.smallBlind ? "Small Blind" : null}
          {this.props.seat.seatId === this.props.buttons.dealer ? "Dealer" : null}<br/>
          Username: {this.props.seat.username}<br/>
          Chips: {this.props.seat.chips}<br/>
          </div>
          {this.renderHand()}
          {this.props.currentPlayer === this.props.seat.seatId ? <Actions seatId={this.props.seat.seatId} chips={this.props.seat.chips} currentBet={this.props.currentBet} handleActionSubmit={this.props.handleActionSubmit} /> : null}<br/>
      </div>
    )
  }
}