import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="w-100 d-flex justify-content-center">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>`,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {}
