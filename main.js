import './style.css'
import gsap from 'gsap'
import AOS from 'aos'
import 'aos/dist/aos.css'
import PixelBlast from './pixel-blast.js'
import TextType from './text-type.js'

AOS.init({
    duration: 1000,
    easing: 'ease-out-quart',
    once: true,
    offset: 50
});

document.addEventListener('DOMContentLoaded', () => {
    const pixelBlastContainer = document.getElementById('pixel-blast-container');
    if (pixelBlastContainer) {
        new PixelBlast(pixelBlastContainer, {
            variant: 'circle',
            pixelSize: 6,
            color: '#640100',
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

    const textTarget = document.getElementById('text-type-line1');
    if (textTarget) {
        new TextType(textTarget, null, {
            text: ["C2 DEVELOPMENT", "EDR EVASION", "OSINT", "VULN RESEARCH", "RED TEAM OPS"],
            typingSpeed: 60,
            deletingSpeed: 40,
            pauseDuration: 2000,
            loop: true
        });
    }

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
        gsap.set([loadingLogo, wordRed, wordWhite, wordDim], { autoAlpha: 0, y: 20 });
        gsap.set(loadingScreen, { y: "0%" });

        tl.to(loadingLogo, { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out" })
            .to(wordRed, { duration: 0.8, autoAlpha: 1, y: 0, ease: "back.out(1.7)" }, "-=0.5")
            .to(wordWhite, { duration: 0.8, autoAlpha: 1, y: 0, ease: "back.out(1.7)" }, "-=0.6")
            .to(wordDim, { duration: 0.8, autoAlpha: 1, y: 0, ease: "power2.out" }, "-=0.6")
            .to({}, { duration: 0.5 })
            .to(loadingScreen, { duration: 1.2, y: "-100%", ease: "power4.inOut" });
    }
});
