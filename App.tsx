
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import AdminDashboard from './pages/AdminDashboard';
import AddSermonPage from './pages/AddSermonPage';
import LibraryPage from './pages/LibraryPage';
import ReviewPage from './pages/ReviewPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddSermonPage />} />
        <Route path="/admin/library" element={<LibraryPage />} />
        <Route path="/admin/review/:id" element={<ReviewPage />} />
        {/* Placeholders for sub-routes */}
        <Route path="/admin/review" element={<LibraryPage />} />
        <Route path="/admin/library" element={<AdminDashboard />} />
        <Route path="/admin/review" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
