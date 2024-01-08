import { Session } from 'express-session';

export interface TokenSession extends Session {
    token?: string;
}
