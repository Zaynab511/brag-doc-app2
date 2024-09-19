import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BragDoc } from '../models/brag-doc.model';

@Injectable({
  providedIn: 'root'
})
export class BragDocService {
  private apiUrl = 'https://localhost:7010/api/Achievements'; // Update with your actual API URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Update according to your auth strategy
    })
  };

  constructor(private http: HttpClient) {}

  // Get all brag documents
  getAllBrags(): Observable<BragDoc[]> {
    return this.http.get<BragDoc[]>(`${this.apiUrl}/GetAll`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Get brag by ID
  getBragById(id: number): Observable<BragDoc> {
    return this.http.get<BragDoc>(`${this.apiUrl}/GetById/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Modify your createBrag function to log the response
  createBrag(newBrag: BragDoc): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/Create`, newBrag, this.httpOptions).pipe(
    map((response) => {
      // Log the full response to inspect it
      console.log('Response from API:', response);
      return response; // Ensure the response is returned properly
    }),
    catchError((error) => {
      console.error('An error occurred:', error); // Log the error for debugging
      return throwError(() => new Error('Something went wrong; please try again later.'));
    })
  );
}


  // Update an existing brag document
  updateBrag(id: number, updatedBrag: BragDoc): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Update/${id}`, updatedBrag, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a brag document
  deleteBrag(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors from HTTP requests
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
