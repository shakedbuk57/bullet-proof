import * as React from 'react';

import { cn } from '@/utils/cn';

import { Button } from '../button';

export type ChatInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onSubmit?: (message: string) => void;
  onIconClick?: (iconName: string) => void;
  disabled?: boolean;
  inputClassName?: string;
  icons?: Record<string, React.ReactNode>;
};

// Default icons as inline SVGs
const defaultIcons = {
  notes: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="M2 5h20M2 10h20M2 15h20M2 20h20" />
    </svg>
  ),
  attach: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  image: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  ),
  mic: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="M12 1a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="23" />
      <line x1="8" x2="16" y1="23" y2="23" />
    </svg>
  ),
  grid: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  ),
};

const iconNames = ['notes', 'attach', 'image', 'mic', 'grid'] as const;

const ChatInput = React.forwardRef<HTMLInputElement, ChatInputProps>(
  (
    {
      className,
      inputClassName,
      placeholder = 'Ask Anything?',
      onSubmit,
      onIconClick,
      disabled = false,
      value: controlledValue,
      onChange: controlledOnChange,
      icons = defaultIcons,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    // Support both controlled and uncontrolled mode
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const isEmpty = typeof value === 'string' ? value.trim().length === 0 : true;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      controlledOnChange?.(e);
    };

    const handleSubmit = () => {
      if (!isEmpty && !disabled && onSubmit) {
        const messageValue = typeof value === 'string' ? value : '';
        onSubmit(messageValue);
        if (controlledValue === undefined) {
          setInternalValue('');
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !isEmpty && !disabled) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const handleIconClick = (iconName: string) => {
      if (!disabled && onIconClick) {
        onIconClick(iconName);
      }
    };

    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-2xl bg-slate-800 px-4 py-3 transition-all',
          isFocused && 'ring-1 ring-slate-600',
          disabled && 'opacity-50',
          className,
        )}
      >
        {/* Icon Toolbar */}
        <div className="flex items-center gap-2">
          {iconNames.map((iconName) => (
            <button
              key={iconName}
              type="button"
              onClick={() => handleIconClick(iconName)}
              disabled={disabled}
              className={cn(
                'flex items-center justify-center rounded-lg p-1.5 text-slate-400 transition-colors',
                !disabled && 'hover:bg-slate-700 hover:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-600',
                disabled && 'cursor-not-allowed',
              )}
              aria-label={`${iconName} action`}
            >
              {icons[iconName] || defaultIcons[iconName as keyof typeof defaultIcons]}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={cn(
            'flex-1 bg-transparent text-sm font-medium text-white placeholder:text-slate-500 outline-none disabled:cursor-not-allowed',
            inputClassName,
          )}
          {...props}
        />

        {/* Submit Button */}
        <Button
          type="button"
          size="icon"
          onClick={handleSubmit}
          disabled={isEmpty || disabled}
          className={cn(
            'flex-shrink-0 rounded-full bg-red-500 text-white hover:bg-red-600 disabled:opacity-50',
          )}
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
            <path d="m12 5 5 5M12 5l-5 5" />
          </svg>
        </Button>
      </div>
    );
  },
);

ChatInput.displayName = 'ChatInput';

export { ChatInput };
