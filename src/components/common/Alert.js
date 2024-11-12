'use client';

const Alert = ({ type = 'error', message, className = '' }) => {
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-blue-100';
  const textColor = type === 'error' ? 'text-red-800' : 'text-blue-800';

  return (
    <div className={`p-4 ${bgColor} ${textColor} rounded-md ${className}`}>
      {message}
    </div>
  );
};

export { Alert };
export default Alert;