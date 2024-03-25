import { Routes } from '@angular/router'
import { TestComponent } from './pages/test/test.component'
import { InventoryComponent } from './pages/inventory/inventory.component'

export const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    title: 'Inventory Component',
  },
  {
    path: 'test/1',
    component: TestComponent,
    title: 'Test page',
  },
]
