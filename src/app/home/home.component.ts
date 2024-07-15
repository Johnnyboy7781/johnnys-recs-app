import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  backendUrl = environment.backendUrl;
  
  #http = inject(HttpClient);

  test() {
    this.#http.get(`${this.backendUrl}/api/v1/hello`).pipe(
      tap((data) => console.log(data))
    ).subscribe();
  }
}
