import React from 'react';

function isClcked(clicked, isMine) {
  if (!clicked) {
    return 'hidden-cell';
  }

  if (isMine) {
    return 'danger-cell';
  } else {
    return 'safe-cell';
  }
}

export const Cell = ({clicked, isMine, onClick, x, y, nearbyMines}) => <button
  onClick={() => onClick(x, y)}
  className={`cell-buton btn ${isClcked(clicked, isMine)}`}
>
  {(isMine && clicked) && (
    <i>X</i>
  )}
  {(!isMine && nearbyMines > 0 && clicked) && (
    nearbyMines
  )}
</button>