import React from "react"
import './userform.css'

class UserForm extends React.Component {
    constructor(){
        super()
        this.state = {
            }
    }
    componentDidMount() {
        this.nameInput.focus()
    }
    render() {
        return(
            <div className="inputMain">
                <form>
                    <input ref={(input)=>{this.nameInput = input}}></input>
                    <input ref={(input)=>{this.surnameInput = input}}></input>
                    <input ref={(input)=>{this.emailInput = input}}></input>
                </form>
            </div>
        )
    }
}