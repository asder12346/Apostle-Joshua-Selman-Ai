
import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import TranscriptReview from '../components/admin/TranscriptReview';

const ReviewPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-[#0F0F0F] text-white">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-10">
                <TranscriptReview />
            </main>
        </div>
    );
};

export default ReviewPage;
