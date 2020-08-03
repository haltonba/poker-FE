import React, {Component} from "react"

export default class Card extends Component {

    suitIcons = {
        "h": '\u2665',
        "s": '\u2660',
        "c": '\u2663',
        "d": '\u2666'
    }

    icon = this.suitIcons[this.props.card[1]]

  render() {
    return (
      <div>
          <span style={{color: this.icon === "♦" || this.icon === "♥" ? "red" : "black" }}>{this.props.card[0] + this.icon}</span>
      </div>
    )
  }

}