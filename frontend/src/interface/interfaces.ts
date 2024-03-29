

// user.ts
export interface User {
    id?: number;
    username: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    level: number;
    Points: Points[];
}

// option.ts
export interface Option {
    id?: number;
    option: string;
    isCorrect: boolean;
    questionId?: number;
}

// points.ts
export interface Points {
    id?: number;
    point?: number;
    userId?: number;
    quizId?:number;
}

// question.ts
export interface Question {
    id?: number;
    question: string;
    points: number;
    quizId?: number;
    Quiz?: Quiz;
}

// quiz.ts
export interface Quiz {
    id?: number;
    title: string;
    MinPoints: number;
    description: string;
    time: string;
    userId?: number;

}


export interface QuestionWithNested extends Question {
    options: { create: Option[] };
}

export interface NestedQuiz extends Quiz {
    Questions: { create: QuestionWithNested[] };
}

