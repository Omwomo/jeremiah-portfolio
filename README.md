# Jeremiah Dixon — Portfolio

Scientific visualization & physics portfolio built with React + Vite.

---

## 🚀 Quick Setup (Same as before — you already know this!)

### 1 — Install dependencies
```bash
npm install
```

### 2 — Run locally
```bash
npm run dev
```
Open **http://localhost:5173** in your browser.

---

## 🖼️ Adding Images

Place images in the `public/images/` folder:

```
jeremiah-portfolio/
└── public/
    └── images/
        ├── profile.jpg        ← Hero / profile photo
        ├── heat-diffusion.jpg ← Heat diffusion project
        ├── thermal-sim.jpg    ← Thermal modeling project
        ├── boeing.jpg         ← Boeing internship
        └── tutoring.jpg       ← Tutoring / education
```

Then in `src/App.jsx`:

**Profile photo** — find this line and change `false` to `true`:
```jsx
{false ? (
  <img src="/images/profile.jpg" alt="Jeremiah Dixon" />
```
→
```jsx
{true ? (
  <img src="/images/profile.jpg" alt="Jeremiah Dixon" />
```

**Project images** — find the `PROJECTS` array and update `image: null`:
```js
image: "/images/heat-diffusion.jpg",
```

> ⚠️ **Important:** Use lowercase filenames with no spaces. Vercel is case-sensitive!
> ✅ `profile.jpg` · ❌ `Profile.JPG`

---

## 🌐 Deploy to Vercel

Same process as Cassey's portfolio:

```bash
# 1. Initialize git (if not done)
git init
git add .
git commit -m "Initial Jeremiah portfolio commit"

# 2. Push to GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jeremiah-portfolio.git
git push -u origin main
```

Then go to **vercel.com** → Import GitHub repo → Deploy. Done in ~60 seconds.

### After any update:
```bash
git add .
git commit -m "Update portfolio"
git push
```
Vercel auto-redeploys.

---

## 📁 File Structure

```
jeremiah-portfolio/
├── public/
│   └── images/        ← Put photos here (lowercase names!)
├── src/
│   ├── App.jsx        ← All content lives here — edit this
│   └── main.jsx       ← Entry point (don't edit)
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## ✏️ Customising Content

Everything editable is at the top of `src/App.jsx`:

| Array / Section | What to edit |
|-----------------|-------------|
| `SKILLS` | Add/remove skills, adjust levels (0–100) |
| `PROJECTS` | Edit titles, descriptions, tags, image paths |
| `TIMELINE` | Update career/education timeline entries |
| Hero section | Search for `hero-desc` to update the intro paragraph |
| Contact section | Search for `jeremiahdixon1121` to update email/address |

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| Images show locally but not on Vercel | Rename files to lowercase, then `git rm -r --cached public/images && git add public/images && git push` |
| `npm install` fails | Make sure Node.js is installed: `node --version` |
| Port 5173 busy | Run `npm run dev -- --port 3000` |
| White screen | Open browser console (F12) for error details |
