"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Send, Loader2, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Comment = {
    id: string;
    username: string;
    content: string;
    created_at: string;
};

// SVG Chat Background Pattern (WhatsApp-ish Doodle aesthetic)
const ChatBackground = () => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
                <pattern id="doodle" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                    {/* Simplified modern chat doodles */}
                    <path fill="currentColor" d="M11.6,24.3c-1.2-1.2-1.2-3.2,0-4.4c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4C14.8,25.5,12.8,25.5,11.6,24.3z M25.8,11.6 c-1.2-1.2-1.2-3.2,0-4.4c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4C29,12.8,27,12.8,25.8,11.6z M55.3,42.5 c-0.6-0.6-0.6-1.6,0-2.2c0.6-0.6,1.6-0.6,2.2,0c0.6,0.6,0.6,1.6,0,2.2C56.9,43.2,55.9,43.2,55.3,42.5z M85.2,13 c-0.8-0.8-0.8-2.1,0-2.9c0.8-0.8,2.1-0.8,2.9,0c0.8,0.8,0.8,2.1,0,2.9C87.3,13.8,86.1,13.8,85.2,13z M107.4,51.8 c-1.1-1.1-1.1-2.9,0-4c1.1-1.1,2.9-1.1,4,0c1.1,1.1,1.1,2.9,0,4C110.3,52.9,108.5,52.9,107.4,51.8z M23.3,77c-0.9-0.9-0.9-2.2,0-3.1 c0.9-0.9,2.2-0.9,3.1,0c0.9,0.9,0.9,2.2,0,3.1C25.5,77.9,24.1,77.9,23.3,77z M79.7,80.1c-1.3-1.3-1.3-3.3,0-4.6c1.3-1.3,3.3-1.3,4.6,0 c1.3,1.3,1.3,3.3,0,4.6C83,81.4,81,81.4,79.7,80.1z M52.5,99.9c-0.7-0.7-0.7-1.7,0-2.4c0.7-0.7,1.7-0.7,2.4,0c0.7,0.7,0.7,1.7,0,2.4 C54.2,100.5,53.1,100.5,52.5,99.9z M13,106.6c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0c0.8,0.8,0.8,2,0,2.8 C15,107.3,13.8,107.3,13,106.6z M102.3,95.5c-0.7-0.7-0.7-1.8,0-2.5c0.7-0.7,1.8-0.7,2.5,0c0.7,0.7,0.7,1.8,0,2.5 C104.1,96.3,103,96.3,102.3,95.5z M38.7,46.5v1.2h-6.2v17.2h6.2v1.2h-7.6V46.5H38.7z M70.3,51.7h-6.2v3.1h5.3v1h-5.3v4.4h6.2v1 h-7.6V50.7h7.6V51.7z" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#doodle)" />
        </svg>
    </div>
);

// Loading Skeleton Component
const ChatSkeleton = () => (
    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto px-4 pb-4 no-scrollbar">
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`flex w-full ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className={`relative max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl animate-pulse
                    ${i % 2 === 0
                        ? "bg-emerald-50 rounded-tr-none border border-emerald-100" // Sender
                        : "bg-white rounded-tl-none border border-neutral-100" // Receiver
                    }`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-16 h-3 rounded bg-neutral-200"></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className={`h-4 rounded bg-neutral-200 ${i % 2 === 0 ? 'w-48' : 'w-64'}`}></div>
                        <div className={`h-4 rounded bg-neutral-200 ${i % 2 === 0 ? 'w-32' : 'w-40'}`}></div>
                    </div>
                    <div className="absolute right-3 bottom-2 w-8 h-2 rounded bg-neutral-200"></div>
                </div>
            </div>
        ))}
    </div>
);

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form state
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom helper
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Initial Fetch & Subscription Setup
    useEffect(() => {
        fetchComments();

        // Subscribe to real-time inserts on the 'comments' table
        const subscription = supabase
            .channel('public:comments')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'comments' },
                (payload) => {
                    // Append new comments to the BOTTOM 
                    setComments((current) => [...current, payload.new as Comment]);
                    setTimeout(scrollToBottom, 100);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    // Scroll down whenever messages load first time
    useEffect(() => {
        if (!isLoading) {
            scrollToBottom();
        }
    }, [isLoading, comments.length]);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                // Order by ascending to make oldest at top, newest at bottom (like WhatsApp)
                .order('created_at', { ascending: true });

            if (error) throw error;
            if (data) setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim() || !content.trim()) return;

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('comments')
                .insert([
                    {
                        username: username.trim(),
                        content: content.trim()
                    }
                ]);

            if (error) throw error;

            // Clear ONLY message input on success so the user doesn't have to re-type their name
            setContent("");

        } catch (error) {
            console.error('Error submitting comment:', error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Define consistent chat bubble colors dynamically based on username
    const getNameColor = (name: string) => {
        const colors = [
            "text-blue-500", "text-emerald-500", "text-violet-500",
            "text-rose-500", "text-amber-500", "text-cyan-600"
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="w-full flex flex-col mx-auto bg-[#efeae2] sm:rounded-3xl shadow-xl border border-neutral-300 overflow-hidden relative" style={{ height: "calc(100vh - 12rem)", minHeight: "500px", maxHeight: "800px" }}>

            <ChatBackground />

            {/* HEADER */}
            <div className="bg-[#f0f2f5] px-6 py-4 flex items-center gap-4 border-b border-neutral-300 z-10 shrink-0 shadow-sm">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200 bg-white">
                        <img src="/group.png" alt="Rifqi Muh" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#f0f2f5] rounded-full"></div>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold text-neutral-900 leading-tight">Public Lounge</h3>
                    <p className="text-xs text-neutral-500">
                        {comments.length} participants • Live connection
                    </p>
                </div>
            </div>

            {/* CHAT FEED */}
            <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth z-10 custom-scrollbar">
                {isLoading ? (
                    <ChatSkeleton />
                ) : comments.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="bg-[#ffeecd] text-[#54656f] text-sm px-4 py-2 rounded-xl shadow-sm text-center max-w-sm">
                            🔒 Messages are end-to-end encrypted (just kidding). Send the first message to start the conversation!
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <AnimatePresence initial={false}>
                            {comments.map((comment, index) => {
                                // For visual variation, alternating bubble alignment based on odd/even id hash (pseudo-random but consistent)
                                // If building a true messaging app, this would check if the currentUser === commentUser. 
                                // Since it's a guestbook, we simulate others vs "me" by string hash.
                                const isSelf = comment.username.toLowerCase() === username.trim().toLowerCase() && username.length > 0;

                                return (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        className={`flex w-full ${isSelf ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`relative max-w-[85%] sm:max-w-[70%] px-3 pt-2 pb-6 min-w-[120px] rounded-xl shadow-sm
                                                ${isSelf
                                                    ? 'bg-[#d9fdd3] rounded-tr-none'
                                                    : 'bg-white rounded-tl-none'
                                                }`}
                                        >
                                            {/* Chat Tail SVG (Visual Polish) */}
                                            <svg viewBox="0 0 8 13" width="8" height="13" className={`absolute top-0 ${isSelf ? '-right-2 text-[#d9fdd3]' : '-left-2 text-white'}`}>
                                                {isSelf
                                                    ? <path opacity="1" fill="currentColor" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
                                                    : <path opacity="1" fill="currentColor" d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
                                                }
                                            </svg>

                                            {/* Username (only show on incoming) */}
                                            {!isSelf && (
                                                <h4 className={`text-xs font-bold leading-tight mb-1 ${getNameColor(comment.username)}`}>
                                                    ~ {comment.username}
                                                </h4>
                                            )}

                                            <span className="text-[#111b21] text-[15px] leading-snug whitespace-pre-wrap break-words">
                                                {comment.content}
                                            </span>

                                            {/* Timestamp & Read Receipt */}
                                            <div className="absolute right-2 bottom-1 flex items-center gap-1.5 text-[10px] text-neutral-500">
                                                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true }).replace('about ', '')}
                                                {isSelf && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        <div ref={messagesEndRef} className="h-4" /> {/* Bottom padding element */}
                    </div>
                )}
            </div>

            {/* INPUT FOOTER */}
            <div className="bg-[#f0f2f5] px-4 py-3 flex items-end gap-3 z-10 shrink-0">
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 flex items-end gap-2 bg-white rounded-2xl px-4 py-2 shadow-sm border border-neutral-200 transition-all focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500"
                >
                    <div className="flexflex-col flex-1 pb-1 pt-0.5">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={30}
                            disabled={isSubmitting}
                            className="w-full text-xs font-semibold text-neutral-900 border-b border-neutral-100 placeholder:text-neutral-400 bg-transparent focus:outline-none focus:border-emerald-300 pb-1 mb-1 disabled:opacity-50"
                            required
                        />
                        <textarea
                            placeholder="Type a message..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            maxLength={500}
                            disabled={isSubmitting}
                            rows={1}
                            className="w-full text-[15px] bg-transparent text-neutral-900 resize-none focus:outline-none placeholder:text-neutral-500 mt-1 max-h-32 min-h-[24px] disabled:opacity-50"
                            style={{
                                height: content ? `${Math.min(100, Math.max(24, content.split('\n').length * 24))}px` : '24px'
                            }}
                            required
                        />
                    </div>
                </form>

                {/* Send Button */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !username.trim() || !content.trim()}
                    className="flex-shrink-0 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-full flex flex-col items-center justify-center text-white shadow-sm transition-all disabled:opacity-50 disabled:scale-95 active:scale-90"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5 ml-1" />
                    )}
                </button>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(0,0,0,0.15);
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
}
