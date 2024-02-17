import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  @Input() color: string = '#007bff'; // Default color is primary blue
  @Input() textColor: string = '#ffffff'; // Default text color is white
  @Input() borderRadius: number = 100; // Default border radius is 4px
}
