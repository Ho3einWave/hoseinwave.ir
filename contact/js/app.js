let time = new Date().getHours();
if (5 > time >= 19) {
  $(".message").text("Good Night 🌝");
} else if (time >= 16) {
  $(".message").text("Good Evening 🌃");
} else if (time >= 12) {
  $(".message").text("Good Afternoon 🌞");
} else if (time >= 5) {
  $(".message").text("Good Morning 🌅");
}
