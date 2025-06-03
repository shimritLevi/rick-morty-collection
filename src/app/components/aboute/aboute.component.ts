import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownService } from 'src/app/services/markdown.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * "About" app.
 * Uses the /assets/README.md file. 
 */
@Component({
  selector: 'app-aboute',
  imports: [CommonModule],
  templateUrl: './aboute.component.html',
  styleUrl: './aboute.component.scss',
})
export class AbouteComponent {
  
  /** Marker interface for the README file for use in HTML. */
   readmeHtml: SafeHtml = '';

  constructor(
    private markdownService: MarkdownService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.markdownService.getReadmeHtml().subscribe((html) => {
      this.readmeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    });
  }
}
