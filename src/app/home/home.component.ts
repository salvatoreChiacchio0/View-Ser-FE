import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TutorialComponent } from '../tutorial/tutorial.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TutorialComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Welcome to the View Serializability Playground!';

  constructor(private el: ElementRef, private renderer: Renderer2, private router:Router) { }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Get the scroll position
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Calculate the translateY value based on the scroll position
    const translateY = scrollY * 0.5; // Adjust the factor as needed
    
    // Apply the transform style to create the parallax effect
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translateY(${translateY}px)`);
  }
  playgroundPage(){
  this.router.navigate(['/playground'])
}
}
