import { Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { InventoryComponent } from './pages/inventory/inventory.component'
import { authGuard } from '../services/auth/auth.guard'

export const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    title: 'Inventory Component',
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
  },
]
