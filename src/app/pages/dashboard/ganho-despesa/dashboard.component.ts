import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ChartDataSets, ChartOptions} from 'chart.js';
import { Color, Label} from 'ng2-charts';
import { DashboardService } from '../shared/dashboard.service';
import { IMeses } from '../shared/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  custo: IMeses;
  ganho: IMeses;

  chart: any;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.buscaDados();
  }

  buscaDados(): void {
      this.dashboardService.ganhosDespesas()
      .then((res) => {
        this.custo = res.dados[0];
        this.ganho = res.dados[1];

        this.chart = new Chart('canvas',{
          type: 'bar',
          data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
              {
                label: 'Custo',
                data: [ this.custo.janeiro, this.custo.fevereiro, this.custo.marco, this.custo.abril, this.custo.maio, this.custo.junho, this.custo.julho, this.custo.agosto, this.custo.setembro, this.custo.outubro, this.custo.novembro, this.custo.dezembro],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor:  'rgb(255, 99, 132)',
                borderWidth: 1
              },
              {
                label: 'Ganho',
                data: [this.ganho.janeiro, this.ganho.fevereiro, this.ganho.marco, this.ganho.abril, this.ganho.maio, this.ganho.junho, this.ganho.julho, this.ganho.agosto, this.ganho.setembro, this.ganho.outubro, this.ganho.novembro, this.ganho.dezembro],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }],              
            }
          }
        })
    });
  }
}
