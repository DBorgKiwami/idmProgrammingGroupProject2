const input = document.getElementById("gamesearch");

console.log("test");

input.addEventListener("keyup", searchDB)

function searchDB(){
    fetch("gamesearchquery/" + input.value).then((response) => {
        console.log("fuck")
        return response.json()
    }).then(data => {
        console.log("suicide")
        console.log(data)
    })
}