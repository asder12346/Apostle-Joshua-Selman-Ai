
export enum MessageRole {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM_NOTICE = 'system_notice',
}

export interface SourceReference {
    title: string;
    uri: string;
    speaker?: string;
}

export interface Message {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    sources?: SourceReference[];
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}
