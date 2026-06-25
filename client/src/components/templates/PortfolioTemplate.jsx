import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useMemo } from "react";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const PortfolioTemplate = ({ data, accentColor }) => {
  const image = data.personal_info?.image;

  const imagePreview = useMemo(() => {
    if (!image || typeof image === "string") return image || "";
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    if (!imagePreview || typeof image === "string") return;
    return () => URL.revokeObjectURL(imagePreview);
  }, [image, imagePreview]);

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
    data.personal_info?.linkedin && { icon: FaLinkedin, value: data.personal_info.linkedin },
    data.personal_info?.website && { icon: FaGlobe, value: data.personal_info.website },
    data.personal_info?.github && { icon: FaGithub, value: data.personal_info.github },
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto bg-white text-zinc-800">
      <header className="grid grid-cols-[1.15fr_2fr]">
        <div className="p-8 text-white" style={{ backgroundColor: accentColor }}>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="size-28 rounded-full border-4 border-white/70 object-cover"
            />
          ) : (
            <div className="flex size-28 items-center justify-center rounded-full border-4 border-white/70 bg-white/15 text-3xl font-semibold">
              {(data.personal_info?.full_name || "Y").charAt(0)}
            </div>
          )}

          <div className="mt-7 space-y-2 text-sm">
            {contactItems.map(({ icon: Icon, value }, index) => (
              <div key={index} className="flex min-w-0 items-center gap-2">
                <Icon className="size-4 shrink-0" />
                <span className="break-all">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center px-9 py-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
            {data.personal_info?.profession || "Resume"}
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-tight text-zinc-950">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.professional_summary && (
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-600">{data.professional_summary}</p>
          )}
        </div>
      </header>

      <main className="grid grid-cols-[1.15fr_2fr] gap-8 px-8 py-8">
        <aside className="space-y-7">
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-950">
                Skills
              </h2>
              <div className="mt-3 space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-zinc-700">
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-950">
                Education
              </h2>
              <div className="mt-3 space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-zinc-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-500">{formatDate(edu.graduation_date)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <div className="space-y-8">
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-950">
                Experience
              </h2>
              <div className="mt-4 space-y-5">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative pl-5">
                    <span
                      className="absolute left-0 top-1.5 size-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-zinc-950">{exp.position}</h3>
                        <p className="text-sm font-medium" style={{ color: accentColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <p className="shrink-0 text-xs text-zinc-500">
                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-700">
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
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-950">
                Projects
              </h2>
              <div className="mt-4 grid gap-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="border-l-4 bg-zinc-50 p-4" style={{ borderColor: accentColor }}>
                    <h3 className="font-semibold text-zinc-950">{project.name}</h3>
                    {project.type && <p className="text-xs text-zinc-500">{project.type}</p>}
                    {project.description && (
                      <p className="mt-2 text-sm leading-6 text-zinc-700">{project.description}</p>
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

export default PortfolioTemplate;
