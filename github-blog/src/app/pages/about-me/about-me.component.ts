import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [PdfViewerModule, MatButtonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  pdfSrc: string = '/assets/pdf/CV-Tran Van Tinh.pdf';

  fragmentHash = new Map<string, string>([
    ['CV', '/assets/pdf/CV-Tran Van Tinh.pdf'],
    ['AT', '/assets/pdf/academic-transcript.pdf']

  ])

  constructor(private _router: ActivatedRoute) {
    this._router.fragment.pipe(takeUntilDestroyed()).subscribe(
      fragment => {
        fragment && (this.pdfSrc = this.fragmentHash.get(fragment) || this.pdfSrc);
      }
    )
  }
}
