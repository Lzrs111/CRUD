import React from "react"
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
        
        
    }
    componentDidMount() {
        this.getUsers()
    }
    
    addSwitch() {
        this.setState({
            adding: !this.state.adding
        })
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
    addUser() {

    }
    render() {
        var number = this.state.number
        return(
           <div>
               <form method="POST">
                 <input></input>
               </form>
            
            {(number!=null) ? number.map((val,ind)=>{
                console.log(this.state.users[ind])
                return <UserInfoBox info={this.state.users[ind]} key={ind} deleteUser={this.deleteUser} id={this.state.users[ind].id}/>    
                }) : null }

           </div> 
        )
    }
}