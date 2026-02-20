# Focus | Pomodoro Timer

A modern, glassmorphism-inspired Pomodoro Timer web application to help you stay focused and manage your tasks effectively.

## Features

- **Pomodoro Timer**: Standard 25-minute focus intervals.
- **Break Modes**: Quick access to Short Break (5 minutes) and Long Break (15 minutes) modes.
- **Task Management**: Keep track of your to-dos right next to your timer. 
    - Add new tasks
    - Mark tasks as completed
    - Delete tasks
- **Persistent Storage**: Your tasks are saved in your browser's local storage, so they'll be there when you return.
- **Desktop Notifications**: Get notified when your timer or break is up.
- **Modern UI**: Clean, responsive design with glassmorphism effects and subtle animations for a premium feel.

## Technologies Used

- **HTML5**: semantic structure
- **CSS3**: CSS Variables, Flexbox for side-by-side layout, Animations, Media Queries for responsiveness
- **JavaScript (Vanilla)**: DOM Manipulation, `setInterval` for accurate timing, LocalStorage API, Notification API

## How to Run locally

Since this project consists of plain HTML, CSS, and JS files without a build step, you can simply:

1. Clone or download the repository.
2. Double-click on `index.html` to open it in your default web browser.

Alternatively, you can run a local development server for a better experience:
```bash
# Using Python
python -m http.server

# Using Node.js / npx
npx serve
```
Then navigate to the provided localhost URL in your browser.

## Customization

The colors and themes are controlled by CSS variables at the top of `style.css`. Feel free to modify the `:root` variables to match your preferred color palette!

```css
:root {
    --bg-gradient: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
    --accent-color: #7b61ff;
    /* ... */
}
```
