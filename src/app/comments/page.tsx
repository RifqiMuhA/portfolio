import React from "react";
import CommentSection from "@/components/ui/comment-section";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Comments | Senior Frontend Engineer',
    description: 'Leave a message or question in the real-time public guestbook.',
}

export default function CommentsPage() {
    return (
        <div className="relative w-full min-h-[calc(100vh-8rem)] overflow-hidden bg-white flex flex-col items-center justify-start rounded-lg mt-16 lg:mt-0 p-6 sm:p-12 md:p-16 animate-in fade-in duration-700">
            {/* Integrated interactive ripple background */}
            <div className="absolute inset-0 z-0 opacity-50">
                <BackgroundRippleEffect />
            </div>

            <div className="max-w-6xl mx-auto w-full relative z-30 flex flex-col items-center pt-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4 font-sans">
                        Public Guestbook
                    </h1>
                    <p className="text-neutral-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                        Welcome to my real-time comment section. Powered by Supabase, any messages sent here will broadcast to all connected visitors instantly. Leave a thought, ask a question, or just say hello!
                    </p>
                </div>

                <div className="w-full bg-white/60 backdrop-blur-3xl p-4 sm:p-8 rounded-3xl shadow-xl shadow-neutral-900/5 ring-1 ring-neutral-200/50">
                    <CommentSection />
                </div>
            </div>
        </div>
    );
}
