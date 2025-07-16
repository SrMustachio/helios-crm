// src/app/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lead {
  id: number;
  name: string;
  status: 'Won' | 'Lost' | 'In Progress';
}

export interface RevenueEntry {
  rep: string;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
    private api = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getLeads(): Observable<Lead[]> {
        return this.http.get<Lead[]>(`${this.api}/leads`);
    }

    getRevenue(year: string): Observable<RevenueEntry[]> {
    return this.http.get<RevenueEntry[]>(`${this.api}/revenue?year=${year}`);
    }


    getLeadsSummary(): Observable<Record<string, number[]>> {
        return this.http.get<Record<string, number[]>>(`${this.api}/leadsSummary`);
    }
}
