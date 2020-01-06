import { Component, OnInit, Input } from '@angular/core';
import { StarshipDto } from 'src/shared/service-proxy/starship/starship.service';

@Component({
  selector: 'sb-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.scss']
})
export class StarshipCardComponent implements OnInit {

  @Input() starshipInfo: StarshipDto;

  constructor() { }

  ngOnInit() {
  }

}
