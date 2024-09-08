import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BragDoc } from '../models/brag-doc.model';

@Injectable({
  providedIn: 'root'
})
export class BragDocService {
  private static readonly HARD_CODED_BRAGS: BragDoc[] = [];

  constructor() {}

  getAllBrags(): Observable<BragDoc[]> {
    // Return hard-coded brags
    return of(BragDocService.HARD_CODED_BRAGS).pipe(delay(1000));
  }

  createBrag(newBrag: BragDoc): Observable<any> {
    // Add new brag to the list
    BragDocService.HARD_CODED_BRAGS.push(newBrag);
    return of({ success: true }).pipe(delay(1000));
  }

  updateBrag(updatedBrag: BragDoc): Observable<any> {
    // Update existing brag
    const index = BragDocService.HARD_CODED_BRAGS.findIndex(brag => brag.id === updatedBrag.id);
    if (index !== -1) {
      BragDocService.HARD_CODED_BRAGS[index] = updatedBrag;
      return of({ success: true }).pipe(delay(1000));
    }
    return of({ error: 'Brag not found' }).pipe(delay(1000));
  }

  deleteBrag(id: number): Observable<any> {
    // Remove brag from the list
    const index = BragDocService.HARD_CODED_BRAGS.findIndex(brag => brag.id === id);
    if (index !== -1) {
      BragDocService.HARD_CODED_BRAGS.splice(index, 1);
      return of({ success: true }).pipe(delay(1000));
    }
    return of({ error: 'Brag not found' }).pipe(delay(1000));
  }
}
