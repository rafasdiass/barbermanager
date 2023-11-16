import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientHomeComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  navigateToClientCreate(): void {
    this.router.navigate(['/client/create']);
  }
}
