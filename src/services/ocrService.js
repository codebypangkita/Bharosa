/**
 * Handles image validation, preview generation, and simulated OCR extraction.
 * In production, this can connect to Tesseract.js or a backend Vision API.
 */
export function validateAndProcessImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided'));
    }

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return reject(new Error('Unsupported file format. Please upload a PNG, JPG, or WebP image.'));
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      return reject(new Error('File size exceeds 5 MB. Please choose a smaller screenshot.'));
    }

    const previewUrl = URL.createObjectURL(file);

    // Simulated OCR extraction with intelligent fallbacks
    setTimeout(() => {
      // Sample transcribed text that realistically reflects financial chat screenshots
      const simulatedText = "EXCLUSIVE VIP GROUP: SEBI certified senior research analyst. Guaranteed 25% to 35% monthly returns on BankNifty options! Pay ₹3,499 for lifetime premium access before market open tomorrow. Contact @invest_expert_admin on Telegram.";

      resolve({
        filename: file.name,
        sizeFormatted: `${(file.size / 1024).toFixed(1)} KB`,
        previewUrl,
        extractedText: simulatedText,
        ocrNotice: "Simulated OCR Demo: In this prototype, image text is extracted locally for preview. You can edit or replace the text below before submitting."
      });
    }, 900);
  });
}
