const cleanTitles = () => {
  document.querySelectorAll("yt-formatted-string").forEach((el) => {
    const title = el.textContent;
    const newTitle = title
      .split(" ")
      .map((word, idx) => {
        if (word.match(/[A-ZÁÉÍÓÚÑÜ][A-ZÁÉÍÓÚÑÜ]+|^[A-ZÁÉÍÓÚÑÜ]$/)) {
          let lowercase = word.toLocaleLowerCase();
          if (idx === 0) {
            lowercase = word[0] + lowercase.substring(1);
          }
          return lowercase;
        } else {
          return word;
        }
      })
      .join(" ");
    el.textContent = newTitle;
  });
};

const youtubeListObserver = new MutationObserver((mutationsList, observer) => {
  setTimeout(cleanTitles, 200);
});
cleanTitles();

const youtubeList = document.querySelector("#page-manager");
if (youtubeList)
  youtubeListObserver.observe(youtubeList, {
    childList: true,
    subtree: true,
  });
