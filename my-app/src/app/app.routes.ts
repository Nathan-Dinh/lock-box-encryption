import { Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { authGuard } from '../services/auth/auth.guard'
import { CreateUserComponent } from './pages/create-new-user/create-user.component'
import { HomeComponent } from './pages/home/home.component'

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    canActivate: [authGuard],
  },
  {
    path: 'home/encryption',
    component: HomeComponent,
    title: 'Encryption',
    canActivate: [authGuard],
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    title: 'Create New User',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'home',
  },
]
