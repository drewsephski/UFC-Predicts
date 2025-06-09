import React from 'react';
import { Container } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      <Container simple>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl lg:text-3xl">
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Content for the Settings page is coming soon. Please check back later!
            </p>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default SettingsPage;
