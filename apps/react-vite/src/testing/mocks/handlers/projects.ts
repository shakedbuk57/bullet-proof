import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';
import { Project } from '@/features/organization/types';

const mockProjects = (organizationId: string): Project[] => [
  {
    id: '1',
    name: 'Authentication System',
    description: 'Implement OAuth2 authentication',
    organizationId,
    completed: true,
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  },
  {
    id: '2',
    name: 'Database Migration',
    description: 'Migrate from PostgreSQL to MongoDB',
    organizationId,
    completed: false,
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    name: 'API Documentation',
    description: 'Write comprehensive API docs with Swagger',
    organizationId,
    completed: true,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: '4',
    name: 'Performance Optimization',
    description: 'Optimize database queries and caching',
    organizationId,
    completed: false,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
  {
    id: '5',
    name: 'Security Audit',
    description: 'Conduct full security audit and penetration testing',
    organizationId,
    completed: false,
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
];

export const projectsHandlers = [
  http.get(`${env.API_URL}/organizations/:organizationId/projects`, ({ params }) => {
    return HttpResponse.json({ data: mockProjects(params.organizationId) });
  }),
];
