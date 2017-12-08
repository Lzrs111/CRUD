import React from "react"

export default function UserInfoBox(props){
    var obj = props.info
    var html;
    var keys = Object.keys(obj)


   return (
        <div>
            <br/>
            {keys.map((val,index)=>{
                    return <div key={index} style={{display:"inline"}}>
                        {" " + obj[keys[index]]+ " "}
                    </div>
                })}
            <button onClick={()=>{
                props.deleteUser(props.id)
                }}>DELETE</button>
            <br/>
        </div>
   ) 
}