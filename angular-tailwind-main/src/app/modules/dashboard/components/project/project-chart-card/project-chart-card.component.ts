import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { Project } from 'src/app/modules/dashboard/models/projects';

@Component({
  selector: '[project-chart-card]',
  templateUrl: './project-chart-card.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule, CommonModule],
})
export class ProjectChartCardComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions> = {};
  public projects: { time: string; value: number; change: number }[] = [];

  public totalProjects: number = 0;
  public lastChange: number = 0;

  constructor(
    private themeService: ThemeService,
    private projectService: ProjectServiceService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      // 👉 group projects by month
      const grouped: { [key: string]: number } = {};
      const months: string[] = [];

      projects.forEach((p) => {
        const month = new Date(p.createdAt).toLocaleString('default', { month: 'short' }); // ex: Sep
        if (!grouped[month]) {
          grouped[month] = 0;
          months.push(month);
        }
        grouped[month] += 1;
      });

      this.projects = months.map((m, i) => {
        const prev = i > 0 ? grouped[months[i - 1]] : 0;
        const current = grouped[m];
        return { time: m, value: current, change: current - prev };
      });

      this.totalProjects = this.projects.reduce((sum, p) => sum + p.value, 0);
      this.lastChange = this.projects.length > 1
        ? this.projects[this.projects.length - 1].change
        : 0;

      const categories = this.projects.map((p) => p.time);
      const data = this.projects.map((p) => p.value);
      const baseColor = '#4F46E5'; // default color

      this.chartOptions = {
  series: [{ name: 'Projects', data }],
  chart: {
    fontFamily: 'inherit',
    type: 'line',
    height: 250,
    toolbar: { show: false },
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 3,
    colors: [baseColor],
  },
  xaxis: {
    categories,
    labels: { show: true },
    crosshairs: {
      position: 'front',
      stroke: { color: baseColor, width: 1, dashArray: 4 },
    },
  },
  yaxis: {
    min: 0,
    forceNiceScale: false,   // empêche ApexCharts de recalculer les ticks
    tickAmount: Math.max(...data),  // le nombre de ticks = max de tes données
    labels: {
      formatter: (val) => Math.round(val).toString() // pour afficher que des entiers
    }
  },
  tooltip: {
    theme: 'light',
    y: { formatter: (val) => val.toString() },
  },
  colors: [baseColor],
};

      // theme reactive
      effect(() => {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
        this.chartOptions.colors = [primaryColor];
        this.chartOptions.stroke!.colors = [primaryColor];
        this.chartOptions.xaxis!.crosshairs!.stroke!.color = primaryColor;
        this.chartOptions.tooltip = { theme: this.themeService.theme().mode };
      });
    });
  }

  ngOnDestroy(): void {}
}
