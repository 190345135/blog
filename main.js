import './style.css'
import gsap from 'gsap'
import AOS from 'aos'
import 'aos/dist/aos.css'
import PixelBlast from './pixel-blast.js'
import TextType from './text-type.js'

// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-out-quart',
    once: true,
    offset: 50
});

// Custom Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize PixelBlast (Red Accent)
    const pixelBlastContainer = document.getElementById('pixel-blast-container');
    if (pixelBlastContainer) {
        new PixelBlast(pixelBlastContainer, {
            variant: 'circle',
            pixelSize: 6,
            color: '#640100', // Red Accent
            patternScale: 3,
            patternDensity: 1.2,
            pixelSizeJitter: 0.5,
            enableRipples: true,
            rippleSpeed: 0.4,
            rippleThickness: 0.12,
            rippleIntensityScale: 1.5,
            liquid: true,
            liquidStrength: 0.12,
            liquidRadius: 1.2,
            liquidWobbleSpeed: 5,
            speed: 0.6,
            edgeFade: 0.25,
            transparent: true
        });
    }

    // Initialize TextType
    // Initialize TextType
    const textTarget1 = document.getElementById('text-type-line1');
    const textTarget2 = document.getElementById('text-type-line2');
    // const cursorTarget = document.querySelector('.cursor-blink'); // Unused in class but passed

    if (textTarget1) {
        new TextType(textTarget1, null, {
            text: ["RED TEAM"],
            typingSpeed: 50,
            deletingSpeed: 30, // Irrelevant with loop false
            pauseDuration: 1500,
            loop: false
        });
    }

    if (textTarget2) {
        new TextType(textTarget2, null, {
            text: ["OPERATIONS"],
            typingSpeed: 50,
            deletingSpeed: 30,
            pauseDuration: 1500,
            loop: false,
            startDelay: 1000 // Start after line 1 mostly finishes
        });
    }

    // Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        // Hover effects
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(follower, {
                    scale: 1.5,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(follower, {
                    scale: 1,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    backgroundColor: 'transparent'
                });
            });
        });
    }
});

// Loading Screen Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline({
        onComplete: () => {
            AOS.refresh();
        }
    });

    const loadingLogo = document.querySelector('.loading-logo');
    const wordRed = document.querySelector('.word-red');
    const wordWhite = document.querySelector('.word-white');
    const wordDim = document.querySelector('.word-dim');
    const loadingScreen = document.getElementById('loadingScreen');

    if (loadingScreen) {
        // Initial states
        gsap.set([loadingLogo, wordRed, wordWhite, wordDim], { autoAlpha: 0, y: 20 });
        gsap.set(loadingScreen, { y: "0%" });

        // Animation Sequence
        tl.to(loadingLogo, { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out" })
            .to(wordRed, { duration: 0.8, autoAlpha: 1, y: 0, ease: "back.out(1.7)" }, "-=0.5")
            .to(wordWhite, { duration: 0.8, autoAlpha: 1, y: 0, ease: "back.out(1.7)" }, "-=0.6")
            .to(wordDim, { duration: 0.8, autoAlpha: 1, y: 0, ease: "power2.out" }, "-=0.6")
            .to({}, { duration: 0.5 }) // Pause
            .to(loadingScreen, { duration: 1.2, y: "-100%", ease: "power4.inOut" });
    }
});
