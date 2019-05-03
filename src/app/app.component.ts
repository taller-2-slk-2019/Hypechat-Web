import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hypechat-Web';
  type: string;

  private types = ['pacman', 'ball-climbing-dot', 'ball-clip-rotate-multiple',
                   'ball-fussion', 'square-jelly-box', 'square-loader', 'ball-scale-multiple']

  ngOnInit() {
    this.type = this.types[Math.floor(Math.random() * this.types.length)];
  }
}
