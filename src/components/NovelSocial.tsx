import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { CommentOverlay } from './CommentOverlay';
import { getVisitorId, getVisitorName, getIsAnonymous, setIsAnonymous, setVisitorName as setStoredVisitorName } from '../lib/visitor';

interface Comment {
    id: string;
    user_name: string;
    comment_text: string;
    created_at: string;
}

export const NovelSocial = () => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [visitorId, setVisitorId] = useState<string | null>(null);
    const [visitorName, setVisitorName] = useState('Visitor');
    const [isAnonymous, setIsAnonymousState] = useState(true);
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Focus name input without scrolling the page (fixes mobile layout jump)
    useEffect(() => {
        if (isEditingName && nameInputRef.current) {
            const input = nameInputRef.current;
            requestAnimationFrame(() => {
                input.focus({ preventScroll: true });
            });
        }
    }, [isEditingName]);

    // Initialize Visitor ID and Fetch Data
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // 1. Handle Visitor ID and Name via shared utility
        const vid = getVisitorId();
        const vName = getVisitorName();
        const isAnon = getIsAnonymous();

        setVisitorId(vid);
        setVisitorName(vName);
        setIsAnonymousState(isAnon);
        setTempName(vName);

        // 2. Fetch Initial Data
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch total likes
                const { count: likesCount } = await supabase
                    .from('likes')
                    .select('*', { count: 'exact', head: true });

                setLikes(likesCount || 0);

                // Check if current visitor liked
                const { data: userLike } = await supabase
                    .from('likes')
                    .select('id')
                    .eq('visitor_id', vid)
                    .maybeSingle();

                setIsLiked(!!userLike);

                // Fetch comments
                const { data: commentsData } = await supabase
                    .from('comments')
                    .select('id, user_name, comment_text, created_at')
                    .order('created_at', { ascending: false });

                if (commentsData) setComments(commentsData);
            } catch (error) {
                console.error('Error fetching social data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLike = async () => {
        if (!visitorId) return;

        // Optimistic UI
        const prevLiked = isLiked;
        const prevCount = likes;
        setIsLiked(!prevLiked);
        setLikes(prev => prevLiked ? prev - 1 : prev + 1);

        try {
            if (prevLiked) {
                // Unlike
                await supabase.from('likes').delete().eq('visitor_id', visitorId);
            } else {
                // Like
                await supabase.from('likes').insert({ visitor_id: visitorId });
            }
        } catch (error) {
            // Rollback on error
            setIsLiked(prevLiked);
            setLikes(prevCount);
            console.error('Error updating like:', error);
        }
    };

    const handleAddComment = async (text: string) => {
        if (!text.trim() || !visitorId) return;

        try {
            const { data, error } = await supabase
                .from('comments')
                .insert({
                    user_name: visitorName,
                    comment_text: text.trim(),
                    visitor_id: visitorId
                })
                .select()
                .single();

            if (error) throw error;
            if (data) {
                setComments(prev => [data, ...prev]);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleUpdateName = (newName: string) => {
        setStoredVisitorName(newName);
        setVisitorName(getVisitorName());
        setIsEditingName(false);
    };

    const handleToggleAnonymous = (anon: boolean) => {
        setIsAnonymous(anon);
        setIsAnonymousState(anon);
        setVisitorName(getVisitorName());
    };

    const formatTime = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const mins = Math.floor(diff / 60000);
            const hours = Math.floor(mins / 60);
            const days = Math.floor(hours / 24);

            if (mins < 1) return 'Just now';
            if (mins < 60) return `${mins}m ago`;
            if (hours < 24) return `${hours}h ago`;
            return `${days}d ago`;
        } catch (e) {
            return 'Recently';
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-white/10 w-full">
            <div className="flex flex-col gap-8">
                {/* Likes Section */}
                <div className="flex items-center gap-4">
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300 ${isLiked
                            ? 'bg-primary/20 border-primary text-primary'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <motion.svg
                            animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
                            width="20" height="20" viewBox="0 0 24 24"
                            fill={isLiked ? "currentColor" : "none"}
                            stroke="currentColor" strokeWidth="2"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </motion.svg>
                        <span className="font-bold">{likes}</span>
                    </motion.button>
                    <p className="text-sm text-white/40 font-body italic">Spread the word if this resonated with you.</p>
                </div>

                {/* Comments Preview Section */}
                <div className="space-y-6 text-left">
                    <div className="flex items-center justify-between">
                        <h4 className="font-display text-xl text-white">Reader Thoughts</h4>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-white/40 uppercase tracking-widest">Posting as:</span>
                            {isEditingName ? (
                                <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                                    <input
                                        ref={nameInputRef}
                                        type="text"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        className="bg-white/5 border border-white/20 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-primary min-w-0 max-w-[140px] sm:max-w-[200px]"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleUpdateName(tempName);
                                            if (e.key === 'Escape') setIsEditingName(false);
                                        }}
                                    />
                                    <button type="button" onClick={() => handleUpdateName(tempName)} className="text-primary text-[10px] font-bold shrink-0">SAVE</button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditingName(true)}
                                    className="text-primary text-[10px] font-bold hover:underline"
                                >
                                    {isAnonymous ? 'ANONYMOUS' : visitorName.toUpperCase()}
                                </button>
                            )}
                        </div>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddComment(newComment);
                        setNewComment('');
                    }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="flex-1 min-w-0 w-full sm:w-auto bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-body text-sm text-left"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full sm:w-auto shrink-0 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-sm transition-all border border-white/10"
                        >
                            Post
                        </motion.button>
                    </form>

                    <div className="space-y-4 text-left">
                        <AnimatePresence initial={false}>
                            {comments.slice(0, isMobile ? 2 : 1).length > 0 ? (
                                comments.slice(0, isMobile ? 2 : 1).map((comment) => (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2 text-left"
                                    >
                                        <div className="flex justify-between items-center text-left">
                                            <span className="text-primary font-bold text-xs uppercase tracking-widest">{comment.user_name}</span>
                                            <span className="text-[10px] text-white/30 uppercase tracking-tighter">{formatTime(comment.created_at)}</span>
                                        </div>
                                        <p className="text-white/80 text-sm font-body leading-relaxed text-left">{comment.comment_text}</p>
                                    </motion.div>
                                ))
                            ) : !isLoading && (
                                <p className="text-white/20 font-body text-sm italic text-center py-8">No thoughts shared yet. Be the first.</p>
                            )}
                        </AnimatePresence>

                        {comments.length > (isMobile ? 2 : 1) && (
                            <motion.button
                                whileHover={{ x: 5 }}
                                onClick={() => setIsOverlayOpen(true)}
                                className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center gap-2 group transition-colors hover:bg-white/10"
                            >
                                <span className="text-sm text-white/40 group-hover:text-white transition-colors">Read all {comments.length} comments</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20 group-hover:text-primary transition-colors">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>

            {/* Full Comment Overlay */}
            <CommentOverlay
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                comments={comments}
                visitorName={visitorName}
                visitorId={visitorId}
                onAddComment={handleAddComment}
                formatTime={formatTime}
                isLoading={isLoading}
            />
        </div>
    );
};
