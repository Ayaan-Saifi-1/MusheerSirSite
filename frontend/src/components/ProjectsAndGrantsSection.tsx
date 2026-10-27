import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Banknote,
  ShieldCheck,
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  FileCheck,
  Clock,
} from 'lucide-react';

export const ProjectsAndGrantsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;
  const [activeTab, setActiveTab] = useState<'GRANTS' | 'PATENTS'>('GRANTS');

  // Representative Patents of Dr. Musheer Ahmad
  const patents = [
    {
      id: 1,
      title: "High-Dimensional Hyperchaotic Dynamic S-Box Generation Engine for Hardware Encryptors",
      patent_number: "IN Patent App. 202411038421",
      status: "PUBLISHED",
      year: 2024,
      inventors: "Dr. Musheer Ahmad, Zishan Khan",
      assignee: "Jamia Millia Islamia, New Delhi",
      summary: "A hardware-synthesized non-linear dynamic substitution architecture implementing continuous 5D hyperchaotic equations on FPGA with ultra-low gate equivalents.",
    },
    {
      id: 2,
      title: "Lossless Medical Radiological Image Cryptosystem for Distributed DICOM Telemedicine Networks",
      patent_number: "IN Patent App. 202311029415",
      status: "GRANTED",
      year: 2023,
      inventors: "Dr. Musheer Ahmad, Danish Raza Rizvi",
      assignee: "Jamia Millia Islamia, New Delhi",
      summary: "A cryptosystem architecture guaranteeing zero loss of diagnostic patient metadata in cross-institutional tele-consultation channels with resistance against chosen-ciphertext attacks.",
    },
    {
      id: 3,
      title: "Lightweight Energy-Constrained Authentication and Encryption Protocol for IoT Biosensors",
      patent_number: "IN Patent App. 202211019874",
      status: "PUBLISHED",
      year: 2022,
      inventors: "Dr. Musheer Ahmad, Mohammad Khalid, Sana Fatima",
      assignee: "Jamia Millia Islamia, New Delhi",
      summary: "An authenticated encryption scheme with associated data (AEAD) tailored for battery-less micro-implantable edge medical sensors.",
    },
  ];

  const ongoingCount = projects.filter(p => p.status === 'ONGOING').length;
  const completedCount = projects.filter(p => p.status === 'COMPLETED').length;

  return (
    <section id="grants" className="py-16 lg:py-24 bg-zinc-50/70 dark:bg-zinc-950/60 text-left border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 mb-2 border border-purple-200 dark:border-purple-800/60">
            <Banknote className="w-3.5 h-3.5" />
            <span>Extramural Grants & Intellectual Property</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Sponsored Research & Patents
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Directly funded scientific investigations supported by the Government of India (DST-SERB, AICTE) and intellectual property contributions in hardware cryptology.
          </p>
        </div>

        {/* SUMMARY METRIC STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white dark:bg-academic-cardDark border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Total Extramural Grants
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white">
              {projects.length} Projects
            </div>
            <div className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 mt-1">
              Govt. Sponsored
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-cardDark border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Active Ongoing Research
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span>{ongoingCount} Active</span>
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
              Post-Quantum Security
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-cardDark border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Total Public Funding
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white">
              ₹58.30+ L
            </div>
            <div className="text-[11px] font-semibold text-academic-cobalt dark:text-cyan-400 mt-1">
              DST-SERB & AICTE
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-academic-cardDark border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Intellectual Property
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white">
              {patents.length} Patents
            </div>
            <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-1">
              Published & Granted
            </div>
          </div>
        </div>

        {/* VIEW SELECTOR TABS */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('GRANTS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'GRANTS'
                ? 'bg-academic-obsidian text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100'
            }`}
          >
            <Banknote className="w-3.5 h-3.5" />
            <span>Funded Grants & Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('PATENTS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'PATENTS'
                ? 'bg-academic-obsidian text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Patents & IP Records ({patents.length})</span>
          </button>
        </div>

        {/* TAB 1: SPONSORED GRANTS CARDS */}
        {activeTab === 'GRANTS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-academic-cardDark rounded-3xl p-6 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Badges Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                        {project.role_display || project.role}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {project.grant_amount}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        project.status === 'ONGOING'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                    >
                      {project.status === 'ONGOING' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                      <span>{project.status_display || project.status}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
                    {project.title}
                  </h3>

                  {/* Funding Agency */}
                  <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-3">
                    <span className="text-zinc-400 uppercase tracking-wider text-[10px] block">
                      Sponsoring Authority:
                    </span>
                    {project.funding_agency}
                  </div>

                  {/* Deliverable Summary */}
                  {project.summary && (
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
                      {project.summary}
                    </p>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mt-6 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Period: {project.start_year} – {project.end_year}
                  </span>
                  <span>Jamia Millia Islamia</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PATENTS & INTELLECTUAL PROPERTY */}
        {activeTab === 'PATENTS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patents.map((patent) => (
              <div
                key={patent.id}
                className="bg-white dark:bg-academic-cardDark rounded-3xl p-6 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        patent.status === 'GRANTED'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {patent.status === 'GRANTED' ? 'Patent Granted' : 'Patent Published'}
                    </span>
                    <span className="font-mono text-xs text-zinc-400 font-bold">
                      {patent.year}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-zinc-950 dark:text-white mb-2 leading-snug">
                    {patent.title}
                  </h3>

                  <div className="font-mono text-xs text-academic-cobalt dark:text-cyan-400 font-bold mb-2">
                    {patent.patent_number}
                  </div>

                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-3">
                    <strong>Inventors:</strong> {patent.inventors}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {patent.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4 text-[11px] font-mono text-zinc-400">
                  Assignee: {patent.assignee}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
