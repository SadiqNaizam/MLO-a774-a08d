import React from 'react';
import MainAppLayout from '../../components/layout/MainAppLayout';
import LogList from '../../components/LogsViewer/LogList';
import { LogEntry } from '../../components/LogsViewer/LogItem';

// Define dummy data directly in this page file
// This data is based on the dummyLogsData previously in LogList.tsx
const pageDummyLogsData: LogEntry[] = [
  {
    id: 'page-log-001',
    level: 'error' as const,
    timestamp: new Date(Date.now() - 5000),
    message: 'Failed to connect to the primary database instance (db-master-01). Connection timed out after 5000ms. Check network connectivity and database credentials. Falling back to read-replica if available.',
    source: 'services/core/database.connector.ts:145',
    count: 1,
  },
  {
    id: 'page-log-002',
    level: 'warn' as const,
    timestamp: new Date(Date.now() - 10000),
    message: 'API rate limit approaching for endpoint /v1/users. Usage: 850/1000 requests. Current window resets in 15 minutes. Consider optimizing API calls or requesting a quota increase.',
    source: 'middlewares/rate-limiter.ts:88',
    count: 3,
  },
  {
    id: 'page-log-003',
    level: 'info' as const,
    timestamp: new Date(Date.now() - 15000),
    message: 'User \'jane.doe@example.com\' (ID: usr_789xyz) successfully updated their profile information. Fields changed: [email, displayName].',
    source: 'controllers/user.profile.controller.ts:78',
  },
  {
    id: 'page-log-004',
    level: 'debug' as const,
    timestamp: new Date(Date.now() - 20000),
    message: 'Processing incoming webhook event \'invoice.payment_succeeded\' from Stripe. Payload: { "id": "evt_123abc", "object": "event", "data": { "object": { "id": "in_456def", "customer": "cus_789ghi", "amount_paid": 2500, "currency": "usd" } } }',
    source: 'workers/stripe.webhook.handler.ts:33',
  },
  {
    id: 'page-log-005',
    level: 'log' as const,
    timestamp: new Date(Date.now() - 25000),
    message: 'Application server listening on http://localhost:8080. Environment: development. Node.js version: v18.17.0.',
    source: 'app.bootstrap.ts:115',
  },
  {
    id: 'page-log-006',
    level: 'warn' as const,
    timestamp: new Date(Date.now() - 30000),
    message: 'Sanitizing HTML input for comment (comment_id: cmt_abc123) stripped potentially unsafe tags: [<script>, <iframe>]. Original content length: 512, sanitized: 480. Review sanitization rules if legitimate content is affected. More details: https://g.co/ng/security#xss',
    source: 'utils/content.sanitizer.ts:200',
    count: 12,
  },
  {
    id: 'page-log-007',
    level: 'error' as const,
    timestamp: new Date(Date.now() - 35000),
    message: 'Unhandled Promise Rejection: TypeError: Cannot read properties of undefined (reading \'name\') in function \'processUserData\'. Ensure user object is correctly passed and validated.\nStack Trace:\n  at processUserData (services/user.processor.ts:50:15)\n  at async processBatch (services/batch.processor.ts:25:9)',
    source: 'services/user.processor.ts:50',
  },
  {
    id: 'page-log-008',
    level: 'info' as const,
    timestamp: new Date(Date.now() - 40000),
    message: 'New user \'john.smith@example.io\' registered via OAuth (Provider: Google). Account provisioning initiated.',
  },
  {
    id: 'page-log-009',
    level: 'debug' as const,
    timestamp: new Date(Date.now() - 45000),
    message: 'Cache miss for key: \'user_permissions:usr_123abc\'. Fetching from primary data source. Consider warming this cache if misses are frequent.',
    source: 'lib/cache.service.ts:108',
    count: 1,
  },
  {
    id: 'page-log-010',
    level: 'log' as const,
    timestamp: new Date(Date.now() - 50000),
    message: 'Scheduled cron job \'nightly_data_aggregation\' (job_id: cron_agg_001) started execution. Expected runtime: ~5 mins.',
    source: 'schedulers/cron.manager.ts:112',
  },
   {
    id: 'page-log-011',
    level: 'warn' as const,
    timestamp: new Date(Date.now() - 52000),
    message: 'DeprecationWarning: Usage of `legacy_transform_function()` is deprecated since v2.5.0 and will be removed in v3.0.0. Please migrate to `new_transform_utility()` for improved performance and security. See migration guide: /docs/migration/legacy-transform.',
    source: 'helpers/legacy.utils.js:25',
  },
  {
    id: 'page-log-012',
    level: 'error' as const,
    timestamp: new Date(Date.now() - 54000),
    message: 'SyntaxError: Unexpected token \' < \' at position 0 in JSON response from /api/external/partner-data. Expected valid JSON. Response body started with: "<!DOCTYPE html><html>...". This might indicate an HTML error page instead of JSON.',
    source: 'clients/external.api.client.ts:92',
    count: 2
  },
  {
    id: 'page-log-013',
    level: 'info' as const,
    timestamp: new Date(Date.now() - 56000),
    message: 'Automated email campaign \'welcome_series_drip1\' sent to 250 new subscribers. Open rate monitoring active.',
    source: 'services/marketing.automation.ts:310'
  },
  {
    id: 'page-log-014',
    level: 'debug' as const,
    timestamp: new Date(Date.now() - 58000),
    message: 'Executing database query: SELECT "users".* FROM "users" WHERE "users"."email" = $1 LIMIT $2 -- Parameters: ["test@example.com", 1]. Execution time: 12.5ms. Rows returned: 1.',
    source: 'database/query.executor.ts:77'
  },
  {
    id: 'page-log-015',
    level: 'log' as const,
    timestamp: new Date(Date.now() - 60000),
    message: 'Configuration successfully loaded from \'./config/production.yaml\'. Active profile: production. Feature flags enabled: [newDashboard, advancedReporting].',
    source: 'core/config.loader.ts:22'
  }
];

const IndexPage: React.FC = () => {
  // In a real application, logs might be fetched from an API and managed with state (e.g., useState, useQuery)
  // For this example, we use the static dummy data defined in this file.
  // Filtering and searching would typically involve updating the 'logs' prop passed to LogList,
  // potentially by lifting state from HeaderBar or using a global state solution.

  return (
    <MainAppLayout>
      {/* 
        The MainAppLayout provides the overall structure including the HeaderBar.
        LogList is placed within the main content area of MainAppLayout.
        Padding is added here to LogList's container for consistent spacing within the scrollable area.
      */}
      <LogList logs={pageDummyLogsData} className="p-4 md:p-6" />
    </MainAppLayout>
  );
};

export default IndexPage;
