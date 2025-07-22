import { QuizQuestion, MBTIType, Message, QuizResult } from '@/types';

export const mbtiQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'You prefer to focus on the outer world of people and things, or on your own inner world?',
    options: ['Outer world (Extraversion)', 'Inner world (Introversion)'],
    type: 'MBTI'
  },
  {
    id: '2',
    question: 'You prefer to focus on basic information you take in, or do you prefer to interpret and add meaning?',
    options: ['Basic information (Sensing)', 'Interpret and add meaning (Intuition)'],
    type: 'MBTI'
  },
  {
    id: '3',
    question: 'When making decisions, do you prefer to first look at logic and consistency or first look at people and special circumstances?',
    options: ['Logic and consistency (Thinking)', 'People and circumstances (Feeling)'],
    type: 'MBTI'
  },
  {
    id: '4',
    question: 'In dealing with the outside world, do you prefer to get things decided or do you prefer to stay open to new information and options?',
    options: ['Get things decided (Judging)', 'Stay open to options (Perceiving)'],
    type: 'MBTI'
  },
  {
    id: '5',
    question: 'Are you more energized by being around people or by being alone?',
    options: ['Being around people', 'Being alone'],
    type: 'MBTI'
  }
];

export const discQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'In a team setting, you are most likely to:',
    options: ['Take charge and lead (Dominance)', 'Motivate and inspire others (Influence)', 'Support and collaborate (Steadiness)', 'Analyze and perfect (Conscientiousness)'],
    type: 'DISC'
  },
  {
    id: '2',
    question: 'When facing a challenge, you typically:',
    options: ['Attack it head-on (Dominance)', 'Rally others to help (Influence)', 'Plan carefully and proceed steadily (Steadiness)', 'Research and analyze thoroughly (Conscientiousness)'],
    type: 'DISC'
  },
  {
    id: '3',
    question: 'Your ideal work environment is:',
    options: ['Fast-paced and competitive (Dominance)', 'Social and collaborative (Influence)', 'Stable and supportive (Steadiness)', 'Organized and detail-oriented (Conscientiousness)'],
    type: 'DISC'
  },
  {
    id: '4',
    question: 'When communicating, you prefer to:',
    options: ['Be direct and brief (Dominance)', 'Be enthusiastic and expressive (Influence)', 'Be patient and understanding (Steadiness)', 'Be precise and thorough (Conscientiousness)'],
    type: 'DISC'
  },
  {
    id: '5',
    question: 'You are motivated most by:',
    options: ['Results and achievement (Dominance)', 'Recognition and interaction (Influence)', 'Security and harmony (Steadiness)', 'Quality and accuracy (Conscientiousness)'],
    type: 'DISC'
  }
];

export const mbtiTypes: MBTIType[] = [
  {
    code: 'INTJ',
    name: 'The Architect',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    traits: ['Strategic', 'Independent', 'Decisive'],
    strengths: ['Quick to understand difficult theoretical concepts', 'High standards for performance'],
    weaknesses: ['Can be overly critical', 'May overlook details']
  },
  {
    code: 'INTP',
    name: 'The Thinker',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    traits: ['Logical', 'Theoretical', 'Abstract'],
    strengths: ['Great at analyzing theories', 'Flexible and adaptable'],
    weaknesses: ['Can procrastinate', 'May neglect details']
  },
  {
    code: 'ENTJ',
    name: 'The Commander',
    description: 'Bold, imaginative and strong-willed leaders.',
    traits: ['Natural leader', 'Strategic', 'Efficient'],
    strengths: ['Excellent at organizing', 'Natural leaders'],
    weaknesses: ['Can be impatient', 'May ignore others\' feelings']
  },
  {
    code: 'ENTP',
    name: 'The Debater',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    traits: ['Innovative', 'Enthusiastic', 'Strategic'],
    strengths: ['Quick to understand complex concepts', 'Good at generating ideas'],
    weaknesses: ['May lose interest in projects', 'Can procrastinate']
  },
  {
    code: 'INFJ',
    name: 'The Advocate',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    traits: ['Idealistic', 'Organized', 'Insightful'],
    strengths: ['Strong intuition', 'Dedicated to their values'],
    weaknesses: ['Can be perfectionistic', 'May burn out easily']
  },
  {
    code: 'INFP',
    name: 'The Mediator',
    description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    traits: ['Idealistic', 'Loyal', 'Adaptable'],
    strengths: ['Strong personal values', 'Creative and imaginative'],
    weaknesses: ['Can be overly idealistic', 'May take things personally']
  },
  {
    code: 'ENFJ',
    name: 'The Protagonist',
    description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    traits: ['Charismatic', 'Reliable', 'Altruistic'],
    strengths: ['Natural leaders', 'Excellent communication skills'],
    weaknesses: ['Can be overly idealistic', 'May neglect their own needs']
  },
  {
    code: 'ENFP',
    name: 'The Campaigner',
    description: 'Enthusiastic, creative and sociable free spirits.',
    traits: ['Enthusiastic', 'Creative', 'Spontaneous'],
    strengths: ['Excellent people skills', 'Strong communication abilities'],
    weaknesses: ['Can procrastinate', 'May have trouble focusing']
  },
  {
    code: 'ISTJ',
    name: 'The Logistician',
    description: 'Practical and fact-minded, reliable and responsible.',
    traits: ['Practical', 'Fact-minded', 'Reliable'],
    strengths: ['Strong sense of duty', 'Practical and realistic'],
    weaknesses: ['Can be inflexible', 'May resist change']
  },
  {
    code: 'ISFJ',
    name: 'The Protector',
    description: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    traits: ['Warm-hearted', 'Conscientious', 'Harmonious'],
    strengths: ['Strong practical skills', 'Excellent memory for details'],
    weaknesses: ['Can be reluctant to change', 'May undervalue themselves']
  },
  {
    code: 'ESTJ',
    name: 'The Executive',
    description: 'Excellent administrators, unsurpassed at managing things or people.',
    traits: ['Organized', 'Traditional', 'Honest'],
    strengths: ['Excellent at organizing', 'Strong work ethic'],
    weaknesses: ['Can be inflexible', 'May be judgmental']
  },
  {
    code: 'ESFJ',
    name: 'The Consul',
    description: 'Extraordinarily caring, social and popular people, always eager to help.',
    traits: ['Caring', 'Social', 'Popular'],
    strengths: ['Strong practical skills', 'Excellent at connecting with others'],
    weaknesses: ['Can be vulnerable to criticism', 'May neglect their own needs']
  },
  {
    code: 'ISTP',
    name: 'The Virtuoso',
    description: 'Bold and practical experimenters, masters of all kinds of tools.',
    traits: ['Bold', 'Practical', 'Experimental'],
    strengths: ['Great in a crisis', 'Practical and realistic'],
    weaknesses: ['Can be insensitive', 'May be private and reserved']
  },
  {
    code: 'ISFP',
    name: 'The Adventurer',
    description: 'Flexible and charming artists, always ready to explore new possibilities.',
    traits: ['Flexible', 'Charming', 'Artistic'],
    strengths: ['Strong aesthetic sense', 'Flexible and laid-back'],
    weaknesses: ['Can be unpredictable', 'May have trouble with long-term planning']
  },
  {
    code: 'ESTP',
    name: 'The Entrepreneur',
    description: 'Smart, energetic and very perceptive people, truly enjoy living on the edge.',
    traits: ['Smart', 'Energetic', 'Perceptive'],
    strengths: ['Bold and practical', 'Original and creative'],
    weaknesses: ['Can be impatient', 'May take risks']
  },
  {
    code: 'ESFP',
    name: 'The Entertainer',
    description: 'Spontaneous, energetic and enthusiastic people - life is never boring around them.',
    traits: ['Spontaneous', 'Energetic', 'Enthusiastic'],
    strengths: ['Bold and original', 'Excellent people skills'],
    weaknesses: ['Can be easily stressed', 'May have trouble focusing']
  }
];

export const mockChatHistory: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m your AI personality advisor. How can I help you today?',
    isUser: false,
    timestamp: new Date(Date.now() - 60000)
  },
  {
    id: '2',
    text: 'Hi! I just took the MBTI test and got ENFP. What does this mean for my career?',
    isUser: true,
    timestamp: new Date(Date.now() - 45000)
  },
  {
    id: '3',
    text: 'Great question! As an ENFP (The Campaigner), you\'re naturally enthusiastic, creative, and people-oriented. This makes you well-suited for careers in creative fields, counseling, teaching, marketing, or entrepreneurship. You thrive in environments that allow for flexibility and human interaction.',
    isUser: false,
    timestamp: new Date(Date.now() - 30000)
  }
];

export const mockQuizResult: QuizResult = {
  id: '1',
  type: 'MBTI',
  result: 'ENFP',
  description: 'The Campaigner - Enthusiastic, creative and sociable free spirits.',
  date: '2024-12-20',
  userId: '1'
};