import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';

import { PermissionStatus, ToolPermission } from '../api/get-tool-permissions';
import { useUpdateToolPermission } from '../api/update-tool-permission';

type SettingsToolItemProps = {
  tool: ToolPermission;
};

const statusColors: Record<PermissionStatus, string> = {
  allowed: 'text-green-500 border-green-500',
  blocked: 'text-red-500 border-red-500',
  ask: 'text-gray-400 border-gray-400',
};

const statusLabels: Record<PermissionStatus, string> = {
  allowed: 'Allowed',
  blocked: 'Blocked',
  ask: 'Ask',
};

export const SettingsToolItem = ({ tool }: SettingsToolItemProps) => {
  const updatePermission = useUpdateToolPermission();

  const handleStatusChange = (newStatus: PermissionStatus) => {
    updatePermission.mutate({
      data: {
        toolId: tool.id,
        status: newStatus,
      },
    });
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-700 py-4 px-4 hover:bg-gray-800/50 transition-colors">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-white">{tool.name}</h3>
        <p className="text-xs text-gray-400 mt-1">{tool.description}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'ml-4 whitespace-nowrap',
              statusColors[tool.status],
            )}
          >
            {statusLabels[tool.status]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleStatusChange('allowed')}
            className={tool.status === 'allowed' ? 'bg-green-500/20' : ''}
          >
            Allowed
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusChange('blocked')}
            className={tool.status === 'blocked' ? 'bg-red-500/20' : ''}
          >
            Blocked
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusChange('ask')}
            className={tool.status === 'ask' ? 'bg-gray-500/20' : ''}
          >
            Ask
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
