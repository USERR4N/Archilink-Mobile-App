export type UserType = 'architect' | 'client';

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  userType: UserType;
  image?: string;
  location?: {
    city: string;
    other?: string;
  };
  workPreference?: ('remote' | 'onsite' | 'both')[];
}

export interface ArchitectUser extends User {
  userType: 'architect';
  accountType?: 'freelance' | 'firm';
  licenseNumber?: string;
  licenseImage?: string;
  specialization?: string;
  yearsOfExperience?: string;
  portfolio?: {
    images: string[];
    portfolioLink?: string;
  };
}

export interface ClientUser extends User {
  userType: 'client';
}

export type SignupFormData = {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
  accountType?: 'freelance' | 'firm';
  licenseNumber?: string;
  licenseImage?: string;
  specialization?: string;
  yearsOfExperience?: string;
  portfolioImages?: string[];
  portfolioLink?: string;
  city?: string;
  otherLocation?: string;
  workPreference?: ('remote' | 'onsite' | 'both')[];
  termsAgreed?: boolean;
  infoAccurate?: boolean;
};