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

            <div className="max-w-4xl mx-auto w-full relative z-30 flex flex-col items-center pt-4 sm:pt-10">
                <div className="w-full">
                    <CommentSection />
                </div>
            </div>
        </div>
    );
}
