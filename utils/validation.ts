export const validateEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string | undefined): boolean => {
  if (!password) return false;
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateMobileNumber = (number: string | undefined): boolean => {
  if (!number) return false;
  // Simple validation for mobile number (at least 10 digits)
  const numberRegex = /^\d{10,}$/;
  return numberRegex.test(number);
};

export const validatePasswordMatch = (password: string | undefined, confirmPassword: string | undefined): boolean => {
  if (!password || !confirmPassword) return false;
  return password === confirmPassword;
};

export const validateRequired = (value: string | undefined): boolean => {
  if (!value) return false;
  return value.trim().length > 0;
};