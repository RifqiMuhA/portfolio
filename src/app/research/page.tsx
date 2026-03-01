"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, LineChart } from "lucide-react";

export default function ResearchPage() {
    return (
        <div className="max-w-5xl mx-auto flex flex-col pb-20 pt-8 mt-16 lg:mt-0">
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Research</h1>
                    <p className="text-neutral-500">Statistical analysis and methodology evaluations.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm"
                >
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-medium mb-4">
                                <LineChart className="w-3 h-3" />
                                Data Quality Analytics
                            </div>
                            <h4 className="text-2xl font-medium text-neutral-900 mb-4">Survey Data Quality Analysis: CAPI vs CAWI</h4>
                            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                                A comparative study focusing on the discrepancies and data quality metrics between Computer-Assisted Personal Interviewing (CAPI) and Computer-Assisted Web Interviewing (CAWI) methodologies. This research explores completion rates, response variance, and statistical significance of format biases.
                            </p>
                            <div className="flex gap-4">
                                <button className="text-sm text-neutral-900 font-medium hover:text-indigo-600 transition-colors flex items-center gap-1 group">
                                    Read Paper <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-indigo-600 transition-colors" />
                                </button>
                            </div>
                        </div>

                        {/* Minimalist Data Visualization Placeholder - Light Theme */}
                        <div className="w-full md:w-1/2 aspect-video bg-neutral-50 rounded-xl border border-neutral-200 p-6 flex flex-col justify-end gap-4 relative overflow-hidden shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent z-10" />
                            <div className="flex items-end justify-between h-32 gap-2 relative z-0">
                                <div className="w-full bg-indigo-500/30 rounded-t-sm h-[40%]" />
                                <div className="w-full bg-indigo-500/50 rounded-t-sm h-[60%]" />
                                <div className="w-full bg-neutral-200 rounded-t-sm h-[30%]" />
                                <div className="w-full bg-neutral-200 rounded-t-sm h-[85%]" />
                                <div className="w-full bg-indigo-500/80 rounded-t-sm h-[100%]" />
                                <div className="w-full bg-neutral-200 rounded-t-sm h-[45%]" />
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-500 uppercase tracking-wider font-semibold relative z-20">
                                <span>CAPI Response</span>
                                <span>CAWI Response</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
