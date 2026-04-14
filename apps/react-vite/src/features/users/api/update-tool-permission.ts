import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { PermissionStatus } from './get-tool-permissions';

export const updateToolPermissionInputSchema = z.object({
  toolId: z.string().min(1, 'Required'),
  status: z.enum(['allowed', 'blocked', 'ask']),
});

export type UpdateToolPermissionInput = z.infer<
  typeof updateToolPermissionInputSchema
>;

export const updateToolPermission = ({
  data,
}: {
  data: UpdateToolPermissionInput;
}) => {
  return api.patch(`/users/tool-permissions/${data.toolId}`, {
    status: data.status,
  });
};

type UseUpdateToolPermissionOptions = {
  mutationConfig?: MutationConfig<typeof updateToolPermission>;
};

export const useUpdateToolPermission = ({
  mutationConfig,
}: UseUpdateToolPermissionOptions = {}) => {
  return useMutation({
    mutationFn: updateToolPermission,
    ...mutationConfig,
  });
};
