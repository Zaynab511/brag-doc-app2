import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BragDoc } from '../models/brag-doc.model';

@Injectable({
  providedIn: 'root'
})
export class BragDocService {
  // Adding hard-coded achievements for testing
  private static readonly HARD_CODED_BRAGS: BragDoc[] = [
    {
      id: 1,
      title: 'Achievement 1',
      description: 'Description for Achievement 1',
      date: '2024-01-01',
      impact: 'High'
    },
    {
      id: 2,
      title: 'Achievement 2',
      description: 'Description for Achievement 2',
      date: '2024-02-01',
      impact: 'Medium'
    },
    {
      id: 3,
      title: 'Achievement 3',
      description: 'Description for Achievement 3',
      date: '2024-03-01',
      impact: 'Low'
    }
  ];

  constructor() {}

  // Get all brag documents
  getAllBrags(): Observable<BragDoc[]> {
    return of(BragDocService.HARD_CODED_BRAGS).pipe(delay(1000));
  }

  // Get brag by ID
  getBragById(id: number): Observable<BragDoc | undefined> {
    const brag = BragDocService.HARD_CODED_BRAGS.find(b => b.id === id);
    return of(brag).pipe(delay(1000));
  }

  // Create a new brag document
  createBrag(newBrag: BragDoc): Observable<any> {
    // Auto-increment the ID
    const newId = BragDocService.HARD_CODED_BRAGS.length > 0 
      ? Math.max(...BragDocService.HARD_CODED_BRAGS.map(brag => brag.id!)) + 1 
      : 1;

    newBrag.id = newId;
    BragDocService.HARD_CODED_BRAGS.push(newBrag);

    return of({ success: true }).pipe(delay(1000));
  }

  // Update an existing brag document
  updateBrag(id: number, updatedBrag: BragDoc): Observable<any> {
    const index = BragDocService.HARD_CODED_BRAGS.findIndex(brag => brag.id === id);
    if (index !== -1) {
      // Ensure the updated brag has the same ID
      updatedBrag.id = id;
      BragDocService.HARD_CODED_BRAGS[index] = updatedBrag;
      return of({ success: true }).pipe(delay(1000));
    }
    return of({ error: 'Brag not found' }).pipe(delay(1000));
  }

  // Delete a brag document
  deleteBrag(id: number): Observable<any> {
    const index = BragDocService.HARD_CODED_BRAGS.findIndex(brag => brag.id === id);
    if (index !== -1) {
      BragDocService.HARD_CODED_BRAGS.splice(index, 1);
      return of({ success: true }).pipe(delay(1000));
    }
    return of({ error: 'Brag not found' }).pipe(delay(1000));
  }
  
}
