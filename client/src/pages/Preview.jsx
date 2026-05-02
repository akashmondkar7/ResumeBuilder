import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dummyResumeData from '../assets/assets';
import ResumePreview from '../components/ResumePreview';
import Loader from '../components/Loader';
import { LucideArrowLeft } from 'lucide-react';

const Preview = () => {
  const {resumeId}= useParams();

  const [isLoading, setIsloading] =useState(true);

  const [resumeData, setResumeData] = useState(null)

  const loadResumeData = async () => {

    setResumeData(dummyResumeData.find(resume => resume._id === resumeId || null))
    setIsloading(false);
    
  }

  useEffect(() => {
    loadResumeData();
  }, []);



  return  resumeData ?(
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}
        classes='py-4 bg-white'/>

      </div>
     
    </div>
  ):(
    <div>

      {isLoading ? <Loader/> :(
        <div>
          <p>Resume not found</p>
          <a href=''>
            <LucideArrowLeft className='mr-2 size-4'/>
          </a>
        </div>
      )}

    </div>
  )
}

export default Preview
