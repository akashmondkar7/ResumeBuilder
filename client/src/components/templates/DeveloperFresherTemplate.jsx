import { Mail, MapPin, Phone, Terminal } from "lucide-react";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const DeveloperFresherTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const contactItems = [
    data.personal_info?.email && { icon: Mail, value: data.personal_info.email },
    data.personal_info?.phone && { icon: Phone, value: data.personal_info.phone },
    data.personal_info?.location && { icon: MapPin, value: data.personal_info.location },
    data.personal_info?.github && { icon: FaGithub, value: data.personal_info.github },
    data.personal_info?.linkedin && { icon: FaLinkedin, value: data.personal_info.linkedin },
    data.personal_info?.website && { icon: FaGlobe, value: data.personal_info.website },
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto bg-zinc-950 text-zinc-100">
      <header className="px-8 py-8">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-md bg-white/10">
            <Terminal className="size-6" style={{ color: accentColor }} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Developer Fresher</p>
            <h1 className="text-4xl font-semibold">{data.personal_info?.full_name || "Your Name"}</h1>
          </div>
        </div>
        {data.professional_summary && (
          <p className="mt-5 max-w-3xl text-sm leading-6 text-zinc-300">{data.professional_summary}</p>
        )}
        {contactItems.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-zinc-300">
            {contactItems.map(({ icon: Icon, value }, index) => (
              <div key={index} className="flex min-w-0 items-center gap-2">
                <Icon className="size-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="truncate">{value}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="grid grid-cols-[1fr_1.8fr] gap-7 bg-white px-8 py-8 text-zinc-800">
        <aside className="space-y-6">
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Technical Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="rounded-md px-2 py-1 text-xs text-white" style={{ backgroundColor: accentColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Education</h2>
              <div className="mt-3 space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-zinc-950">{edu.degree}</h3>
                    {edu.field && <p className="text-sm text-zinc-700">{edu.field}</p>}
                    <p className="text-sm text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-500">{formatDate(edu.graduation_date)} {edu.gpa && `| ${edu.gpa}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Certifications</h2>
              <div className="mt-3 space-y-3">
                {data.certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-zinc-950">{cert.name}</h3>
                    <p className="text-xs text-zinc-600">{cert.issuer} {cert.issue_date && `| ${formatDate(cert.issue_date)}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <div className="space-y-7">
          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>Builds / Projects</h2>
              <div className="mt-3 space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="rounded-md border border-zinc-200 p-4">
                    <h3 className="font-semibold text-zinc-950">{project.name}</h3>
                    {project.type && <p className="text-xs font-medium" style={{ color: accentColor }}>{project.type}</p>}
                    {project.description && <p className="mt-2 text-sm leading-6 text-zinc-700">{project.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>Experience</h2>
              <div className="mt-3 space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-zinc-950">{exp.position}</h3>
                        <p className="text-sm text-zinc-600">{exp.company}</p>
                      </div>
                      <p className="text-xs text-zinc-500">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                    </div>
                    {exp.description && <p className="mt-2 text-sm leading-6 text-zinc-700">{exp.description}</p>}
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

export default DeveloperFresherTemplate;
