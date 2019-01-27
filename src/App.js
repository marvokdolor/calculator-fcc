import React from "react"
import "./style.css"
import calcData from "./calcData.js"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrInput: []
        }
        this.updateInput = this.updateInput.bind(this)

    }
    updateInput = (input) => {
        let newArr = [...this.state.arrInput, input]
        switch (input){
            case("+"):
            case("-"):
            case("*"):
            case("/"):
                if ((/[+-/*]/).test(newArr[newArr.length-2])) {
                    newArr.splice(newArr.length-2, 1)
                }
                this.setState(prevState => ({
                    arrInput: newArr
                }))
                break
            case("equals"):
                let result = eval(this.state.arrInput.join(""))
                this.setState({
                    arrInput: [result]
                })
                break
            case("clear"):
                this.setState({
                    arrInput: []
                })
                break
            case("0"):
                // if array starts with a zero, and another zero is entered just replace it, don't enter another one
                if (this.state.arrInput.length===1 && this.state.arrInput[0]==="0") {
                    this.setState(prevState => ({
                        arrInput: prevState.arrInput
                    }))
                } else {
                    this.setState(prevState => ({
                        arrInput: newArr
                    }))
                }
                break
            default:
                this.setState(prevState => ({
                    arrInput: newArr
                }))
                break
        }
    }
    /* TODOs
    1. When inputting numbers, my calculator should not allow a number to begin with multiple zeros. DONE for the first number entered.
    2. More than one . in one number should not be accepted.
    3.  If 2 or more operators are entered consecutively, the operation performed should be the last operator entered.
    */

    render() {
        const displayText = this.state.arrInput.length === 0 ? "0" : this.state.arrInput
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
