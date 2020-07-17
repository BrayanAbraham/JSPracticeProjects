const github = new Github();
const ui = new UI();

const searchUser = document.getElementById("search-user");

searchUser.addEventListener("keyup", (e) => {
  const userText = e.target.value;
  if (userText !== "") {
    github
      .getUser(userText)
      .then((data) => {
        if (data.profile.message === "Not Found") {
          ui.alert("User Not Found", "alert alert-danger");
        } else {
          ui.showProfile(data.profile);
        }
      })
      .catch((err) => console.log(err));
  } else {
    ui.clearProfile();
  }
});
