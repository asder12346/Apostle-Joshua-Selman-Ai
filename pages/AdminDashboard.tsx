
import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminDashboard: React.FC = () => {
    return (
        <div className="flex h-screen bg-[#0F0F0F] text-white">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-10">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-10 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Admin Dashboard</h1>
                            <p className="text-[var(--text-secondary)] font-medium">Manage sermon knowledge and RAG pipeline.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 bg-[var(--input-bg)] border border-[var(--divider)] rounded-xl text-sm font-bold uppercase tracking-widest">
                                System Status: <span className="text-green-500">Online</span>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="p-6 bg-[var(--input-bg)] border border-[var(--divider)] rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] block mb-2">Total Sermons</span>
                            <span className="text-4xl font-black">128</span>
                        </div>
                        <div className="p-6 bg-[var(--input-bg)] border border-[var(--divider)] rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] block mb-2">Pending Review</span>
                            <span className="text-4xl font-black text-yellow-500">5</span>
                        </div>
                        <div className="p-6 bg-[var(--input-bg)] border border-[var(--divider)] rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] block mb-2">Knowledge Chunks</span>
                            <span className="text-4xl font-black text-blue-500">4,290</span>
                        </div>
                    </div>

                    <section className="p-1 text-center border-2 border-dashed border-[var(--divider)] rounded-3xl py-20 bg-[var(--input-bg)]/30">
                        <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs">Select a category from the sidebar to manage content</p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
