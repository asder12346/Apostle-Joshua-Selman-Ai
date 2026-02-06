
import React, { useEffect, useState } from 'react';
import { Search, Filter, MoreVertical, ExternalLink, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Sermon {
    id: string;
    title: string;
    speaker: string;
    sourceType: 'youtube' | 'audio';
    url: string;
    date: string;
    tags: string[];
    status: 'transcribing' | 'ready' | 'error' | 'indexed';
    createdAt: string;
}

const SermonLibrary: React.FC = () => {
    const [sermons, setSermons] = useState<Sermon[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSermons();
    }, []);

    const fetchSermons = async () => {
        try {
            const response = await fetch('/api/admin/sermons');
            const data = await response.json();
            setSermons(data);
        } catch (err) {
            console.error("Error fetching sermons:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status: Sermon['status']) => {
        switch (status) {
            case 'transcribing':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-widest border border-yellow-500/20">
                        <Clock className="w-3 h-3" />
                        Transcribing
                    </span>
                );
            case 'ready':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Ready for Review
                    </span>
                );
            case 'indexed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Indexed in RAG
                    </span>
                );
            case 'error':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20">
                        <AlertCircle className="w-3 h-3" />
                        Processing Error
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Sermon Library</h1>
                    <p className="text-[var(--text-secondary)] font-medium">Manage and review all ingested sermons.</p>
                </div>
                <NavLink
                    to="/admin/add"
                    className="px-6 py-3 bg-[var(--user-bubble)] hover:bg-[var(--user-bubble)]/90 text-[var(--text-primary)] rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md"
                >
                    Add New Sermon
                </NavLink>
            </header>

            <div className="bg-[var(--input-bg)] border border-[var(--divider)] rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[var(--divider)] flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                        <input
                            type="text"
                            placeholder="Search library..."
                            className="w-full bg-[var(--chat-bg)] border border-[var(--divider)] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[var(--input-border)] transition-colors font-bold text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-3 bg-[var(--chat-bg)] border border-[var(--divider)] rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                        <Filter className="w-3.5 h-3.5" />
                        Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[var(--chat-bg)]/50 text-left border-b border-[var(--divider)]">
                                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[2px]">Sermon Title</th>
                                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[2px]">Source</th>
                                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[2px]">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[2px]">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[2px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--divider)]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="w-8 h-8 border-2 border-[var(--text-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Loading Library...</p>
                                    </td>
                                </tr>
                            ) : sermons.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">No sermons found. Add one to get started.</p>
                                    </td>
                                </tr>
                            ) : (
                                sermons.map((sermon) => (
                                    <tr key={sermon.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="font-black text-sm mb-1">{sermon.title}</div>
                                            <div className="flex gap-1">
                                                {sermon.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[9px] font-bold text-[var(--text-secondary)] uppercase bg-[var(--chat-bg)] px-1.5 py-0.5 rounded-md border border-[var(--divider)]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <a
                                                href={sermon.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                {sermon.sourceType === 'youtube' ? 'YouTube' : 'Audio File'}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-medium text-[var(--text-secondary)]">
                                            {new Date(sermon.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-5">
                                            {getStatusBadge(sermon.status)}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <NavLink
                                                to={`/admin/review/${sermon.id}`}
                                                className="p-2 text-[var(--text-secondary)] hover:text-white transition-colors inline-block"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SermonLibrary;
