import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from '../../../../../shared/models/chart-options';

@Component({
  selector: '[project-chart-card]',
  templateUrl: './project-chart-card.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule, CommonModule],
})
export class ProjectChartCardComponent implements OnInit, OnDestroy {

  public projects = [
    { time: 'septembre', value: 5, change: -2 },
    { time: 'octobre', value: 7, change: 2 },
    { time: 'novembre', value: 12, change: 5 }
  ];

  public chartOptions: Partial<ChartOptions>;

  constructor(private themeService: ThemeService) {

    const baseColor = '#FFFFFF';
    const data = this.projects.map(p => p.value);
    const categories = this.projects.map(p => p.time);

    this.chartOptions = {
      series: [
        { name: 'Projects', data: data }
      ],
      chart: { fontFamily: 'inherit', type: 'area', height: 150, toolbar: { show: false }, sparkline: { enabled: true } },
      dataLabels: { enabled: false },
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.2, stops: [15, 120, 100] } },
      stroke: { curve: 'smooth', show: true, width: 3, colors: [baseColor] },
      xaxis: { categories: categories, labels: { show: false }, crosshairs: { position: 'front', stroke: { color: baseColor, width: 1, dashArray: 4 } }, tooltip: { enabled: true } },
      tooltip: { theme: 'light', y: { formatter: val => val.toString() } },
      colors: [baseColor],
    };

    effect(() => {
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
      this.chartOptions.tooltip = { theme: this.themeService.theme().mode };
      this.chartOptions.colors = [primaryColor];
      this.chartOptions.stroke!.colors = [primaryColor];
      this.chartOptions.xaxis!.crosshairs!.stroke!.color = primaryColor;
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
