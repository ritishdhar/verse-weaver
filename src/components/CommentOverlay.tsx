import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface Comment {
    id: string;
    user_name: string;
    comment_text: string;
    created_at: string;
    visitor_id?: string | null;
}

interface CommentOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    comments: Comment[];
    visitorId: string | null;
    visitorName: string;
    onAddComment: (text: string) => Promise<void>;
    onDeleteComment: (commentId: string) => Promise<void>;
    formatTime: (date: string) => string;
    isLoading: boolean;
}

export const CommentOverlay = ({
    isOpen,
    onClose,
    comments,
    visitorId,
    visitorName,
    onAddComment,
    onDeleteComment,
    formatTime,
    isLoading
}: CommentOverlayProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem('comment') as HTMLInputElement;
        if (input.value.trim()) {
            onAddComment(input.value.trim());
            input.value = '';
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative w-full h-full max-w-2xl flex flex-col bg-zinc-900 border-x border-white/5"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <h3 className="font-display text-2xl text-white">Reader Thoughts</h3>
                                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                                    {comments.length} {comments.length === 1 ? 'Thought' : 'Thoughts'} shared
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            <AnimatePresence initial={false}>
                                {comments.map((comment) => (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2 group/comment"
                                    >
                                        <div className="flex justify-between items-start gap-2 text-left">
                                            <div className="flex flex-wrap items-center gap-2 min-w-0">
                                                <span className="text-primary font-bold text-xs uppercase tracking-widest">{comment.user_name}</span>
                                                <span className="text-[10px] text-white/30 uppercase tracking-tighter shrink-0">{formatTime(comment.created_at)}</span>
                                            </div>
                                            {visitorId && comment.visitor_id === visitorId && (
                                                <button
                                                    type="button"
                                                    onClick={() => onDeleteComment(comment.id)}
                                                    className="shrink-0 p-1.5 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-colors"
                                                    title="Delete comment"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                        <path d="M10 11v6M14 11v6" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-white/80 text-sm font-body leading-relaxed text-left">{comment.comment_text}</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {comments.length === 0 && !isLoading && (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <p className="text-white/20 font-display text-xl italic mb-2">No thoughts shared yet.</p>
                                    <p className="text-white/10 text-sm uppercase tracking-widest">Your voice could be the first.</p>
                                </div>
                            )}
                        </div>

                        {/* Input Footer */}
                        <div className="p-6 bg-zinc-900 border-t border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Posting as:</span>
                                    <span className="text-primary text-[10px] font-bold">
                                        {visitorName.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-[10px] text-white/20 uppercase tracking-widest">
                                    ID: {visitorId?.slice(0, 8)}...
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex gap-4">
                                <input
                                    name="comment"
                                    type="text"
                                    required
                                    placeholder={`Share as ${visitorName}...`}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-body text-sm text-left"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all"
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};
