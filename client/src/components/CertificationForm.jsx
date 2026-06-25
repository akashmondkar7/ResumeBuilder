import { Award, Plus, Trash2 } from "lucide-react";
import React from "react";

const CertificationForm = ({ data, onChange }) => {
  const addCertificate = () => {
    onChange([
      ...data,
      {
        name: "",
        issuer: "",
        issue_date: "",
        credential_url: "",
      },
    ]);
  };

  const removeCertificate = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCertificate = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Certificates
          </h3>
          <p className="text-sm text-gray-500">
            Add courses, bootcamps, and technical certifications
          </p>
        </div>

        <button
          onClick={addCertificate}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Certificate
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No certificates added yet.</p>
          <p className="text-sm">Add certificates from platforms like Coursera, Udemy, NPTEL, AWS, Cisco, or Google.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((certificate, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4>Certificate #{index + 1}</h4>
                <button
                  onClick={() => removeCertificate(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={certificate.name || ""}
                  onChange={(e) => updateCertificate(index, "name", e.target.value)}
                  type="text"
                  placeholder="Certificate Name"
                  className="px-3 py-2 text-sm rounded-lg border"
                />
                <input
                  value={certificate.issuer || ""}
                  onChange={(e) => updateCertificate(index, "issuer", e.target.value)}
                  type="text"
                  placeholder="Issuer"
                  className="px-3 py-2 text-sm rounded-lg border"
                />
                <input
                  value={certificate.issue_date || ""}
                  onChange={(e) => updateCertificate(index, "issue_date", e.target.value)}
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg border"
                />
                <input
                  value={certificate.credential_url || ""}
                  onChange={(e) => updateCertificate(index, "credential_url", e.target.value)}
                  type="url"
                  placeholder="Credential URL"
                  className="px-3 py-2 text-sm rounded-lg border"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationForm;
