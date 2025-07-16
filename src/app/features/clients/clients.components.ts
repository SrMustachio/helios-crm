import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  template: `
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Clients</h2>
      <p class="text-gray-600">This is where the list of client accounts will be managed.</p>
    </div>
  `,
})
export class ClientsComponent {}
