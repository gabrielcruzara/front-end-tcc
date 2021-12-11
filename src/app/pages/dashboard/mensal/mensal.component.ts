import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from '../shared/dashboard.service';
import { IMeses } from '../shared/models/dashboard.model';

@Component({
  selector: 'app-mensal',
  templateUrl: './mensal.component.html',
  styleUrls: ['./mensal.component.scss']
})
export class MensalComponent implements OnInit {
  lucro: IMeses;

  chart: any;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.buscaDados();
  }

  buscaDados(): void {
    this.dashboardService.buscaGanhoMensal()
    .then((res) => {
      this.lucro = res.dados[0];

      this.chart = new Chart('canvas',{
        type: 'line',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [
            {
              label: 'Lucro',
              data: [this.lucro.janeiro, this.lucro.fevereiro, this.lucro.marco, this.lucro.abril, this.lucro.maio, this.lucro.junho, this.lucro.julho, this.lucro.agosto, this.lucro.setembro, this.lucro.outubro, this.lucro.novembro, this.lucro.dezembro],
              backgroundColor: 'rgb(128, 255, 128)',
              borderColor: 'rgb(0, 153, 0)',
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
