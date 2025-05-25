import React, { forwardRef } from 'react';

interface BackgroundProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Background = forwardRef<HTMLElement, BackgroundProps>(({ children, className = '', ...props }, ref) => {
  return (
    <main 
      id='background' 
      ref={ref}
      className={`flex-none min-h-screen -z-10 ${className}`} 
      {...props}
    >
      {children}
    </main>
  );
});

Background.displayName = 'Background';

export default Background;
