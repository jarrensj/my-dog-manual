import { DogCommand } from '@/types/dogCommand';
import jsPDF from 'jspdf';

export const generateGuideContent = (commands: DogCommand[], dogName: string, ownerName: string, careTips: string[], emergencyPhone?: string, emergencyEmail?: string) => {
  const cleanDogName = dogName.trim() || 'Dog';
  const title = `${cleanDogName} Care Guide for Babysitters & Caretakers`;
  const subtitle = ownerName.trim() ? `Owner: ${ownerName.trim()}` : 'Dog Care Instructions';
  
  let content = `${title}\n${subtitle}\n${'='.repeat(60)}\n\n`;
  
  content += `This guide contains important information about ${cleanDogName} to help you provide the best care.\n`;
  content += `Please read through all commands and instructions before interacting with ${cleanDogName}.\n\n`;

  // Emergency contact information
  if (emergencyPhone || emergencyEmail) {
    content += `EMERGENCY CONTACT INFORMATION\n${'-'.repeat(35)}\n`;
    if (emergencyPhone) {
      content += `Emergency Phone: ${emergencyPhone}\n`;
    }
    if (emergencyEmail) {
      content += `Emergency Email: ${emergencyEmail}\n`;
    }
    content += '\n';
  }

  // Commands list
  content += `COMMANDS & RESPONSES\n${'-'.repeat(25)}\n\n`;
  commands.forEach((cmd, index) => {
    content += `${index + 1}. "${cmd.command.toUpperCase()}"\n`;
    content += `   What this means: ${cmd.description}\n`;
    if (cmd.whenToUse.trim()) {
      content += `   When to use this: ${cmd.whenToUse}\n`;
    }
    content += '\n';
  });

  content += `\nIMPORTANT CARE TIPS:\n`;
  careTips.forEach(tip => {
    content += `• ${tip}\n`;
  });
  content += '\n';
  
  content += `Generated with love by Dog Care Guide Builder\n`;
  content += `Date: ${new Date().toLocaleDateString()}\n`;

  return content;
};

export const exportTextGuide = (commands: DogCommand[], dogName: string, ownerName: string, careTips: string[], emergencyPhone?: string, emergencyEmail?: string) => {
  const guideContent = generateGuideContent(commands, dogName, ownerName, careTips, emergencyPhone, emergencyEmail);
  const blob = new Blob([guideContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = dogName.trim() ? `${dogName.trim()}-Care-Guide.txt` : 'Dog-Care-Guide.txt';
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportPDFGuide = (commands: DogCommand[], dogName: string, ownerName: string, careTips: string[], emergencyPhone?: string, emergencyEmail?: string, dogPhoto?: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  let yPosition = margin;

  // Modern color palette
  const colors = {
    primary: [37, 99, 235],      // Blue RGB
    secondary: [124, 58, 237],   // Purple RGB
    accent: [5, 150, 105],       // Green RGB
    danger: [220, 38, 38],       // Red RGB
    text: [31, 41, 55],          // Dark gray RGB
    muted: [107, 114, 128],      // Medium gray RGB
    light: [156, 163, 175],      // Light gray RGB
    background: [249, 250, 251], // Very light gray RGB
    white: [255, 255, 255]       // White RGB
  };

  // Clean function to sanitize text for PDF
  const cleanText = (text: string) => {
    return text.replace(/[^\x20-\x7E]/g, '').trim();
  };

  // Get clean dog name or default
  const cleanDogName = dogName.trim() ? cleanText(dogName.trim()) : 'Dog';
  const cleanOwnerName = ownerName.trim() ? cleanText(ownerName.trim()) : '';

  // Helper function to add text with word wrapping and better spacing
  const addText = (text: string, fontSize: number, isBold: boolean = false, color: number[] = colors.text, spacing: number = 8) => {
    const cleanedText = cleanText(text);
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(color[0], color[1], color[2]);
    
    const lines = pdf.splitTextToSize(cleanedText, pageWidth - 2 * margin);
    
    // Check if we need a new page
    if (yPosition + (lines.length * fontSize * 0.5) + spacing > pageHeight - margin - 30) {
      pdf.addPage();
      yPosition = margin + 10;
      addPageNumber();
    }
    
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * fontSize * 0.5 + spacing;
  };

  // Helper function to add decorative line
  const addLine = (color: number[] = colors.muted, thickness: number = 0.5) => {
    pdf.setDrawColor(color[0], color[1], color[2]);
    pdf.setLineWidth(thickness);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  };

  // Helper function to add page numbers
  const addPageNumber = () => {
    const pageNum = pdf.getCurrentPageInfo().pageNumber;
    pdf.setTextColor(colors.muted[0], colors.muted[1], colors.muted[2]);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 15, { align: 'center' });
  };

  // Helper function to add section with background
  const addSectionHeader = (title: string, color: number[] = colors.primary) => {
    // Check if we need a new page
    if (yPosition + 40 > pageHeight - margin - 30) {
      pdf.addPage();
      yPosition = margin + 10;
      addPageNumber();
    }
    
    // Add some space before section
    yPosition += 8;
    
    // Add gradient-like effect with two rectangles
    pdf.setFillColor(color[0], color[1], color[2]);
    pdf.roundedRect(margin - 5, yPosition - 10, pageWidth - 2 * margin + 10, 26, 3, 3, 'F');
    
    // Add subtle shadow effect
    pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(margin - 5, yPosition - 10, pageWidth - 2 * margin + 10, 26, 3, 3, 'S');
    
    // Add white text on colored background
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(15);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin + 3, yPosition + 5);
    
    yPosition += 32;
  };

  // Header with modern gradient-like styling
  // Primary header bar
  pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  pdf.rect(0, 0, pageWidth, 55, 'F');
  
  // Add accent bar at the bottom of header
  pdf.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  pdf.rect(0, 55, pageWidth, 3, 'F');
  
  // Dog name in large, bold text
  pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${cleanDogName}`, pageWidth / 2, 22, { align: 'center' });
  
  // "Care Guide" subtitle
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Care Guide', pageWidth / 2, 36, { align: 'center' });
  
  // Subtitle bar
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'italic');
  pdf.text('For Babysitters & Caretakers', pageWidth / 2, 48, { align: 'center' });
  
  yPosition = 75;

  // Info card with owner and date
  // Background card
  pdf.setFillColor(colors.background[0], colors.background[1], colors.background[2]);
  pdf.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, cleanOwnerName ? 28 : 18, 2, 2, 'F');
  pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, cleanOwnerName ? 28 : 18, 2, 2, 'S');
  
  // Owner info with styling
  if (cleanOwnerName) {
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Owner:', margin + 5, yPosition + 5);
    pdf.setFont('helvetica', 'normal');
    pdf.text(cleanOwnerName, margin + 30, yPosition + 5);
    yPosition += 12;
  }

  // Date with icon-like styling
  pdf.setTextColor(colors.muted[0], colors.muted[1], colors.muted[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin + 5, cleanOwnerName ? yPosition + 5 : yPosition + 5);
  yPosition += 30;

  // Add dog photo if available
  if (dogPhoto) {
    // Check if we need a new page for the photo
    if (yPosition + 95 > pageHeight - margin - 30) {
      pdf.addPage();
      yPosition = margin + 10;
      addPageNumber();
    }
    
    try {
      // Add photo section header
      pdf.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Meet ' + cleanDogName, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;
      
      // Add the photo - center it with a border
      const imgWidth = 70;
      const imgHeight = 70;
      const imgX = (pageWidth - imgWidth) / 2;
      
      // Add white background for photo
      pdf.setFillColor(colors.white[0], colors.white[1], colors.white[2]);
      pdf.roundedRect(imgX - 3, yPosition - 3, imgWidth + 6, imgHeight + 6, 2, 2, 'F');
      
      // Add border around photo
      pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
      pdf.setLineWidth(1);
      pdf.roundedRect(imgX - 3, yPosition - 3, imgWidth + 6, imgHeight + 6, 2, 2, 'S');
      
      pdf.addImage(dogPhoto, 'JPEG', imgX, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 20;
      
    } catch (error) {
      console.error('Error adding photo to PDF:', error);
      // If photo fails to load, just add a note
      pdf.setTextColor(colors.muted[0], colors.muted[1], colors.muted[2]);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text('(Photo could not be included)', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;
    }
  }

  // Emergency contact section with enhanced styling
  if (emergencyPhone || emergencyEmail) {
    addSectionHeader('EMERGENCY CONTACT', colors.danger);
    
    // Add alert box
    pdf.setFillColor(255, 245, 245); // Very light red
    pdf.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, emergencyPhone && emergencyEmail ? 38 : 24, 2, 2, 'F');
    pdf.setDrawColor(colors.danger[0], colors.danger[1], colors.danger[2]);
    pdf.setLineWidth(1.5);
    pdf.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, emergencyPhone && emergencyEmail ? 38 : 24, 2, 2, 'S');
    
    if (emergencyPhone) {
      pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Phone:', margin + 8, yPosition + 5);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(13);
      pdf.text(cleanText(emergencyPhone), margin + 35, yPosition + 5);
      yPosition += 16;
    }
    
    if (emergencyEmail) {
      pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Email:', margin + 8, yPosition + 5);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.text(cleanText(emergencyEmail), margin + 35, yPosition + 5);
      yPosition += 16;
    }
    
    yPosition += 20;
  }

  // Introduction with better formatting
  addSectionHeader('INTRODUCTION', colors.accent);
  
  // Info box for introduction
  pdf.setFillColor(colors.background[0], colors.background[1], colors.background[2]);
  const introText = `This comprehensive guide contains essential information about ${cleanDogName} to help you provide excellent care. Please read through all commands and instructions carefully before interacting with ${cleanDogName}.`;
  const introLines = pdf.splitTextToSize(introText, pageWidth - 2 * margin - 16);
  const introBoxHeight = introLines.length * 6 + 12;
  pdf.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, introBoxHeight, 2, 2, 'F');
  pdf.setDrawColor(colors.accent[0], colors.accent[1], colors.accent[2]);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, introBoxHeight, 2, 2, 'S');
  
  pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(introLines, margin + 8, yPosition + 4);
  yPosition += introBoxHeight + 15;

  // Commands section with enhanced styling
  addSectionHeader('COMMANDS & RESPONSES', colors.secondary);
  
  commands.forEach((cmd, index) => {
    // Calculate box height dynamically
    const descLines = pdf.splitTextToSize(cmd.description, pageWidth - 2 * margin - 30);
    const contextLines = cmd.whenToUse.trim() ? pdf.splitTextToSize(cmd.whenToUse, pageWidth - 2 * margin - 30) : [];
    const boxHeight = 30 + descLines.length * 5.5 + (contextLines.length ? contextLines.length * 5 + 8 : 0);
    
    // Check if we need a new page for this command
    if (yPosition + boxHeight + 10 > pageHeight - margin - 30) {
      pdf.addPage();
      yPosition = margin + 10;
      addPageNumber();
    }
    
    // Command box with shadow and rounded corners
    // Shadow effect
    pdf.setFillColor(colors.light[0], colors.light[1], colors.light[2]);
    pdf.roundedRect(margin + 1, yPosition - 4, pageWidth - 2 * margin, boxHeight, 3, 3, 'F');
    
    // Main box with gradient-like background
    pdf.setFillColor(250, 251, 255); // Very light blue
    pdf.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, boxHeight, 3, 3, 'F');
    pdf.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    pdf.setLineWidth(1.2);
    pdf.roundedRect(margin, yPosition - 5, pageWidth - 2 * margin, boxHeight, 3, 3, 'S');
    
    // Command number badge
    pdf.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    pdf.circle(margin + 11, yPosition + 6, 9, 'F');
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    const numText = `${index + 1}`;
    const numWidth = pdf.getTextWidth(numText);
    pdf.text(numText, margin + 11 - numWidth / 2, yPosition + 9);
    
    // Command text with quotes
    pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.setFontSize(15);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`"${cmd.command.toUpperCase()}"`, margin + 26, yPosition + 8);
    
    // Description with label
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('What this means:', margin + 26, yPosition + 19);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(descLines, margin + 26, yPosition + 27);
    
    let currentY = yPosition + 27 + descLines.length * 5.5;
    
    // When to use (if provided)
    if (cmd.whenToUse.trim()) {
      pdf.setTextColor(colors.muted[0], colors.muted[1], colors.muted[2]);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('When to use:', margin + 26, currentY + 3);
      
      pdf.setFont('helvetica', 'italic');
      pdf.text(contextLines, margin + 26, currentY + 9);
    }
    
    yPosition += boxHeight + 12;
  });

  // Care tips section with better styling
  yPosition += 10;
  addSectionHeader('IMPORTANT CARE TIPS', colors.accent);
  
  careTips.forEach((tip, index) => {
    const tipLines = pdf.splitTextToSize(tip, pageWidth - 2 * margin - 22);
    const tipHeight = tipLines.length * 5.5 + 12;
    
    // Check if we need a new page
    if (yPosition + tipHeight > pageHeight - margin - 30) {
      pdf.addPage();
      yPosition = margin + 10;
      addPageNumber();
    }
    
    // Background for each tip
    pdf.setFillColor(248, 253, 248); // Very light green
    pdf.roundedRect(margin + 2, yPosition - 3, pageWidth - 2 * margin - 4, tipHeight, 2, 2, 'F');
    pdf.setDrawColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(margin + 2, yPosition - 3, pageWidth - 2 * margin - 4, tipHeight, 2, 2, 'S');
    
    // Bullet point with accent color circle
    pdf.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    pdf.circle(margin + 10, yPosition + 4, 2.5, 'F');
    
    pdf.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(tipLines, margin + 18, yPosition + 5);
    yPosition += tipHeight + 6;
  });

  // Add page numbers to all pages
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    addPageNumber();
    
    // Add footer line and branding
    pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
    pdf.setLineWidth(0.5);
    pdf.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);
    
    pdf.setTextColor(colors.muted[0], colors.muted[1], colors.muted[2]);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.text('Generated by mydogmanual.com', pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
  
  // Save the PDF with clean filename
  const fileName = `${cleanDogName}-Care-Guide.pdf`;
  pdf.save(fileName);
};
