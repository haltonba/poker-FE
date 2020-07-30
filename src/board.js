import React, {Component} from "react"
import Card from "./card"

export default class Board extends Component {
    
    renderBoard = () => {
        return this.props.board.map((card, index) => <Card key={index} card={card}/>)
    }

  render() {
    return (
      <div>
          <button onClick={() => this.props.handleClick()}>START</button>
          Pot: {this.props.pot}<br/>
          Current Bet: {this.props.currentBet}<br/>
          {this.renderBoard()}<br/>
      </div>
    )
  }

}