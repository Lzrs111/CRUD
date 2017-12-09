import React from "react"
import UserForm from "./userForm.js"
import UserInfoBox from "./userInfo.js"

//glavna komponenta

export default class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            users: null,
            adding: false //ovaj state određuje dodajemo li korisnika ili ne
            }
        this.deleteUser = this.deleteUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.addSwitch = this.addSwitch.bind(this)
        this.addUser = this.addUser.bind(this)
        this.editUser = this.editUser.bind(this)
        
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
            return response.json();
            }).then((data)=>{
                this.setState({
                    users:data
                })
            })
        
    }
    //brisanje korisnika
    deleteUser(key) {

        var deleteString = "delete" + key.toString()
        var request = new Request(deleteString,{
            method: "DELETE"
        })
        fetch(request).then((response)=>{
            return response.json();
            }).then((data)=>{
                this.setState({
                    users:data
                })})           
    }
    //dodavanje korisnika
    addUser(user) {
        var request = new Request("adduser",{
            method: "POST",
            body: JSON.stringify(user) 
        })
        fetch(request).then(()=>{
            this.getUsers()
            this.addSwitch()
            })
    }
    //mijenjanje postojećeg korisnika
    editUser(user) {
        var request = new Request("edituser",{
            method: "POST",
            body: JSON.stringify(user) 
        })
        fetch(request).then(()=>{
            console.log("get users")
            this.getUsers()
            })
    }
    render() {
        
        var number = this.state.users ? Object.keys(this.state.users):null
        
        return(
           <div>
                {this.state.adding ? <UserForm cancel={this.addSwitch} addUser={this.addUser}/> : null}
                {(number!=null) ? number.map((val,ind)=>{ //komponenta tek poslije mountanja dobiva podatke iz baze, te na inicijalnom renderu nema što prikazati
                    return <UserInfoBox info={this.state.users[ind]} key={ind} deleteUser={this.deleteUser} id={this.state.users[ind].id} update={this.editUser}/>    
                    }) : null }
                
                <button onClick={()=>{this.addSwitch()}}>Add new user</button>
           </div> 
        )
    }
}