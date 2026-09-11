// Screen navigation
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('BanyanBridgeSaarthi UI Mockup loaded');
    
    // Add smooth transitions
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.transition = 'opacity 0.3s ease';
    });
    
    // Initialize components
    initTutorial();
    initVoiceRecording();
});

// Dark Mode Toggle
let darkMode = false;

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    
    // Update button text
    const darkModeBtn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (darkModeBtn) {
        darkModeBtn.innerHTML = darkMode 
            ? '<span class="btn-icon">☀️</span> Light Mode'
            : '<span class="btn-icon">🌙</span> Dark Mode';
    }
}

// Voice Recording Simulation
let recordingTime = 0;
let recordingInterval = null;
let isRecording = false;

function initVoiceRecording() {
    const recordBtn = document.getElementById('recordBtn');
    const stopBtn = document.getElementById('stopBtn');
    const playbackBtn = document.getElementById('playbackBtn');
    const timerDisplay = document.querySelector('.timer');
    
    if (recordBtn) {
        recordBtn.addEventListener('click', startRecording);
    }
    if (stopBtn) {
        stopBtn.addEventListener('click', stopRecording);
    }
    if (playbackBtn) {
        playbackBtn.addEventListener('click', playRecording);
    }
    
    function startRecording() {
        isRecording = true;
        recordingTime = 0;
        recordBtn.disabled = true;
        stopBtn.disabled = false;
        playbackBtn.disabled = true;
        
        // Animate waveform
        document.querySelectorAll('.wave-bar').forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
        
        recordingInterval = setInterval(() => {
            recordingTime++;
            const minutes = Math.floor(recordingTime / 60).toString().padStart(2, '0');
            const seconds = (recordingTime % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
            
            if (recordingTime >= 60) {
                stopRecording();
            }
        }, 1000);
    }
    
    function stopRecording() {
        isRecording = false;
        clearInterval(recordingInterval);
        recordBtn.disabled = false;
        stopBtn.disabled = true;
        playbackBtn.disabled = false;
        
        // Stop waveform animation
        document.querySelectorAll('.wave-bar').forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }
    
    function playRecording() {
        // Simulate playback
        playbackBtn.innerHTML = '<span class="playback-icon">⏸️</span><span class="playback-text">Pause</span>';
        setTimeout(() => {
            playbackBtn.innerHTML = '<span class="playback-icon">▶️</span><span class="playback-text">Play</span>';
        }, 3000);
    }
}

// Tutorial Navigation
let currentSlide = 1;
const totalSlides = 5;

function initTutorial() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const startBtn = document.getElementById('startBtn');
    const dots = document.querySelectorAll('.dot');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    if (startBtn) {
        startBtn.addEventListener('click', () => showScreen('home-screen'));
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideNum = parseInt(dot.dataset.slide);
            goToSlide(slideNum);
        });
    });
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
    }
}

function goToSlide(slideNum) {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const startBtn = document.getElementById('startBtn');
    const dots = document.querySelectorAll('.dot');
    
    // Hide current slide
    document.getElementById(`slide${currentSlide}`).classList.remove('active');
    dots[currentSlide - 1].classList.remove('active');
    
    // Show new slide
    currentSlide = slideNum;
    document.getElementById(`slide${currentSlide}`).classList.add('active');
    dots[currentSlide - 1].classList.add('active');
    
    // Update buttons
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    
    if (currentSlide === totalSlides) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (startBtn) startBtn.style.display = 'flex';
    } else {
        if (nextBtn) nextBtn.style.display = 'flex';
        if (startBtn) startBtn.style.display = 'none';
    }
}

// Initialize tutorial when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTutorial();
});

// Simulate Capture with Processing
function simulateCapture() {
    showProcessing();
    setTimeout(() => {
        hideProcessing();
        showScreen('results-screen');
    }, 4000);
}

// Processing Indicator
function showProcessing() {
    const indicator = document.getElementById('processingIndicator');
    if (indicator) {
        indicator.classList.add('active');
        
        // Simulate processing steps
        const steps = document.querySelectorAll('.processing-steps .step');
        let currentStep = 0;
        
        const stepInterval = setInterval(() => {
            if (currentStep > 0) {
                steps[currentStep - 1].classList.remove('active');
                steps[currentStep - 1].classList.add('completed');
            }
            
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
            } else {
                clearInterval(stepInterval);
                setTimeout(() => {
                    hideProcessing();
                }, 500);
            }
        }, 800);
    }
}

function hideProcessing() {
    const indicator = document.getElementById('processingIndicator');
    if (indicator) {
        indicator.classList.remove('active');
        
        // Reset steps
        const steps = document.querySelectorAll('.processing-steps .step');
        steps.forEach(step => {
            step.classList.remove('active', 'completed');
        });
    }
}

// Mock data for future expansion
const mockStudents = [
    { name: 'Rahul Kumar', assessmentCount: 3, group: 'A', mastery: 45, status: 'Needs place value support' },
    { name: 'Priya Singh', assessmentCount: 2, group: 'B', mastery: 72, status: 'Progressing well' },
    { name: 'Amit Kumar', assessmentCount: 4, group: 'C', mastery: 89, status: 'Ready for peer tutoring' },
    { name: 'Sita Devi', assessmentCount: 1, group: 'A', mastery: 30, status: 'Needs assessment' },
    { name: 'Vijay Gupta', assessmentCount: 3, group: 'B', mastery: 65, status: 'Improving steadily' },
    { name: 'Neha Patel', assessmentCount: 2, group: 'C', mastery: 92, status: 'Strong performer' }
];

const mockAssessment = {
    studentName: 'Rahul Kumar',
    problem: '53 - 27 = ?',
    studentAnswer: '34',
    correctAnswer: '26',
    isCorrect: false,
    errorType: 'Place Value Error',
    teacherInsight: 'Student subtracts smaller digit from larger regardless of position. Consider using visual regrouping activities.'
};

const mockStats = {
    totalStudents: 35,
    assessmentsToday: 12,
    commonError: 'Place Value',
    commonErrorPercentage: 40
};

const mockLearningGroups = {
    groupA: {
        name: 'Group A - Foundational Gap',
        count: 12,
        description: 'Needs prerequisite concept reset for place value'
    },
    groupB: {
        name: 'Group B - Partial Misconception',
        count: 15,
        description: 'Grasped concept but holds procedural bugs'
    },
    groupC: {
        name: 'Group C - On Track',
        count: 8,
        description: 'Mastered prerequisites, ready for peer tutoring'
    }
};

const mockActivities = [
    {
        title: 'Visual Regrouping with Base-10 Blocks',
        tag: 'Place Value',
        time: '7 minutes',
        group: 'Group A',
        type: 'Physical',
        description: 'Use physical base-10 blocks to demonstrate borrowing in subtraction. Have students practice with 2-digit problems using blocks before written work.',
        materials: ['Base-10 blocks', 'Individual slates', 'Chalkboard'],
        steps: ['Demonstrate 53 - 27 using blocks', 'Show how to "borrow" a ten', 'Students practice with blocks', 'Transfer to written notation']
    },
    {
        title: 'Number Line Jump Strategy',
        tag: 'Subtraction',
        time: '5 minutes',
        group: 'Group A',
        type: 'Visual',
        description: 'Draw number lines on the floor. Students physically "jump" backward to solve subtraction problems, building kinesthetic understanding.',
        materials: ['Chalk', 'Floor space'],
        steps: ['Draw number line on floor', 'Model jumping backward', 'Students practice physical jumping', 'Connect to written problems']
    },
    {
        title: 'Partitioning Numbers Game',
        tag: 'Place Value',
        time: '8 minutes',
        group: 'Group B',
        type: 'Game',
        description: 'Students break numbers into tens and ones, then rebuild them. Use playing cards to create random numbers for practice.',
        materials: ['Playing cards', 'Paper', 'Pencils'],
        steps: ['Deal cards to create numbers', 'Students partition into tens/ones', 'Rebuild numbers', 'Check accuracy']
    }
];

const mockStudentProfile = {
    name: 'Rahul Kumar',
    class: '3-A',
    rollNo: 15,
    group: 'A',
    assessmentCount: 3,
    competencies: {
        addition: 85,
        subtraction: 45,
        multiplication: 60,
        placeValue: 35
    },
    recentAssessments: [
        {
            date: 'Today, 10:30 AM',
            problem: '53 - 27 = ?',
            studentAnswer: '34',
            correctAnswer: '26',
            isCorrect: false,
            errorType: 'Place Value Error'
        },
        {
            date: 'Yesterday, 2:15 PM',
            problem: '45 + 28 = ?',
            studentAnswer: '73',
            correctAnswer: '73',
            isCorrect: true,
            errorType: 'No errors'
        },
        {
            date: '2 days ago',
            problem: '82 - 37 = ?',
            studentAnswer: '55',
            correctAnswer: '45',
            isCorrect: false,
            errorType: 'Place Value Error'
        }
    ],
    recommendedActions: [
        {
            icon: '🎯',
            title: 'Focus on Place Value',
            description: 'Student consistently makes place value errors in subtraction'
        },
        {
            icon: '📚',
            title: 'Visual Learning',
            description: 'Use base-10 blocks for regrouping practice'
        }
    ]
};

const mockProgress = {
    overallImprovement: '+15%',
    assessmentsThisWeek: 3,
    focusAreas: ['Place Value', 'Subtraction'],
    milestones: [
        {
            status: 'achieved',
            icon: '✅',
            title: 'Mastered 2-digit Addition',
            date: 'Achieved 3 days ago'
        },
        {
            status: 'in-progress',
            icon: '🔄',
            title: 'Working on Subtraction Regrouping',
            date: 'Started 1 week ago'
        },
        {
            status: 'upcoming',
            icon: '🎯',
            title: 'Target: Master Place Value',
            date: 'Expected in 2 weeks'
        }
    ]
};

const mockSettings = {
    teacherName: 'Mrs. Sharma',
    school: 'Government Primary School, District Center',
    class: '3-A',
    offlineMode: true,
    autoSync: true,
    soundEffects: false,
    primaryLanguage: 'English',
    secondaryLanguage: 'Hindi',
    storageUsed: '234 MB / 1 GB',
    lastSync: 'Today, 9:15 AM'
};

const mockAssessmentGallery = [
    {
        student: {
            name: 'Rahul Kumar',
            initials: 'RK',
            date: 'Today, 10:30 AM',
            errorType: 'Place Value Error',
            badgeClass: 'incorrect'
        },
        handwriting: [
            { problem: '53 - 27 = 34', correct: false, mark: '✗' },
            { problem: '45 + 28 = 73', correct: true, mark: '✓' },
            { problem: '82 - 37 = 55', correct: false, mark: '✗' }
        ],
        analysis: {
            ocrConfidence: 87,
            problemsAnalyzed: 3,
            correctAnswers: 1,
            primaryError: 'Place Value Confusion',
            errorBreakdown: [
                {
                    problem: '53 - 27 = 34',
                    expected: 26,
                    pattern: 'Subtracted smaller digit from larger (7-3=4, 5-2=3)'
                },
                {
                    problem: '82 - 37 = 55',
                    expected: 45,
                    pattern: 'Same place value error pattern'
                }
            ],
            aiInsight: 'Student consistently demonstrates place value misunderstanding in subtraction. The pattern suggests they subtract digits individually without considering positional value. Recommendation: Use visual base-10 block activities to demonstrate regrouping concept.'
        }
    },
    {
        student: {
            name: 'Priya Singh',
            initials: 'PS',
            date: 'Today, 11:15 AM',
            errorType: 'Operation Confusion',
            badgeClass: 'warning'
        },
        handwriting: [
            { problem: '12 × 3 = 36', correct: true, mark: '✓' },
            { problem: '15 + 8 = 7', correct: false, mark: '✗' },
            { problem: '24 ÷ 6 = 4', correct: true, mark: '✓' }
        ],
        analysis: {
            ocrConfidence: 92,
            problemsAnalyzed: 3,
            correctAnswers: 2,
            primaryError: 'Operation Confusion',
            errorBreakdown: [
                {
                    problem: '15 + 8 = 7',
                    expected: 23,
                    pattern: 'Subtracted instead of added (15-8=7)'
                }
            ],
            aiInsight: 'Student shows confusion between addition and subtraction operations. This may indicate a need for more practice with operation symbols and their meanings. Recommendation: Use visual activities that clearly distinguish between addition (+) and subtraction (-) contexts.'
        }
    }
];