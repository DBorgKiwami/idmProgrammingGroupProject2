const buttons = document.getElementsByClassName("commentbutton");
const commentContainers = document.getElementsByClassName("commentsection");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", async function (event) {
    const button = event.currentTarget;
    const commentContainer = commentContainers[i];
    const postId = button.dataset.postid;

    if (button.dataset.active) {
      commentContainer.innerHTML = "";
      button.removeAttribute("data-active");
      return;
    }

    button.dataset.active = "true";

    try {
      const response = await fetch("/postcomments/" + postId, {
        headers: { Accept: "application/json" }
      });
      const data = await response.json();

      commentContainer.innerHTML = "";

      if (!data.length) {
        commentContainer.innerHTML = "No comments yet";
        return;
      }

      for (let j = 0; j < data.length; j++) {
        commentContainer.innerHTML += `${data[j].username} - ${data[j].content}<br>`;
      }
    } catch (error) {
      commentContainer.innerHTML = "Failed to load comments";
      console.error(error);
    }
  });
}
