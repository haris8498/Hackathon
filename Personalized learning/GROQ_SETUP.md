# 🚀 Groq AI Setup Guide (FREE & FAST!)

## Kya hai Groq?
Groq ek **bilkul FREE** AI API hai jo **bahut fast** hai! Isme Llama 3.3 70B jaise powerful models hain.

## ✨ Features:
- ✅ **Completely FREE** (no credit card required)
- ✅ **Super FAST** responses (fastest in the market)
- ✅ **Powerful models** (Llama 3.3, Mixtral, etc.)
- ✅ **Easy to setup** (2 minutes mein ho jayega!)

---

## 📝 Setup Steps (Urdu/Hindi mein):

### Step 1: Groq Account Banao
1. Yahan jao: **https://console.groq.com**
2. "Sign Up" par click karo
3. Apna email aur password dalo
4. Email verify karo

### Step 2: API Key Le Lo
1. Dashboard mein "API Keys" section par jao
2. "Create API Key" button par click karo
3. Key ko **COPY** kar lo (ye sirf ek baar dikhegi!)

### Step 3: Project Mein Add Karo

#### Option A: .env file banao (RECOMMENDED)
1. Project folder mein `.env` file banao
2. Ye line add karo:
```bash
VITE_GROQ_API_KEY=gsk_apki_api_key_yahan_paste_karo
```
3. Server restart karo: `npm run dev`

#### Option B: .env.example copy karo
```bash
# Copy the example file
copy .env.example .env

# Then edit .env and add your API key
```

### Step 4: Test Karo!
1. App ko browser mein kholo: `http://localhost:5173`
2. Dashboard par jao
3. AI Chat mein kuch pucho
4. Real AI response milna chahiye! 🎉

---

## ⚠️ Important Notes:

### API Key Security:
- **KABHI BHI** API key ko GitHub par upload mat karo
- `.env` file `.gitignore` mein honi chahiye
- Sirf `.env.example` ko upload karo (without real key)

### Free Tier Limits:
- **14,400 requests/day** (bahut zyada hai!)
- **30 requests/minute** per model
- Agar limit cross ho to thoda wait karo

### Troubleshooting:

**Problem: "Invalid API key"**
- Solution: Check karo key sahi se copy hui hai
- Solution: `.env` file restart ke baad load hoti hai - server restart karo

**Problem: "Rate limit exceeded"**
- Solution: 1 minute wait karo, phir try karo
- Solution: Free tier ka limit pura ho gaya - kal phir try karo

**Problem: "Mock AI still showing"**
- Solution: `.env` file sahi location mein hai? (project root folder)
- Solution: Key `VITE_GROQ_API_KEY=` ke baad hai?
- Solution: Server restart kiya?

---

## 🎯 Available Models:

1. **llama-3.3-70b-versatile** ← Most powerful (RECOMMENDED)
2. **llama-3.1-70b-versatile** ← Fast and reliable
3. **mixtral-8x7b-32768** ← Good for long conversations
4. **llama-3.1-8b-instant** ← SUPER FAST responses

Code automatically sabse best model choose karega!

---

## 📱 Complete Example:

```bash
# 1. Create .env file
echo VITE_GROQ_API_KEY=gsk_your_key_here > .env

# 2. Install dependencies (if not done)
npm install

# 3. Start the server
npm run dev

# 4. Open browser
# Go to http://localhost:5173
# Click "Get Started"
# Answer questions
# Go to Dashboard
# Use AI Chat!
```

---

## 🆚 Groq vs Gemini:

| Feature | Groq | Gemini |
|---------|------|--------|
| Speed | ⚡ SUPER FAST | 🐢 Slow |
| Free Tier | ✅ 14,400/day | ✅ Limited |
| Setup | 😊 Easy | 😕 Complex |
| Credit Card | ❌ Not required | ⚠️ Sometimes required |
| Models | Llama 3.3, Mixtral | Gemini 1.5 |

---

## 💡 Tips:

1. **API key safe rakho** - .env file ko kabhi share mat karo
2. **Console check karo** - Browser console mein success message dikhega
3. **Network tab dekho** - API calls successful ho rahi hain ya nahi
4. **Mock response se compare karo** - Real AI response detailed hoga

---

## ✅ Verification Checklist:

- [ ] Groq account ban gaya?
- [ ] API key mil gayi?
- [ ] `.env` file bana li?
- [ ] API key `.env` mein paste ki?
- [ ] Server restart kiya?
- [ ] Browser console mein "Success with Groq model" dikha?
- [ ] AI Chat real responses de raha hai?

---

## 🎉 Success!

Agar sab kuch kaam kar raha hai to aapko:
- ✅ Real AI responses milenge (mock wale nahi)
- ✅ Fast responses (1-2 seconds)
- ✅ Detailed and helpful answers
- ✅ No "Mock AI" message at bottom

**Happy Learning! 🚀**

---

## 📞 Need Help?

**Console mein check karo:**
```javascript
// Browser console mein ye dikhna chahiye:
🔑 Groq API Key loaded: gsk_abc123...
🤖 Generating AI response for: your question
🔄 Trying Groq model: llama-3.3-70b-versatile
✅ Success with Groq model: llama-3.3-70b-versatile
```

**Agar problem hai to:**
1. Console errors check karo
2. Network tab mein 401/403 errors dekho
3. `.env` file location verify karo
4. Server restart karo

---

Made  for easy setup!
