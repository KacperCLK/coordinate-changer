class Accordion {
    constructor() {
        this.accordionContainer = document.querySelector('.accordion');
        this.initAccordion();
        this.initCopyFunctionality();
    }

    initAccordion() {
        document.querySelectorAll('.accordion__label').forEach(label => {
            label.addEventListener('click', function() {
                const contentBox = this.parentElement;

                document.querySelectorAll('.accordion__contentBx').forEach(otherContentBox => {
                    if (otherContentBox !== contentBox) {
                        otherContentBox.classList.remove('active');
                    }
                });

                contentBox.classList.toggle('active');
            });
        });
    }

    initCopyFunctionality() {
        this.accordionContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('fa-copy')) {
                const copyButton = event.target.closest('.accordion__content__copy');
                if (copyButton) {
                    const targetId = copyButton.getAttribute('data-copy-target');
                    const targetElement = document.querySelector(`[data-copy-id="${targetId}"]`);

                    if (targetElement) {
                        const textToCopy = targetElement.textContent;

                        navigator.clipboard.writeText(textToCopy).then(() => {
                            console.log(`Copied: ${textToCopy}`);
                        }).catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                    }
                }
            }
        });
    }
}

export default Accordion;