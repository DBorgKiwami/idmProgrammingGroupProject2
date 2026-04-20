const likeButtons = document.getElementsByClassName("likebutton");
const likeDisplays = document.getElementsByClassName("postlikes");

const likeDict = {};

for(let i = 0; i < likeDisplays.length; i++){
    if(likeDict[likeDisplays[i].dataset.postid]){
        likeDict[likeDisplays[i].dataset.postid] = likeDict[likeDisplays[i].dataset.postid].concat([likeDisplays[i]]);
        console.log(likeDict[likeDisplays[i].dataset.postid])
    }
    else{
        likeDict[likeDisplays[i].dataset.postid] = [likeDisplays[i]]
    }
}

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", async function (event) {
    event.preventDefault();

    const button = event.currentTarget;
    const id = button.dataset.postid;

    try {
      const response = await fetch("/likepost/" + id, {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      const data = await response.json();

      if (likeDict[id]) {
        const currentLikes = parseInt(likeDict[id].innerHTML, 10) || 0;
        console.log(data.liked)
        if (data.liked) {
          for(let j = 0; j < likeDict[id].length; j++){
                        console.log(j)
                        likeDict[id][j].innerHTML =  parseInt(likeDict[id][j].innerHTML) - 1
                    }
          if (window.showToast) {
            window.showToast("Like removed");
          }
        } else {
          for(let j = 0; j < likeDict[id].length; j++){
                        console.log(j)
                        likeDict[id][j].innerHTML =  parseInt(likeDict[id][j].innerHTML) + 1
                    }
          if (window.showToast) {
            window.showToast("Liked");
          }
        }
      } else if (window.showToast) {
        window.showToast("Done");
      }
    } catch (error) {
      if (window.showToast) {
        window.showToast("Like failed. Please try again.", "error");
      }
      console.error(error);
    }
  });
}
