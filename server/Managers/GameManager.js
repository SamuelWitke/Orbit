const NEW_ROUND = "@@game/NEW_ROUND";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* eslint no-param-reassign: 0 */
function shuffleArray(array) {
  let counter = array.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter -= 1;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

export default class GameManager {
  constructor(ClientManager) {
    this.ClientManager = ClientManager;
    this.gameType = ["FreeForAll", "Split-Teams", "Variable-Teams"];
    console.log(this.ClientManager.getAvailableUsers());
  }

  randomGameType() {
    const index = getRandomInt(1, 3);
    return this.gameType[index];
  }

  getRoundInfo() {
    const gameType = this.randomGameType();
    // const gameType = "FreeForAll";
    const players = this.ClientManager.getAvailableUsers();
    switch (gameType) {
      case "FreeForAll": {
        return {
          type: NEW_ROUND,
          payload: {
            type: "FreeForAll",
            players
          }
        };
      }
      case "Split-Teams": {
        const shuffle = shuffleArray(players);
        const divided = [
          shuffle.splice(0, shuffle.length / 2),
          shuffle.splice(shuffle.length / 2, shuffle.length)
        ];
        return {
          type: NEW_ROUND,
          payload: {
            type: "Split-Teams",
            players: divided
          }
        };
      }
      default: {
        return {
          type: NEW_ROUND,
          payload: {
            type: "FreeForAll",
            players
          }
        };
      }
    }
  }

  start() {
    console.log("herere,", this.ClientManager.getAvailableUsers());
  }
}
