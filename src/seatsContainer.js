import React, {Component} from "react"
import Seat from "./seat"

export default class SeatsContainer extends Component {
    
    renderSeats = () => {
        return this.props.seats.map((seat, index) => <Seat seat={seat} key={index} buttons={this.props.buttons} currentPlayer={this.props.currentPlayer} currentBet={this.props.currentBet} handleActionSubmit={this.props.handleActionSubmit}/>)
    }

  render() {
    return (
      <div>
          {this.renderSeats()}
      </div>
    )
  }

}