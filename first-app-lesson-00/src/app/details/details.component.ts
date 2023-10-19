import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ApiService } from '../service.service';
import { ConfigService } from '../config.service'
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.css']
})
export class DetailsComponent {
constructor(private apiService: ConfigService) {}
data: any;

  fetchData() {
    this.apiService.fetchData().subscribe((data) => {
      this.data = data;
    });
  }
}
