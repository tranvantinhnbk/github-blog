import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeetcodeComponent } from './leetcode/leetcode.component';

const routes: Routes = [
  { path: 'leetcode',  loadChildren: () => import('./leetcode/leetcode.module').then((m) => m.LeetcodeModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
