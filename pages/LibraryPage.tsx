
import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import SermonLibrary from '../components/admin/SermonLibrary';

const LibraryPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-[#0F0F0F] text-white">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-10">
                <SermonLibrary />
            </main>
        </div>
    );
};

export default LibraryPage;
