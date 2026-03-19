const input = document.getElementById("gamesearch");

console.log("test");

input.addEventListener("keyup", searchDB)

function searchDB(){
    fetch("gamesearchquery/" + input.value).then((response) => {
        console.log("Promise Made")
        return response.json()
    }).then(data => {
        console.log("Data Recieved")
        console.log(data)
    })
}
