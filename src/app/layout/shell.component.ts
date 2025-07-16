import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterOutlet],
  templateUrl: './shell.component.html',
})
export class ShellComponent {}
