import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Settings2, Trash2, Terminal } from 'lucide-react';

interface HeaderBarProps {
  className?: string;
  // In a real application, state and handlers for search, filter, etc.,
  // would likely be managed by a parent component or global state management.
}

const HeaderBar: React.FC<HeaderBarProps> = ({ className }) => {
  // Dummy state and handlers for demonstration purposes.
  // These would typically be lifted up or managed via context/global state.
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [logLevelFilter, setLogLevelFilter] = React.useState<string>('all');

  const logLevels = [
    { value: 'all', label: 'All Levels' as const },
    { value: 'error', label: 'Error' as const },
    { value: 'warn', label: 'Warning' as const },
    { value: 'info', label: 'Info' as const },
    { value: 'debug', label: 'Debug' as const },
    { value: 'log', label: 'Log' as const },
  ];

  const handleClearLogs = React.useCallback(() => {
    console.log('Clear logs action triggered. Filtered by:', logLevelFilter, 'Search:', searchTerm);
    // Placeholder: In a real app, this would dispatch an action to clear logs.
  }, [logLevelFilter, searchTerm]);

  const handleOpenSettings = React.useCallback(() => {
    console.log('Open settings action triggered.');
    // Placeholder: In a real app, this might open a settings dialog/modal.
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6",
        className
      )}
    >
      {/* Left Section: Title and App Icon */} 
      <div className="flex items-center gap-2">
        <Terminal className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold text-foreground whitespace-nowrap">Logs Viewer</h1>
      </div>
      
      {/* Right Section: Controls */} 
      <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
        <Input
          type="search"
          placeholder="Search messages..."
          className="h-9 w-full max-w-[160px] sm:max-w-xs hidden md:flex" // Responsive visibility and width
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search log messages"
        />

        <Select value={logLevelFilter} onValueChange={setLogLevelFilter}>
          <SelectTrigger className="h-9 w-[140px] sm:w-[160px]">
            <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            {logLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" aria-label="Clear Logs" onClick={handleClearLogs} className="h-9 w-9 flex-shrink-0">
          <Trash2 className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" aria-label="Settings" onClick={handleOpenSettings} className="h-9 w-9 flex-shrink-0">
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default HeaderBar;
