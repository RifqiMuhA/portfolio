"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function ContactPage() {
    return (
        <div className="relative w-full min-h-[calc(100vh-8rem)] overflow-hidden bg-white flex flex-col items-start justify-start rounded-lg mt-16 lg:mt-0 pb-20 pt-8 animate-in fade-in duration-700">
            {/* Integrated interactive ripple background */}
            <div className="absolute inset-0 z-0">
                <BackgroundRippleEffect />
            </div>

            <div className="max-w-5xl mx-auto w-full relative z-30 px-4">
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Contact</h1>
                        <p className="text-neutral-500">Reach out for collaborations or inquiries.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm max-w-xl"
                    >
                        <div className="flex flex-col gap-6">
                            <a href="mailto:rifqiahdan03@gmail.com" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-white group-hover:text-neutral-900 group-hover:shadow-sm transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900">Email</h4>
                                    <p className="text-sm text-neutral-500">rifqiahdan03@gmail.com</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 group p-4 rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900">Location</h4>
                                    <p className="text-sm text-neutral-500">Available for Remote Worldwide</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
