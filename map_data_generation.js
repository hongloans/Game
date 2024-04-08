function generateRandomTiles(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distributeTilesToTeams(numTeams) {
  if (numTeams <= 3 || numTeams >= 8) {
    console.log("팀의 수는 3보다 크고 8보다 작아야 합니다.");
    return;
  }

  const totalTiles = 30 * 60; // 총 타일 수
  const tilesPerLandMin = 40;
  const tilesPerLandMax = 48;

  const tilesPerTeam = Math.floor((totalTiles - (12 - numTeams)) / numTeams); // 각 팀당 타일 수

  const remainingTiles = totalTiles - tilesPerTeam * numTeams - (12 - numTeams); // 남은 타일 수

  // 각 팀의 땅을 생성하고 타일을 분배
  const teamLands = [];
  for (let i = 0; i < numTeams; i++) {
    const numTilesInLand = [];
    let remaining = tilesPerTeam;
    while (remaining > 0) {
      const numTiles = generateRandomTiles(tilesPerLandMin, Math.min(tilesPerLandMax, remaining));
      numTilesInLand.push(numTiles);
      remaining -= numTiles;
    }
    teamLands.push(numTilesInLand);
  }

  // 남은 타일을 랜덤하게 팀에 분배
  for (let i = 0; i < remainingTiles; i++) {
    const randomTeamIndex = Math.floor(Math.random() * numTeams);
    const randomLandIndex = Math.floor(Math.random() * teamLands[randomTeamIndex].length);
    teamLands[randomTeamIndex][randomLandIndex]++;
  }

  // 결과 출력
  for (let i = 0; i < numTeams; i++) {
    console.log(`팀 ${i+1}의 땅: ${teamLands[i].join(', ')}`);
  }
}

const numTeams = 5; // 팀의 수
distributeTilesToTeams(numTeams);
