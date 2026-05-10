import {
  FilePen,
  LoaderCircleIcon,
  LucideUploadCloud,
  LucideX,
  Pencil,
  Plus,
  Trash,
  UploadCloud,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api.js";
import pdfToText from "react-pdftotext";

const cardColors = ["#7c3aed", "#0891b2", "#16a34a", "#ea580c", "#dc2626"];

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);

  const navigate = useNavigate();

  const closeCreateModal = () => {
    setShowCreateResume(false);
    setTitle("");
  };

  const closeUploadModal = () => {
    setShowUploadResume(false);
    setTitle("");
    setResumeFile(null);
  };

  const closeEditModal = () => {
    setEditResumeId(null);
    setTitle("");
  };

  const createResume = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return toast.error("Please enter a resume title.");

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title: trimmedTitle },
        { headers: { Authorization: token } },
      );

      const createdResume = data.resume || data.Resume;
      if (!createdResume?._id) {
        throw new Error("Resume created, but the server did not return an id.");
      }

      setAllResumes((prev) => [createdResume, ...prev]);
      closeCreateModal();
      navigate(`/app/builder/${createdResume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return toast.error("Please enter a resume title.");
    if (!resumeFile) return toast.error("Please select a PDF resume.");

    setIsUploading(true);
    try {
      const resumeText = await pdfToText(resumeFile);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title: trimmedTitle, resumeText },
        { headers: { Authorization: token } },
      );

      const resumeId = data.resume?._id || data.resumeId;
      if (!resumeId) {
        throw new Error("Resume uploaded, but the server did not return an id.");
      }

      closeUploadModal();
      navigate(`/app/builder/${resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return toast.error("Please enter a resume title.");

    try {
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title: trimmedTitle } },
        { headers: { Authorization: token } },
      );

      setAllResumes((prev) =>
        prev.map((resume) =>
          resume._id === editResumeId
            ? { ...resume, title: data.resume?.title || trimmedTitle }
            : resume,
        ),
      );
      closeEditModal();
      toast.success(data.message || "Resume title updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?",
    );
    if (!confirmed) return;

    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: token },
      });
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
      toast.success(data.message || "Resume deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadAllResumes = async () => {
      if (!token) {
        if (isMounted) setIsLoadingResumes(false);
        return;
      }

      try {
        const { data } = await api.get("/api/users/resumes", {
          headers: { Authorization: token },
        });

        if (isMounted) {
          setAllResumes(Array.isArray(data.resumes) ? data.resumes : []);
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error?.response?.data?.message || error.message);
        }
      } finally {
        if (isMounted) setIsLoadingResumes(false);
      }
    };

    loadAllResumes();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const displayName = user?.name || user?.fullName || "there";
  const hasResumes = allResumes.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm shadow-slate-200/70 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                Resume workspace
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Welcome, {displayName}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Create a new resume, upload an existing PDF, or continue editing
                your saved resumes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
              <button
                type="button"
                onClick={() => setShowCreateResume(true)}
                className="group flex min-h-24 items-center gap-4 rounded-xl border border-indigo-100 bg-indigo-50/80 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-100"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200 transition-transform duration-300 group-hover:scale-105">
                  <Plus className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    Create Resume
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Start from a blank template
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowUploadResume(true)}
                className="group flex min-h-24 items-center gap-4 rounded-xl border border-cyan-100 bg-cyan-50/80 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-lg hover:shadow-cyan-100"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-md shadow-cyan-200 transition-transform duration-300 group-hover:scale-105">
                  <UploadCloud className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    Upload Existing
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Import details from a PDF
                  </span>
                </span>
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Your resumes
              </h2>
              <p className="text-sm text-slate-500">
                {hasResumes
                  ? `${allResumes.length} saved resume${allResumes.length === 1 ? "" : "s"}`
                  : "No resumes yet"}
              </p>
            </div>
          </div>

          {isLoadingResumes ? (
            <div className="flex min-h-56 items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <LoaderCircleIcon className="size-7 animate-spin text-indigo-500" />
            </div>
          ) : hasResumes ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allResumes.map((resume, index) => {
                const baseColor = cardColors[index % cardColors.length];
                return (
                  <article
                    key={resume._id}
                    className="group relative min-h-48 overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
                    style={{ borderColor: `${baseColor}22` }}
                  >
                    <button
                      type="button"
                      onClick={() => navigate(`/app/builder/${resume._id}`)}
                      className="flex h-full w-full flex-col items-start text-left"
                    >
                      <span
                        className="mb-5 flex size-12 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${baseColor}18, ${baseColor}32)`,
                          color: baseColor,
                        }}
                      >
                        <FilePen className="size-6" />
                      </span>

                      <span className="line-clamp-2 pr-14 text-base font-semibold text-slate-950">
                        {resume.title || "Untitled Resume"}
                      </span>
                      <span className="mt-auto pt-6 text-xs font-medium text-slate-400">
                        Updated on{" "}
                        {resume.updatedAt
                          ? new Date(resume.updatedAt).toLocaleDateString()
                          : "recently"}
                      </span>
                    </button>

                    <div className="absolute right-3 top-3 flex gap-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => {
                          setEditResumeId(resume._id);
                          setTitle(resume.title || "");
                        }}
                        className="flex size-8 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm ring-1 ring-slate-200 transition-colors hover:text-indigo-600"
                        aria-label="Edit resume title"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteResume(resume._id)}
                        className="flex size-8 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm ring-1 ring-slate-200 transition-colors hover:text-red-600"
                        aria-label="Delete resume"
                      >
                        <Trash className="size-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <FilePen className="size-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                Build your first resume
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Start with a clean resume or upload an existing PDF to speed up
                the process.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowCreateResume(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition-colors hover:bg-indigo-700"
                >
                  <Plus className="size-4" />
                  Create Resume
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadResume(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <UploadCloud className="size-4" />
                  Upload PDF
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {showCreateResume && (
        <form
          onSubmit={createResume}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCreateModal();
          }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-4 py-4 backdrop-blur-sm sm:items-center"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-white/70 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-6">
            <button
              type="button"
              onClick={closeCreateModal}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close create resume modal"
            >
              <LucideX className="size-5" />
            </button>
            <h2 className="pr-8 text-xl font-semibold text-slate-950">
              Create a Resume
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Give it a clear name so it is easy to find later.
            </p>
            <input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              type="text"
              placeholder="Frontend Developer Resume"
              className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
            <button className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition-colors hover:bg-indigo-700">
              Create Resume
            </button>
          </div>
        </form>
      )}

      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeUploadModal();
          }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-4 py-4 backdrop-blur-sm sm:items-center"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-white/70 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-6">
            <button
              type="button"
              onClick={closeUploadModal}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close upload resume modal"
            >
              <LucideX className="size-5" />
            </button>
            <h2 className="pr-8 text-xl font-semibold text-slate-950">
              Upload a Resume
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Upload a PDF and let the builder extract the first draft.
            </p>
            <input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              type="text"
              placeholder="My Imported Resume"
              className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
            <label htmlFor="resume-input" className="mt-4 block text-sm">
              <span className="font-medium text-slate-700">Resume PDF</span>
              <span className="mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-600">
                <LucideUploadCloud className="size-10 stroke-1.5" />
                {resumeFile ? (
                  <span>
                    <span className="block max-w-full break-all text-sm font-semibold text-slate-800">
                      {resumeFile.name}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Click to choose a different file
                    </span>
                  </span>
                ) : (
                  <span>
                    <span className="block text-sm font-semibold">
                      Choose PDF resume
                    </span>
                    <span className="mt-1 block text-xs">
                      PDF files only
                    </span>
                  </span>
                )}
              </span>
            </label>
            <input
              type="file"
              id="resume-input"
              accept="application/pdf,.pdf"
              hidden
              onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
            />
            <button
              disabled={isUploading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUploading && (
                <LoaderCircleIcon className="size-4 animate-spin text-white" />
              )}
              {isUploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </form>
      )}

      {editResumeId && (
        <form
          onSubmit={editTitle}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeEditModal();
          }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-4 py-4 backdrop-blur-sm sm:items-center"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-white/70 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:p-6">
            <button
              type="button"
              onClick={closeEditModal}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close edit resume modal"
            >
              <LucideX className="size-5" />
            </button>
            <h2 className="pr-8 text-xl font-semibold text-slate-950">
              Edit Resume Title
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Rename this resume without changing its content.
            </p>
            <input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
            <button className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition-colors hover:bg-indigo-700">
              Update Title
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
