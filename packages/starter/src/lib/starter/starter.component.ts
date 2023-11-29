import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'omni-starter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starter.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarterComponent {}
