import { useToolPermissions } from '../api/get-tool-permissions';
import { SettingsToolItem } from './settings-tool-item';

export const UserSettings = () => {
  const {
    data: permissionsData,
    isLoading,
    error,
  } = useToolPermissions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading permissions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
        <div className="text-red-400">
          Failed to load permissions. Please try again.
        </div>
      </div>
    );
  }

  if (!permissionsData || permissionsData.data.length === 0) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <div className="text-gray-400">No tools available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Permissions Summary */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <div className="text-sm font-medium text-gray-300">
          Enabled Tools: {permissionsData.enabledCount} of{' '}
          {permissionsData.totalCount}
        </div>
      </div>

      {/* Tools List */}
      <div className="rounded-lg border border-gray-700 bg-gray-900/50 overflow-hidden">
        <div className="border-b border-gray-700 bg-gray-800/50 px-4 py-3">
          <h2 className="text-sm font-semibold text-white">
            Linear Tool Permissions
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Control which Linear operations AI agents can perform on your
            behalf
          </p>
        </div>

        <div>
          {permissionsData.data.map((tool) => (
            <SettingsToolItem key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Info Message */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4">
        <p className="text-xs text-gray-400">
          Changes are saved automatically. Choose "Ask" to be prompted before
          each action.
        </p>
      </div>
    </div>
  );
};
