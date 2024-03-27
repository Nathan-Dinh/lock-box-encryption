import { Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { InventoryComponent } from './pages/inventory/inventory.component'

export const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    title: 'Inventory Component',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
  },
]
