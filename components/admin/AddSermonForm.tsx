
import React, { useState } from 'react';
import { Youtube, Music, Save, ArrowLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const AddSermonForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        speaker: 'Apostle Joshua Selman',
        sourceType: 'youtube', // 'youtube' | 'audio'
        url: '',
        date: new Date().toISOString().split('T')[0],
        tags: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/admin/sermons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to ingest sermon');
            }

            alert("Sermon metadata ingested successfully! Transcription initiated.");
            navigate('/admin/library');
        } catch (err) {
            console.error("Error ingesting sermon:", err);
            alert("Failed to ingest sermon. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <header className="mb-10">
                <NavLink to="/admin" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Overview
                </NavLink>
                <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Add New Sermon</h1>
                <p className="text-[var(--text-secondary)] font-medium">Ingest a new sermon into the knowledge base.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 bg-[var(--input-bg)] border border-[var(--divider)] p-8 rounded-3xl shadow-sm">
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3">Sermon Title</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-[var(--chat-bg)] border border-[var(--divider)] rounded-xl px-5 py-4 focus:outline-none focus:border-[var(--input-border)] transition-colors font-bold text-sm"
                            placeholder="Enter sermon title..."
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3">Speaker</label>
                            <input
                                readOnly
                                type="text"
                                className="w-full bg-[var(--chat-bg)]/50 border border-[var(--divider)] rounded-xl px-5 py-4 focus:outline-none font-bold text-sm opacity-70 cursor-not-allowed"
                                value={formData.speaker}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3">Sermon Date</label>
                            <input
                                type="date"
                                className="w-full bg-[var(--chat-bg)] border border-[var(--divider)] rounded-xl px-5 py-4 focus:outline-none focus:border-[var(--input-border)] transition-colors font-bold text-sm"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4">Source Type</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, sourceType: 'youtube' })}
                                className={`flex items-center justify-center gap-3 px-6 py-5 rounded-2xl border-2 transition-all font-bold uppercase tracking-widest text-xs
                    ${formData.sourceType === 'youtube' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-[var(--divider)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'}
                  `}
                            >
                                <Youtube className="w-5 h-5" />
                                YouTube Link
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, sourceType: 'audio' })}
                                className={`flex items-center justify-center gap-3 px-6 py-5 rounded-2xl border-2 transition-all font-bold uppercase tracking-widest text-xs
                    ${formData.sourceType === 'audio' ? 'border-blue-400 bg-blue-400/10 text-blue-400' : 'border-[var(--divider)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'}
                  `}
                            >
                                <Music className="w-5 h-5" />
                                Direct Audio URL
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3">
                            {formData.sourceType === 'youtube' ? 'YouTube URL' : 'Audio File URL'}
                        </label>
                        <input
                            required
                            type="url"
                            className="w-full bg-[var(--chat-bg)] border border-[var(--divider)] rounded-xl px-5 py-4 focus:outline-none focus:border-[var(--input-border)] transition-colors font-bold text-sm"
                            placeholder={formData.sourceType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://example.com/audio.mp3'}
                            value={formData.url}
                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-3">Tags (Comma separated)</label>
                        <input
                            type="text"
                            className="w-full bg-[var(--chat-bg)] border border-[var(--divider)] rounded-xl px-5 py-4 focus:outline-none focus:border-[var(--input-border)] transition-colors font-bold text-sm"
                            placeholder="Kingdom Laws, Favor, Spiritual Growth..."
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-[var(--divider)] flex justify-end">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="flex items-center gap-3 px-10 py-5 bg-[var(--user-bubble)] hover:bg-[var(--user-bubble)]/90 text-[var(--text-primary)] rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-[var(--text-primary)] border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Ingest Sermon
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSermonForm;
