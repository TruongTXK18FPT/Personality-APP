export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  type: 'MBTI' | 'DISC';
}

export interface QuizResult {
  id: string;
  type: 'MBTI' | 'DISC';
  result: string;
  description: string;
  date: string;
  userId: string;
}

export interface MBTIType {
  code: string;
  name: string;
  description: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}