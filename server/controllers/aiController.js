

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res)=>{
    try {
        const {userContent} =req.body;

        if(!userContent){
            return res.status(400).json({message: "Missing required fields"})
        }

      const response = await ai.chat.completions.create({
              model: process.env.OPENAI_MODEL,
    messages: [
        {   role: "system",
            content: "You are an expert is resume writing your task is to enhance the professional summary of a resume.The summary should be 1-2 sentences also highlighting key skills experience, and career objectives. Make it compelling and ATS-friendly. and only return text no option or anything else" 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

        const ennhancedContent = response.choices[0].message.content;

        return res.status(200).json({enhancedContent})

    } catch (error) {

         return res.status(400).json({massage: error.message})
        
    }
}



// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res)=>{
    try {
        const {userContent} =req.body;

        if(!userContent){
            return res.status(400).json({message: "Missing required fields"})
        }

      const response = await ai.chat.completions.create({
              model: process.env.OPENAI_MODEL,
    messages: [
        {   role: "system",
            content: "You are an expert is resume writing your task is to enhance the job description of a resume. The job description should be only in 1-2 sentance also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no option or anything else."
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

        const ennhancedContent = response.choices[0].message.content;

        return res.status(200).json({enhancedContent})

    } catch (error) {

         return res.status(400).json({massage: error.message})
        
    }
}

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res)=>{
    try {
        
        const {resumeText,title} =req.body;

        const userId = req.userId;

        if(!resumeText){
            return res.status(400).json({message: "Missing required fields"})
        }



      const response = await ai.chat.completions.create({
              model: process.env.OPENAI_MODEL,
    messages: [
        {   role: "system",
            content: ""
        },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

        const ennhancedContent = response.choices[0].message.content;

        return res.status(200).json({enhancedContent})

    } catch (error) {

         return res.status(400).json({massage: error.message})
        
    }
}



