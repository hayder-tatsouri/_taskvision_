import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TaskServicesService } from 'src/app/core/services/task-services.service';
import { Task } from 'src/app/modules/dashboard/models/task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-highchart',
  template: `<div id="container" class="w-full h-[400px]"></div>`,
  standalone: true
})
export class HighchartComponent implements OnInit {
  private chart!: Highcharts.Chart;
  private projectId!: number;
  private tasks: Task[] = [];

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
        this.renderChart(counts);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tâches', err);
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
    this.chart = Highcharts.chart('container', {
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
        data: [
          { name: 'En cours', y: counts.enCours, color: '#f7b731' },
          { name: 'En attente', y: counts.enAttente, color: '#eb3b5a' },
          { name: 'Terminé', y: counts.termine, color: '#20bf6b' }
        ]
      }]
    });
  }

  // 👉 Ajouter une tâche et MAJ du chart sans recharger depuis le backend
  addTaskAndUpdateChart(newTask: Task) {
    this.taskService.addTask(newTask).subscribe({
      next: (createdTask) => {
        // Mettre à jour la liste locale
        this.tasks.push(createdTask);

        // Recalculer les stats
        const counts = this.countTasks(this.tasks);

        // Mettre à jour le chart sans recréer
        (this.chart.series[0] as Highcharts.Series).setData([
          { name: 'En cours', y: counts.enCours, color: '#f7b731' },
          { name: 'En attente', y: counts.enAttente, color: '#eb3b5a' },
          { name: 'Terminé', y: counts.termine, color: '#20bf6b' }
        ]);
      },
      error: (err) => console.error('Erreur lors de l’ajout de la tâche', err)
    });
  }
}