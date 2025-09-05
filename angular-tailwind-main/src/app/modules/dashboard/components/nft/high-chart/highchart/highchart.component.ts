import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-highchart',
  template: `<div id="container" class="w-full h-[400px]"></div>
`,
  standalone: true
})
export class HighchartComponent implements OnInit {
  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    const options: Highcharts.Options = {
      chart: {
        type: 'pie',
        renderTo: 'container'
      },
      title: {
        text: 'Répartition des tâches'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Tâches',
        data: [
          { name: 'En cours', y: 2, color: '#f7b731' },   // Jaune
          { name: 'En attente', y: 2, color: '#eb3b5a' },    // Rouge
          { name: 'Terminé', y: 1, color: '#20bf6b' }     // Vert
        ]
      } as Highcharts.SeriesPieOptions]
    };

    Highcharts.chart('container', options); // Correction : passer le container en premier argument
  }
}
