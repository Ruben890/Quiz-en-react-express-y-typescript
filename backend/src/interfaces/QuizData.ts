export interface QuizData {
    questions: {
      text: string;
      points: number;
      options: {
        id?: number; 
        content: string;
      }[];
      correctOptionIndex: number;
    }[];
  }
  