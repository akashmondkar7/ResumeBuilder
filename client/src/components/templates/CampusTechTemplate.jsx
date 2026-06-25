import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const CampusTechTemplate = ({ data, accentColor }) => {
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
    <div className="max-w-4xl mx-auto bg-white text-neutral-800">
      <header className="px-8 py-7">
        <div className="rounded-lg px-6 py-5 text-white" style={{ backgroundColor: accentColor }}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Campus Placement Resume</p>
          <h1 className="mt-2 text-4xl font-bold">{data.personal_info?.full_name || "Your Name"}</h1>
          <p className="mt-1 text-sm opacity-90">{data.personal_info?.profession || "IT Student"}</p>
        </div>
        {contacts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-600">
            {contacts.map(({ icon: Icon, text }, index) => (
              <div key={index} className="flex min-w-0 items-center gap-2">
                <Icon className="size-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="break-all">{text}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="px-8 pb-8">
        {data.professional_summary && (
          <section className="mb-6">
            <h2 className="border-b pb-2 text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>
              Career Objective
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-700">{data.professional_summary}</p>
          </section>
        )}

        <div className="grid grid-cols-2 gap-7">
          <div className="space-y-6">
            {data.education?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Education</h2>
                <div className="mt-3 space-y-3">
                  {data.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-neutral-950">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <p className="text-sm text-neutral-600">{edu.institution}</p>
                      <p className="text-xs text-neutral-500">{formatDate(edu.graduation_date)} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.skills?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Technical Skills</h2>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="rounded border px-2 py-1 text-xs text-neutral-700">{skill}</span>
                  ))}
                </div>
              </section>
            )}

            {data.certifications?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Certificates</h2>
                <div className="mt-3 space-y-2">
                  {data.certifications.map((cert, index) => (
                    <div key={index}>
                      <h3 className="text-sm font-semibold text-neutral-950">{cert.name}</h3>
                      <p className="text-xs text-neutral-600">{cert.issuer} {cert.issue_date && `| ${formatDate(cert.issue_date)}`}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            {data.projects?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Projects</h2>
                <div className="mt-3 space-y-4">
                  {data.projects.map((project, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-neutral-950">{project.name}</h3>
                      {project.type && <p className="text-xs font-medium text-neutral-500">{project.type}</p>}
                      {project.description && <p className="mt-1 text-sm leading-6 text-neutral-700">{project.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.experience?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accentColor }}>Experience</h2>
                <div className="mt-3 space-y-3">
                  {data.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between gap-3">
                        <h3 className="font-semibold text-neutral-950">{exp.position}</h3>
                        <p className="text-xs text-neutral-500">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                      </div>
                      <p className="text-sm text-neutral-600">{exp.company}</p>
                      {exp.description && <p className="mt-1 text-sm leading-6 text-neutral-700">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampusTechTemplate;
