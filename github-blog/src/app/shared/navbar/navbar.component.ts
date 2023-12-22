import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatButtonModule, HttpClientModule, CommonModule]
})
export class NavbarComponent {
  @Input() position: 'sticky' | 'relative' = 'sticky'; // Default to sticky if not provided
}
