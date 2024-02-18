import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionComponent } from './solution/solution.component';
import { LeetcodeComponent } from './leetcode.component';

const routes: Routes = [
  { path: '', component: LeetcodeComponent },
  { path: 'solution/:name', component: SolutionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeetcodeRoutingModule { }
