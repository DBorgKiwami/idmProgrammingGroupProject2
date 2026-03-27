const likebuttons = document.getElementsByClassName("likebutton")
const likedisplays = document.getElementsByClassName("postlikes")

const likedict = {}

for(let i = 0; i < likedisplays.length; i++){
    console.log("TELL EM ABOUT THE BEANS")
    likedict[likedisplays[i].dataset.postid] = likedisplays[i]
}

console.log(likedict)

for(let i = 0; i < likebuttons.length; i++){
    console.log(likebuttons[i].dataset)
    console.log("im going to kill every single person here")
    likebuttons[i].addEventListener('click', function() {
        console.log("BEWARE OF BEANS")
        console.log(event.target.dataset.postid)
        let id = event.target.dataset.postid
        fetch("/likepost/" + event.target.dataset.postid).then((response) => {
                console.log(response)
                console.log("Promise Made")
                return response.json()
            }).then(data => {
                console.log("Data Recieved")
                console.log(data)
                console.log(data.liked)
                if(data.liked){
                    likedict[id].innerHTML =  parseInt(likedict[id].innerHTML) - 1
                }
                else{
                    likedict[id].innerHTML =  parseInt(likedict[id].innerHTML) + 1
                }
            })
    })
}