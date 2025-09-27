import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TaskServicesService } from 'src/app/core/services/task-services.service';
import { Task } from 'src/app/modules/dashboard/models/task';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highchart',
  template: `
    <div *ngIf="hasData; else noData" id="container" class="w-full h-[400px]"></div>
    <ng-template #noData>
      <div class="w-full h-[400px] flex items-center justify-center text-gray-500">
       
      </div>
    </ng-template>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class HighchartComponent implements OnInit {
  private chart?: Highcharts.Chart;
  private projectId!: number;
  private tasks: Task[] = [];
  hasData = false;

  constructor(
    private taskService: TaskServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = Number(params.get('id'));
      if (projectId) {
        this.projectId = projectId;
        this.loadData(projectId); // 👉 initialise la liste locale
      }
    });
  }

  loadData(projectId: number) {
    this.taskService.getTasksByProject(projectId).subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        const counts = this.countTasks(this.tasks);
        const total = counts.enCours + counts.enAttente + counts.termine;

        if (total === 0) {
          // No data -> destroy any existing chart and show empty state
          if (this.chart) {
            try { this.chart.destroy(); } catch { /* ignore */ }
            this.chart = undefined;
          }
          this.hasData = false;
        } else {
          this.hasData = true;
          // wait for the ngIf container to be rendered before creating the chart
          setTimeout(() => this.renderChart(counts), 0);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tâches', err);
        // show empty state on error
        if (this.chart) {
          try { this.chart.destroy(); } catch { /* ignore */ }
          this.chart = undefined;
        }
        this.hasData = false;
      }
    });
  }

  countTasks(tasks: Task[]) {
    return {
      enCours: tasks.filter(t => t.status === 'En cours').length,
      enAttente: tasks.filter(t => t.status === 'En attente').length,
      termine: tasks.filter(t => t.status === 'Terminé').length
    };
  }

  renderChart(counts: { enCours: number; enAttente: number; termine: number }) {
    // If chart exists, update it; otherwise create it
    const data = [
      { name: 'En cours', y: counts.enCours, color: '#f7b731' },
      { name: 'En attente', y: counts.enAttente, color: '#eb3b5a' },
      { name: 'Terminé', y: counts.termine, color: '#20bf6b' }
    ];

    if (this.chart) {
      // update series data and force redraw
      try {
        (this.chart.series[0] as Highcharts.Series).setData(data, true);
        this.chart.redraw();
      } catch { /* ignore */ }
    } else {
      const container = document.getElementById('container');
      if (!container) {
        // container not available yet — bail out (caller should retry)
        return;
      }

      this.chart = Highcharts.chart(container as any, {
        chart: { type: 'pie' },
        title: { text: 'Répartition des tâches' },
        tooltip: { pointFormat: '{series.name}: <b>{point.y}</b>' },
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
          data
        }]
      });

      // ensure size/reflow after creation
      setTimeout(() => { try { this.chart?.reflow(); this.chart?.redraw(); } catch { } }, 0);
    }
  }

  // 👉 Ajouter une tâche et MAJ du chart sans recharger depuis le backend
  addTaskAndUpdateChart(newTask: Task) {
    this.taskService.addTask(newTask).subscribe({
      next: (createdTask) => {
        // Mettre à jour la liste locale
        this.tasks.push(createdTask);

        // Recalculer les stats
        const counts = this.countTasks(this.tasks);
        const total = counts.enCours + counts.enAttente + counts.termine;

        if (total === 0) {
          // still no data, ensure chart removed
          if (this.chart) {
            try { this.chart.destroy(); } catch { }
            this.chart = undefined;
          }
          this.hasData = false;
        } else {
          this.hasData = true;
          // wait for DOM if needed, then render/update chart
          setTimeout(() => this.renderChart(counts), 0);
        }
      },
      error: (err) => console.error('Erreur lors de l’ajout de la tâche', err)
    });
  }
}