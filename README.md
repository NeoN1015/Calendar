Markdown
# 📅 Event Calendar – Group Project

A full‑stack event calendar app with drag & drop, multiple views, and persistent storage.  
Built with **Node.js + Express + SQLite** (backend) and **HTML/CSS/JS + FullCalendar** (frontend).

## 🌐 Live Demo

- **Frontend (GitHub Pages):** [https://NeoN1015.github.io/Calendar/](https://NeoN1015.github.io/Calendar/)  
- **Backend API (Render):** [https://calendar-8mgz.onrender.com/events](https://calendar-8mgz.onrender.com/events)

> ⚠️ **Note:** The free backend tier spins down after periods of inactivity. The first request may take up to 50 seconds to wake up. Please be patient.

---

## 🧑‍💻 How to Use the Calendar

1. **Add an event** – Click “Add New Event”, fill in the name, date, time (optional), and description.  
2. **Edit an event** – Click the “Edit” button in the event list **or** click any event directly on the calendar.  
3. **Delete an event** – Click the “Delete” button (confirmation required).  
4. **Drag & drop** – Move an event to a different day/time directly on the calendar.  
5. **Resize** – Drag the bottom edge of an event to change its end time.  
6. **Change view** – Use the navigation buttons at the top‑right (month, week, day).  


All changes are saved instantly in a SQLite database (online mode) or your local database (local mode).

---

## 🔧 Configuration & Customization (for developers)

### Switching Between Local and Online Mode

The app automatically detects where it is running:
* **Local mode:** When you open `http://localhost:3000/calendar.html` (after running `node server.js`), it uses your local SQLite database (`events.db`).  
* **Online mode:** When opened from the GitHub Pages URL, it uses the shared backend hosted on Render.

To manually force or change URLs, open `calendar.js` and locate this block:

```js
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : '[https://calendar-8mgz.onrender.com](https://calendar-8mgz.onrender.com)';
Change 'http://localhost:3000' if your local backend runs on a different port.

Change 'https://calendar-8mgz.onrender.com' to your own deployed backend URL, then commit and push the change to GitHub.

📧 Changing the Contact / Admin Email
The Help popup or the footer may contain placeholder email addresses. To update them:

Open calendar.html and look for any <a href="mailto:..."> tag or placeholder text.

Replace it with your own email address.

If you want to add a custom email contact section in the HTML, you can use:

HTML
<p>Questions? Contact <a href="mailto:your-email@example.com">your-email@example.com</a>.</p>
📁 Local Setup (for developers)
If you want to run the project locally on your machine:

Clone the repository

Bash
git clone [https://github.com/NeoN1015/Calendar.git](https://github.com/NeoN1015/Calendar.git)
cd Calendar
Install dependencies

Bash
npm install
Start the backend server

Bash
node server.js
Open the frontend Visit http://localhost:3000/calendar.html (or index.html if renamed) in your browser. The local SQLite database (events.db) will be created automatically upon startup.

🚀 Future Roadmap & Improvements
This project is fully functional, but here are some ideal directions to take it further:

Short‑term (Easy)
Toast notifications – Already implemented! (green/red pop‑ups)

Dark mode – Add a UI toggle button hooked up to CSS variables.

Export events – Add an “Export to iCal / CSV” button.

Search / filter – Filter the event list dynamically by name or date.

Medium‑term (Intermediate)
User authentication – Allow users to register/log in and maintain private calendars.

Recurring events – Support daily, weekly, or monthly repeats.

Email reminders – Automate notifications before an event starts.

Persistent database – Replace SQLite on Render with a free PostgreSQL instance (so data survives server restarts).

Long‑term (Production-ready)
Mobile application – Wrap the web app into a PWA or a cross-platform shell (React Native / Flutter).

Calendar sharing – Allow users to generate and share read-only public links.

Timezone support – Automatically detect and convert event times to the user’s local timezone.

⚠️ Sandbox Rules: Please Don’t Abuse the Live Demo
This is a school/educational project. The online database is shared publicly by everyone who visits the live demo.

Do not add offensive, inappropriate, or spammy events.

Do not use scripts or automated tools to flood the API/database.

Note: The live database may be cleared periodically without prior notice.

Treat this app with respect—it’s meant to showcase a functional project, not to store real production data. Thank you!

🛠️ Built With
Backend: Node.js, Express, SQLite3

Frontend: HTML5, CSS3, Vanilla JavaScript, FullCalendar API

Hosting: GitHub Pages (Frontend), Render (Backend)

Version Control: Git & GitHub

👥 Group Members
Esplana, Gerald

Molina, John Hedrick

Orongan, John Bernie

Rocero, Harry

Sisit, Rohcell King

📄 License
This project is for educational purposes only. Feel free to use and modify it as a reference.
