import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const API_BASE_URL = 'https://swapi.co/api';
const API_RESOURCE_URL = 'starships';

@Injectable()
export class StarshipService {

  constructor(private http: HttpClient) { }

  getStarshipInfo(starshipId: number | null | undefined): Observable<StarshipDto> {
    const url_ = `${API_BASE_URL}/${API_RESOURCE_URL}/${starshipId}`;

    return this.http.get(url_).pipe(
      map(response => {
        try {
          return StarshipDto.fromJS(response);
        } catch (e) {
          this.handleError(e);
        }
      })
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}

export class StarshipDto {

  name: string;
  model: string;
  crew: number;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  cost_in_credits: number;
  created: Date;
  edited: Date;
  hyperdrive_rating: string;
  length: number;
  manufacturer: string;
  max_atmosphering_speed: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
  battlesInfo: BattelsInfo;

  static fromJS(data: any): StarshipDto {
    data = typeof data === 'object' ? data : {};
    const result = new StarshipDto();
    result.init(data);
    return result;
  }

  init(_data?: any) {
    if (_data) {
      this.name = _data['name'];
      this.model = _data['model'];
      this.crew = _data['crew'];
      this.passengers = _data['passengers'];
      this.cargo_capacity = _data['cargo_capacity'];
      this.consumables = _data['consumables'];
      this.cost_in_credits = _data['cost_in_credits'];
      this.created = _data['created'];
      this.edited = _data['edited'];
      this.hyperdrive_rating = _data['hyperdrive_rating'];
      this.length = _data['length'];
      this.manufacturer = _data['manufacturer'];
      this.max_atmosphering_speed = _data['max_atmosphering_speed'];
      this.films = _data['films'];
      this.pilots = _data['pilots'];
      this.starship_class = _data['starship_class'];
      this.url = _data['url'];
    }
  }
}

export class BattelsInfo {
  amount: number;
  won: number;

  constructor(_amount = 0, _won = 0) {
    this.amount = _amount;
    this.won = _won;
  }
}
