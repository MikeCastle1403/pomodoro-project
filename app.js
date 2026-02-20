
// DOM Elements
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const modeBtns = document.querySelectorAll('.mode-btn');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Constants
const MODES = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

// State
let timeLeft = MODES.pomodoro;
let timerId = null;
let currentMode = 'pomodoro';
let isRunning = false;
let tasks = JSON.parse(localStorage.getItem('pomodoro-tasks')) || [];

// Initialization
function init() {
    updateTimerDisplay();
    renderTasks();
    setupEventListeners();
    Notification.requestPermission();
}

// Timer Logic
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Focus`;
}

function startTimer() {
    if (isRunning) {
        // Pause
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = 'Start';
        startBtn.classList.remove('active');
    } else {
        // Start
        isRunning = true;
        startBtn.textContent = 'Pause';
        startBtn.classList.add('active');
        timerId = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerId);
                isRunning = false;
                startBtn.textContent = 'Start';
                playAlarm();
                new Notification("Time's up!", { body: "Your session has ended." });
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    timeLeft = MODES[currentMode];
    updateTimerDisplay();
}

function switchMode(mode) {
    currentMode = mode;
    timeLeft = MODES[mode];

    // Update UI
    modeBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });

    // Reset timer
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    updateTimerDisplay();

    // Change accent color based on mode (optional visual cue)
    // You could update CSS variables here if desired
}

function playAlarm() {
    // Simple beep or creating Audio element
    // For now, let's just use console log as visual alarm is handled by Notification
    console.log("Beep!");
}

// Task Logic
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${task.id})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        `;
        taskList.appendChild(li);
    });
}

// Event Listeners
function setupEventListeners() {
    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => switchMode(btn.dataset.mode));
    });

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Expose functions globally for inline HTML events
    window.toggleTask = toggleTask;
    window.deleteTask = deleteTask;
}

// Start
init();
