
const SECRET_SALT = "GPTPARK_SECURE_V1_SALT";

export const encryptData = (text: string): string => {
  if (!text) return '';
  try {
    const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
    const byteHex = (n: number) => ("0" + Number(n).toString(16)).substr(-2);
    // Simple XOR cipher with salt
    const applySaltToChar = (code: number) => textToChars(SECRET_SALT).reduce((a, b) => a ^ b, code);

    return text.split('')
      .map((c) => c.charCodeAt(0))
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
  } catch (e) {
    console.error("Encryption failed", e);
    return '';
  }
};

export const decryptData = (encoded: string): string => {
  if (!encoded) return '';
  try {
    const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = (code: number) => textToChars(SECRET_SALT).reduce((a, b) => a ^ b, code);
    
    return (encoded.match(/.{1,2}/g) || [])
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
  } catch (e) {
    console.error("Decryption failed", e);
    return '';
  }
};
