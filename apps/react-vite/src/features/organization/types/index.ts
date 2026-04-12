import { Entity } from '@/types/api';

export type Project = Entity<{
  name: string;
  description?: string;
  organizationId: string;
  completed?: boolean;
}>;
