"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { User, MessageSquare, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Comment = {
    id: string;
    username: string;
    content: string;
    created_at: string;
};

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form state
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

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
                    // Prepend the new comment to the state immediately
                    setComments((current) => [payload.new as Comment, ...current]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .order('created_at', { ascending: false });

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

            // Clear input on success (supabase realtime handles the list update)
            setContent("");

        } catch (error) {
            console.error('Error submitting comment:', error);
            alert("Gagal mengirim pesan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper to generate a consistent color based on username
    const getAvatarColor = (name: string) => {
        const colors = [
            "bg-blue-500", "bg-emerald-500", "bg-violet-500",
            "bg-rose-500", "bg-amber-500", "bg-cyan-500"
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">

            {/* LEFT SIDE: Submit Form */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 border-b border-neutral-100 pb-4">
                        <MessageSquare className="w-6 h-6 text-neutral-400" />
                        Tinggalkan Pesan
                    </h3>
                    <p className="text-sm text-neutral-500 mt-3">
                        Punya pertanyaan atau sekadar ingin menyapa? Buku tamu ini bersifat publik dan real-time.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider ml-1">Nama</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Nama Anda"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                maxLength={50}
                                disabled={isSubmitting}
                                className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all disabled:opacity-60"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider ml-1">Pesan</label>
                        <textarea
                            placeholder="Tuliskan pesan Anda di sini..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={500}
                            disabled={isSubmitting}
                            rows={4}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all disabled:opacity-60"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !username.trim() || !content.trim()}
                        className="mt-2 w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                Kirim Pesan
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* RIGHT SIDE: Real-time Feed */}
            <div className="w-full md:w-2/3 flex flex-col">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                        Buku Tamu
                        <span className="flex h-2 w-2 relative ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    </h3>
                    <span className="text-sm font-medium px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                        {comments.length} Pesan
                    </span>
                </div>

                <div className="relative flex-1 bg-neutral-50/50 rounded-2xl border border-neutral-100 p-4 md:p-6 overflow-hidden min-h-[500px]">
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-neutral-300 animate-spin" />
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
                            <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                            <p>Belum ada pesan. Jadilah yang pertama!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                            <AnimatePresence initial={false}>
                                {comments.map((comment, index) => (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                            delay: Math.min(index * 0.05, 0.5) // cascade intro but cap delay
                                        }}
                                        className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner ${getAvatarColor(comment.username)}`}>
                                                {comment.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <h4 className="font-semibold text-neutral-900 truncate">
                                                        {comment.username}
                                                    </h4>
                                                    <span className="text-xs text-neutral-400 shrink-0 capitalize whitespace-nowrap">
                                                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                                    </span>
                                                </div>
                                                <p className="text-neutral-600 text-sm whitespace-pre-wrap leading-relaxed break-words">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
