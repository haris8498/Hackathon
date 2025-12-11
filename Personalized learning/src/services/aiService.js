import { questionsData } from '../data/questionsData';

// Initialize Groq AI (FREE and FAST!)
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

console.log('🔑 Groq API Key loaded:', GROQ_API_KEY ? `${GROQ_API_KEY.substring(0, 10)}...` : 'NOT FOUND');

// Available FREE Groq models
const GROQ_MODELS = [
    'llama-3.3-70b-versatile',      // Most powerful, great for complex tasks
    'llama-3.1-70b-versatile',      // Fast and reliable
    'mixtral-8x7b-32768',            // Good for long context
    'llama-3.1-8b-instant',         // SUPER FAST (instant responses)
];

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

// Generate AI response using Groq API
export const generateAIResponse = async (userMessage, userAnswers, conversationHistory = []) => {
    try {
        console.log('🤖 Generating AI response for:', userMessage);

        if (!GROQ_API_KEY) {
            console.log('⚠️ No Groq API key found, using mock response');
            return generateSmartMockResponse(userMessage, userAnswers);
        }

        // Build conversation messages
        const systemPrompt = createSystemPrompt(userAnswers);

        const messages = [
            {
                role: 'system',
                content: systemPrompt
            },
            // Add conversation history
            ...conversationHistory.slice(-6).map(msg => ({
                role: msg.isUser ? 'user' : 'assistant',
                content: msg.text
            })),
            // Add current message
            {
                role: 'user',
                content: userMessage
            }
        ];

        // Try each model until one works
        let lastError = null;
        for (const model of GROQ_MODELS) {
            try {
                console.log(`🔄 Trying Groq model: ${model}`);

                const response = await fetch(GROQ_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${GROQ_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: messages,
                        temperature: 0.7,
                        max_tokens: 500,
                        top_p: 1,
                        stream: false
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error?.message || `HTTP ${response.status}`);
                }

                const data = await response.json();
                const text = data.choices[0]?.message?.content;

                if (!text) {
                    throw new Error('No response content received');
                }

                console.log(`✅ Success with Groq model: ${model}`);

                return {
                    success: true,
                    message: text.trim()
                };

            } catch (error) {
                console.log(`❌ Groq model ${model} failed:`, error.message);
                lastError = error;
                continue; // Try next model
            }
        }

        // If all models failed, throw the last error
        throw lastError;

    } catch (error) {
        console.error('❌ Groq API request failed:', error);
        console.error('Error details:', error.message);

        // Check for specific error types
        if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
            return {
                success: false,
                message: "🔑 Invalid API key. Please check your Groq API key in the .env file.",
                error: error.message
            };
        } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
            return {
                success: false,
                message: "⚠️ Rate limit exceeded. Please wait a moment and try again.",
                error: error.message
            };
        } else if (!GROQ_API_KEY) {
            console.log('💡 Using smart mock AI (No API key found)');
            return generateSmartMockResponse(userMessage, userAnswers);
        } else {
            // Fallback to mock if API fails
            console.log('💡 Using smart mock AI (API error)');
            return generateSmartMockResponse(userMessage, userAnswers);
        }
    }
};

// Smart Mock AI - responds to ANY question intelligently
const generateSmartMockResponse = (userMessage, userAnswers) => {
    const mission = questionsData[0]?.options[userAnswers[0]]?.text || 'learning';
    const experience = questionsData[1]?.options[userAnswers[1]]?.text || 'beginner';
    const learningStyle = questionsData[2]?.options[userAnswers[2]]?.text || 'hands-on';
    const timeCommitment = questionsData[3]?.options[userAnswers[3]]?.text || 'flexible schedule';
    const feedback = questionsData[4]?.options[userAnswers[4]]?.text || 'balanced';

    const msg = userMessage.toLowerCase();

    // Build personalized intro
    const personalizedIntro = experience.toLowerCase().includes('beginner') ?
        "As a beginner" : experience.toLowerCase().includes('intermediate') ?
            "With your intermediate skills" : "With your advanced experience";

    // Match question patterns and generate intelligent responses
    let response = '';

    // Greetings
    if (msg.match(/^(hi|hello|hey|sup|hola)$/)) {
        response = `Hello! 👋 I'm your personalized AI tutor for LearnSpace.

**Your Learning Profile:**
📚 Goal: ${mission}
💪 Level: ${experience}
🎯 Style: ${learningStyle}
⏰ Time: ${timeCommitment}

I'm here to help you succeed! What would you like to learn today?`;
    }
    // Portfolio questions
    else if (msg.includes('portfolio') || msg.includes('project')) {
        response = `**${personalizedIntro}, here's how to build your portfolio:**

1. ${experience.toLowerCase().includes('beginner') ? 'Start simple - Todo app or calculator' : 'Create advanced apps with real features'}
2. ${mission.includes('job') ? 'Focus on projects that showcase job-ready skills' : 'Build what excites you!'}
3. ${learningStyle.includes('video') ? 'Follow video tutorials, then customize' : learningStyle.includes('Read') ? 'Use documentation to build from scratch' : 'Jump in and learn by doing'}

${timeCommitment.includes('30 minutes') ? '⏰ With 30min/day, focus on ONE quality project' : '⚡ With more time, build 2-3 diverse projects'}

Host on GitHub + Vercel. Quality > Quantity!`;
    }
    // Interview prep
    else if (msg.includes('interview')) {
        const level = experience.toLowerCase().includes('beginner') ? 'beginner' :
            experience.toLowerCase().includes('intermediate') ? 'intermediate' : 'advanced';

        if (level === 'beginner') {
            response = `**Interview prep for beginners:**

• Master JavaScript fundamentals first
• Practice 1-2 easy LeetCode daily
• Prepare STAR stories for projects
• Practice explaining code out loud

${mission.includes('job') ? 'Focus on junior developer roles first!' : ''}`;
        } else {
            response = `**Interview prep at your level:**

• LeetCode medium/hard problems
• System design concepts
• Behavioral STAR method
• Deep-dive into your projects

${mission.includes('job') ? "You're ready for mid-level roles!" : ''}`;
        }
    }
    // Motivation
    else if (msg.match(/motivat|focus|consistent/)) {
        const timeAdvice = timeCommitment.includes('30 minutes') ?
            '30 min daily is perfect - consistency beats intensity!' :
            timeCommitment.includes('1-2 hours') ?
                '1-2 hours daily? Amazing! Build something real!' :
                'Flexible schedule? Set a minimum daily goal!';

        response = `**Stay motivated on your journey to ${mission.toLowerCase()}:**

• ${timeAdvice}
• Track progress visually
• ${learningStyle.includes('video') ? 'Watch coding creators daily' : 'Join coding communities'}
• Celebrate small wins!

${feedback.includes('Gamified') ? '🎮 Level up every day!' : '💪 You got this!'}`;
    }
    // Resources
    else if (msg.match(/resource|course|tutorial|where.*learn/)) {
        if (learningStyle.includes('video') || learningStyle.includes('Watch')) {
            response = "**Video resources:**\n\n• freeCodeCamp (YouTube)\n• The Net Ninja\n• Traversy Media\n• Web Dev Simplified\n• Scrimba\n\nYou're visual - perfect for you!";
        } else if (learningStyle.includes('Read')) {
            response = "**Reading resources:**\n\n• MDN Web Docs\n• JavaScript.info\n• React Official Docs\n• CSS-Tricks\n\nBooks: Eloquent JavaScript";
        } else {
            response = "**Hands-on resources:**\n\n• freeCodeCamp\n• Frontend Mentor\n• CodeWars\n• 100 Days of Code\n\nYou learn by doing! 🔧";
        }
    }
    // Debugging help
    else if (msg.match(/debug|error|stuck|fix|broken/)) {
        response = "**Debug steps:**\n\n1. Read the error message\n2. console.log everything\n3. Google the exact error\n4. Check Stack Overflow\n5. Simplify the code\n\n90% of bugs = typos!";
    }
    // Learning path / getting started
    else if (msg.match(/learn first|start|begin/)) {
        if (mission.includes('job')) {
            response = "**Road to tech job:**\n\n1. HTML, CSS, JavaScript (3 weeks)\n2. React (2 weeks)\n3. Build 3 projects\n4. LeetCode practice\n5. Interview prep\n\nFocus on building!";
        } else {
            response = "**Start here:**\n\n1. Pick a small project idea\n2. Learn as you build\n3. Google everything\n4. Don't aim for perfect\n5. Iterate daily\n\nAction > Planning!";
        }
    }
    // Tech stack questions
    else if (msg.match(/react|javascript|html|css|node|python/)) {
        const tech = msg.includes('react') ? 'React' : msg.includes('javascript') ? 'JavaScript' : msg.includes('node') ? 'Node.js' : msg.includes('python') ? 'Python' : 'Web Dev';
        response = `**Learning ${tech}:**\n\nStart with basics, build small projects, Google errors, practice daily!\n\n${tech === 'React' ? 'Learn JS first!' : tech === 'JavaScript' ? 'Foundation of web!' : 'Great choice!'}`;
    }
    // How-to questions
    else if (msg.match(/how (do|to|can)/)) {
        response = `For building anything:\n\n1. Google "[what you want] tutorial"\n2. Break it into small steps\n3. Build one piece at a time\n4. Test as you go\n5. Don't give up!\n\nStart simple, iterate!`;
    }
    // Why questions
    else if (msg.match(/why/)) {
        response = "Great question! Understanding 'why' is key to learning.\n\nIn coding:\n• Everything has a reason\n• Patterns solve problems\n• Best practices avoid bugs\n\nAlways ask why - it helps you truly understand!";
    }
    // What is questions
    else if (msg.match(/what is|define|explain/)) {
        response = "I can explain that!\n\n**Web dev basics:**\n• HTML = Structure\n• CSS = Styling\n• JavaScript = Interactivity\n\nWhat specific concept should I explain?";
    }
    // Comparison questions
    else if (msg.match(/vs |versus|better|which/)) {
        response = "Good comparison question!\n\n**Choosing tech:**\n• Both are usually fine\n• Pick what has more jobs\n• Try both for a week\n• Don't overthink!\n\nJust start with one!";
    }
    // Salary/career
    else if (msg.match(/salary|pay|earn|money/)) {
        response = "**Tech salaries:**\n\nJunior: $50-70K\nMid: $70-120K\nSenior: $120K+\n\n**Reality:**\n• Location matters\n• Remote = more options\n• First job = learning\n\nFocus on skills first!";
    }
    // Thanks
    else if (msg.match(/thank|thanks/)) {
        response = "You're welcome! 😊\n\nKeep asking questions - that's how you grow!\n\nWhat else can I help with?";
    }
    // Default - try to be helpful anyway
    else {
        // Look for keywords
        const hasCode = msg.match(/cod(e|ing)|program|develop|build|make|create/);
        const hasLearn = msg.match(/learn|study|understand|know/);

        if (hasCode || hasLearn) {
            response = `I want to help! Let me give you advice for ${mission.toLowerCase()}:\n\n`;

            if (mission.includes('job')) {
                response += "Focus on:\n• Building real projects\n• Portfolio on GitHub\n• Interview practice\n• Networking";
            } else if (mission.includes('project')) {
                response += "My advice:\n• Start coding today\n• Break it into pieces\n• Google everything\n• Iterate fast";
            } else {
                response += "Best approach:\n• Start with basics\n• Practice consistently\n• Build fun projects\n• Never stop learning";
            }

            response += "\n\n**Can you be more specific?** Ask things like:\n• \"What should I learn first?\"\n• \"How do I build X?\"\n• \"Recommend resources\"";
        } else {
            response = `I'm your learning assistant! 🎓\n\nI can help with:\n• Learning paths & roadmaps\n• Resource recommendations\n• Coding advice\n• Debugging tips\n• Motivation & productivity\n• Career guidance\n\nWhat would you like to know?`;
        }
    }

    // Add personalized encouragement
    const encouragement = feedback.includes('Supportive') || feedback.includes('Gentle') ? "\n\n💪 You've got this!" :
        feedback.includes('Gamified') || feedback.includes('roast') ? "\n\n🎮 +10 XP!" :
            "\n\n⚙️ Keep building!";

    return {
        success: true,
        message: response + encouragement + "\n\n_💡 Mock AI - Add Groq API key to enable real AI!_",
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
