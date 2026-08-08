/* ==========================================================================
   Aetheria Interactive Application JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    const tabSignIn = document.getElementById('tabSignIn');
    const tabSignUp = document.getElementById('tabSignUp');
    const tabIndicator = document.getElementById('tabIndicator');
    
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const paneHeader = document.getElementById('paneHeader');
    const paneHeading = paneHeader.querySelector('h2');
    const paneSubtext = paneHeader.querySelector('p');
    const showcasePanel = document.querySelector('.showcase-panel');
    const tabHeader = document.querySelector('.tab-header');
    const formFooter = document.querySelector('.form-footer');
    
    const authCard = document.getElementById('authCard');
    const cardGlowWrapper = document.querySelector('.card-glow-wrapper');
    const dashboardPreview = document.getElementById('dashboardPreview');
    const welcomeUserMsg = document.getElementById('welcomeUserMsg');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const forgotModal = document.getElementById('forgotModal');
    const openForgotModal = document.getElementById('openForgotModal');
    const closeForgotModal = document.getElementById('closeForgotModal');
    const forgotForm = document.getElementById('forgotForm');

    const demoUsername = 'Christian Lacuata';
    const demoPassword = '123456';
    const signInEmailInput = document.getElementById('signin-email');
    const signInPasswordInput = document.getElementById('signin-password');
    const signInAlert = document.getElementById('signin-alert');

    // Theme Toggle Functionality
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            showToast('Switched to Light Theme', 'info');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            showToast('Switched to Dark Theme', 'info');
        }
    });

    // Tab Switcher Logic
    tabSignIn.addEventListener('click', () => switchTab('signin'));
    tabSignUp.addEventListener('click', () => switchTab('signup'));

    function switchTab(tab) {
        if (tab === 'signin') {
            tabSignIn.classList.add('active');
            tabSignUp.classList.remove('active');
            tabIndicator.style.transform = 'translateX(0%)';
            signInForm.classList.add('active');
            signUpForm.classList.remove('active');
            paneHeading.textContent = 'Welcome back';
            paneSubtext.textContent = 'Enter your details to access your account';
        } else {
            tabSignUp.classList.add('active');
            tabSignIn.classList.remove('active');
            tabIndicator.style.transform = 'translateX(100%)';
            signUpForm.classList.add('active');
            signInForm.classList.remove('active');
            paneHeading.textContent = 'Create an Account';
            paneSubtext.textContent = 'Start your 14-day free trial, no credit card required.';
        }
    }

    // Password Visibility Toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Password Strength Meter
    const signupPasswordInput = document.getElementById('signup-password');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', (e) => {
            const val = e.target.value;
            let score = 0;

            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            switch (score) {
                case 0:
                case 1:
                    strengthBar.style.width = '25%';
                    strengthBar.style.backgroundColor = '#ef4444';
                    strengthText.textContent = 'Strength: Weak';
                    break;
                case 2:
                    strengthBar.style.width = '50%';
                    strengthBar.style.backgroundColor = '#f59e0b';
                    strengthText.textContent = 'Strength: Medium';
                    break;
                case 3:
                    strengthBar.style.width = '75%';
                    strengthBar.style.backgroundColor = '#3b82f6';
                    strengthText.textContent = 'Strength: Strong';
                    break;
                case 4:
                    strengthBar.style.width = '100%';
                    strengthBar.style.backgroundColor = '#10b981';
                    strengthText.textContent = 'Strength: Excellent';
                    break;
            }
        });
    }

    // Form Validation & Submission Handler
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('signin-email');
        const passwordInput = document.getElementById('signin-password');
        let isValid = true;

        // Reset errors
        clearInputError(emailInput);
        clearInputError(passwordInput);
        hideSignInAlert();

        if (emailInput.value.trim() === '' || passwordInput.value.trim() === '' || emailInput.value.trim().toLowerCase() !== demoUsername.toLowerCase() || passwordInput.value.trim() !== demoPassword) {
            showSignInAlert('Username and Password is Incorrect! Please Try Again');
            isValid = false;
        }

        if (isValid) {
            const btn = document.getElementById('signInSubmit');
            btn.classList.add('loading');

            setTimeout(() => {
                btn.classList.remove('loading');
                showToast('Welcome back! Login successful.', 'success');
                showDashboard(emailInput.value);
            }, 1200);
        }
    });

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('signup-name');
        const emailInput = document.getElementById('signup-email');
        const passwordInput = document.getElementById('signup-password');
        const termsCheck = document.getElementById('termsCheck');
        let isValid = true;

        clearInputError(nameInput);
        clearInputError(emailInput);
        clearInputError(passwordInput);

        if (nameInput.value.trim() === '') {
            setInputError(nameInput, 'Full name is required');
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            setInputError(emailInput, 'Please enter a valid work email');
            isValid = false;
        }

        if (passwordInput.value.length < 8) {
            setInputError(passwordInput, 'Password must be at least 8 characters');
            isValid = false;
        }

        if (!termsCheck.checked) {
            showToast('You must accept the Terms of Service', 'error');
            isValid = false;
        }

        if (isValid) {
            const btn = document.getElementById('signUpSubmit');
            btn.classList.add('loading');

            setTimeout(() => {
                btn.classList.remove('loading');
                showToast('Account created successfully!', 'success');
                showDashboard(nameInput.value);
            }, 1500);
        }
    });

    // Helper functions for validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function setInputError(input, msg) {
        const group = input.closest('.input-group');
        group.classList.add('invalid');
        const errorSpan = group.querySelector('.error-msg');
        if (errorSpan) errorSpan.textContent = msg;
    }

    function clearInputError(input) {
        const group = input.closest('.input-group');
        if (group) group.classList.remove('invalid');
    }

    function showSignInAlert(message) {
        if (signInAlert) {
            signInAlert.textContent = message;
            signInAlert.classList.remove('hidden');
        }
    }

    function hideSignInAlert() {
        if (signInAlert) {
            signInAlert.textContent = '';
            signInAlert.classList.add('hidden');
        }
    }

    // Modal Operations
    openForgotModal.addEventListener('click', (e) => {
        e.preventDefault();
        forgotModal.classList.remove('hidden');
    });

    closeForgotModal.addEventListener('click', () => {
        forgotModal.classList.add('hidden');
    });

    forgotModal.addEventListener('click', (e) => {
        if (e.target === forgotModal) forgotModal.classList.add('hidden');
    });

    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        if (validateEmail(email)) {
            forgotModal.classList.add('hidden');
            showToast(`Password reset link sent to ${email}`, 'success');
        } else {
            showToast('Please enter a valid email address', 'error');
        }
    });

    // Dashboard Simulation Transition
    function showDashboard(userIdentifier) {
        authCard.classList.add('logged-in');
        cardGlowWrapper.classList.add('logged-in');
        showcasePanel.classList.remove('hidden');
        tabHeader.classList.add('hidden');
        formFooter.classList.add('hidden');
        dashboardPreview.classList.remove('hidden');
        welcomeUserMsg.textContent = `Logged in as: ${userIdentifier}`;
    }

    logoutBtn.addEventListener('click', () => {
        authCard.classList.remove('logged-in');
        cardGlowWrapper.classList.remove('logged-in');
        showcasePanel.classList.add('hidden');
        tabHeader.classList.remove('hidden');
        formFooter.classList.remove('hidden');
        dashboardPreview.classList.add('hidden');
        switchTab('signin');
        showToast('Logged out successfully', 'info');
    });

    // Social Buttons Simulation
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.innerText.trim();
            showToast(`Authenticating with ${provider}...`, 'info');
            setTimeout(() => {
                showToast(`Signed in with ${provider}!`, 'success');
                showDashboard(`${provider} User`);
            }, 1000);
        });
    });

    // Testimonial Carousel Auto-Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        goToSlide(nextSlide);
    }, 5000);

    // Toast Notification System
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconClass = 'fa-info-circle';
        if (type === 'success') iconClass = 'fa-circle-check';
        if (type === 'error') iconClass = 'fa-circle-exclamation';

        toast.innerHTML = `
            <i class="fa-solid ${iconClass}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // -------------------------------------------------------------
    // Interactive Mouse-Following 3D Parallax Logo Animation
    // -------------------------------------------------------------
    const brandLogo = document.getElementById('brandLogo');
    const logoIcon = document.getElementById('logoIcon');
    const brandName = document.getElementById('brandName');

    if (brandLogo && logoIcon) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let currentLogoX = 0;
        let currentLogoY = 0;
        let currentRotateX = 0;
        let currentRotateY = 0;
        let currentRotateIcon = 0;

        let targetLogoX = 0;
        let targetLogoY = 0;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let targetRotateIcon = 0;

        let isHovered = false;

        // Track global mouse position for responsive parallax tracking
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const rect = brandLogo.getBoundingClientRect();
            const logoCenterX = rect.left + rect.width / 2;
            const logoCenterY = rect.top + rect.height / 2;

            const deltaX = mouseX - logoCenterX;
            const deltaY = mouseY - logoCenterY;
            const dist = Math.hypot(deltaX, deltaY);

            // Maximum attraction range (px)
            const maxDist = 700;

            if (dist < maxDist) {
                const pullPower = Math.pow(1 - dist / maxDist, 1.2);
                // Magnetic follow offsets
                targetLogoX = deltaX * 0.15 * pullPower;
                targetLogoY = deltaY * 0.15 * pullPower;

                // 3D Tilt angles
                targetRotateY = (deltaX / window.innerWidth) * 35;
                targetRotateX = -(deltaY / window.innerHeight) * 35;
                targetRotateIcon = (deltaX / window.innerWidth) * 540;
            } else {
                targetLogoX = 0;
                targetLogoY = 0;
                targetRotateX = 0;
                targetRotateY = 0;
                targetRotateIcon = 0;
            }
        });

        brandLogo.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        brandLogo.addEventListener('mouseleave', () => {
            isHovered = false;
        });

        // Click interaction: 360 spin explosion
        brandLogo.addEventListener('click', () => {
            logoIcon.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            logoIcon.style.transform = 'translateZ(35px) rotate(720deg) scale(1.35)';
            showToast('Portal Engine Active', 'info');
            setTimeout(() => {
                logoIcon.style.transition = 'transform 0.15s ease-out';
            }, 800);
        });

        // Smooth physics render loop (Linear Interpolation - Lerp)
        function animateLogo() {
            const ease = isHovered ? 0.18 : 0.08;

            currentLogoX += (targetLogoX - currentLogoX) * ease;
            currentLogoY += (targetLogoY - currentLogoY) * ease;
            currentRotateX += (targetRotateX - currentRotateX) * ease;
            currentRotateY += (targetRotateY - currentRotateY) * ease;
            currentRotateIcon += (targetRotateIcon - currentRotateIcon) * ease;

            const hoverScale = isHovered ? 1.08 : 1;

            // Apply 3D matrix transform to main logo container
            brandLogo.style.transform = `translate3d(${currentLogoX}px, ${currentLogoY}px, 0px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale(${hoverScale})`;

            // 3D Parallax depth layers: Icon pops out further towards screen
            logoIcon.style.transform = `translateZ(25px) rotate(${currentRotateIcon * 0.15}deg)`;
            if (brandName) brandName.style.transform = `translateZ(10px)`;

            requestAnimationFrame(animateLogo);
        }

        animateLogo();
    }

    // -------------------------------------------------------------
    // Real 3D WebGL Globe / Iridescent Glass Orb (Three.js Engine)
    // -------------------------------------------------------------
    const globeCanvas = document.getElementById('globeCanvas');
    const globeWrapper = document.getElementById('globe3dWrapper');

    if (globeCanvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 6.5;

        const renderer = new THREE.WebGLRenderer({
            canvas: globeCanvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(300, 300);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Group container for all 3D globe elements
        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        // Load original artwork image as 3D sphere texture
        const textureLoader = new THREE.TextureLoader();
        const heroTexture = textureLoader.load('login_hero.jpg');

        // 1. Primary 3D Globe with mapped artwork texture
        const sphereGeo = new THREE.SphereGeometry(1.95, 64, 64);
        const sphereMat = new THREE.MeshPhongMaterial({
            map: heroTexture,
            bumpMap: heroTexture,
            bumpScale: 0.04,
            specular: 0xe879f9,
            shininess: 60
        });
        const mainSphere = new THREE.Mesh(sphereGeo, sphereMat);
        globeGroup.add(mainSphere);

        // Outer Glass Shimmer Shell Overlay
        const glassGeo = new THREE.IcosahedronGeometry(2.0, 4);
        const glassMat = new THREE.MeshPhongMaterial({
            color: 0xa855f7,
            specular: 0xffffff,
            shininess: 100,
            transparent: true,
            opacity: 0.25,
            wireframe: false
        });
        const glassOrb = new THREE.Mesh(glassGeo, glassMat);
        globeGroup.add(glassOrb);

        // Cyber Grid Overlay
        const wireGeo = new THREE.IcosahedronGeometry(2.02, 2);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xc084fc,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const wireOrb = new THREE.Mesh(wireGeo, wireMat);
        globeGroup.add(wireOrb);

        // 3. Glowing Orbital Rings
        const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xe879f9, transparent: true, opacity: 0.75 });
        const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 3;
        ring1.rotation.y = Math.PI / 6;
        globeGroup.add(ring1);

        const ringGeo2 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 });
        const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
        ring2.rotation.x = -Math.PI / 4;
        ring2.rotation.y = -Math.PI / 4;
        globeGroup.add(ring2);

        // 4. Floating Satellite Particles around the globe
        const particleCount = 40;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 2.1 + Math.random() * 0.8;

            positions[i] = r * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = r * Math.cos(phi);
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xf472b6,
            size: 0.08,
            transparent: true,
            opacity: 0.85
        });
        const satelliteParticles = new THREE.Points(particleGeo, particleMat);
        globeGroup.add(satelliteParticles);

        // 5. Lighting Setup
        const ambientLight = new THREE.AmbientLight(0x5b21b6, 1.5);
        scene.add(ambientLight);

        const light1 = new THREE.PointLight(0xe879f9, 3, 50);
        light1.position.set(5, 5, 5);
        scene.add(light1);

        const light2 = new THREE.PointLight(0xa855f7, 2, 50);
        light2.position.set(-5, -5, 5);
        scene.add(light2);

        // Mouse Drag & Cursor Parallax Interactivity
        let isDragging = false;
        let previousMouseX = 0;
        let previousMouseY = 0;

        let targetRotX = 0;
        let targetRotY = 0;

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousMouseX;
                const deltaY = e.clientY - previousMouseY;
                targetRotY += deltaX * 0.01;
                targetRotX += deltaY * 0.01;
                previousMouseX = e.clientX;
                previousMouseY = e.clientY;
            } else {
                const normX = (e.clientX / window.innerWidth) - 0.5;
                const normY = (e.clientY / window.innerHeight) - 0.5;
                targetRotY = normX * 1.5;
                targetRotX = normY * 1.5;
            }
        });

        if (globeWrapper) {
            globeWrapper.addEventListener('mousedown', (e) => {
                isDragging = true;
                previousMouseX = e.clientX;
                previousMouseY = e.clientY;
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
            });

            // Touch support for mobile dragging
            globeWrapper.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    isDragging = true;
                    previousMouseX = e.touches[0].clientX;
                    previousMouseY = e.touches[0].clientY;
                }
            });

            window.addEventListener('touchend', () => {
                isDragging = false;
            });
        }

        // Render Loop
        const clock = new THREE.Clock();
        function animate3DGlobe() {
            const elapsedTime = clock.getElapsedTime();

            // Continuous spin like a real globe
            globeGroup.rotation.y += 0.006;
            mainSphere.rotation.y += 0.003;
            ring1.rotation.z += 0.01;
            ring2.rotation.z -= 0.008;
            satelliteParticles.rotation.y += 0.003;

            // Smooth interpolation to target mouse rotation
            globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.05;
            globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.05;

            // Pulsating organic scaling
            const pulse = 1 + Math.sin(elapsedTime * 2) * 0.03;
            glassOrb.scale.set(pulse, pulse, pulse);

            renderer.render(scene, camera);
            requestAnimationFrame(animate3DGlobe);
        }

        animate3DGlobe();
    }

    // -------------------------------------------------------------
    // Interactive Fullscreen Particle Constellation & Click Spark Burst
    // -------------------------------------------------------------
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = 55;
        let cursorX = width / 2;
        let cursorY = height / 2;

        window.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2.2 + 1;
                this.color = Math.random() > 0.4 ? '#a855f7' : '#e879f9';
                this.alpha = Math.random() * 0.6 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Particle Burst Effect on Mouse Click
        window.addEventListener('click', (e) => {
            for (let i = 0; i < 12; i++) {
                const p = new Particle();
                p.x = e.clientX;
                p.y = e.clientY;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 4 + 2;
                p.vx = Math.cos(angle) * speed;
                p.vy = Math.sin(angle) * speed;
                p.radius = Math.random() * 3 + 1.5;
                p.color = '#c084fc';
                particles.push(p);
                if (particles.length > 90) particles.shift();
            }
        });

        function renderParticles() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.update();
                p1.draw();

                // Draw connecting constellation lines
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < 130) {
                        ctx.save();
                        ctx.globalAlpha = (1 - dist / 130) * 0.25;
                        ctx.strokeStyle = '#a855f7';
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }

                // Connect to cursor
                const cursorDist = Math.hypot(p1.x - cursorX, p1.y - cursorY);
                if (cursorDist < 180) {
                    ctx.save();
                    ctx.globalAlpha = (1 - cursorDist / 180) * 0.45;
                    ctx.strokeStyle = '#e879f9';
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(cursorX, cursorY);
                    ctx.stroke();
                    ctx.restore();
                }
            }

            requestAnimationFrame(renderParticles);
        }

        renderParticles();
    }
});



