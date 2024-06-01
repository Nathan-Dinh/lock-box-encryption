import { Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { authGuard } from '../services/auth/auth.guard'
import { CreateUserComponent } from './pages/create-new-user/create-user.component'
import { HomeComponent } from './pages/home/home.component'
import { HomeContentComponent } from './pages/home/home-content/home-content.component'
import { GalleryComponent } from './pages/home/gallery/gallery.component'
import { AccountComponent } from './pages/home/account/account.component'
import { CameraComponent } from './pages/home/camera/camera.component'
import { PictureContentComponent } from './pages/home/picture-content/picture-content.component'
import { SettingComponent } from './pages/home/setting/setting.component'
import { SettingContentComponent } from './pages/home/setting/setting-content/setting-content.component'
import { AccountInfoComponent } from './pages/home/setting/account-info/account-info.component'
import { DatabaseComponent } from './pages/home/setting/database/database.component'
import { AboutComponent } from './pages/home/setting/about/about.component'

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeContentComponent,
        title: 'Home',
        canActivate: [authGuard],
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        title: 'Gallery',
        canActivate: [authGuard],
      },
      {
        path: 'setting',
        component: SettingComponent,
        title: 'Setting',
        children: [
          {
            path: '',
            component: SettingContentComponent,
            title: 'Setting',
            canActivate: [authGuard],
          },
          {
            path: 'account-info',
            component: AccountInfoComponent,
            title: 'AccountInfo',
            canActivate: [authGuard],
          },
          {
            path: 'database',
            component: DatabaseComponent,
            title: 'Database',
            canActivate: [authGuard],
          },
          {
            path: 'about',
            component: AboutComponent,
            title: 'About',
            canActivate: [authGuard],
          },
        ],
        canActivate: [authGuard],
      },
      {
        path: 'account',
        component: AccountComponent,
        title: 'Account',
        canActivate: [authGuard],
      },
      {
        path: 'picture-content',
        component: PictureContentComponent,
        title: 'Picture Content',
        canActivate: [authGuard],
      },
      {
        path: 'camera/:timestamp',
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'home',
  },
]
