import { Routes } from '@angular/router';
import { UrlConsts } from 'src/shared/UrlConsts';
import { CompetitionBoardComponent } from './competition-board/competition-board.component';


export const AppRoutes: Routes = [
  { path: '', redirectTo: UrlConsts.battleBoard.main, pathMatch: 'full'},
  { path: UrlConsts.battleBoard.main, component: CompetitionBoardComponent },
  { path: '**', redirectTo: '/404' }
];
