const checkTimeDifference = (songAddedTime) => {
    let dateOne = songAddedTime;
    let dateTwo = new Date();
  
    let msDifference = dateTwo - dateOne;
    let minutes = Math.floor(msDifference / 1000 / 60);
    console.log("Minutes between two dates =", minutes);
    return minutes;
  };

  module.exports = checkTimeDifference;