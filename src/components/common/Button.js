'use client';

const Button = ({ 
  children, 
  type = 'button', 
  onClick, 
  disabled = false, 
  fullWidth = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };
export default Button;