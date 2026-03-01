"use client";

import { motion } from "framer-motion";
import { Database, LineChart, Server, Smartphone, Terminal } from "lucide-react";

export default function StackPage() {
    return (
        <div className="max-w-5xl mx-auto flex flex-col pb-20 pt-8 mt-16 lg:mt-0">
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Technical Arsenal</h1>
                    <p className="text-neutral-500">Tools and technologies I use to build robust solutions.</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { name: "Laravel", label: "Backend", icon: Server },
                        { name: "Kotlin", label: "Jetpack Compose", icon: Smartphone },
                        { name: "Linux", label: "Ubuntu / Rocky", icon: Terminal },
                        { name: "Docker", label: "Containerization", icon: Database },
                        { name: "Stats", label: "PCA / K-Means", icon: LineChart },
                    ].map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex flex-col items-center justify-center p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl hover:shadow-md hover:border-neutral-300 transition-all cursor-default"
                        >
                            <tech.icon className="w-8 h-8 text-neutral-400 mb-3" />
                            <h5 className="text-neutral-900 font-medium text-sm">{tech.name}</h5>
                            <span className="text-xs text-neutral-500 mt-1 text-center">{tech.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
