export function initBoardData(minesData, size) {
  const data = [];
  for (let x = 0 ; x < size ; x++) {
    data[x] = [];
    for (let y = 0 ; y < size ; y++) {
      data[x].push({
        clicked: false,
        isMine: isMine(x, y, minesData),
        x,
        y,
        nearbyMines: calculateNearbyMines(x, y, minesData)
      });
    }
  }
  return data;
}

export function isWonGame(boardData) {
  for (let x = 0 ; x < boardData.length; x++ ) {
    for (let y = 0 ; y < boardData.length; y++ ) {
      if (!boardData[x][y].clicked && !boardData[x][y].isMine) {
        return false;
      }
    }
  }
  return true;
}

function isMine(x, y, minesData) {
  for (let i = 0; i < minesData.length; i++) {
    if (minesData[i].x === x && minesData[i].y === y) {
      return true;
    }
  }
  return false;
}

function calculateNearbyMines(x, y, minesData) {
  let count = 0;

  if (isMine(x - 1, y - 1, minesData)) {
    count++;
  }

  if (isMine(x - 1, y, minesData)) {
    count++;
  }

  if (isMine(x - 1, y + 1, minesData)) {
    count++;
  }

  if (isMine(x, y - 1, minesData)) {
    count++;
  }

  if (isMine(x, y + 1, minesData)) {
    count++;
  }

  if (isMine(x + 1, y - 1, minesData)) {
    count++;
  }

  if (isMine(x + 1, y, minesData)) {
    count++;
  }

  if (isMine(x + 1, y + 1, minesData)) {
    count++;
  }

  return count;
}