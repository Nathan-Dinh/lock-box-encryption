import { Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { InventoryComponent } from './pages/inventory/inventory.component'
import { authGuard } from '../services/auth/auth.guard'
import { CreateUserComponent } from './pages/create-new-user/create-user.component'

export const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    title: 'Inventory Component',
    canActivate: [authGuard]
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
]
