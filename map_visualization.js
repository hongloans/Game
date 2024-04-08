class Tile {
  constructor(id) {
    this.id = id;
    this.adjacentTiles = [];
  }

  addAdjacentTile(tile, isSameTeam) {
    this.adjacentTiles.push({ tile, isSameTeam });
  }
}

function createMap(rows, columns, numTeams) {
  const map = [];

  // 각 타일을 생성하고 인접한 타일에 대한 정보를 추가
  let tileId = 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const tile = new Tile(tileId);
      // 인접한 타일에 대한 정보 추가
      if (row > 0) {
        tile.addAdjacentTile(map[(row - 1) * columns + col], true); // 같은 팀
      }
      if (row < rows - 1) {
        tile.addAdjacentTile(map[(row + 1) * columns + col], false); // 다른 팀
      }
      if (col > 0) {
        tile.addAdjacentTile(map[row * columns + col - 1], true); // 같은 팀
      }
      if (col < columns - 1) {
        tile.addAdjacentTile(map[row * columns + col + 1], false); // 다른 팀
      }

      map.push(tile);
      tileId++;
    }
  }

  // 각 팀에 땅을 할당
  for (let i = 0; i < numTeams; i++) {
    const startIndex = Math.floor((i / numTeams) * map.length);
    const endIndex = Math.floor(((i + 1) / numTeams) * map.length);
    for (let j = startIndex; j < endIndex; j++) {
      map[j].team = i + 1;
    }
  }

  return map;
}

// 예시: 30x60 크기의 맵 생성, 5개의 팀
const rows = 30;
const columns = 60;
const numTeams = 5;
const gameMap = createMap(rows, columns, numTeams);
console.log(gameMap);
