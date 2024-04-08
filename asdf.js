// map_generation_and_visualization.js

class Tile {
  constructor(id) {
    this.id = id;
    this.adjacentTiles = [];
    this.team = null; // 각 타일의 속성 중 하나인 팀 정보
  }

  addAdjacentTile(tile, isSameTeam) {
    this.adjacentTiles.push({ tile, isSameTeam });
  }
}

// 각 타일에 대한 랜덤한 값을 생성하는 함수
function generateRandomTiles(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMapData(rows, columns) {
  const totalTiles = rows * columns;
  const mapData = [];

  // 각 타일의 데이터 생성
  for (let i = 0; i < totalTiles; i++) {
    const tile = new Tile(i + 1); // 타일 생성
    const randomValue = generateRandomTiles(1, 100); // 각 타일에 대한 랜덤한 값 생성
    tile.team = (randomValue > 50) ? 1 : 2; // 팀 정보 할당 (예시로 50% 확률로 팀 1 또는 팀 2로 설정)
    mapData.push(tile); // mapData에 타일 추가
  }

  // 각 타일에 대한 인접 타일 정보 추가
  for (let i = 0; i < mapData.length; i++) {
    const row = Math.floor(i / columns);
    const col = i % columns;

    // 위 아래 인접 타일 추가
    if (row > 0) {
      mapData[i].addAdjacentTile(mapData[i - columns], mapData[i].team === mapData[i - columns].team);
    }
    if (row < rows - 1) {
      mapData[i].addAdjacentTile(mapData[i + columns], mapData[i].team === mapData[i + columns].team);
    }

    // 짝수열과 홀수열의 경우 다른 방식으로 인접 타일을 추가
    if (col % 2 === 0) {
      if (col > 0) {
        mapData[i].addAdjacentTile(mapData[i - 1], mapData[i].team === mapData[i - 1].team);
        if (row > 0) {
          mapData[i].addAdjacentTile(mapData[i - columns - 1], mapData[i].team === mapData[i - columns - 1].team);
        }
      }
      if (col < columns - 1) {
        mapData[i].addAdjacentTile(mapData[i + 1], mapData[i].team === mapData[i + 1].team);
        if (row > 0) {
          mapData[i].addAdjacentTile(mapData[i - columns], mapData[i].team === mapData[i - columns].team);
        }
      }
    } else {
      if (col > 0) {
        mapData[i].addAdjacentTile(mapData[i - 1], mapData[i].team === mapData[i - 1].team);
        if (row < rows - 1) {
          mapData[i].addAdjacentTile(mapData[i + columns - 1], mapData[i].team === mapData[i + columns - 1].team);
        }
      }
      if (col < columns - 1) {
        mapData[i].addAdjacentTile(mapData[i + 1], mapData[i].team === mapData[i + 1].team);
        if (row < rows - 1) {
          mapData[i].addAdjacentTile(mapData[i + columns], mapData[i].team === mapData[i + columns].team);
        }
      }
    }
  }

  return mapData;
}

// 맵 데이터 생성
const rows = 30;
const columns = 60;
const mapData = generateMapData(rows, columns);
console.log(mapData);
