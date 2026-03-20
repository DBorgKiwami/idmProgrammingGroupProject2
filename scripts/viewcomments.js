const buttons = document.getElementsByClassName("commentbutton")
const commentContainers = document.getElementsByClassName("commentsection")

console.log("TESTING")

console.log(buttons)

for(let i = 0; i < buttons.length; i++){
    console.log("DO IT")
    console.log(buttons[i].dataset)
    buttons[i].addEventListener('click', function() {
        console.log(event.target.dataset.postid)
        if(event.target.dataset.active){
            commentContainers[i].innerHTML=""
            event.target.removeAttribute("data-active")
        }
        else{
            event.target.dataset.active = true
            fetch("/postcomments/" + event.target.dataset.postid).then((response) => {
                console.log("Promise Made")
                return response.json()
            }).then(data => {
                console.log("Data Recieved")
                console.log(data)
                console.log(data.length)
                let toPrint = ""
                for(let j = 0; j < data.length; j++){
                    commentContainers[i].innerHTML += data[j].content + " "
                }
            })
        }
    })
}

console.log("test");
