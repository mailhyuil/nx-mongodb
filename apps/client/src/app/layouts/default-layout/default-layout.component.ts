import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export default class DefaultLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
