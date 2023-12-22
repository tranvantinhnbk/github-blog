import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { InlineSVGModule } from 'ng-inline-svg-2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatButtonModule, HttpClientModule, InlineSVGModule]
})
export class NavbarComponent {

}
