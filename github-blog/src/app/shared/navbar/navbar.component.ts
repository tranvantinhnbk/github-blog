import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule, RouterModule]
})
export class NavbarComponent {
  @Input() position: 'sticky' | 'relative' = 'sticky'; // Default to sticky if not provided
}
