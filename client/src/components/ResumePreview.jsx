import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import PortfolioTemplate from "./templates/PortfolioTemplate";
import ITStudentTemplate from "./templates/ITStudentTemplate";
import DeveloperFresherTemplate from "./templates/DeveloperFresherTemplate";
import CampusTechTemplate from "./templates/CampusTechTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "executive":
        return <ExecutiveTemplate data={data} accentColor={accentColor} />;
      case "portfolio":
        return <PortfolioTemplate data={data} accentColor={accentColor} />;
      case "it-student":
        return <ITStudentTemplate data={data} accentColor={accentColor} />;
      case "developer-fresher":
        return <DeveloperFresherTemplate data={data} accentColor={accentColor} />;
      case "campus-tech":
        return <CampusTechTemplate data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full">
      <div
        id="resume-preview"
        className={
          "border border-gray-300 print:shadow-none print:border-none " +
          classes
        }
      >
        {renderTemplate()}
      </div>
      <style>
        {`
          @page {
            size: letter;
            margin: 0;
          }
          @media print {
            html, body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview, #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
