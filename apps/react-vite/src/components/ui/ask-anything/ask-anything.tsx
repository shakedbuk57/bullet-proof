import {
  Paperclip,
  Link2,
  Image,
  Mic,
  Grid3X3,
  ArrowUp,
} from 'lucide-react';
import { useCallback, useState } from 'react';

import { Button } from '../button';

export type AskAnythingProps = {
  /** Optional callback when user submits the message */
  onSubmit?: (message: string) => void;
  /** Optional callback for attachment action */
  onAttachmentClick?: () => void;
  /** Optional callback for link action */
  onLinkClick?: () => void;
  /** Optional callback for image action */
  onImageClick?: () => void;
  /** Optional callback for voice action */
  onVoiceClick?: () => void;
  /** Optional callback for menu action */
  onMenuClick?: () => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
};

export const AskAnything = ({
  onSubmit,
  onAttachmentClick,
  onLinkClick,
  onImageClick,
  onVoiceClick,
  onMenuClick,
  placeholder = 'Ask Anything?',
  disabled = false,
}: AskAnythingProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(() => {
    if (message.trim() && onSubmit) {
      onSubmit(message);
      setMessage('');
    }
  }, [message, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full rounded-3xl bg-[#3b3f4a] px-6 py-4 shadow-lg">
      <div className="flex items-end gap-4">
        {/* Input field */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-gray-400 disabled:opacity-50"
          rows={1}
          style={{ minHeight: '24px', maxHeight: '120px' }}
        />

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAttachmentClick}
            disabled={disabled}
            className="text-gray-400 hover:text-gray-300 disabled:opacity-50 transition-colors"
            title="Attach file"
          >
            <Paperclip size={20} />
          </button>
          <button
            onClick={onLinkClick}
            disabled={disabled}
            className="text-gray-400 hover:text-gray-300 disabled:opacity-50 transition-colors"
            title="Add link"
          >
            <Link2 size={20} />
          </button>
          <button
            onClick={onImageClick}
            disabled={disabled}
            className="text-gray-400 hover:text-gray-300 disabled:opacity-50 transition-colors"
            title="Add image"
          >
            <Image size={20} />
          </button>
          <button
            onClick={onVoiceClick}
            disabled={disabled}
            className="text-gray-400 hover:text-gray-300 disabled:opacity-50 transition-colors"
            title="Record audio"
          >
            <Mic size={20} />
          </button>
          <button
            onClick={onMenuClick}
            disabled={disabled}
            className="text-gray-400 hover:text-gray-300 disabled:opacity-50 transition-colors"
            title="More options"
          >
            <Grid3X3 size={20} />
          </button>
        </div>

        {/* Send button */}
        <Button
          onClick={handleSubmit}
          disabled={disabled || !message.trim()}
          size="icon"
          className="rounded-full bg-[#ff5a4a] hover:bg-[#ff4a38] text-white"
        >
          <ArrowUp size={20} />
        </Button>
      </div>
    </div>
  );
};
AskAnything.displayName = 'AskAnything';
