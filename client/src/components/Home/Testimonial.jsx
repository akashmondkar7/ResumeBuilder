import React from 'react';

const Testimonial = () => {
  return (
   <div id='testimonial'className='flex flex-col items-center my-10 scroll-mt-12'>
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10  rounded-full px-6 py-1.5">
          {/* <Zap width={14}/> */}
            <span>Simple Process</span>
        </div>
        <Title title="Build your resume" description='Our streamlined proceess helps you create a professional resume in minutes with intelligent AI-powerd tools and fetures'/>

        
      
    </div>
  );
}

export default Testimonial;
