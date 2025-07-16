import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Total Leads</p>
          <p class="text-3xl font-bold text-blue-600">32</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Opportunities</p>
          <p class="text-3xl font-bold text-green-600">12</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <p class="text-sm text-gray-500">Closed Deals</p>
          <p class="text-3xl font-bold text-purple-600">7</p>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
