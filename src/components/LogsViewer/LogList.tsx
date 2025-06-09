import React from 'react';
import { cn } from '@/lib/utils';
import LogItem, { LogEntry } from './LogItem';
import { ListX } from 'lucide-react';

interface LogListProps {
  logs?: LogEntry[];
  className?: string;
}

const dummyLogsData: LogEntry[] = [
  {
    id: 'log-001',
    level: 'error' as const,
    timestamp: new Date(Date.now() - 5000),
    message: 'Failed to connect to the primary database instance (db-master-01). Connection timed out after 5000ms. Check network connectivity and database credentials. Falling back to read-replica if available.',
    source: 'services/core/database.connector.ts:145',
    count: 1,
  },
  {
    id: 'log-002',
    level: 'warn' as const,
    timestamp: new Date(Date.now() - 10000),
    message: 'API rate limit approaching for endpoint /v1/users. Usage: 850/1000 requests. Current window resets in 15 minutes. Consider optimizing API calls or requesting a quota increase.',
    source: 'middlewares/rate-limiter.ts:88',
    count: 3,
  },
  {
    id: 'log-003',
    level: 'info' as const,
    timestamp: new Date(Date.now() - 15000),
    message: 'User \'jane.doe@example.com\' (ID: usr_789xyz) successfully updated their profile information. Fields changed: [email, displayName].',
    source: 'controllers/user.profile.controller.ts:78',
  },
  {
    id: 'log-004',
    level: 'debug' as const,
    timestamp: new Date(Date.now() - 20000),
    message: 'Processing incoming webhook event \'invoice.payment_succeeded\' from Stripe. Payload: { "id": "evt_123abc", "object": "event", "data": { "object": { "id": "in_456def", "customer": "cus_789ghi", "amount_paid": 2500, "currency": "usd" } } }',
    source: 'workers/stripe.webhook.handler.ts:33',
  },
  {
    id: 'log-005',
    level: 'log' as const,
    timestamp: new Date(Date.now() - 25000),
    message: 'Application server listening on http://localhost:8080. Environment: development. Node.js version: v18.17.0.',
    source: 'app.bootstrap.ts:115',
  },
  {
    id: 'log-006',
    level: 'warn' as const,
    timestamp: new Date(Date.now() - 30000),
    message: 'Sanitizing HTML input for comment (comment_id: cmt_abc123) stripped potentially unsafe tags: [<script>, <iframe>]. Original content length: 512, sanitized: 480. Review sanitization rules if legitimate content is affected. More details: https://g.co/ng/security#xss',
    source: 'utils/content.sanitizer.ts:200',
    count: 12,
  },
  {
    id: 'log-007',
    level: 'error' as const,
    timestamp: new Date(Date.now() - 35000),
    message: 'Unhandled Promise Rejection: TypeError: Cannot read properties of undefined (reading \'name\') in function \'processUserData\'. Ensure user object is correctly passed and validated.\nStack Trace:\n  at processUserData (services/user.processor.ts:50:15)\n  at async processBatch (services/batch.processor.ts:25:9)',
    source: 'services/user.processor.ts:50',
  },
  {
    id: 'log-008',
    level: 'info' as const,
    timestamp: new Date(Date.now() - 40000),
    message: 'New user \'john.smith@example.io\' registered via OAuth (Provider: Google). Account provisioning initiated.',
  },
  {
    id: 'log-009',
    level: 'debug' as const,
    timestamp: new Date(Date.now() - 45000),
    message: 'Cache miss for key: \'user_permissions:usr_123abc\'. Fetching from primary data source. Consider warming this cache if misses are frequent.',
    source: 'lib/cache.service.ts:108',
    count: 1,
  },
  {
    id: 'log-010',
    level: 'log' as const,
    timestamp: new Date(Date.now() - 50000),
    message: 'Scheduled cron job \'nightly_data_aggregation\' (job_id: cron_agg_001) started execution. Expected runtime: ~5 mins.',
    source: 'schedulers/cron.manager.ts:112',
  },
   {
    id: 'log-011',
    level: 'warn' as const,
    timestamp: new Date(Date.now() - 52000),
    message: 'DeprecationWarning: Usage of `legacy_transform_function()` is deprecated since v2.5.0 and will be removed in v3.0.0. Please migrate to `new_transform_utility()` for improved performance and security. See migration guide: /docs/migration/legacy-transform.',
    source: 'helpers/legacy.utils.js:25',
  },
  {
    id: 'log-012',
    level: 'error' as const,
    timestamp: new Date(Date.now() - 54000),
    message: 'SyntaxError: Unexpected token \' < \' at position 0 in JSON response from /api/external/partner-data. Expected valid JSON. Response body started with: "<!DOCTYPE html><html>...". This might indicate an HTML error page instead of JSON.',
    source: 'clients/external.api.client.ts:92',
    count: 2
  },
  {
    id: 'log-013',
    level: 'info' as const,
    timestamp: new Date(Date.now() - 56000),
    message: 'Automated email campaign \'welcome_series_drip1\' sent to 250 new subscribers. Open rate monitoring active.',
    source: 'services/marketing.automation.ts:310'
  },
  {
    id: 'log-014',
    level: 'debug' as const,
    timestamp: new Date(Date.now() - 58000),
    message: 'Executing database query: SELECT "users".* FROM "users" WHERE "users"."email" = $1 LIMIT $2 -- Parameters: ["test@example.com", 1]. Execution time: 12.5ms. Rows returned: 1.',
    source: 'database/query.executor.ts:77'
  },
  {
    id: 'log-015',
    level: 'log' as const,
    timestamp: new Date(Date.now() - 60000),
    message: 'Configuration successfully loaded from \'./config/production.yaml\'. Active profile: production. Feature flags enabled: [newDashboard, advancedReporting].',
    source: 'core/config.loader.ts:22'
  }
];

const LogList: React.FC<LogListProps> = ({ logs = dummyLogsData, className }) => {
  if (!logs || logs.length === 0) {
    return (
      <div 
        className={cn("flex flex-1 flex-col items-center justify-center text-muted-foreground p-10 text-center", className)}
        data-testid="log-list-empty"
      >
        <ListX className="w-12 h-12 mb-4 text-gray-400 dark:text-gray-500" />
        <p className="text-lg font-semibold">No Logs Found</p>
        <p className="text-sm">There are no log entries to display at the moment, or they do not match the current filters.</p>
      </div>
    );
  }

  return (
    <div className={cn(className)} data-testid="log-list-container">
      {logs.map((logEntry) => (
        <LogItem key={logEntry.id} log={logEntry} />
      ))}
    </div>
  );
};

export default LogList;
