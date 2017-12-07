import React from "react"


export default class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            user1: "null" 
            }
    }
    componentDidMount() {
        var request = new Request("user1",{
            method: "GET"
        })
        fetch(request).then((data)=>{
            console.log(data)
            return data.text();
            }).then((stuff)=>{
            console.log(stuff)
            })
    }
    render() {
        return(
           <div>
               <form method="POST">
                 <input></input>
               </form>
               <h1>{this.state.user1}</h1>
           </div> 
        )
    }
}