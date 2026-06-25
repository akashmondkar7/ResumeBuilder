import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const ExecutiveTemplate = ({ data, accentColor }) => {
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
    data.personal_info?.linkedin && { icon: FaLinkedin, text: data.personal_info.linkedin },
    data.personal_info?.website && { icon: FaGlobe, text: data.personal_info.website },
    data.personal_info?.github && { icon: FaGithub, text: data.personal_info.github },
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto bg-white text-slate-800">
      <header className="px-9 pt-9 pb-7 border-b-4" style={{ borderColor: accentColor }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">
          {data.personal_info?.profession || "Professional Resume"}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-950">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {contacts.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2 text-xs text-slate-600">
            {contacts.map(({ icon: Icon, text }, index) => (
              <div key={index} className="flex min-w-0 items-center gap-2">
                <Icon className="size-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="truncate">{text}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="grid grid-cols-[1fr_2.15fr] gap-8 px-9 py-8">
        <aside className="space-y-7">
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Core Skills
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded border px-2.5 py-1 text-xs font-medium text-slate-700"
                    style={{ borderColor: `${accentColor}55` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Education
              </h2>
              <div className="mt-3 space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-slate-950">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(edu.graduation_date)}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <div className="space-y-7">
          {data.professional_summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                Profile
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{data.professional_summary}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                Experience
              </h2>
              <div className="mt-4 space-y-5">
                {data.experience.map((exp, index) => (
                  <div key={index} className="border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-slate-950">{exp.position}</h3>
                        <p className="text-sm font-medium" style={{ color: accentColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <p className="shrink-0 text-xs text-slate-500">
                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                Selected Projects
              </h2>
              <div className="mt-4 space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-slate-950">{project.name}</h3>
                    {project.type && <p className="text-xs text-slate-500">{project.type}</p>}
                    {project.description && (
                      <p className="mt-1 text-sm leading-6 text-slate-700">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExecutiveTemplate;
