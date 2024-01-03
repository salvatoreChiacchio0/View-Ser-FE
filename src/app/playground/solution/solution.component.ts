import { Component, Input } from '@angular/core';
import { ITestSchedule } from '../../models/testSchedule.model';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss'
})
export class SolutionComponent {
  @Input() result!:ITestSchedule

  solutionFlag:boolean = false
}
