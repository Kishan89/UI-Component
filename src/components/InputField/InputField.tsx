import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  clearable?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password';
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  onClear,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  clearable = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const LoadingSpinner = () => (
    <motion.svg
      className="h-4 w-4 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </motion.svg>
  );

  // Base input classes
  const baseClasses = `
    w-full font-sans transition-all duration-300 rounded-lg shadow-sm
    text-gray-900 placeholder-gray-400
    disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
    flex-grow
  `;

  // Size variations
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  // Variants
 const variantClasses = {
  outlined: `bg-gray-800 border-2 border-gray-700
             hover:bg-gray-700
             focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400`,
  filled: `bg-gray-700 border-2 border-transparent
           hover:bg-gray-600
           focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent`,
  ghost: `bg-transparent border-2 border-teal-300
          hover:bg-gray-700/20
          focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300`,
};


  const invalidClasses = invalid
    ? 'border-red-500 focus:ring-red-300 focus:border-red-500'
    : '';

  const showPasswordToggle = type === 'password';
  const showClearButton = clearable && value.length > 0 && !disabled && !loading;

  const wrapperClasses = `relative flex items-center ${variantClasses[variant]} ${sizeClasses[size]} ${invalidClasses}`;
  const inputOnlyClasses = `${baseClasses} ${!showPasswordToggle && !showClearButton && !loading ? sizeClasses[size] : ''}`;

  return (
    <div className="flex flex-col gap-1 w-full">
     {label && (
  <label
    htmlFor={`input-${label}`}
    className={`text-sm font-medium ${invalid ? 'text-red-500' : 'text-white'}`}
  >
    {label}
  </label>
)}

      <div className={wrapperClasses}>
        <input
          id={`input-${label}`}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          aria-describedby={invalid ? `error-${label}` : `helper-${label}`}
          className={`${inputOnlyClasses} pr-10`}
        />

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {!loading && showPasswordToggle && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-teal-500 disabled:text-gray-400 disabled:cursor-not-allowed p-1 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <span>👁️</span> : <span>🙈</span>}
            </motion.button>
          )}

          {!loading && !showPasswordToggle && showClearButton && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClear}
              disabled={disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-teal-500 disabled:text-gray-400 disabled:cursor-not-allowed p-1 transition-colors"
              aria-label="Clear input"
            >
              ✖️
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {helperText && !invalid && (
        <p id={`helper-${label}`} className="text-xs text-white">{helperText}</p>
      )}
      {errorMessage && invalid && (
        <p id={`error-${label}`} className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
