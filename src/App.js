/*
References:
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
- https://codepen.io/marvokdolor/pen/Vmoege?editors=0010
- https://www.w3schools.com/jsref/jsref_eval.asp

*/
import React from "react"
import "./style.css"
import calcData from "./calcData.js"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayText: "0",
            num: "",
            arrInput: []
        }

    }
    updateInput = (input) => {

        switch (input){
            case("equals"):
                this.setState(prevState => ({
                    num: eval(prevState.num)
                }))
                break
            case("clear"):
                this.setState({
                    num: ""
                })
                break
            default:
                this.setState(prevState => ({
                    num: prevState.num + input
                }))
                break
        }
    }
    /* TODOs
    1. When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
    2. Two . in one number should not be accepted.
    3.  If 2 or more operators are entered consecutively, the operation performed should be the last operator entered.
    */

    render() {
        const displayText = this.state.num ? this.state.num : "0"
        return (
            <div id="calculator">
                <h1>Calculator!</h1>
                <Display displayText={displayText}
                />
                {calcData.map( calcbutton =>
                    <CalcButton
                        key={calcbutton.id}
                        calcbutton={calcbutton}
                        updateInput={this.updateInput}
                    />
                )}
            </div>
        )
    }
}

class CalcButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e) => {
        // console.log(e.target.value)
        this.props.updateInput(e.target.value)
    }

    render() {
        return (
            <button
                id={this.props.calcbutton.id}
                className="button calc-button"
                value={this.props.calcbutton.value}
                onClick={this.handleClick}
                >
                {this.props.calcbutton.buttonText}
            </button>
        )
    }
}

class Display extends React.Component {
    render() {
        return (
            <div id="display" className="well">
                {this.props.displayText}
            </div>
        )
    }
}

export default App
