import { ArrowUp, ImagePlus, Mic, Paperclip, Pencil, Smile } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

import { Button } from '../button';

export type ChatInputProps = {
  onSendMessage: (message: string) => void;
  onFileClick?: () => void;
  onImageClick?: () => void;
  onDrawingClick?: () => void;
  onVoiceClick?: () => void;
  onEmojiClick?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
};

const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  (
    {
      onSendMessage,
      onFileClick,
      onImageClick,
      onDrawingClick,
      onVoiceClick,
      onEmojiClick,
      placeholder = 'Ask Anything?',
      isLoading = false,
      disabled = false,
      maxLength,
      className,
    },
    ref,
  ) => {
    const [message, setMessage] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSendMessage = () => {
      const trimmedMessage = message.trim();
      if (trimmedMessage && !isLoading && !disabled) {
        onSendMessage(trimmedMessage);
        setMessage('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setMessage(value);

      // Auto-grow textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current.scrollHeight,
          200,
        )}px`;
      }
    };

    const isMessageEmpty = !message.trim();

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-input bg-card p-4 shadow-md',
          disabled && 'opacity-50',
          className,
        )}
      >
        {/* Input area */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          maxLength={maxLength}
          className={cn(
            'flex min-h-[60px] max-h-[200px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />

        {/* Action buttons and send button row */}
        <div className="flex items-end justify-between gap-3">
          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onFileClick}
              disabled={disabled || isLoading}
              aria-label="Attach file"
              title="Attach file"
            >
              <Paperclip className="size-5 text-muted-foreground" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onImageClick}
              disabled={disabled || isLoading}
              aria-label="Attach image"
              title="Attach image"
            >
              <ImagePlus className="size-5 text-muted-foreground" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onDrawingClick}
              disabled={disabled || isLoading}
              aria-label="Draw"
              title="Draw"
            >
              <Pencil className="size-5 text-muted-foreground" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onVoiceClick}
              disabled={disabled || isLoading}
              aria-label="Send voice message"
              title="Send voice message"
            >
              <Mic className="size-5 text-muted-foreground" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onEmojiClick}
              disabled={disabled || isLoading}
              aria-label="Add emoji"
              title="Add emoji"
            >
              <Smile className="size-5 text-muted-foreground" />
            </Button>
          </div>

          {/* Send button */}
          <Button
            type="button"
            size="icon"
            onClick={handleSendMessage}
            disabled={isMessageEmpty || disabled || isLoading}
            isLoading={isLoading}
            aria-label="Send message"
            title="Send message"
            className="rounded-full"
          >
            {!isLoading && <ArrowUp className="size-5" />}
          </Button>
        </div>
      </div>
    );
  },
);
ChatInput.displayName = 'ChatInput';

export { ChatInput };
