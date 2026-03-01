"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import Lanyard from "@/components/ui/lanyard";
import RotatingText from "@/components/ui/rotating-text";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

const loadingStates = [
  { text: "Sleep" },
  { text: "Eat" },
  { text: "Learn" },
  { text: "Welcome to my Portofolio!" }
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for the multi-step loader to cycle through all states (4 states * 800ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full relative">
      <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={800} loop={false} />

      {!loading && (
        <div className="max-w-5xl mx-auto flex flex-col pb-20 pt-8 mt-16 lg:mt-0 animate-in fade-in duration-700 border-none">

          {/* Hero / Intro Section */}
          <section id="about" className="w-full relative min-h-[calc(100vh-8rem)] pb-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 overflow-hidden bg-white rounded-lg">

            {/* Integrated interactive ripple background */}
            <div className="absolute inset-0 z-0">
              <BackgroundRippleEffect />
            </div>

            {/* Background layer for Lanyard (mobile on top + desktop on right) */}
            <div className="w-full h-80 md:h-auto md:w-1/2 relative z-50 flex items-center justify-center md:justify-end md:-mr-12 order-1 md:order-2 pointer-events-none">
              <div className="pointer-events-auto w-full h-full">
                <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
              </div>
            </div>

            <div className="w-full md:w-1/2 relative z-10 px-4 md:px-0 mt-4 md:mt-0 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
                  <div className="mb-3">Hi there, I'm a</div>
                  <div className="mt-2 text-3xl sm:text-4xl md:text-5xl">
                    <RotatingText
                      texts={['Learner', 'Player', 'Enjoyer', 'Developer']}
                      mainClassName="px-2 sm:px-3 md:px-4 bg-neutral-900 text-white overflow-hidden py-1 sm:py-2 md:py-2 justify-center rounded-lg inline-flex"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                    />
                  </div>
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed mt-8">
                  I am a Full-stack Developer and Statistician specializing in creating functional web applications and IT infrastructure.
                </p>
              </motion.div>
            </div>

          </section>
        </div>
      )}
    </div>
  );
}
