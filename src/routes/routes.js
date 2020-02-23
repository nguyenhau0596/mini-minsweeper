import Board from 'pages/board/Board';
import Home from 'pages/home/Home';
import { URLS } from 'constants/Urls';

export const routes = [
  {
    path: URLS.BOARD,
    extract: true,
    component: Board
  },
  {
    path: URLS.HOME,
    extract: true,
    component: Home
  }
]
