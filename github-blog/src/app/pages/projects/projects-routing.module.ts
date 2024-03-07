import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MnistComponent } from './mnist/mnist.component';
import { FaceComponent } from './face/face.component';

const routes: Routes = [
  { path: 'mnist', component: MnistComponent },
  { path: 'face', component: FaceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
