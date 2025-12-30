export default class TextType {
    constructor(element, cursorElement, options = {}) {
        this.element = element;
        this.cursorElement = cursorElement;
        this.options = {
            text: [], // Array of strings to type
            typingSpeed: 75,
            deletingSpeed: 30,
            pauseDuration: 1500,
            loop: true,
            startDelay: 0,
            ...options
        };

        this.displayedText = '';
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.timeoutId = null;

        this.init();
    }

    init() {
        if (!this.options.text.length) return;

        // Start typing loop
        setTimeout(() => {
            this.type();
        }, this.options.startDelay);
    }

    type() {
        const currentString = this.options.text[this.currentTextIndex];

        if (this.isDeleting) {
            this.displayedText = currentString.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.displayedText = currentString.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        this.element.textContent = this.displayedText;

        let typeSpeed = this.options.typingSpeed;

        if (this.isDeleting) {
            typeSpeed = this.options.deletingSpeed;
        }

        // If word is complete
        if (!this.isDeleting && this.currentCharIndex === currentString.length) {
            if (!this.options.loop && this.currentTextIndex === this.options.text.length - 1) {
                // Stop if no loop and last word
                return;
            }
            typeSpeed = this.options.pauseDuration;
            this.isDeleting = true;
        }
        // If word is completely deleted
        else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.options.text.length;
            typeSpeed = 500; // Small pause before typing next word
        }

        this.timeoutId = setTimeout(() => {
            this.type();
        }, typeSpeed);
    }

    destroy() {
        clearTimeout(this.timeoutId);
    }
}
