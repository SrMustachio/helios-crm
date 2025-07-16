import { Component } from '@angular/core';

@Component({
  selector: 'app-leads',
  standalone: true,
  template: `
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Leads</h2>
      <p class="text-gray-600">This is where the list of leads will be displayed.</p>
    </div>
  `,
})
export class LeadsComponent {}
