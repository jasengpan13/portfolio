import React from 'react';
import { Profile } from '../types';
import { Sparkles, GraduationCap, Award, Compass, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-20 border-b border-stone-800/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Background & Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Engineering Beyond The Code
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-1 max-w-2xl">
            How I approach technical challenges, cross-functional collaboration, and building products that stand the test of scale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio & Story */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 space-y-4">
              <h3 className="text-xl font-bold text-stone-100">
                Building with precision, curiosity, and empathy
              </h3>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                {profile.bio}
              </p>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                Over the past several years, I've had the privilege of architecting critical infrastructure from scratch, modernizing high-traffic legacy web applications, and helping engineering teams scale from seed to growth stage. I believe the most enduring software balances pragmatic execution today with the architectural flexibility required for tomorrow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Strong advocate for end-to-end type safety and automated testing</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Experienced in asynchronous, high-trust distributed teams</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Active contributor to open-source developer tooling</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Passionate about mentoring and level-setting engineering standards</span>
                </div>
              </div>
            </div>

            {/* How I Work */}
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 space-y-4">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                Working Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-300">
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/60 space-y-1">
                  <div className="font-semibold text-stone-100">Customer & Metric Obsessed</div>
                  <p className="text-stone-400 text-xs">Technical choices are directly tied to business ROI, user retention, and reliable SLAs.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/60 space-y-1">
                  <div className="font-semibold text-stone-100">Transparent & Written-First</div>
                  <p className="text-stone-400 text-xs">Thorough RFCs, clear PR descriptions, and collaborative architecture discussions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education, Certifications & Quick Info */}
          <div className="space-y-6">
            {/* Education Card */}
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Education & Credentials
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-stone-200">B.S. in Computer Science</div>
                  <div className="text-xs text-stone-400">University of California • Magna Cum Laude</div>
                  <div className="text-[11px] text-stone-500">Focus on Distributed Systems & Algorithms</div>
                </div>

                <div className="pt-2 border-t border-stone-800/60 space-y-1">
                  <div className="text-sm font-bold text-stone-200">AWS Certified Solutions Architect</div>
                  <div className="text-xs text-stone-400">Amazon Web Services • Professional Level</div>
                </div>

                <div className="pt-2 border-t border-stone-800/60 space-y-1">
                  <div className="text-sm font-bold text-stone-200">Certified Kubernetes Administrator (CKA)</div>
                  <div className="text-xs text-stone-400">Cloud Native Computing Foundation</div>
                </div>
              </div>
            </div>

            {/* Quick Availability & Location */}
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                Collaboration Terms
              </h3>

              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Timezone</span>
                  <span className="font-medium text-stone-200">PT (UTC-7) • Flexible overlap</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Preferred Role</span>
                  <span className="font-medium text-stone-200">Senior / Lead / Staff</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Work Arrangement</span>
                  <span className="font-medium text-stone-200">Remote / Hybrid / On-site</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-400">Notice Period</span>
                  <span className="font-medium text-emerald-400">Immediate to 2 Weeks</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
