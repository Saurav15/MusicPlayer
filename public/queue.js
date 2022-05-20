let songList;
const getQueuedSongs  = async()=>{
   await fetch("http://localhost:3000/getAllQueuedSongs")
        .then((res) => res.json())
        .then((res) => {
          res.map(({thumbnail,title,videoId,userName})=>{
              createElement(thumbnail,title,videoId,userName);
          })
        });
}

function createElement(thumbnail,title,videoId,userName) {
    const insertElementHere = document.getElementById("insertElementHere")

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
    addtoPlaylistBtn.innerText = userName;
  
    parentDiv.appendChild(imageDiv);
    parentDiv.appendChild(infoDiv);
    infoDiv.appendChild(headerText);
    infoDiv.appendChild(addtoPlaylistBtn);
    insertElementHere.appendChild(parentDiv);
  
}

function clearAllElements() {
  const insertElementHere = document.getElementById("insertElementHere")
  insertElementHere.innerHTML = "";
}

// Socket 
var socket = io.connect('http://localhost:8080');

socket.on("connect", async () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  clearAllElements()
  await getQueuedSongs();

  socket.on("addElementToQueue",(userSong)=>{
    const {thumbnail,title,videoId,userName} = userSong;
    createElement(thumbnail,title,videoId,userName)
  });
});