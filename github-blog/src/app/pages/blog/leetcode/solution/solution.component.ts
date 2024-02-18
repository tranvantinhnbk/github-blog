import { Component, ViewEncapsulation } from '@angular/core';
import { HighlightJsDirective, HighlightJsModule } from 'ngx-highlight-js';
import { solution } from './content/two-sum';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Solution } from './solution.type';
@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [
    CommonModule,

    HighlightJsModule,
    HighlightJsDirective,
  ],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class SolutionComponent {
  constructor(private _route: ActivatedRoute) { }
  solution = {};
  ngOnInit(): void {
      const solutionName = this._route.snapshot.paramMap.get('name') || '';
      this.solution = solution[solutionName];
  }

}
