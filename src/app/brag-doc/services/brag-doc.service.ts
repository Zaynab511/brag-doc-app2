import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BragDoc } from '../models/brag-doc.model';

@Injectable({
  providedIn: 'root'
})
export class BragDocService {
  private static readonly HARD_CODED_BRAGS: BragDoc[] = [
    { id: 1, title: 'Won Coding Competition', description: 'First place in a national coding contest.', date: '2023-01-15', impact: 'Increased team recognition.' },
    { id: 2, title: 'Published Research Paper', description: 'Co-authored a research paper in AI domain.', date: '2023-03-22', impact: 'Contributed to the AI community.' }
  ];

  constructor() {}

  getAllBrags(): Observable<BragDoc[]> {
    return of(BragDocService.HARD_CODED_BRAGS).pipe(delay(1000));
  }

  getBragById(id: number): Observable<BragDoc | undefined> {
    const brag = BragDocService.HARD_CODED_BRAGS.find(b => b.id === id);
    return of(brag).pipe(delay(1000));
  }

  createBrag(newBrag: BragDoc): Observable<any> {
    BragDocService.HARD_CODED_BRAGS.push(newBrag);
    return of({ success: true }).pipe(delay(1000));
  }

  updateBrag(updatedBrag: BragDoc): Observable<any> {
    const index = BragDocService.HARD_CODED_BRAGS.findIndex(brag => brag.id === updatedBrag.id);
    if (index !== -1) {
      BragDocService.HARD_CODED_BRAGS[index] = updatedBrag;
      return of({ success: true }).pipe(delay(1000));
    }
    return of({ error: 'Brag not found' }).pipe(delay(1000));
  }
  deleteBrag(id: number): Observable<any> {
    const index = BragDocService.HARD_CODED_BRAGS.findIndex(brag => brag.id === id);
    if (index !== -1) {
      BragDocService.HARD_CODED_BRAGS.splice(index, 1);
      return of({ success: true }).pipe(delay(1000));
    }
    return of({ error: 'Brag not found' }).pipe(delay(1000));
  }
  
}
