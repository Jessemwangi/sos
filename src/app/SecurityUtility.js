import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 's3cr3t2';

export const encryptUserData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY);
  return ciphertext.toString();
};

export const decryptUserData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

