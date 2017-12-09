//ova funkcija provjerava inpute korisnika. Ime i prezime ne smiju biti prazni, a također provjerava je li email ispravnog formata

export default function inputCheck(inputs) {

    var check = [] 
    //nije moje
    var email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    console.log("email", email.test(inputs[2].value),inputs[2])
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i].value)
        if (inputs[i].value=="") {
            check = [false,inputs[i]]
            break
        } else if (i==2 && email.test(inputs[2].value)==false) {
            check = [false,inputs[2]]
        } else {
            check = [true]
        }
    }
    return check
}