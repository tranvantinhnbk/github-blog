import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [PdfViewerModule, MatButtonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  pdfSrc: string = '/assets/pdf/CV-Tran Van Tinh.pdf';
}
