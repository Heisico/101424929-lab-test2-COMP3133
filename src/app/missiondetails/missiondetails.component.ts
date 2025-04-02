import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../services/spacex.service';
import { Mission } from '../models/mission';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {
  mission!: Mission; // Changed from Mission | undefined to definite assignment

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService
  ) { }

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flight_number');
    if (flightNumber) {
      this.spacexService.getMissionByFlightNumber(flightNumber).subscribe(mission => {
        this.mission = mission;
      });
    }
  }
}