const input = document.getElementById("gamesearch");
const output = document.getElementById("gamesearchoutput");

console.log("test");

input.addEventListener("keyup", searchDB)

function searchDB(){
    if(input.value != ""){
        fetch("gamesearchquery/" + input.value).then((response) => {
            console.log("Promise Made")
            return response.json()
        }).then(data => {
            console.log("Data Recieved")
            console.log(data)
            if(output){
                console.log("Found")
                output.innerHTML = ''
                for(let i = 0; i < data.length; i++){
                    output.innerHTML += '<option value="' + data[i].game_id + '">' + data[i].game_name + '</option>'
                }
            }
        })
    }else{
        if(output){
                console.log("Found")
                output.innerHTML = '<option value="" disabled selected>Select a game</option>'
            }
    }
}
