import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable({ providedIn: 'root' })
export class NameListService {

  /**
   * Creates a new NameListService with the injected HttpClient.
   */
  constructor(private http: HttpClient) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   */
  get(): Observable<string[]> {
    return of([]);
    // return this.http.get<string[]>(`name-list/static`)
    //   .pipe(catchError(this.handleError));
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead

    return of(errMsg);
  }
}

