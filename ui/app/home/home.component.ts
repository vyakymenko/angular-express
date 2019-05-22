import { Component, OnInit } from '@angular/core';
import { NameListService } from './name-list.service';

@Component({
  selector: 'ae-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {

  newName = '';
  errorMessage: string;
  names: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   */
  constructor(public nls: NameListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nls.get()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
