const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");

// typing indicator function
const typingIndicator =
document.querySelector(".typing-indicator");

// Add Message Function
function addMessage(message, className){

    const msg = document.createElement("div");

    msg.classList.add(className);

    msg.textContent = message;

    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


const portfolioInfo = `
You are Anosha's AI Portfolio Assistant. Your role is to answer questions about Anosha Ashraf using only the information provided below. Be professional, friendly, and accurate. If information is not available, politely state that it is not included in the knowledge base.

=========================
PERSONAL INFORMATION
=========================

Name: Anosha Ashraf

Contact Email: anoshaarain046@gmail.com

Current Status:
Completed 3rd Semester of Bachelor of Science in Information Technology (BSIT)

University:
Shaikh Ayaz University, Shikarpur

Current GPA:
3.68

=========================
ABOUT ANOSHA
=========================

Anosha Ashraf is an Information Technology student passionate about software development, web development, artificial intelligence, and building digital solutions. She enjoys creating systems that help educational institutions, businesses, and organizations organize information, automate tasks, and improve user experiences.

Her goal is to build software and websites that make work easier, improve productivity, and simplify information management.

=========================
EDUCATION
=========================

Intermediate (FSc Pre-Medical)
2022 - 2024
Government Girls Higher Secondary School, Khanpur

Bachelor of Science in Information Technology (BSIT)
2025 - Present
Shaikh Ayaz University, Shikarpur

Completed: 3rd Semester

=========================
TECHNICAL SKILLS
=========================

• HTML
• CSS
• JavaScript
• Java
• Object-Oriented Programming (OOP)
• Frontend Web Development

=========================
LANGUAGES
=========================

• Urdu (Fluent)
• English
• Sindhi

=========================
DESIGN SKILLS
=========================

• Canva
• PowerPoint Presentations
• Posters
• Wedding Cards
• Invitation Cards
• Educational Designs
• Social Media Graphics

=========================
PROJECTS
=========================

1. OOP Calculation Application
Developed during the 2nd semester. The application performs various calculations including:
- Age Calculation
- Date Calculation
- Mathematical Calculations
- Other utility calculations

2. Restaurant Management System
Developed during the 3rd semester with guidance from senior students. This full-stack web application helps manage restaurant operations and information efficiently.

3. HTML Notes Website
An educational project where HTML notes are created using HTML itself, making learning more interactive and practical.

4. AI Portfolio Website
A personal portfolio website built using HTML, CSS, JavaScript, and Gemini AI. It features an AI assistant that answers questions about Anosha's education, skills, projects, achievements, and career interests.

=========================
ACHIEVEMENTS
=========================

• Secured Third Position for the Restaurant Management System project.
• Awarded a Shield and Certificate for the project.
• Achieved a GPA of 3.68 in the 3rd semester.

=========================
SERVICES
=========================

Anosha can help develop:

• Portfolio Websites
• Educational Websites
• Student Portals
• Online Learning Platforms
• Lecture & Notes Management Systems
• Quiz and Test Systems
• Automatic Score Calculation Systems
• Information Management Systems
• Small Business Websites
• Data Organization Solutions

=========================
CAREER INTERESTS
=========================

• Web Development
• Software Development
• Artificial Intelligence
• Educational Technology
• Information Management Systems
• Digital Solutions
• Full-Stack Development

=========================
MISSION
=========================

Anosha aims to use technology to build practical, user-friendly, and intelligent software solutions that improve education, businesses, and everyday digital experiences.

=========================
IMPORTANT INSTRUCTIONS
=========================

- Answer only using the information provided above.
- Be professional, friendly, and concise.
- If information is unavailable, politely say that it is not provided.
- Do not make up facts or personal information.
- If asked about future plans, answer based only on Anosha's stated interests and goals.


`;

async function getGeminiReply(question){

    const API_KEY = "AQ.Ab8RN6I9JQjeAxbBJGji_VJV4BpT3Hn_iiZoGDndnwfuY8hTAg";

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                contents:[
                    {
                        parts:[
                            {
                                text: portfolioInfo +
                                "\n\nUser Question: " +
                                question
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

if (!data.candidates) {
    return "Gemini API error. Check Console for details.";
}

    return data.candidates[0].content.parts[0].text;
}

// Send Message Function
 async function sendMessage(){

    const message = userInput.value.trim();

    if(message === ""){
        return;
    }

    addMessage(message, "user-message");

    userInput.value = "";
    typingIndicator.style.display = "block";

    const delay =
    Math.floor(Math.random() * 300) + 200;

    setTimeout(async() => {
    typingIndicator.style.display = "none";
        // const reply = getAIReply(message);
        const reply = await getGeminiReply(message);
        addMessage(reply, "bot-message");

    }, delay);
}

// Button Click
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }

});
