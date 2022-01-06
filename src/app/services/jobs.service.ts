import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { ApplyResponse } from '../models/apply-response';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://127.0.0.1:8000/api/jobs/');
  }

  getJobDetails(id: string): Observable<Job> {
    return this.http.get<Job>('http://127.0.0.1:8000/api/jobs/' + id);
  }

  apply(id: string, formData: any): Observable<ApplyResponse> {
    return this.http.post<ApplyResponse>(
      'http://127.0.0.1:8000/api/jobs/' + id + '/applications',
      formData
    );
  }
}
