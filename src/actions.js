import React, {Component} from "react"

export default class Actions extends Component {

    state = {
        toggleBetInput: false,
        bet: ""
    }

    handleChange = (event) => {
        this.setState({
            bet: parseInt(event.target.value)
        })
    }

    handleFormReset = () => {
        this.setState({bet: ""})
    }

    handleBetSubmit = (event, bet, chips, actionType) => {
        if (chips > bet) {
            this.props.handleActionSubmit(event, this.state.bet, this.props.seatId, actionType)
            this.setState({
                toggleBetInput: !this.state.toggleBetInput
            })
        } 
        else {
            event.preventDefault()
            alert("You don't have enough chips to place this bet.")
        }

    }

  render() {
    return (
      <div>
          <button onClick={() => this.setState({toggleBetInput: true})}>BET</button>
          {this.state.toggleBetInput ? 
            <form onReset={this.handleFormReset} onSubmit={(event, bet, chips, actionType) => this.handleBetSubmit(event, this.state.bet, this.props.chips, "bet")}>
                <input type="number" placeholder="Enter bet amount" name="bet" value={this.state.bet} onChange={this.handleChange} />  
                <input type="submit" value="Place Bet" />
            </form> : null}
          {this.props.currentBet > 0 ? <button onClick={(event, bet, chips, actionType) => this.props.handleActionSubmit(event, this.props.currentBet, this.props.seatId, "call")}>CALL</button> : null}
          {this.props.currentBet === 0 ? <button onClick={(event, bet, chips, actionType) => this.props.handleActionSubmit(event, 0, this.props.seatId, "check")}>CHECK</button> : null}
          <button>FOLD</button>
      </div>
    )
  }
}