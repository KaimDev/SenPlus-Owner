export interface User {
    chatId: number;
    username?: string;
    role?: "USER" | "ADMIN";
}