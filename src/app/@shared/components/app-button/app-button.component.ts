import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent implements OnInit {
  @Input() type = 'button';
  @Input() block = false;
  @Input() color = 'primary';
  @Input() text = '';
  @Input() disabled = false;
  @Input() loading = false;

  constructor() {}

  ngOnInit(): void {
    this.disabled = this.disabled || this.loading;
  }
}
