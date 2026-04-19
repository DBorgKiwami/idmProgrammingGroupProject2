const commentForms = document.querySelectorAll('form[action^="/comment/"]');

for (let i = 0; i < commentForms.length; i++) {
  commentForms[i].addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.querySelector('input[name="content"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const content = input ? input.value.trim() : "";

    if (!content) {
      if (window.showToast) {
        window.showToast("Comment cannot be empty.", "error");
      }
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
      }

      const body = new URLSearchParams();
      body.append("content", content);

      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        },
        body: body.toString()
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      if (input) {
        input.value = "";
      }

      if (window.showToast) {
        window.showToast("Comment posted");
      }
    } catch (error) {
      if (window.showToast) {
        window.showToast("Comment failed. Please try again.", "error");
      }
      console.error(error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
