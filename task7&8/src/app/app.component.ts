import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HomeComponent } from './components/home/home.component';
// import { AboutComponent } from './components/about/about.component';
// import { SkillsComponent } from './components/skills/skills.component';
// import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/users/users.component';

@Component({
  //component directive
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
