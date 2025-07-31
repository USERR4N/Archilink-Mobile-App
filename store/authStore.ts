import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  fullName: string;
  userType: 'client' | 'architect';
  isVerified?: boolean;
  profileImage?: string;
  phone?: string;
  mobileNumber?: string;
  location?: string;
  // Architect specific fields
  licenseNumber?: string;
  licenseImage?: string;
  specialty?: string;
  specialization?: string;
  experience?: number;
  yearsOfExperience?: string;
  portfolioImages?: string[];
  portfolioLink?: string;
  accountType?: 'freelance' | 'firm';
  // Client specific fields
  companyName?: string;
  projectTypes?: string[];
  // Location fields
  city?: string;
  otherLocation?: string;
  workPreference?: ('remote' | 'onsite' | 'both')[];
}

export interface SignupForm {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  mobileNumber?: string;
  userType?: 'client' | 'architect';
  // Professional details
  licenseNumber?: string;
  licenseImage?: string;
  specialization?: string;
  yearsOfExperience?: string;
  accountType?: 'freelance' | 'firm';
  // Location details
  city?: string;
  otherLocation?: string;
  workPreference?: ('remote' | 'onsite' | 'both')[];
  // Portfolio details
  portfolioImages?: string[];
  portfolioLink?: string;
  // Client details
  companyName?: string;
  projectTypes?: string[];
  // Agreement fields
  termsAgreed?: boolean;
  infoAccurate?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signupForm: SignupForm;
  signupStep: number;
  currentSignupStep: number;
  followedUsers: Set<string>;
  darkMode: boolean;
  textSize: 'Small' | 'Medium' | 'Large';
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  updateSignupForm: (data: Partial<SignupForm>) => void;
  setSignupStep: (step: number) => void;
  resetSignupForm: () => void;
  submitSignup: () => Promise<boolean>;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  setDarkMode: (enabled: boolean) => void;
  setTextSize: (size: 'Small' | 'Medium' | 'Large') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      signupForm: {
        userType: 'client',
      },
      signupStep: 1,
      currentSignupStep: 1,
      followedUsers: new Set<string>(),
      darkMode: false,
      textSize: 'Medium',

      login: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          signupForm: { userType: 'client' },
          signupStep: 1,
          currentSignupStep: 1,
          followedUsers: new Set<string>(),
          darkMode: false,
          textSize: 'Medium'
        });
      },

      updateSignupForm: (data: Partial<SignupForm>) => {
        set((state) => ({
          signupForm: { ...state.signupForm, ...data }
        }));
      },

      setSignupStep: (step: number) => {
        set({ signupStep: step, currentSignupStep: step });
      },

      resetSignupForm: () => {
        set({ 
          signupForm: { userType: 'client' },
          signupStep: 1,
          currentSignupStep: 1
        });
      },

      submitSignup: async (): Promise<boolean> => {
        try {
          const { signupForm } = get();
          
          // Create user object from signup form
          const newUser: User = {
            id: Date.now().toString(), // Simple ID generation
            email: signupForm.email || '',
            fullName: signupForm.fullName || '',
            userType: signupForm.userType || 'client',
            mobileNumber: signupForm.mobileNumber,
            phone: signupForm.mobileNumber,
            isVerified: false,
            // Architect specific fields
            licenseNumber: signupForm.licenseNumber,
            licenseImage: signupForm.licenseImage,
            specialization: signupForm.specialization,
            specialty: signupForm.specialization,
            yearsOfExperience: signupForm.yearsOfExperience,
            experience: signupForm.yearsOfExperience ? parseInt(signupForm.yearsOfExperience) : undefined,
            portfolioImages: signupForm.portfolioImages,
            portfolioLink: signupForm.portfolioLink,
            accountType: signupForm.accountType,
            // Location fields
            city: signupForm.city,
            location: signupForm.city || signupForm.otherLocation,
            workPreference: signupForm.workPreference,
          };

          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Login the user
          get().login(newUser);
          
          // Reset signup form
          get().resetSignupForm();
          
          return true;
        } catch (error) {
          console.error('Signup error:', error);
          return false;
        }
      },

      followUser: (userId: string) => {
        set((state) => ({
          followedUsers: new Set([...state.followedUsers, userId])
        }));
      },

      unfollowUser: (userId: string) => {
        set((state) => {
          const newFollowedUsers = new Set(state.followedUsers);
          newFollowedUsers.delete(userId);
          return { followedUsers: newFollowedUsers };
        });
      },

      isFollowing: (userId: string) => {
        return get().followedUsers.has(userId);
      },

      setDarkMode: (enabled: boolean) => {
        set({ darkMode: enabled });
      },

      setTextSize: (size: 'Small' | 'Medium' | 'Large') => {
        set({ textSize: size });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        followedUsers: Array.from(state.followedUsers), // Convert Set to Array for persistence
        darkMode: state.darkMode,
        textSize: state.textSize,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.followedUsers)) {
          // Convert Array back to Set after rehydration
          state.followedUsers = new Set(state.followedUsers);
        }
      },
    }
  )
);