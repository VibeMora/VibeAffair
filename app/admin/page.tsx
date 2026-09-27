'use client';

import React, { useState, useEffect } from 'react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import AdminGallery from '@/components/admin/AdminGallery';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {});
  }, []);

  if (isAuthenticated) {
    return <AdminGallery onLogout={() => setIsAuthenticated(false)} />;
  }

  return <AdminLoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
}

