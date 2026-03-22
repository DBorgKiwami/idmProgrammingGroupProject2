const likebuttons = document.getElementsByClassName("likebutton")
// const likeCount = document.getElementsByClassName("commentsection")

for(let i = 0; i < likebuttons.length; i++){
    console.log(likebuttons[i].dataset)
    console.log("im going to kill every single person here")
    likebuttons[i].addEventListener('click', function() {
        console.log(event.target.dataset.postid)
        fetch("/likepost/" + event.target.dataset.postid).then((response) => {
                console.log("Promise Made")
                return response.json()
            }).then(data => {
                console.log("Data Recieved")
                console.log(data)
                console.log(data.length)
            })
    })
}