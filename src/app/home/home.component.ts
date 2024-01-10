import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { calculateMiniMapPosition } from '../helper/dom-manipulator';

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  title = 'bpmn-ang';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    calculateMiniMapPosition();
  }
}
