import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const ITStudentTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const contacts = [
    data.personal_info?.email && { icon: Mail, text: data.personal_info.email },
    data.personal_info?.phone && { icon: Phone, text: data.personal_info.phone },
    data.personal_info?.location && { icon: MapPin, text: data.personal_info.location },
    data.personal_info?.github && { icon: FaGithub, text: data.personal_info.github },
    data.personal_info?.linkedin && { icon: FaLinkedin, text: data.personal_info.linkedin },
    data.personal_info?.website && { icon: FaGlobe, text: data.personal_info.website },
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto bg-white text-slate-800">
      <header className="px-8 py-7 border-b" style={{ borderColor: accentColor }}>
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
              IT Student Resume
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-950">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {data.personal_info?.profession || "Computer Science Student"}
            </p>
          </div>
          {data.skills?.length > 0 && (
            <div className="max-w-xs text-right">
              <p className="text-xs font-semibold uppercase text-slate-500">Tech Stack</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{data.skills.slice(0, 8).join(" | ")}</p>
            </div>
          )}
        </div>

        {contacts.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-2 text-xs text-slate-600">
            {contacts.map(({ icon: Icon, text }, index) => (
              <div key={index} className="flex min-w-0 items-center gap-2">
                <Icon className="size-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="truncate">{text}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="grid grid-cols-[1.35fr_1fr] gap-7 px-8 py-7">
        <div className="space-y-6">
          {data.professional_summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>
                Objective
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{data.professional_summary}</p>
            </section>
          )}

          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>
                Academic Projects
              </h2>
              <div className="mt-3 space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="rounded-md border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-slate-950">{project.name}</h3>
                      {project.type && <span className="text-xs text-slate-500">{project.type}</span>}
                    </div>
                    {project.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-700">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>
                Internship / Experience
              </h2>
              <div className="mt-3 space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-950">{exp.position}</h3>
                        <p className="text-sm font-medium" style={{ color: accentColor }}>{exp.company}</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </p>
                    </div>
                    {exp.description && <p className="mt-2 text-sm leading-6 text-slate-700">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-950">Education</h2>
              <div className="mt-3 space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-slate-950">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                    <p className="text-xs text-slate-500">
                      {formatDate(edu.graduation_date)} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-950">Certificates</h2>
              <div className="mt-3 space-y-3">
                {data.certifications.map((certificate, index) => (
                  <div key={index} className="border-l-2 pl-3" style={{ borderColor: accentColor }}>
                    <h3 className="text-sm font-semibold text-slate-950">{certificate.name}</h3>
                    <p className="text-xs text-slate-600">{certificate.issuer}</p>
                    <p className="text-xs text-slate-500">{formatDate(certificate.issue_date)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-950">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
};

export default ITStudentTemplate;
