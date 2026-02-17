"use client";

import ProtectedRoute from '@/components/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import AppointmentsPage from '@/features/appointments/AppointmentsPage';

export default function AppointmentsPageWrapper() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <AppointmentsPage />
      </MainLayout>
    </ProtectedRoute>
  );
}
