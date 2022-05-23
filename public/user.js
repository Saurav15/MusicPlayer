const insertElementHere = document.getElementById("insertElementHere");

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchWord = document.getElementById("inputId");
  const word = searchWord.value;
  searchOnYt(word);
});

function searchOnYt(word) {
  clearAllElements();

  console.log("All elements cleared");
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${word}&key=AIzaSyBFQaT0aQUvzAasfwCVmqgJHTcU7mt-M6w`
  )
    .then((response) => response.text())
    .then((result) => {
      const result1 = JSON.parse(result);
      const allResult = result1.items;

      allResult.forEach((element) => {
        const thumbnail = element.snippet.thumbnails.medium.url;
        const videoId = element.id.videoId;
        const title = element.snippet.title;
        createElement(thumbnail, videoId, title);
      });
    })
    .catch((error) => console.log("error", error));
}

function createElement(thumbnail, videoId, title) {
  const parentDiv = document.createElement("div");
  parentDiv.setAttribute("id", "parentDiv");
  parentDiv.className = "parentDiv";

  const imageDiv = document.createElement("img");
  imageDiv.setAttribute("id", "imageDiv");
  imageDiv.src = thumbnail;

  const infoDiv = document.createElement("div");
  infoDiv.setAttribute("id", "infoDiv");

  const headerText = document.createElement("h3");
  headerText.setAttribute("id", "headerText");
  headerText.innerText = title;

  const addtoPlaylistBtn = document.createElement("button");
  addtoPlaylistBtn.setAttribute("id", "addtoPlaylist");
  addtoPlaylistBtn.innerText = "Add Song ";

  parentDiv.appendChild(imageDiv);
  parentDiv.appendChild(infoDiv);
  infoDiv.appendChild(headerText);
  infoDiv.appendChild(addtoPlaylistBtn);
  insertElementHere.appendChild(parentDiv);

  // Adding event Listener to the "Add Song button";
  addtoPlaylistBtn.addEventListener("click", () => {
    fetch("/addVideoToList", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({videoId,thumbnail,title}),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  });
}

function clearAllElements() {
  const insertElementHere = document.getElementById("insertElementHere");
  insertElementHere.innerHTML = "";
}


const sendSocket = ()=>{
  
}