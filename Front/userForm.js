import React from "react"
import './userform.css'

export default class UserForm extends React.Component {
    constructor(){
        super()
        this.state = {
            }
        this.getUserInfo = this.getUserInfo.bind(this)
    }
    componentDidMount() {
        this.nameInput.focus()
    }
    getUserInfo() {
        var user = {}
        user["name"]=this.nameInput.value
        user["surname"]=this.surnameInput.value
        user["email"]=this.emailInput.value
        this.props.addUser(user)
    }
    render() {
        return(
            <div className="inputMain">
                <form className="form">
                    <div>
                        <p>
                          Name  
                        </p>
                        <input ref={(input)=>{this.nameInput = input}}></input>
                    </div>
                    <div>
                        <p>
                            Surname
                        </p>
                        <input ref={(input)=>{this.surnameInput = input}}></input>
                    </div>
                    <div>
                        <p>
                            Email
                        </p>
                        <input ref={(input)=>{this.emailInput = input}}></input>
                    </div>
                </form>
                <div className="buttonDiv">
                    <button className="addButton" onClick={()=>{
                        this.getUserInfo()}}>Add user</button>
                    <button className="addButton" onClick={()=>{this.props.cancel()}}>Cancel</button>
                </div>
            </div>
        )
    }
}