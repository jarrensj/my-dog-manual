
import { DogCommand } from '@/types/dogCommand';
import jsPDF from 'jspdf';

export const generateGuideContent = (commands: DogCommand[], dogName: string, ownerName: string) => {
  const cleanDogName = dogName.trim() || 'Dog';
  const title = `${cleanDogName} Care Guide for Babysitters & Caretakers`;
  const subtitle = ownerName.trim() ? `Owner: ${ownerName.trim()}` : 'Dog Care Instructions';
  
  let content = `${title}\n${subtitle}\n${'='.repeat(60)}\n\n`;
  
  content += `This guide contains important information about ${cleanDogName} to help you provide the best care.\n`;
  content += `Please read through all commands and instructions before interacting with ${cleanDogName}.\n\n`;

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
  content += `• Use a calm, confident voice when giving commands\n`;
  content += `• Always supervise interactions with ${cleanDogName}\n`;
  content += `• If the dog seems anxious or confused, give them space\n`;
  content += `• Contact the owner immediately if any problems arise\n`;
  content += `• Keep emergency contact information handy\n\n`;
  
  content += `Generated with love by Dog Care Guide Builder\n`;
  content += `Date: ${new Date().toLocaleDateString()}\n`;

  return content;
};

export const exportTextGuide = (commands: DogCommand[], dogName: string, ownerName: string) => {
  const guideContent = generateGuideContent(commands, dogName, ownerName);
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

export const exportPDFGuide = (commands: DogCommand[], dogName: string, ownerName: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  let yPosition = margin;

  // Clean function to sanitize text for PDF
  const cleanText = (text: string) => {
    return text.replace(/[^\x20-\x7E]/g, '').trim();
  };

  // Get clean dog name or default
  const cleanDogName = dogName.trim() ? cleanText(dogName.trim()) : 'Dog';
  const cleanOwnerName = ownerName.trim() ? cleanText(ownerName.trim()) : '';

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000') => {
    const cleanedText = cleanText(text);
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(color);
    
    const lines = pdf.splitTextToSize(cleanedText, pageWidth - 2 * margin);
    
    // Check if we need a new page
    if (yPosition + (lines.length * fontSize * 0.5) > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * fontSize * 0.5 + 5;
  };

  // Header - using clean dog name
  addText(`${cleanDogName} Care Guide`, 24, true, '#2563eb');
  if (cleanOwnerName) {
    addText(`Owner: ${cleanOwnerName}`, 14, false, '#6b7280');
  }
  addText(`For Babysitters & Caretakers`, 16, true, '#7c3aed');
  addText(`Generated on ${new Date().toLocaleDateString()}`, 12, false, '#9ca3af');
  
  yPosition += 10;

  // Introduction
  addText(`This guide contains important information about ${cleanDogName} to help you provide the best care. Please read through all commands and instructions before interacting with ${cleanDogName}.`, 12);
  
  yPosition += 10;

  // Commands list
  addText('COMMANDS & RESPONSES', 16, true, '#7c3aed');
  
  commands.forEach((cmd, index) => {
    addText(`${index + 1}. "${cmd.command.toUpperCase()}"`, 14, true);
    addText(`What this means: ${cmd.description}`, 11);
    if (cmd.whenToUse.trim()) {
      addText(`When to use this: ${cmd.whenToUse}`, 11, false, '#6b7280');
    }
    yPosition += 5;
  });

  // Care tips section
  yPosition += 10;
  addText('Important Care Tips:', 16, true, '#7c3aed');
  addText('• Use a calm, confident voice when giving commands', 11);
  addText(`• Always supervise interactions with ${cleanDogName}`, 11);
  addText('• If the dog seems anxious or confused, give them space', 11);
  addText('• Contact the owner immediately if any problems arise', 11);
  addText('• Keep emergency contact information handy', 11);

  // Footer
  yPosition += 15;
  addText('Generated with love by Dog Care Guide Builder', 10, false, '#9ca3af');

  // Save the PDF with clean filename
  const fileName = `${cleanDogName}-Care-Guide.pdf`;
  pdf.save(fileName);
};
