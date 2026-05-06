

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res)=>{
    try {
        const {userContent} =req.body;

        if(!userContent){
            return res.status(400).json({message: "Missing required fields"})
        }

        await ai.chat.completions.create({
              model: "gemini-3-flash-preview",
    messages: [
        {   role: "system",
            content: "You are a helpful assistant." 
        },
        {
            role: "user",
            content: "Explain to me how AI works",
        },
    ],
        })

    } catch (error) {
        
    }
}
