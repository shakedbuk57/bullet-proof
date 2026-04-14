import { ContentLayout } from '@/components/layouts';
import { UserSettings } from '@/features/users/components/user-settings';

const SettingsRoute = () => {
  return (
    <ContentLayout title="User Settings">
      <div className="subtitle mb-6 text-sm text-gray-400">
        Manage your user settings preferences
      </div>
      <UserSettings />
    </ContentLayout>
  );
};

export default SettingsRoute;
