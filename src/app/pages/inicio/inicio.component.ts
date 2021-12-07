import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})

export class InicioComponent implements OnInit {

  constructor(
    private joyride: JoyrideService
  ) {}

  ngOnInit(): void {}

  tour(){
    this.joyride.startTour({ 
      steps: ['passoUm', 'passoDois', 'passoTres', 'passoQuatro'],
      themeColor: '#99ccff',
      stepDefaultPosition: 'top',
    });
  }

}
