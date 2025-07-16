import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexLegend,
  ApexResponsive,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardService, Lead, RevenueEntry } from '../../services/dashboard.service';
import { DashboardMetricsService, Metrics } from '../../services/dashboard-metrics.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.components.html',
  imports: [CommonModule, FormsModule, NgApexchartsModule]
})
export class DashboardComponent implements OnInit {
  selectedYear = '2024';
  availableYears = ['2022', '2023', '2024'];

  metrics: Metrics | null = null;

  lineChartSeries: ApexAxisChartSeries = [];
  barChartSeries: ApexAxisChartSeries = [];
  pieChartSeries: ApexNonAxisChartSeries = [];

  leadsSummary: Record<string, number[]> = {};

  lineChartDetails: ApexChart = {
    type: 'line',
    height: 350,
    animations: {
      enabled: true,
      animateGradually: { enabled: true, delay: 150 },
      dynamicAnimation: { enabled: true, speed: 800 },
    },
  };
  lineChartXAxis: ApexXAxis = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  lineChartTitle: ApexTitleSubtitle = {
    text: 'Leads Trend',
    align: 'left',
  };

  barChartDetails: ApexChart = {
    type: 'bar',
    height: 350,
    animations: {
      enabled: true,
      animateGradually: { enabled: true, delay: 150 },
      dynamicAnimation: { enabled: true, speed: 800 },
    },
  };
  barChartXAxis: ApexXAxis = { categories: [] };
  barChartTitle: ApexTitleSubtitle = {
    text: 'Revenue per Sales Rep',
    align: 'left',
  };
  barChartDataLabels: ApexDataLabels = { enabled: false };

  pieChartDetails: ApexChart = {
    type: 'pie',
    width: 400,
    animations: {
      enabled: true,
      animateGradually: { enabled: true, delay: 150 },
      dynamicAnimation: { enabled: true, speed: 800 },
    },
  };
  pieChartLabels: string[] = ['Won', 'Lost', 'In Progress'];
  pieChartLegend: ApexLegend = { position: 'bottom' };
  pieChartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' },
      },
    },
  ];

  constructor(
    private dashboardService: DashboardService,
    private dashboardMetricsService: DashboardMetricsService
  ) {}

  ngOnInit(): void {
    this.loadAll(this.selectedYear);
  }

  onYearChange(): void {
    this.loadAll(this.selectedYear);
  }

  private loadAll(year: string): void {
    this.loadData(year);
    this.loadMetrics(year);
  }

  private loadMetrics(year: string): void {
    this.dashboardMetricsService.getMetrics(year).subscribe(metrics => {
      this.metrics = metrics;
    });
  }

  private loadData(year: string) {
    this.dashboardService.getLeads().subscribe((data) => {
      this.pieChartSeries = this.transformLeadsToPieData(data);
    });

    this.dashboardService.getRevenue(year).subscribe((data) => {
      this.barChartSeries = [{
        name: 'Revenue ($k)',
        data: data.map((rep: RevenueEntry) => rep.amount),
      }];
      this.barChartXAxis = {
        categories: data.map((rep: RevenueEntry) => rep.rep),
      };
    });

    this.dashboardService.getLeadsSummary().subscribe((summary) => {
      this.leadsSummary = summary;
      this.updateLineChart(year);
    });
  }

  private updateLineChart(year: string): void {
    const data = this.leadsSummary[year] || [];
    this.lineChartSeries = [{ name: 'Leads', data }];
  }

  private transformLeadsToPieData(leads: Lead[]): number[] {
    const statusCount = { Won: 0, Lost: 0, 'In Progress': 0 };
    for (const lead of leads) {
      statusCount[lead.status] = (statusCount[lead.status] || 0) + 1;
    }
    return [statusCount['Won'], statusCount['Lost'], statusCount['In Progress']];
  }
}
