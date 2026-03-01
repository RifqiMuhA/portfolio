"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

// Custom portfolio content
const PROJECTS = [
    {
        id: "askara",
        title: "Askara",
        shortDesc: "Web angkatan yang berisi dokumentasi kegiatan, forum, dan modul.",
        desc: "Askara adalah platform website angkatan yang dirancang untuk menyimpan dokumentasi kegiatan, menyediakan ruang diskusi melalui forum, dan mengelola modul pembelajaran.",
        tags: ["Web", "Forum", "Modul"],
        coverImage: "/projects/askara1.jpg",
        detailsImages: [
            "/projects/askara2.jpg",
            "/projects/askara3.jpg"
        ]
    },
    {
        id: "iqrain",
        title: "IQRAIN",
        shortDesc: "Website belajar huruf hijaiyah untuk anak tuna rungu.",
        desc: "IQRAIN adalah inovasi platform pendidikan digital interaktif yang dirancang khusus untuk memfasilitasi anak-anak tunarungu dalam mempelajari huruf hijaiyah dengan metode visual.",
        tags: ["Laravel", "Livewire", "E-Learning"],
        coverImage: "/projects/iqrain1.jpg",
        detailsImages: [
            "/projects/iqrain2.jpg",
            "/projects/iqrain3.jpg"
        ]
    },
    {
        id: "jejakbumi",
        title: "Jejak Bumi",
        shortDesc: "Web story yang menceritakan perubahan iklim bumi.",
        desc: "Jejak Bumi merupakan platform penceritaan digital (web story) interaktif yang menyoroti dampak dan data seputar perubahan iklim global guna meningkatkan kesadaran lingkungan.",
        tags: ["Storytelling", "UI/UX", "Climate"],
        coverImage: "/projects/jejakbumi1.jpg",
        detailsImages: [
            "/projects/jejakbumi2.jpg",
            "/projects/jejakbumi3.jpg"
        ]
    },
    {
        id: "se",
        title: "SE 2026",
        shortDesc: "Design Figma untuk website Sensus Ekonomi 2026.",
        desc: "Proyek perancangan UI/UX komprehensif menggunakan Figma untuk portal resmi Sensus Ekonomi Nasional 2026, berfokus pada aksesibilitas data dan pengalaman pengguna.",
        tags: ["Figma", "UI/UX", "Design"],
        coverImage: "/projects/se1.jpg",
        detailsImages: [
            "/projects/se2.jpg",
            "/projects/se3.jpg"
        ]
    },
    {
        id: "jejakhijau",
        title: "Jejak Hijau",
        shortDesc: "Mobile UI/UX solusi polusi di Jakarta kolaborasi KLHK.",
        desc: "Jejak Hijau adalah rancangan purwarupa antarmuka aplikasi seluler yang menawarkan solusi pelacakan dan mitigasi polusi udara di ibu kota Jakarta, bekerja sama dengan KLHK.",
        tags: ["Mobile", "UI/UX", "App"],
        coverImage: "/projects/jejakhijau1.jpg",
        detailsImages: [
            "/projects/jejakhijau2.jpg",
            "/projects/jejakhijau3.jpg"
        ]
    }
];

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

    // Lock body scroll when overlay is open to enforce focus
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedProject]);
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
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Featured Projects</h1>
                        <p className="text-neutral-500">Selected works representing full-stack capabilities.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-30">
                        {PROJECTS.map((project) => (
                            <motion.div
                                layoutId={`card-${project.id}`}
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                className="group relative flex flex-col cursor-pointer rounded-3xl bg-neutral-100 hover:bg-neutral-200 transition-colors duration-500 overflow-hidden min-h-[400px]"
                            >
                                {/* Awwwards-style large cover image filling the card background */}
                                <motion.div layoutId={`image-${project.id}`} className="absolute inset-0 w-full h-full overflow-hidden">
                                    <img
                                        src={project.coverImage}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.33,1,0.68,1]"
                                    />
                                    {/* Dark gradient overlay for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </motion.div>

                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-1 group-hover:translate-x-1 duration-500 z-10">
                                    <ArrowUpRight className="w-8 h-8 text-white drop-shadow-md" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col justify-end">
                                    <motion.h4 layoutId={`title-${project.id}`} className="text-3xl font-bold text-white mb-3 tracking-tight">
                                        {project.title}
                                    </motion.h4>

                                    <motion.p layoutId={`desc-${project.id}`} className="text-neutral-200 text-sm md:text-base leading-relaxed mb-6 max-w-sm">
                                        {project.shortDesc}
                                    </motion.p>

                                    <motion.div layoutId={`tags-${project.id}`} className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* EXPANDED MODAL OVERLAY */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 sm:p-6"
                    >
                        {/* Dimmer Background */}
                        <motion.div
                            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                        />

                        {/* Modal Container */}
                        <motion.div
                            layoutId={`card-${selectedProject.id}`}
                            className="relative w-full max-w-6xl h-[90vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col z-10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Inner Scrollable Gallery Area */}
                            <div className="w-full h-full overflow-y-auto no-scrollbar pb-20">

                                {/* Hero / Cover Image expanding in sync */}
                                <motion.div layoutId={`image-${selectedProject.id}`} className="relative w-full h-[60vh] shrink-0">
                                    <img
                                        src={selectedProject.coverImage}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col items-start justify-end">
                                        <motion.h2 layoutId={`title-${selectedProject.id}`} className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                                            {selectedProject.title}
                                        </motion.h2>

                                        <motion.p layoutId={`desc-${selectedProject.id}`} className="text-neutral-300 text-lg md:text-xl max-w-2xl mb-8">
                                            {selectedProject.desc}
                                        </motion.p>

                                        <motion.div layoutId={`tags-${selectedProject.id}`} className="flex flex-wrap gap-3">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="px-5 py-2 text-sm font-semibold tracking-wide text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* The "Several Photos for Detail" Gallery Section */}
                                <div className="max-w-4xl mx-auto px-6 mt-16 flex flex-col gap-12 sm:px-8">
                                    <div className="text-center mb-4">
                                        <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">Project Details</h3>
                                        <p className="text-neutral-500 mt-2">A closer look at the architecture and UI/UX design.</p>
                                    </div>

                                    {selectedProject.detailsImages.map((src, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                            className="w-full rounded-2xl overflow-hidden shadow-sm border border-neutral-100 bg-neutral-50"
                                        >
                                            <img
                                                src={src}
                                                alt={`${selectedProject.title} detail ${idx + 1}`}
                                                className="w-full h-auto object-cover max-h-[700px]"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
