import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Banknote,
  Users,
  School,
  Calendar,
  Award,
  ExternalLink,
  GraduationCap,
  Layers,
  Sparkles,
} from 'lucide-react';

export const LabHubSection: React.FC = () => {
  const { data } = usePortfolio();
  const { projects, team_members, courses } = data;

  return (
    <div className="space-y-16 py-12">
      {/* 1. Sponsored Research Grants Section */}
      <section id="grants" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 mb-2 border border-purple-200 dark:border-purple-800/60">
            <Banknote className="w-3.5 h-3.5" />
            <span>Extramural Grants & Funding</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Sponsored Research Projects
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Funded investigations in post-quantum hardware ciphers, medical DICOM encryption, and edge cyber security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-academic-cardDark rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    {project.role_display || project.role}
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {project.grant_amount}
                  </span>
                </div>

                <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-2 leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-3">
                  <strong>Funding Agency:</strong> {project.funding_agency}
                </p>

                {project.summary && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {project.summary}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Duration: {project.start_year} – {project.end_year}</span>
                <span className={`font-bold ${project.status === 'ONGOING' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500'}`}>
                  {project.status_display || project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Research Team & Alumni Showcase */}
      <section id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800/60">
            <Users className="w-3.5 h-3.5" />
            <span>Scholars & Doctoral Alumni</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Research Group Members
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Doctoral scholars and alumni advancing academic institutions and technology research labs worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team_members.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-academic-cardDark rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 shrink-0 border border-zinc-200 dark:border-zinc-700">
                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white truncate">
                    {member.name}
                  </h4>
                </div>
                <div className="text-[11px] font-semibold text-academic-cobalt dark:text-cyan-400 mt-0.5">
                  {member.role_category_display || member.role_category}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {member.research_topic}
                </p>
                {member.current_position && (
                  <div className="mt-2 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60 inline-block">
                    {member.current_position}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Teaching & Curriculum */}
      <section id="teaching" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 mb-2 border border-zinc-200 dark:border-zinc-700">
            <School className="w-3.5 h-3.5" />
            <span>Academic Curriculum</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Teaching & Coursework
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            University courses taught at B.Tech, M.Tech, and Ph.D. level in the Department of Computer Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-academic-cardDark rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  {course.code}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {course.level_display || course.level}
                </span>
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1.5">
                {course.title}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                {course.description}
              </p>
              <div className="text-[11px] font-mono text-zinc-400">
                {course.semester}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
