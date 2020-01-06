import { Component, OnInit } from '@angular/core';
import { StarshipService, StarshipDto, BattelsInfo } from 'src/shared/service-proxy/starship/starship.service';
import { first } from 'rxjs/operators';
import { trigger, style, animate, transition, state } from '@angular/animations';

enum BattleState {
  openend = 'openend',
  closed = 'closed'
}

@Component({
  selector: 'sb-competition-board',
  templateUrl: './competition-board.component.html',
  styleUrls: ['./competition-board.component.scss'],
  animations: [
    trigger('openCloseBattleCards', [
      state(BattleState.openend, style({ opacity: 1 })),
      state(BattleState.closed, style({ opacity: 0 })),
      transition(`${BattleState.closed}=>${BattleState.openend}`, animate('1000ms')),
      transition(`${BattleState.openend}=>${BattleState.closed}`, animate('1000ms'))
    ])]
})

export class CompetitionBoardComponent implements OnInit {

  starships: StarshipDto[] = [];
  battleWinner: StarshipDto = null;

  public battleState: BattleState;

  constructor(private _starshipService: StarshipService) { }

  ngOnInit() {
    this.battleState = BattleState.closed;
  }

  getShips() {
    this.starships = [];
    this.battleWinner = null;
    this.battleState = BattleState.closed;
    this.addShip(this.randomNumber());
    this.addShip(this.randomNumber());
    this.battleState = BattleState.openend;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  addShip(id: number) {
    return this._starshipService.getStarshipInfo(id).pipe(first())
      .subscribe(data => {
        data.battlesInfo = this.getShipBattleInfoFromLocalStorage(data.name);
        this.starships.push(data);
      });
  }

  getShipBattleInfoFromLocalStorage(returnStarshipName: string): BattelsInfo {
    const data = JSON.parse(localStorage.getItem(returnStarshipName));
    return data ? new BattelsInfo(data.amount, data.won) : new BattelsInfo();
  }

  startBattle() {
    const [firstContender, secondContender] = this.starships;

    if (firstContender.crew === secondContender.crew) {
      // todo draw
    } else if (firstContender.crew > secondContender.crew) {
      this.saveBattleResultInStorage(firstContender, secondContender);
      this.battleWinner = firstContender;
    } else {
      this.saveBattleResultInStorage(secondContender, firstContender);
      this.battleWinner = secondContender;
    }
    this.battleState = BattleState.closed;
  }

  saveBattleResultInStorage(winner: StarshipDto, loser: StarshipDto) {
    const winnerBattleInfo = new BattelsInfo(++winner.battlesInfo.amount, ++winner.battlesInfo.won);
    const loserBattleInfo = new BattelsInfo(++loser.battlesInfo.amount, loser.battlesInfo.won);
    localStorage.setItem(winner.name, JSON.stringify(winnerBattleInfo));
    localStorage.setItem(loser.name, JSON.stringify(loserBattleInfo));
  }
}

