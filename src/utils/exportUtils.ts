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

  // Color palette
  const colors = {
    primary: '#2563eb',      // Blue
    secondary: '#7c3aed',    // Purple
    accent: '#059669',       // Green
    danger: '#dc2626',       // Red
    text: '#1f2937',         // Dark gray
    muted: '#6b7280',        // Medium gray
    light: '#9ca3af'         // Light gray
  };

  // Clean function to sanitize text for PDF
  const cleanText = (text: string) => {
    return text.replace(/[^\x20-\x7E]/g, '').trim();
  };

  // Get clean dog name or default
  const cleanDogName = dogName.trim() ? cleanText(dogName.trim()) : 'Dog';
  const cleanOwnerName = ownerName.trim() ? cleanText(ownerName.trim()) : '';

  // Helper function to add text with word wrapping and better spacing
  const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = colors.text, spacing: number = 8) => {
    const cleanedText = cleanText(text);
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(color);
    
    const lines = pdf.splitTextToSize(cleanedText, pageWidth - 2 * margin);
    
    // Check if we need a new page
    if (yPosition + (lines.length * fontSize * 0.5) + spacing > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * fontSize * 0.5 + spacing;
  };

  // Helper function to add decorative line
  const addLine = (color: string = colors.muted, thickness: number = 0.5) => {
    pdf.setDrawColor(color);
    pdf.setLineWidth(thickness);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  };

  // Helper function to add section with background
  const addSectionHeader = (title: string, color: string = colors.primary) => {
    // Add some space before section
    yPosition += 5;
    
    // Add colored rectangle background
    pdf.setFillColor(color);
    pdf.rect(margin - 5, yPosition - 8, pageWidth - 2 * margin + 10, 20, 'F');
    
    // Add white text on colored background
    pdf.setTextColor('#ffffff');
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin, yPosition + 4);
    
    yPosition += 25;
  };

  // Header with better styling
  pdf.setFillColor(colors.primary);
  pdf.rect(0, 0, pageWidth, 50, 'F');
  
  pdf.setTextColor('#ffffff');
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${cleanDogName} Care Guide`, margin, 25);
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('For Babysitters & Caretakers', margin, 40);
  
  yPosition = 70;

  // Owner info with styling
  if (cleanOwnerName) {
    pdf.setTextColor(colors.text);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Owner: ${cleanOwnerName}`, margin, yPosition);
    yPosition += 20;
  }

  // Date with icon-like styling
  pdf.setTextColor(colors.muted);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 25;

  // Add dog photo if available
  if (dogPhoto) {
    // Check if we need a new page for the photo
    if (yPosition + 80 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    try {
      // Add photo section header
      pdf.setTextColor(colors.accent);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('🐕 Dog Photo', margin, yPosition);
      yPosition += 20;
      
      // Add the photo - center it and make it a reasonable size
      const imgWidth = 60;
      const imgHeight = 60;
      const imgX = (pageWidth - imgWidth) / 2;
      
      pdf.addImage(dogPhoto, 'JPEG', imgX, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 20;
      
    } catch (error) {
      console.error('Error adding photo to PDF:', error);
      // If photo fails to load, just add a note
      pdf.setTextColor(colors.muted);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text('(Photo could not be included)', margin, yPosition);
      yPosition += 15;
    }
  }

  // Emergency contact section with enhanced styling
  if (emergencyPhone || emergencyEmail) {
    addSectionHeader('🚨 EMERGENCY CONTACT', colors.danger);
    
    if (emergencyPhone) {
      pdf.setTextColor(colors.text);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('📞 Emergency Phone:', margin + 5, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(cleanText(emergencyPhone), margin + 70, yPosition);
      yPosition += 18;
    }
    
    if (emergencyEmail) {
      pdf.setTextColor(colors.text);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('✉️ Emergency Email:', margin + 5, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(cleanText(emergencyEmail), margin + 70, yPosition);
      yPosition += 18;
    }
    
    yPosition += 15;
  }

  // Introduction with better formatting
  addSectionHeader('📋 INTRODUCTION', colors.accent);
  
  pdf.setTextColor(colors.text);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  const introText = `This comprehensive guide contains essential information about ${cleanDogName} to help you provide excellent care. Please read through all commands and instructions carefully before interacting with ${cleanDogName}.`;
  const introLines = pdf.splitTextToSize(introText, pageWidth - 2 * margin - 10);
  pdf.text(introLines, margin + 5, yPosition);
  yPosition += introLines.length * 6 + 20;

  // Commands section with enhanced styling
  addSectionHeader('🐕 COMMANDS & RESPONSES', colors.secondary);
  
  commands.forEach((cmd, index) => {
    // Check if we need a new page for this command
    if (yPosition + 60 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    // Command box with border
    const boxHeight = cmd.whenToUse.trim() ? 45 : 35;
    pdf.setDrawColor(colors.muted);
    pdf.setLineWidth(1);
    pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, boxHeight);
    
    // Command number and title
    pdf.setFillColor(colors.secondary);
    pdf.circle(margin + 10, yPosition + 5, 8, 'F');
    pdf.setTextColor('#ffffff');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}`, margin + 7, yPosition + 8);
    
    // Command text
    pdf.setTextColor(colors.primary);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`"${cmd.command.toUpperCase()}"`, margin + 25, yPosition + 8);
    
    // Description
    pdf.setTextColor(colors.text);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const descLines = pdf.splitTextToSize(`What this means: ${cmd.description}`, pageWidth - 2 * margin - 30);
    pdf.text(descLines, margin + 25, yPosition + 18);
    
    let currentY = yPosition + 18 + descLines.length * 5;
    
    // When to use (if provided)
    if (cmd.whenToUse.trim()) {
      pdf.setTextColor(colors.muted);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      const contextLines = pdf.splitTextToSize(`When to use: ${cmd.whenToUse}`, pageWidth - 2 * margin - 30);
      pdf.text(contextLines, margin + 25, currentY + 5);
    }
    
    yPosition += boxHeight + 15;
  });

  // Care tips section with better styling
  yPosition += 10;
  addSectionHeader('💡 IMPORTANT CARE TIPS', colors.accent);
  
  careTips.forEach((tip) => {
    // Check if we need a new page
    if (yPosition + 20 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin + 20;
    }
    
    // Bullet point styling
    pdf.setFillColor(colors.accent);
    pdf.circle(margin + 8, yPosition + 3, 2, 'F');
    
    pdf.setTextColor(colors.text);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const tipLines = pdf.splitTextToSize(tip, pageWidth - 2 * margin - 20);
    pdf.text(tipLines, margin + 15, yPosition + 5);
    yPosition += tipLines.length * 6 + 8;
  });

  // Footer with better styling
  yPosition += 20;
  addLine(colors.primary, 1);
  
  pdf.setTextColor(colors.muted);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Generated with ❤️ by Dog Care Guide Builder', margin, yPosition);
  
  // Add paw print emoji-like decoration
  pdf.setTextColor(colors.light);
  pdf.setFontSize(8);
  pdf.text('🐾 🐾 🐾', pageWidth - margin - 30, yPosition);

  // Save the PDF with clean filename
  const fileName = `${cleanDogName}-Care-Guide.pdf`;
  pdf.save(fileName);
};
