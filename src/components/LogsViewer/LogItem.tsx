import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { AlertTriangle, Info, MessageSquare, XCircle, Bug } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

export interface LogEntry {
  id: string;
  level: LogLevel;
  timestamp: Date;
  message: string;
  source?: string;
  count?: number;
}

interface LogItemProps {
  log: LogEntry;
  className?: string;
}

const LogItem: React.FC<LogItemProps> = ({ log, className }) => {
  const { level, timestamp, message, source, count } = log;

  const getLevelSpecifics = (currentLevel: LogLevel) => {
    switch (currentLevel) {
      case 'error':
        return { Icon: XCircle, iconColor: 'text-destructive' };
      case 'warn':
        return { Icon: AlertTriangle, iconColor: 'text-yellow-500 dark:text-yellow-400' };
      case 'info':
        return { Icon: Info, iconColor: 'text-blue-500 dark:text-blue-400' };
      case 'debug':
        return { Icon: Bug, iconColor: 'text-purple-500 dark:text-purple-400' };
      case 'log':
      default:
        return { Icon: MessageSquare, iconColor: 'text-muted-foreground' };
    }
  };

  const { Icon, iconColor } = getLevelSpecifics(level);

  return (
    <div
      className={cn(
        'flex items-start space-x-3 px-4 py-3 border-b border-border text-sm',
        className
      )}
      data-testid={`log-item-${log.id}`}
    >
      {count && count > 1 ? (
        <Badge
          variant="secondary"
          className="h-6 min-w-[1.5rem] flex-shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-semibold mt-[1px]"
          aria-label={`Log repeated ${count} times`}
        >
          {count > 99 ? '99+' : count}
        </Badge>
      ) : (
        <div className="w-6 flex-shrink-0" /> 
      )}

      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-[1px]', iconColor)} aria-label={`${level} log icon`} />
      
      <div className="flex-grow min-w-0">
        <p className="text-foreground break-words whitespace-pre-wrap">
          {message}
        </p>
        <p className="text-xs text-muted-foreground pt-0.5">
          {format(timestamp, 'HH:mm:ss.SSS')}
        </p>
      </div>

      {source && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // In a real app, this might copy the source or navigate in an IDE
            console.log('Source clicked:', source);
          }}
          className="ml-4 flex-shrink-0 self-start pt-[1px] text-xs text-primary hover:underline whitespace-nowrap"
          title={source}
        >
          {source.length > 25 ? `...${source.slice(-22)}` : source}
        </a>
      )}
    </div>
  );
};

export default LogItem;
