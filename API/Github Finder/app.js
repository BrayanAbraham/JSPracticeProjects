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
          //show alet
        } else {
          //show profile
          ui.showProfile(data.profile);
        }
      })
      .catch((err) => console.log(err));
  } else {
    //clear profile
  }
});
