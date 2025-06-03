import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

   constructor(private http: HttpClient) {}

   /**
    * Use marked library to read and display README file.
    * @returns 
    */
  getReadmeHtml(): Observable<string> {
    return this.http
    .get('/assets/README.md', { responseType: 'text' })
    .pipe(map(content => marked.parse(content))) as Observable<string>;
  }
}
