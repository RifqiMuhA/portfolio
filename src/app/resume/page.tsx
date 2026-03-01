"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function ResumePage() {
    const data = [
        {
            title: "Present",
            content: (
                <div>
                    <p className="mb-4 text-sm font-medium text-neutral-900">
                        Full-stack Developer & Data Analyst
                    </p>
                    <p className="mb-8 text-sm font-normal text-neutral-600 leading-relaxed">
                        Building rigorous digital platforms utilizing Next.js, React, Tailwind, and deep backends in Laravel. Simultaneously conducting statistical methodology research on structural variance (PCA, K-Means clustering, etc.).
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Styled placeholder blocks reflecting work */}
                        <div className="h-20 md:h-44 lg:h-60 w-full rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-400 text-xs font-mono">/projects/iqrain</span>
                        </div>
                        <div className="h-20 md:h-44 lg:h-60 w-full rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-400 text-xs font-mono">/research/methodology</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <p className="mb-4 text-sm font-medium text-neutral-900">
                        Internal Platform Modernization
                    </p>
                    <p className="mb-8 text-sm font-normal text-neutral-600 leading-relaxed">
                        Spearheaded the development of SIKOKO, achieving cross-departmental alignment through a unified interface connecting disjointed databases. Leveraged PHP and structured administrative dashboards.
                    </p>
                </div>
            ),
        },
        {
            title: "Earlier",
            content: (
                <div>
                    <p className="mb-4 text-sm font-medium text-neutral-900">
                        Academic Foundations & Initial Codebases
                    </p>
                    <p className="mb-8 text-sm font-normal text-neutral-600 leading-relaxed">
                        Began formal study connecting software patterns and pure statistics. Transitioned from static scripting into containerized environments (Docker) and exploring Kotlin for mobile-native possibilities.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div className="relative w-full min-h-[calc(100vh-8rem)] overflow-hidden bg-white flex flex-col items-start justify-start rounded-lg mt-16 lg:mt-0 pb-20 pt-8 animate-in fade-in duration-700">
            {/* Integrated interactive ripple background */}
            <div className="absolute inset-0 z-0">
                <BackgroundRippleEffect />
            </div>

            <div className="max-w-5xl mx-auto w-full relative z-30 px-4">
                <section>
                    {/* Aceternity timeline abstraction */}
                    <Timeline data={data} />
                </section>
            </div>
        </div>
    );
}
