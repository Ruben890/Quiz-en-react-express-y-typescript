

// user.ts
export interface User {
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
    id: number;
    content: string;
    questionId?: number;
    Question?: Question;
    QuestionCorrectOption: QuestionCorrectOption[];
}

// points.ts
export interface Points {
    id: number;
    point: number;
    userId: number;
    User: User;
}

// question.ts
export interface Question {
    id: number;
    text: string;
    points: number;
    quizId: number;
    Option: Option[];
    Quiz: Quiz;
    QuestionCorrectOption: QuestionCorrectOption[];
}

// questionCorrectOption.ts
export interface QuestionCorrectOption {
    id: number;
    questionId: number;
    optionId: number;
    Option: Option;
    Question: Question;
}

// quiz.ts
export interface Quiz {
    id?: number
    name: string;
    userId: number;
    Question?: Question[];
}
