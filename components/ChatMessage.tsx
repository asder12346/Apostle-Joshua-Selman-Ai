
import React from 'react';
import { Message, MessageRole } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;
  const isSystem = message.role === MessageRole.SYSTEM_NOTICE;

  if (isSystem) {
    return (
      <div className="flex justify-center my-8">
        <span className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--input-bg)] rounded-lg border border-[var(--divider)]">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm ${isUser
          ? 'bg-[var(--divider)] text-[var(--text-secondary)]'
          : 'bg-[var(--user-bubble)] text-[var(--text-primary)]'
          }`}>
          {isUser ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 2h2v5h5v2h-5v13h-2V9H6V7h5V2z" />
            </svg>
          )}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 py-3.5 rounded-2xl transition-all ${isUser
            ? 'bg-[var(--user-bubble)] text-[var(--text-primary)] rounded-tr-none shadow-md'
            : 'bg-[var(--assistant-bubble)] text-[var(--text-primary)] rounded-tl-none border border-[var(--divider)] shadow-sm'
            }`}>
            <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
              {message.content}
            </p>
          </div>

          {/* Sources - Accent Usage: Gold for sermon source border/icon only */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-2 w-full flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-[var(--input-bg)] border border-[var(--divider)] rounded-lg text-[11px] font-bold text-[var(--text-primary)] transition-all hover:translate-y-[-1px] active:scale-95 shadow-sm hover:shadow-md"
                  >
                    {source.type === 'youtube' ? (
                      <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                    )}
                    <span className="truncate max-w-[200px] uppercase tracking-tight">{source.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <span className="text-[10px] font-medium text-[var(--text-secondary)] px-1 opacity-70 uppercase tracking-tighter">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
