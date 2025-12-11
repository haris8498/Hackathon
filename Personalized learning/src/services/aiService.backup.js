import { GoogleGenerativeAI } from '@google/generative-ai';
import { questionsData } from '../data/questionsData';

// Initialize Gemini AI with debugging
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log('🔑 API Key loaded:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');

const genAI = new GoogleGenerativeAI(apiKey || '');

// Create personalized system prompt based on user answers
const createSystemPrompt = (userAnswers) => {
    const mission = questionsData[0]?.options[userAnswers[0]]?.text || 'learning';
    const experience = questionsData[1]?.options[userAnswers[1]]?.text || 'beginner';
    const learningStyle = questionsData[2]?.options[userAnswers[2]]?.text || 'mixed approach';
    const timeCommitment = questionsData[3]?.options[userAnswers[3]]?.text || 'flexible schedule';
    const feedbackStyle = questionsData[4]?.options[userAnswers[4]]?.text || 'balanced feedback';

    return `You are a personalized learning assistant for LearnSpace AI.

User Profile:
- Main Goal: ${mission}
- Experience Level: ${experience}
- Learning Style: ${learningStyle}
- Time Availability: ${timeCommitment}
- Preferred Feedback: ${feedbackStyle}

Your role:
1. Answer their learning and coding questions based on their experience level
2. Provide guidance tailored to their main goal
3. Suggest resources that match their learning style
4. Keep responses concise and actionable
5. Use an ${feedbackStyle} tone

Guidelines:
- For beginners: Use simple explanations, avoid jargon, encourage experimentation
- For intermediate: Provide best practices, optimization tips, and deeper understanding
- For advanced: Discuss architecture, advanced patterns, and industry insights
- Always relate answers back to their goal: ${mission}
- Keep responses under 150 words unless they specifically ask for detailed explanations
- Be encouraging but honest about learning paths

Remember: Your goal is to help them succeed in ${mission} by providing personalized, actionable guidance.`;
};

// Try multiple model names to find one that works
const MODEL_FALLBACKS = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-1.5-pro-latest',
    'gemini-pro',
    'models/gemini-1.5-flash-latest',
    'models/gemini-pro'
];

// Generate AI response
export const generateAIResponse = async (userMessage, userAnswers, conversationHistory = []) => {
    try {
        console.log('🤖 Generating AI response for:', userMessage);

        if (!apiKey) {
            throw new Error('API key is missing. Please add VITE_GEMINI_API_KEY to your .env file');
        }

        // Try each model until one works
        let lastError = null;
        for (const modelName of MODEL_FALLBACKS) {
            try {
                console.log(`🔄 Trying model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const systemPrompt = createSystemPrompt(userAnswers);

                // Build conversation context
                const context = conversationHistory.map(msg =>
                    `${msg.isUser ? 'User' : 'Assistant'}: ${msg.text}`
                ).join('\n');

                const fullPrompt = `${systemPrompt}\n\nConversation History:\n${context}\n\nUser: ${userMessage}\n\nAssistant:`;

                console.log('📤 Sending request to Gemini...');
                const result = await model.generateContent(fullPrompt);
                const response = await result.response;
                const text = response.text();

                console.log(`✅ Success with model: ${modelName}`);

                return {
                    success: true,
                    message: text.trim()
                };
            } catch (error) {
                console.log(`❌ Model ${modelName} failed:`, error.message);
                lastError = error;
                continue; // Try next model
            }
        }

        // If all models failed, throw the last error
        throw lastError;

    } catch (error) {
        console.error('❌ All Gemini models failed:', error);
        console.error('Error details:', error.message);

        // If it's a 404 error (model not available), use mock response
        if (error.message?.includes('404')) {
            console.log('💡 Using mock AI response (Gemini API not fully activated yet)');
            return generateMockResponse(userMessage, userAnswers);
        }

        // More specific error messages for other errors
        let errorMessage = "I'm having trouble connecting right now.";

        if (error.message?.includes('API_KEY_INVALID')) {
            errorMessage = "❌ API Key is invalid. Please check your Gemini API key in the .env file.";
        } else if (error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
            errorMessage = "⚠️ API quota exceeded. Please check your Gemini API usage limits or try again later.";
        } else if (!apiKey) {
            errorMessage = "🔑 No API key found. Please add VITE_GEMINI_API_KEY to your .env file and restart the server.";
        } else {
            errorMessage = `⚠️ ${error.message}`;
        }

        return {
            success: false,
            message: errorMessage,
            error: error.message
        };
    }
};

// Mock AI response generator (much smarter fallback)
const generateMockResponse = (userMessage, userAnswers) => {
    const mission = questionsData[0]?.options[userAnswers[0]]?.text || 'learning';
    const experience = questionsData[1]?.options[userAnswers[1]]?.text || 'beginner';
    const learningStyle = questionsData[2]?.options[userAnswers[2]]?.text || 'hands-on';
    const timeCommit = questionsData[3]?.options[userAnswers[3]]?.text || 'flexible';
    const feedback = questionsData[4]?.options[userAnswers[4]]?.text || 'balanced';

    const normalizedMsg = userMessage.toLowerCase();
    let response = '';

    // LEARNING PATH
    if (normalizedMsg.match(/learn first|where (to )?start|begin|get started/)) {
        if (mission.includes('job')) {
            response = "**Your tech job roadmap:**\n\n1. HTML, CSS, JavaScript fundamentals (2-3 weeks)\n2. React framework (2 weeks)\n3. Build 3 portfolio projects\n4. Practice LeetCode problems daily\n5. Interview preparation\n\nFocus on building real things - employers value makers!";
        } else if (mission.includes('project')) {
            response = "**Project building guide:**\n\n1. Define your MVP (minimum viable product)\n2. Choose React + Firebase for quick start\n3. Break into small daily tasks\n4. Code now, perfect later\n5. Google every error you hit\n\nStart messy, iterate fast!";
        } else if (mission.match(/exam|university|academic/)) {
            response = "**Exam success strategy:**\n\n1. Review full syllabus first\n2. Understand concepts, don't memorize\n3. Practice past papers\n4. Create visual summary notes\n5. Daily consistent study\n\nFocus on 'why' things work!";
        } else {
            response = "**Fun learning path:**\n\nBuild a simple game or interactive site with JavaScript! Start with something exciting - you'll learn faster when you're having fun.\n\nTry: Tic-tac-toe, quiz app, or animated landing page.";
        }
    }

    // PORTFOLIO
    else if (normalizedMsg.match(/portfolio|projects? to build|showcase/)) {
        response = "**Strong portfolio = 3-5 quality projects:**\n\n**Must-haves:**\n1. Personal website (shows you)\n2. Full-stack app (shows skills)\n3. API integration project\n\n**Bonus:**\n4. Something unique & creative\n5. Open source contributions\n\n**Pro tips:** GitHub + Vercel, clear READMEs, explain decisions. Quality > Quantity!";
    }

    // INTERVIEW PREP
    else if (normalizedMsg.match(/interview|job prep|technical interview/)) {
        response = "**Ace tech interviews:**\n\n**Technical:**\n• LeetCode easy→medium daily\n• System design basics\n• Master your stack deeply\n\n**Behavioral:**\n• STAR method answers\n• Prepare 5-6 growth stories\n• Show learning mindset\n\n**Projects:**\n• Explain your code clearly\n• Discuss challenges solved\n\nPractice coding out loud!";
    }

    // MOTIVATION
    else if (normalizedMsg.match(/motivat|stay focused|consistent|give up|struggling/)) {
        response = "**Stay motivated:**\n\n1. Set tiny daily goals (30 min beats 5 hours once)\n2. Track progress visually\n3. Join coding communities (Twitter, Discord)\n4. Build in public - share wins\n5. Celebrate small victories\n6. Find an accountability buddy\n\nReminder: Every expert was once a beginner struggling like you! 💪";
    }

    // TIME MANAGEMENT
    else if (normalizedMsg.match(/time|schedule|manage|busy/)) {
        const timeText = timeCommit.includes('15') ? 'With 15 min/day' : timeCommit.includes('weekend') ? 'Weekend warrior' : timeCommit.includes('4+') ? 'Full-time learning' : '1 hour daily';
        response = `**${timeText} - maximize it:**\n\n• Pomodoro: 25 min focus, 5 min break\n• Prioritize doing > perfecting\n• Phone away = no distractions\n• Code, don't just watch videos\n• Review regularly\n\nQuality focused time > long distracted sessions!`;
    }

    // RESOURCES
    else if (normalizedMsg.match(/resource|recommend|tutorial|course|learn.*(from|where)/)) {
        if (learningStyle.match(/video|watch/i)) {
            response = "**Best video resources:**\n\n• freeCodeCamp (YouTube) - comprehensive\n• The Net Ninja - clear & concise\n• Traversy Media - practical projects\n• Web Dev Simplified - modern practices\n• Scrimba - code along interactively\n\nYou're visual → videos work great for you!";
        } else if (learningStyle.match(/manual|read|documentation/i)) {
            response = "**Best docs & reading:**\n\n• MDN Web Docs - web dev bible\n• JavaScript.info - JS deep dive\n• Official React docs\n• CSS-Tricks - CSS mastery\n\n**Books:** Eloquent JavaScript, You Don't Know JS\n\nYou prefer reading - these are gold!";
        } else {
            response = "**Best hands-on learning:**\n\n• freeCodeCamp - code while learning\n• Frontend Mentor - real projects\n• CodeWars - coding challenges\n• 100 Days of Code - build daily\n\nYou learn by doing - perfect! Build clones, contribute to open source.";
        }
    }

    // DEBUGGING
    else if (normalizedMsg.match(/debug|error|stuck|fix|problem|not working/)) {
        response = "**Debug like a pro:**\n\n1. Read the error - what's it saying?\n2. console.log everything - see values\n3. Google exact error message\n4. Check Stack Overflow\n5. Simplify to smallest failing case\n6. Rubber duck it - explain aloud\n\n**Pro tip:** 90% of bugs = typos or wrong assumptions about data!";
    }

    // SPECIFIC TECH
    else if (normalizedMsg.match(/react|javascript|js|html|css/)) {
        const tech = normalizedMsg.match(/react/i) ? 'React' : normalizedMsg.match(/javascript|js/i) ? 'JavaScript' : normalizedMsg.match(/css/i) ? 'CSS' : 'HTML';
        const paths = {
            'React': '1. Master JS first (ES6+)\n2. Components & props\n3. Hooks (useState, useEffect)\n4. Small projects practice\n5. Routing & state management\n\nReact is easier after JS!',
            'JavaScript': '1. Variables, types, functions\n2. Arrays & objects\n3. DOM manipulation\n4. Async JS (promises, async/await)\n5. ES6+ features\n\nJS is the foundation!',
            'CSS': '1. Box model & positioning\n2. Flexbox & Grid\n3. Responsive design\n4. Animations\n5. CSS variables\n\nPractice by cloning sites!',
            'HTML': '1. Semantic HTML\n2. Forms & inputs\n3. Accessibility basics\n4. SEO fundamentals\n5. HTML5 features\n\nSimple but crucial!'
        };
        response = `**${tech} learning path:**\n\n${paths[tech]}`;
    }

    // SALARY/CAREER
    else if (normalizedMsg.match(/salary|pay|earn|money|worth/)) {
        response = "**Tech salaries:**\n\n**Entry:** Junior dev $50-70K, Internships $15-25/hr\n**Mid:** 2-5 years $70-120K\n**Senior:** $120-180K+\n\n**Reality check:**\n• Remote = more options\n• Location matters\n• Skills > titles\n\nFirst job = learning opportunity, not lottery!";
    }

    // DEFAULT SMART RESPONSE
    else {
        const goalText = mission.includes('job') ? 'land that job' : mission.includes('project') ? 'build your project' : mission.match(/exam|university/) ? 'ace exams' : 'enjoy coding';
        const advice = mission.includes('job') ? 'Build real projects. Nothing beats shipping code employers can see and try.' :
            mission.includes('project') ? 'Start coding today. Break it into tiny pieces. Google everything.' :
                mission.match(/exam|university/) ? 'Understand deeply, not just memorize. Practice past papers.' :
                    'Build something fun that excites you!';

        response = `Great question! For someone wanting to ${goalText}:\n\n${advice}\n\n**Your level (${experience}):** ${experience.includes('never') ? 'Be patient, start with basics, celebrate small wins' : 'Challenge yourself with harder topics'}.`;
    }

    // Personalized encouragement
    const encouragement = feedback.includes('Gentle') || feedback.includes('Supportive') ?
        "\n\n💪 You've got this!" :
        feedback.includes('Gamified') || feedback.includes('roast') ?
            "\n\n🎮 +10 XP! Keep grinding!" :
            "\n\n⚙️ Execute systematically.";

    return {
        success: true,
        message: response + encouragement + "\n\n_💡 Mock AI active. Real Gemini responses coming when API activates!_",
        isMock: true
    };
};

// Get quick starter suggestions based on user profile
export const getStarterSuggestions = (userAnswers) => {
    const mission = userAnswers[0];

    const suggestions = {
        0: [ // Land a new job
            "What skills should I focus on for tech interviews?",
            "How do I build a strong portfolio?",
            "Can you recommend a learning path for landing a job?"
        ],
        1: [ // Build a project
            "How should I plan my project architecture?",
            "What technologies should I use for my project?",
            "Can you help me debug my code?"
        ],
        2: [ // Ace exams
            "What are the most important concepts to study?",
            "How should I prepare for my upcoming exam?",
            "Can you explain this topic in simple terms?"
        ],
        3: [ // Exploring hobby
            "What's fun to learn as a beginner?",
            "Can you suggest a creative coding project?",
            "How do I make learning more enjoyable?"
        ]
    };

    return suggestions[mission] || [
        "What should I learn first?",
        "How can I stay motivated?",
        "What resources do you recommend?"
    ];
};
