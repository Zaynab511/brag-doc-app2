import { Component, OnInit } from '@angular/core';
import { BragDocService } from '../../services/brag-doc.service';
import { BragDoc } from '../../models/brag-doc.model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas

@Component({
  selector: 'app-list-brag',
  templateUrl: './list-brag.component.html',
  styleUrls: ['./list-brag.component.css']
})
export class ListBragComponent implements OnInit {
  brags: BragDoc[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private bragDocService: BragDocService) { }

  ngOnInit(): void {
    this.loadBrags();
  }

  loadBrags(): void {
    this.bragDocService.getAllBrags().subscribe(
      (brags: BragDoc[]) => {
        this.brags = brags;
      },
      (error) => {
        this.errorMessage = 'Error fetching achievements';
        console.error(error);
      }
    );
  }

  deleteBrag(id: number | undefined): void {
    if (id !== undefined) {
      this.bragDocService.deleteBrag(id).subscribe(
        (response) => {
          this.successMessage = response.message || 'Achievement deleted successfully!';
          this.loadBrags(); // Refresh the list after deletion
        },
        (error) => {
          this.errorMessage = 'Error deleting achievement';
          console.error(error);
        }
      );
    } else {
      console.error('ID is undefined');
    }
  }

  async exportAchievements() {
    console.log('Exporting achievements...');
    const doc = new jsPDF();
  
    // Set up the header
    doc.setFontSize(22);
    doc.text('Achievements List', 14, 20);
    doc.setFontSize(12);
    doc.text('Title', 14, 30);
    doc.text('Description', 70, 30);
    doc.text('Date', 140, 30);
    doc.text('Tags', 180, 30);
  
    let y = 40; // Initial Y position for content
  
    // Create a temporary container
    const tempContainer = document.createElement('div');
    document.body.appendChild(tempContainer); // Append to the body
  
    for (const achievement of this.brags) {
      // Add title
      doc.setFontSize(12);
      doc.text(achievement.title || '', 14, y);
  
      // Prepare HTML content for the description
      const descriptionElement = document.createElement('div');
      descriptionElement.innerHTML = achievement.description || '';
      tempContainer.appendChild(descriptionElement); // Append to the temp container
  
      try {
        const canvas = await html2canvas(tempContainer);
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 0, y, 190, 0); // Full width
        y += 60; // Adjust y position for next entry (height of canvas)
  
        // Add date
        const formattedDate = achievement.date
          ? new Date(achievement.date).toLocaleDateString()
          : '';
        doc.text(formattedDate, 140, y);
  
        // Format Tags
        const tags = achievement.tag || '';
        const tagsLines = doc.splitTextToSize(tags, 40);
        tagsLines.forEach((line: string, index: number) => {
          doc.text(line, 180, y + index * 5);
        });
  
        y += 20; // Adjust for the next entry
      } catch (error) {
        console.error('Error rendering description:', error);
      }
  
      // Clear the temporary container for the next achievement
      tempContainer.innerHTML = '';
    }
  
    document.body.removeChild(tempContainer); // Cleanup
  
    // Save the PDF
    doc.save('achievements.pdf');
  }
    
    
  // Clear messages after a timeout
  clearMessages(): void {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000);
  }
}
