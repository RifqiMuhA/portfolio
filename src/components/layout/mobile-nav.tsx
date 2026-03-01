"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Home, User, FlaskConical, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NoiseBackground } from "@/components/ui/noise-background";

const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Projects", path: "/projects", icon: FlaskConical },
    { name: "Contact", path: "/contact", icon: Mail },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <header className="fixed top-0 left-0 right-0 h-16 border-b border-neutral-200/50 bg-neutral-100/90 backdrop-blur-md z-50 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden relative flex items-center justify-center">
                            <img src="/avatar.jpg" alt="Avatar" className="w-4 h-4 text-neutral-600 object-cover" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-neutral-900 leading-none">Rifqi Muh</h2>
                            <p className="text-xs text-neutral-500 mt-0.5">Full-stack Enthusiast</p>
                        </div>
                    </Link>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-16 h-[calc(100vh-4rem)] z-40 bg-neutral-100 border-b border-neutral-200/50"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-4 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-all"
                                >
                                    <item.icon className="w-5 h-5 text-neutral-500" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-4 mt-auto border-t border-neutral-200/50 flex flex-col gap-4 relative">
                            <Link href="/resume" onClick={() => setIsOpen(false)} className="w-full relative block">
                                <NoiseBackground
                                    containerClassName="w-full p-1 rounded-xl mx-auto"
                                    gradientColors={[
                                        "rgb(255, 100, 150)",
                                        "rgb(100, 150, 255)",
                                        "rgb(255, 200, 100)",
                                    ]}
                                >
                                    <div className="relative w-full cursor-pointer rounded-xl bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-center text-sm font-medium text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98">
                                        My Resume &rarr;
                                    </div>
                                </NoiseBackground>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
