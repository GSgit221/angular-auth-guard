import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NoAuthenticationGuard } from './guards/no-authentication.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { NewsResolver } from './services/news.resolver'


const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent,
  canActivate: [NoAuthenticationGuard]
}, {
  path: 'news',
  component: NewsComponent,
  canActivate: [AuthenticationGuard],
  resolve: { message: NewsResolver }
}, {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthenticationGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    NewsResolver
  ]
})
export class AppRoutingModule { }
