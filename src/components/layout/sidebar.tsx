"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, User, FlaskConical, Layers, MessageSquare } from "lucide-react";
import Image from "next/image";
import { NoiseBackground } from "@/components/ui/noise-background";

const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Projects", path: "/projects", icon: FlaskConical },
    { name: "Comments", path: "/comments", icon: MessageSquare },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex flex-col w-52 h-screen fixed left-0 top-0 bg-neutral-100 overflow-y-auto border-r border-transparent">
            <Link href="/" className="p-6 flex items-center gap-3 border-b border-neutral-200/50 hover:bg-neutral-200/30 transition-colors">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200 relative bg-neutral-100 flex-shrink-0">
                    <Image
                        src="/avatar.jpg"
                        alt="Profile avatar"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="overflow-hidden">
                    <h1 className="text-sm font-semibold text-neutral-900 tracking-tight truncate">
                        Rifqi Muh
                    </h1>
                    <p className="text-xs text-neutral-500 mt-0.5 truncate">
                        Full-Stack Enthusiast
                    </p>
                </div>
            </Link>

            <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200/60"
                                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50 border border-transparent"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-4 h-4 transition-colors",
                                    isActive ? "text-neutral-900" : "text-neutral-400 group-hover:text-neutral-700"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-neutral-200/50 flex flex-col gap-4">
                <Link href="/resume" className="w-full relative block">
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
                <p className="text-xs text-neutral-400 text-center">
                    © {new Date().getFullYear()} Jeebs
                </p>
            </div>
        </aside>
    );
}
