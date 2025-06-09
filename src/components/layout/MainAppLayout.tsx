import React from 'react';
import { cn } from '@/lib/utils';
import HeaderBar from './HeaderBar';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col h-screen bg-background text-foreground", className)}>
      <HeaderBar />
      <main 
        className="flex-1 flex flex-col overflow-y-auto"
        // This configuration ensures that the main content area:
        // 1. Takes up the remaining vertical space after the header (flex-1).
        // 2. Stacks its children vertically (flex-col), suitable for a list or series of sections.
        // 3. Allows vertical scrolling if its content exceeds the available height (overflow-y-auto).
        // The direct children are expected to manage their own internal layout and padding if necessary,
        // or specific padding can be added here if universally applicable.
      >
        {/* Padding can be added to a wrapper div around children if consistent padding is needed for all content */}
        {/* e.g., <div className="p-4 md:p-6 flex-1">{children}</div> */} 
        {/* For this project, LogList itself (or a wrapper like LogViewerLayout) will handle its padding/structure within this scrollable area */}
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
