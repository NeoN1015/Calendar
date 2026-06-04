# 📅 Event Calendar – Group Project

A full‑stack event calendar app with drag & drop, multiple views, and persistent storage.  
Built with **Node.js + Express + SQLite** (backend) and **HTML/CSS/JS + FullCalendar** (frontend).

## 🌐 Live Demo

- **Frontend (GitHub Pages):** https://NeoN1015.github.io/Calendar/  
- **Backend API (Render):** https://calendar-8mgz.onrender.com/events

> ⚠️ The free backend spins down after inactivity – the first request may take up to 50 seconds to wake up. Please be patient.

---

## 🧑‍💻 How to Use the Calendar

1. **Add an event** – Click “Add New Event”, fill in name, date, time (optional), and description.  
2. **Edit an event** – Click the “Edit” button in the event list **or** click any event on the calendar.  
3. **Delete an event** – Click the “Delete” button (confirmation required).  
4. **Drag & drop** – Move an event to a different day/time directly on the calendar.  
5. **Resize** – Drag the bottom edge of an event to change its end time.  
6. **Change view** – Use the buttons at the top‑right (month, week, day).  
7. **Team members** – Click “Show Members” to see the group behind this project.

All changes are saved instantly in a SQLite database (online mode) or your local database (local mode).

---

## 🔧 Switching Between Local and Online Mode (for developers)

The app automatically detects where it is running:

- **Local mode** – When you open `http://localhost:3000/calendar.html` (after running `node server.js`), it uses your local SQLite database (`events.db`).  
- **Online mode** – When opened from the GitHub Pages URL, it uses the shared backend on Render.

### To manually force one mode:

Open `calendar.js` and locate this line:

```js
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://calendar-8mgz.onrender.com';
Change 'http://localhost:3000' to another local backend URL if needed.

Change 'https://calendar-8mgz.onrender.com' to your own deployed backend URL.

Then push the change to GitHub.

📧 How to Change the Contact / Admin Email
The Help popup (if still present) or the footer (you can add one) may contain an email address. To change it:

Open calendar.html and look for any <a href="mailto:..."> or text containing an email.

Replace it with your own email address.

If you want to add an email contact section, insert something like:

html
<p>Questions? Contact <a href="mailto:your-email@example.com">your-email@example.com</a>.</p>
If you are using a separate README.md (this file) as the main documentation, you can also mention the email here.

🚀 Recommendations for Improvement
This project is fully functional, but here are some ideas to take it further:

Short‑term (easy)
Toast notifications – Already implemented (green/red pop‑ups).

Dark mode – Add a button to toggle CSS variables.

Export events – Add an “Export to iCal / CSV” button.

Search / filter – Filter the event list by name or date.

Medium‑term
User authentication – Let users log in and have private calendars.

Recurring events – Support daily / weekly / monthly repeats.

Email reminders – Send a notification before an event starts.

Permanent database – Replace SQLite on Render with a free PostgreSQL database (data survives restarts).

Long‑term / professional
Mobile app – Wrap the web app in a PWA or a React Native / Flutter shell.

Calendar sharing – Allow users to share a read‑only link.

Timezone support – Automatically convert events to the user’s local timezone.

⚠️ Important: Please Don’t Abuse the Events System
This is a school / educational project. The online database is shared by everyone who visits the live demo.

Do not add offensive, inappropriate, or spammy events.

Do not use scripts or automated tools to flood the database.

The database may be cleared periodically without notice.

Treat this app with respect – it’s meant to demonstrate a working calendar, not to store real production data.

Thank you for understanding.

📁 Local Setup (for developers)
If you want to run the project on your own computer:

Clone the repository

bash
git clone https://github.com/NeoN1015/Calendar.git
cd Calendar
Install dependencies

bash
npm install
Start the backend server

bash
node server.js
Open the frontend
Visit http://localhost:3000/calendar.html (or index.html if renamed).

The local SQLite database events.db will be created automatically.

🛠️ Built With
Backend – Node.js, Express, SQLite3

Frontend – HTML5, CSS3, Vanilla JavaScript, FullCalendar

Hosting – GitHub Pages (frontend), Render (backend)

Version Control – Git & GitHub

👥 Group Members (Original Project)
Esplana, Gerald

Molina, John Hedrick

Orongan, John Bernie

Rocero, Harry

Sisit, Rohcell King

📄 License
This project is for educational purposes only. Feel free to use and modify it as a reference.

text

---
