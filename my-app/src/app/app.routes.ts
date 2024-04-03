import { Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { authGuard } from '../services/auth/auth.guard'
import { CreateUserComponent } from './pages/create-new-user/create-user.component'
import { HomeComponent } from './pages/home/home.component'
import { EncryptionComponent } from './pages/home/encryption/encryption.component'
import { GalleryComponent } from './pages/home/gallery/gallery.component'
import { AccountComponent } from './pages/home/account/account.component'
import { CameraComponent } from './pages/home/camera/camera.component'

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'gallery',
        component: GalleryComponent,
        title: 'Gallery',
        canActivate: [authGuard],
      },
      {
        path: 'account',
        component: AccountComponent,
        title: 'Account',
        canActivate: [authGuard],
      },
      {
        path: 'encryption',
        component: EncryptionComponent,
        title: 'Encryption',
        canActivate: [authGuard],
      },
      {
        path: 'camera',
        component: CameraComponent,
        title: 'Camera',
        canActivate: [authGuard],
      },
    ],
    title: 'Home',
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
  { path: '', redirectTo: 'home/gallery', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'home/gallery',
  },
]
