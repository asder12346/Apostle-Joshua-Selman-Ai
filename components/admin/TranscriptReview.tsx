
import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Save,
    ChevronRight,
    FileText
} from 'lucide-react';

const TranscriptReview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [sermon, setSermon] = useState<any>(null);
    const [transcript, setTranscript] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching sermon and mock transcript
        const fetchSermon = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/admin/sermons');
                const sermons = await response.json();
                const found = sermons.find((s: any) => s.id === id);

                if (found) {
                    setSermon(found);
                    // Mock transcript if it doesn't exist
                    setTranscript(found.transcript || `This is a mock transcript for "${found.title}". \n\nApostle Joshua Selman begins by addressing the laws of the Kingdom of God. He emphasizes that spiritual laws are as immutable as physical laws. \n\n"The reason many believers struggle is not due to a lack of prayer, but a lack of understanding the specific laws that govern their situation," he explains. \n\nHe then proceeds to discuss the law of service and honor, quoting several scriptures including Romans 12:1.`);
                }
            } catch (err) {
                console.error("Error fetching sermon for review:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSermon();
    }, [id]);

    const handleAction = async (newStatus: string) => {
        // In a real app, this would update the backend
        alert(`Sermon status updated to: ${newStatus}\nKnowledge indexing initiated.`);
        navigate('/admin/library');
    };

    if (isLoading) return <div className="py-20 text-center">Loading...</div>;
    if (!sermon) return <div className="py-20 text-center text-red-500 font-bold uppercase tracking-widest">Sermon Not Found</div>;

    return (
        <div className="max-w-4xl space-y-8">
            <header className="flex justify-between items-start">
                <div className="space-y-4">
                    <NavLink to="/admin/library" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Library
                    </NavLink>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <FileText className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tight">{sermon.title}</h1>
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mt-1">
                                <span>{sermon.speaker}</span>
                                <ChevronRight className="w-3 h-3" />
                                <span>{new Date(sermon.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => handleAction('rejected')}
                        className="flex items-center gap-2 px-5 py-3 border border-red-500/30 bg-red-500/5 text-red-500 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 transition-all"
                    >
                        <XCircle className="w-4 h-4" />
                        Reject
                    </button>
                    <button
                        onClick={() => handleAction('indexed')}
                        className="flex items-center gap-2 px-6 py-3 bg-[var(--user-bubble)] hover:bg-[var(--user-bubble)]/90 text-[var(--text-primary)] rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-black/20 transition-all active:scale-95"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve & Index
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[var(--input-bg)] border border-[var(--divider)] rounded-3xl p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Transcript Editor (A.I. Generated)</h3>
                            <button className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
                                <Save className="w-3.5 h-3.5" />
                                Save Draft
                            </button>
                        </div>
                        <textarea
                            className="w-full h-[500px] bg-[var(--chat-bg)] border border-[var(--divider)] rounded-2xl p-6 focus:outline-none focus:border-[var(--input-border)] transition-colors font-medium text-sm leading-relaxed text-[var(--text-primary)] overflow-y-auto resize-none"
                            value={transcript}
                            onChange={e => setTranscript(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[var(--input-bg)] border border-[var(--divider)] rounded-3xl p-6 shadow-sm">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-6">Sermon Details</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]/60 mb-1.5">Source URL</label>
                                <a href={sermon.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-400 break-all hover:underline">{sermon.url}</a>
                            </div>
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]/60 mb-1.5">Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {sermon.tags.map((tag: string) => (
                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[var(--chat-bg)] border border-[var(--divider)] rounded-lg">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]/60 mb-1.5">Status</label>
                                <div className="inline-flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-[10px]">
                                    <RotateCcw className="w-3 h-3 animate-spin" />
                                    Ready for Review
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-3xl p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[2px] text-blue-400 mb-4">RAG Optimization Tip</h3>
                        <p className="text-[11px] font-bold text-[var(--text-secondary)] leading-loose uppercase tracking-widest">
                            Ensure scripture references are accurate (e.g. John 3:16) to improve citation accuracy in AI responses.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranscriptReview;
