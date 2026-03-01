"use client";

import { motion } from "framer-motion";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LinkPreview } from "@/components/ui/link-preview";
import DomeGallery from "@/components/ui/dome-gallery";

export default function AboutPage() {
    return (
        <div className="relative w-full min-h-[calc(100vh-8rem)] overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg mt-16 lg:mt-0 pb-20 pt-20 animate-in fade-in duration-700">
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
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 relative">
                            About me <br className="hidden md:block" />
                            <span className="text-neutral-400">my hobbies and passion.</span>
                        </h2>

                        <div className="space-y-10 max-w-3xl mt-12 mb-16 relative">
                            {/* Developer */}
                            <div>
                                <LinkPreview
                                    url="#"
                                    isStatic
                                    imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600"
                                    className="inline-block px-4 py-1 text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-700 rounded-full mb-4 cursor-pointer"
                                >
                                    Developer
                                </LinkPreview>
                                <p className="text-lg text-neutral-600 leading-relaxed">
                                    I am a Statistics student and Full-stack Developer focused on building scalable and efficient web applications. I primarily work with Laravel and modern web technologies to create functional systems with strong backend architecture.
                                </p>
                            </div>

                            {/* IT Infrastructure */}
                            <div>
                                <LinkPreview
                                    url="#"
                                    isStatic
                                    imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600"
                                    className="inline-block px-4 py-1 text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-700 rounded-full mb-4 cursor-pointer"
                                >
                                    IT Infrastructure
                                </LinkPreview>
                                <p className="text-lg text-neutral-600 leading-relaxed">
                                    Beyond development, I am deeply interested in IT infrastructure and system environments. I enjoy understanding how servers, networks, and backend systems operate to ensure performance, reliability, and scalability.
                                </p>
                            </div>

                            {/* Education */}
                            <div>
                                <LinkPreview
                                    url="#"
                                    isStatic
                                    imageSrc="/education.jpg"
                                    className="inline-block px-4 py-1 text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-700 rounded-full mb-4 cursor-pointer"
                                >
                                    Education
                                </LinkPreview>
                                <p className="text-lg text-neutral-600 leading-relaxed">
                                    I have experience contributing to academic environments as a teaching assistant. Sharing knowledge and helping others understand complex concepts is something I genuinely value.
                                </p>
                            </div>

                            {/* Beyond Tech */}
                            <div>
                                <LinkPreview
                                    url="#"
                                    isStatic
                                    imageSrc="/hobbies.jpg"
                                    className="inline-block px-4 py-1 text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-700 rounded-full mb-4 cursor-pointer"
                                >
                                    Hobbies
                                </LinkPreview>
                                <p className="text-lg text-neutral-600 leading-relaxed">
                                    Outside of tech, I enjoy playing table tennis, basketball, and competitive games like Valorant. These activities strengthen my teamwork, strategic thinking, and focus — qualities I also bring into my technical work.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="w-full h-[600px] relative rounded-2xl overflow-hidden mt-8 shadow-sm">
                        <DomeGallery
                            images={[
                                "/galery/1.jpeg", "/galery/2.jpeg", "/galery/3.jpeg",
                                "/galery/4.jpeg", "/galery/5.jpeg", "/galery/6.jpeg",
                                "/galery/7.jpeg", "/galery/8.jpeg", "/galery/9.jpeg",
                                "/galery/10.jpeg", "/galery/11.jpeg", "/galery/12.jpeg"
                            ]}
                            fit={0.8}
                            minRadius={600}
                            maxVerticalRotationDeg={0}
                            segments={34}
                            dragDampening={2}
                            grayscale
                            overlayBlurColor="#ffffff"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
