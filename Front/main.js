import React from "react"
import UserForm from "./userForm.js"
import UserInfoBox from "./userInfo.js"



export default class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            users: null,
            number: null,
            adding: false //ovaj state određuje dodajemo li korisnika ili ne
            }
        this.deleteUser = this.deleteUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.addSwitch = this.addSwitch.bind(this)
        this.addUser = this.addUser.bind(this)
    }
    componentDidMount() {
        this.getUsers()
    }
    
    addSwitch() {
        this.setState({
            adding: !this.state.adding
        })
        console.log(this.state.users, this.state.number)
    }
    
    //funkcija koja vadi korisnike iz baze
    getUsers() {
        var request = new Request("users",{
            method: "GET"
        })
        fetch(request).then((response)=>{
            console.log(response)
            return response.json();
            }).then((data)=>{
                this.setState({
                    users:data,
                    number: Object.keys(data)
                })
            })
        
    }
    //brisanje korisnika
    deleteUser(key) {
        console.log("Deleting user")
        var deleteString = "delete" + key.toString()
        console.log(deleteString)
        var request = new Request(deleteString,{
            method: "DELETE"
        })
        fetch(request).then(()=>{
            this.getUsers()
            })
    }
    //dodavanje korisnika
    addUser(user) {
        console.log("Adding user")
        console.log(JSON.stringify(user))
        var request = new Request("adduser",{
            method: "POST",
            body: JSON.stringify(user) 
        })
        fetch(request).then(this.getUsers())
    }
    render() {
        var number = this.state.number
        return(
           <div>
            {this.state.adding ? <UserForm cancel={this.addSwitch} addUser={this.addUser}/> : null}

            {(number!=null) ? number.map((val,ind)=>{
                console.log(this.state.users[ind])
                return <UserInfoBox info={this.state.users[ind]} key={ind} deleteUser={this.deleteUser} id={this.state.users[ind].id}/>    
                }) : null }
            <button onClick={()=>{this.addSwitch()}}>
                Add new user
            </button>
           </div> 
        )
    }
}