import { Component, OnInit } from '@angular/core';
import { SpacexService } from '../services/spacex.service';
import { Mission } from '../models/mission';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Add this import

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Add RouterModule here
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  years: string[] = [];
  selectedYear: string = '';

  constructor(private spacexService: SpacexService) { }

  ngOnInit(): void {
    this.loadAllMissions();
  }

  loadAllMissions(): void {
    this.spacexService.getAllMissions().subscribe(missions => {
      this.missions = missions;
      this.filteredMissions = missions;
      this.extractUniqueYears();
    });
  }

  extractUniqueYears(): void {
    const allYears = this.missions.map(mission => mission.launch_year);
    this.years = [...new Set(allYears)].sort();
  }

  filterByYear(year: string): void {
    this.selectedYear = year;
    if (year) {
      this.spacexService.getMissionsByYear(year).subscribe(missions => {
        this.filteredMissions = missions;
      });
    } else {
      this.filteredMissions = this.missions;
    }
  }
}