import { Component } from '@angular/core';
import { CanvasComponent } from 'src/app/pages/projects/mnist/canvas/canvas.component';

@Component({
  selector: 'app-mnist',
  standalone: true,
  imports: [CanvasComponent],
  templateUrl: './mnist.component.html',
  styleUrl: './mnist.component.scss'
})
export class MnistComponent {

}
