# LearnSpace AI 🚀

> Your Personalized Learning Journey, Powered by AI

A modern, intelligent learning platform that adapts to your unique learning style, goals, and schedule. Built with React and powered by advanced AI technology to provide personalized guidance for every learner.

![LearnSpace AI](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.3-61DAFB.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Features

### 🤖 **AI-Powered Personalization**
- Customized learning paths based on your answers to 5 simple questions
- AI responses tailored to your:
  - Learning goals (job hunting, project building, exam prep, hobby)
  - Experience level (beginner, intermediate, advanced)
  - Learning style (video tutorials, reading documentation, hands-on projects)
  - Time commitment (30 minutes daily, 1-2 hours, flexible)
  - Feedback preference (supportive, gamified, balanced)

### 🔐 **User Authentication**
- Secure signup/login system
- Username-based authentication
- Password protection
- User-specific data isolation
- LocalStorage-based persistence (no backend required)

### 💬 **Smart Chat Interface**
- Real-time AI conversations
- Chat history management
- User-specific chat persistence
- Date-organized chat groups (Today, Yesterday, Last 7 Days, Older)
- Create, view, and delete conversations
- Collapsible sidebar for focused learning

### 🌓 **Dark Mode Support**
- Global dark mode toggle (floating button)
- Smooth theme transitions
- Theme preference persistence
- Works across all pages (landing, auth, dashboard)

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations and transitions
- Modern, clean UI

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.3 - UI library
- **React Router** - Client-side routing
- **CSS3** - Styling with CSS variables for theming

### AI Integration
- **Groq API** (Optional) - Fast AI responses with Llama models
- **Mock AI Service** - Intelligent fallback responses

### Storage
- **LocalStorage** - User data, authentication, chat history, preferences

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/learnspace-ai.git
cd learnspace-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (Optional - for real AI)
```bash
cp .env.example .env
```

Add your Groq API key to `.env`:
```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

> **Note:** The app works perfectly without API key using smart mock AI responses!

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:5173
```

---

## 🎯 Usage

### First-Time User Flow
1. Visit the landing page
2. Click "Get Started Free" or "Login"
3. Create an account (username, password, name)
4. Answer 5 personalization questions
5. Start chatting with your AI tutor!

### Returning User Flow
1. Visit the landing page
2. Click "Login"
3. Enter credentials
4. Automatically redirected to dashboard
5. Continue your learning journey!

---

## 📁 Project Structure

```
learnspace-ai/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── Auth.jsx           # Authentication page
│   │   ├── ChatArea.jsx       # Main chat interface
│   │   ├── ThemeToggle.jsx    # Global dark mode toggle
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── LandingPage.jsx    # Landing page
│   │   ├── Dashboard.jsx      # Dashboard with chat
│   │   └── Questionnaire.jsx  # 5-question onboarding
│   ├── services/         # API services
│   │   └── aiService.js       # AI response generation
│   ├── data/             # Static data
│   │   └── questionsData.js   # Questionnaire questions
│   ├── App.jsx           # Main app with routing
│   └── main.jsx          # App entry point
├── .env.example          # Environment variables template
├── package.json          # Dependencies
└── README.md             # You are here!
```

---

## 🎨 Key Features Explained

### Personalized AI Responses

The AI system creates custom responses based on user profile. For example:

**Greeting for a beginner job seeker:**
```
Hello! 👋 I'm your personalized AI tutor for LearnSpace.

Your Learning Profile:
📚 Goal: Land a new job
💪 Level: Beginner
🎯 Style: Hands-on projects
⏰ Time: 30 minutes daily

I'm here to help you succeed! What would you like to learn today?
```

**Portfolio advice example:**
```
As a beginner, here's how to build your portfolio:

1. Start simple - Todo app or calculator
2. Focus on projects that showcase job-ready skills
3. Jump in and learn by doing

⏰ With 30min/day, focus on ONE quality project

Host on GitHub + Vercel. Quality > Quantity!
```

### Data Storage

All user data is stored locally using `localStorage`:

```javascript
// User data structure
{
  "username": {
    username: "string",
    password: "string",
    name: "string",
    hasCompletedQuestionnaire: boolean,
    answers: { 0: number, 1: number, ... },
    chats: [ /* chat objects */ ]
  }
}
```

### Theme System

The app supports light and dark modes using CSS variables:

```css
/* Light Mode */
--bg-primary: #f8f9fa;
--text-primary: #1f2937;

/* Dark Mode */
--bg-primary: #0f172a;
--text-primary: #f1f5f9;
```

---

## 🔒 Security & Privacy

- ✅ **No backend** - All data stays on your device
- ✅ **No tracking** - 100% private learning experience
- ✅ **No external data sharing**
- ✅ **Password-protected** accounts
- ⚠️ **Note:** Data is stored in browser localStorage - clearing browser data will delete your account

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👥 Developers

This project was built with ❤️ by:

- **Mahnoor** - Full Stack Developer
- **Muhammad Haris Khan** - Full Stack Developer

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Groq API](https://groq.com/) - Fast AI inference
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [DiceBear](https://dicebear.com/) - Avatar generation

---

## 📧 Support

Having issues? Found a bug? Want to suggest a feature?

- Create an issue on GitHub
- Contact us at: support@learnspace-ai.com

---

## 🎯 Future Enhancements

- [ ] Backend database integration (Firebase/Supabase)
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social login (Google, GitHub)
- [ ] Chat export/import
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Voice-to-text input
- [ ] Markdown support in responses
- [ ] Code syntax highlighting

---

Made with 💙 by Mahnoor & Muhammad Haris Khan

⭐ Star us on GitHub if you find this helpful!
