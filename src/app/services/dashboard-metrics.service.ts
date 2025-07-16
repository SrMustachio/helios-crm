// src/app/services/dashboard-metrics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface Metrics {
  totalLeads: number;
  totalRevenue: number;
  activeClients: number;
  conversionRate: number;
}

export interface RevenueEntry {
  year: string;
  rep: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardMetricsService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMetrics(year: string): Observable<Metrics> {
    return forkJoin({
      leadsSummary: this.http.get<Record<string, number[]>>(`${this.api}/leadsSummary`),
      revenue: this.http.get<RevenueEntry[]>(`${this.api}/revenue?year=${year}`),
      staticMetrics: this.http.get<Omit<Metrics, 'totalLeads' | 'totalRevenue'>>(`${this.api}/metrics`)
    }).pipe(
      map(({ leadsSummary, revenue, staticMetrics }) => {
        const totalLeads = (leadsSummary[year] || []).reduce((sum, month) => sum + month, 0);
        const totalRevenue = revenue.reduce((sum, entry) => sum + entry.amount, 0);

        return {
          totalLeads,
          totalRevenue,
          ...staticMetrics
        };
      })
    );
  }
}
