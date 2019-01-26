/*
References:
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
- https://codepen.io/marvokdolor/pen/Vmoege?editors=0010

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
        this.updateDisplay = this.updateDisplay.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.clearButton = this.clearButton.bind(this)
        this.calcAnswer = this.calcAnswer.bind(this)
    }


    updateInput = (input) => {
        this.setState(prevState => ({
            num: prevState.num + input
        }))
        console.log(this.state.num)
        // let itemArr
        // if (input === "C") {
        //     this.clearButton()
        //     console.log("first if", this.state.arrInput)
        // } else if (this.state.num && /[+-/*]/.test(input)) {
        //     itemArr = [...this.state.arrInput, this.state.num, input]
        //     this.setState ({
        //         arrInput: itemArr,
        //         num: ""
        //     })
        //     console.log("first else if", this.state.arrInput)
        // } else if (/[0-9.]/.test(input)){
        // this.setState (prevState => ({
        //     num: prevState.num+input
        // }))
        //     console.log("second else if", this.state.arrInput)
        // } else if (input === "="){
        //     itemArr = [...this.state.arrInput, this.state.num]
        //     this.setState ({
        //         arrInput: itemArr
        //     })
        //     console.log("third else if", this.state.arrInput)
        // }
        /*
        Cases I'll want to account for:
        - Decimals
        - A number can only have one decimal point
        - First digit cannot be 0
        - Dealing with a second operator being provided right afer the first one, which one will I acknowledge?
        - managing a string of numbers and operators e.g. 6 + 3 / 4 - 5
          - have to be consistent and decide if I'm adhering to order of precedence
        */
    }

    // This updateDisplay and displayText are perfect for a small preview window that show me all the info I've entered so far.
    updateDisplay = (message) => {
        this.setState(prevState => prevState.displayText === "0" ? {displayText: message} : {displayText: prevState.displayText + message}
        )
    }

    // this should be tied to the Clear button, but also in between numbers entered right?
    clearButton = () => {
        this.setState({
            displayText: "0",
            num: "",
            arrInput: []
        })
    }

    calcAnswer = () => {
        // console.log(this.state.arrInput)

        for (let i = 0; i < this.state.arrInput.length; i++) {
                // console.log(this.state.arrInput[i])
        }
    }



    render() {

        return (
            <div id="calculator">
                <h1>Calculator!</h1>
                <Display displayText={this.state.displayText}/>
                {calcData.map( calcbutton =>
                    <CalcButton
                        key={calcbutton.id}
                        calcbutton={calcbutton}
                        updateDisplay={this.updateDisplay}
                        updateInput={this.updateInput}
                        clearButton={this.clearButton}
                        calcAnswer={this.calcAnswer}
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
        // this.handleKeyDown = this.handleKeyDown.bind(this)
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
        window.focus()
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    handleClick = () => {
        this.props.updateInput(this.props.calcbutton.buttonText)
        this.props.updateDisplay(this.props.calcbutton.buttonText)

        // if (this.props.calcbutton.buttonText === "=") {
        //     this.props.calcAnswer()
        //     // this.props.updateInput(this.props.calcbutton.buttonText)
        // } else {
        //     this.props.updateDisplay(this.props.calcbutton.buttonText)
        // }
        //
        // this.props.calcbutton.buttonText === "C" && this.props.clearButton()

    }

    // trying to get this part working but it's not strictly necessary
    // handleKeyDown = (e) => {
    //     if(e.keyCode === this.props.calcbutton.unicode) {
    //         this.props.updateDisplay(this.props.calcbutton.buttonText)
    //         console.log(this.props.calcbutton.buttonText)
    //     }
    // }

    render() {
        return (
            <button
                id={this.props.calcbutton.id}
                className="button calc-button"
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}>
                {this.props.calcbutton.buttonText}
            </button>
        )
    }
}

class Display extends React.Component {
    render() {
        return (
            <div id="display" className="well">
            <span>{this.props.displayText}</span>
            </div>
        )
    }
}

export default App
