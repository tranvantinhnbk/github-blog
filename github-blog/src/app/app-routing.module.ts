import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { CertificateComponent } from './pages/certificate/certificate.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutMeComponent},
  { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then((m) => m.BlogModule)},
  { path: 'projects', loadChildren: () => import('./pages/projects/projects.module').then((m) => m.ProjectsModule)},
  { path: 'certificate', component: CertificateComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
