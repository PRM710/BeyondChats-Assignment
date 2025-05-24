
# BeyondChats – Intershala Assignment

Welcome to **BeyondChats**, my submission for the Intershala assignment. This is a showcase project built with React to demonstrate AI chatbot integration using OpenAI's GPT model.

🧪 Important Notice:
For demonstration and testing purposes, both the customer and the support system chats are simulated and fully controlled by us.
This ensures predictable responses and avoids unexpected API behavior during evaluation.

⚠️ **Important Note (PLEASE READ)**  
This project contains a temporary public API key for evaluation purposes **only**. Once you have evaluated the project, kindly notify me at 📧 **prakashprm710@gmail.com** so that I can **dispose of the key** immediately.

---

## 🛠️ Steps to Run the Project

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Replace the API Key

Go to the file:

```
hooks/useAIAssistant.js
```

And update this line:

```js
'Authorization': 'Bearer "REPLACE THIS WITH YOUR API-KEY"'
```

with **your own ChatGPT API key**, or integrate your own AI service accordingly.

> This API key is public **ONLY FOR EVALUATION PURPOSES**. I will remove it once your evaluation is complete.

---

### 3. Install Dependencies

Run the following commands in the project folder:

```bash
npm install react react-dom axios
npm install --save-dev @testing-library/react @testing-library/jest-dom eslint prettier
npm install openai
```

---

### 4. Start the Development Server

```bash
npm run dev
```

You should now be able to interact with the BeyondChats application in your browser.

---

## 🔐 Why No Security for API Key?

Since this is a **showcase project**, I have not implemented security measures like `.env` file or server-side proxy. This was done for simplicity and easy access during your evaluation. In a production environment, **API keys must always be secured.**

---

## 📩 Contact

Please let me know once you are done checking the project so I can **safely remove the API key**.

📧 Email: **prakashprm710@gmail.com**

DEPLOYED LINK: https://beyond-chats-assignment-yi67.vercel.app/

Thank you for your time and consideration! 🙏

---

> © 2025 Prakash – For Intershala Assignment Submission Only.
