import { Component, inject } from '@angular/core';
import { ClearPhotoFormComponent } from '../../../../shared/database-page/clear-photo-form/clear-photo-form.component'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { FormsStateService } from '../../../../../services/observable/forms-state.service';
import { MatIcon } from '@angular/material/icon'


@Component({
  selector: 'app-database',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, ClearPhotoFormComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css',
})
export class DatabaseComponent {
  public fsService = inject(FormsStateService)

  openClearPhotoFrmClick(){
    this.fsService.setClearPhotoFrmDState('block')
  }
}
