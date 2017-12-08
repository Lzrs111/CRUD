import React from "react"

export default class UserInfoBox extends React.Component{
    constructor(props) {
        super()
        this.state = {
            editing: false,
            userInfo: props.info
        } 
        this.editSwitch = this.editSwitch.bind(this)
        this.normalRender = this.normalRender.bind(this)
        this.editRender = this.editRender.bind(this)
        this.updateInfo = this.updateInfo.bind(this)
        
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            userInfo: nextProps.info
        })
    }
    editSwitch() {
        this.setState({
            editing: !this.state.editing
        })
    }
    updateInfo() {
        var info = {}
        info["id"] = this.state.userInfo["id"]
        info["name"] = this.refs["name"].value
        info["surname"] =this.refs["surname"].value
        info["email"] = this.refs["email"].value

        this.editSwitch()
        this.props.update(info)

    }
    //ova komponenta ima 2 rendera, ovisno o stateu
    normalRender(){
        var obj = this.state.userInfo
        var html;
        var keys = Object.keys(obj)
        return(
            <div>
                <br/>
                {keys.map((val,index)=>{
                    return <div key={index} style={{display:"inline"}}>
                                {" " + obj[keys[index]]+ " "}
                            </div>
                    })}
                <button onClick={()=>{this.props.deleteUser(this.props.id)}}>DELETE</button>
                <button onClick={()=>{this.editSwitch()}}>EDIT</button>
                <br/>
            </div>
        )
    }
    editRender() {
        var obj = this.state.userInfo
        var html;
        var keys = Object.keys(obj)
        var inputs = ["name","surname","email"]
        return(
        <div>
                {keys.map((val,index)=>{
                        //s obzirom da ne želimo da korisnik proizvoljno mijenja ID, index 0 odnosno prvi ključ se preskače.Ne rendera se input nego običan div
                        if (index > 0) {
                            return <input key={index} style={{display:"inline"}} defaultValue={obj[keys[index]]} ref={inputs[index-1]}></input> } 
                        else {
                            return <div key={index} style={{display:"inline"}}>{" " + obj[keys[index]]+ " "}
                            </div>
                        }
                    })}
                <button onClick={()=>{this.updateInfo() }}>CONFIRM</button>
                <button onClick={()=>{this.editSwitch()}}>CANCEL</button>
        </div>
        )
    }

    render() {
    return (
        <div>
            {this.state.editing ? this.editRender() : this.normalRender()}
        </div>
      ) 
    }
}