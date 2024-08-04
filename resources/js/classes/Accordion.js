class Accordion {
    constructor() {
        this.accordionContainer = document.querySelector('.accordion');
        this.initAccordion();
        this.initCopyFunctionality();
        this.unitDMS = true;
    }

    initAccordion() {
        document.querySelectorAll('.accordion__label').forEach(label => {
            label.addEventListener('click', () => {
                const contentBox = label.parentElement;

                document.querySelectorAll('.accordion__contentBx').forEach(otherContentBox => {
                    if (otherContentBox !== contentBox) {
                        otherContentBox.classList.remove('active');
                    }
                });

                contentBox.classList.toggle('active');
            });
        });
    }

    async showResults(index, latitudeDMS, longitudeDMS, latitude, longitude) {
        const resultDiv = document.getElementById(`Zone${index + 1}`);
        if (resultDiv) {
            resultDiv.querySelector('.accordion__content__lat-result').textContent = latitudeDMS;
            resultDiv.querySelector('.accordion__content__lon-result').textContent = longitudeDMS;

            try {
                const location = await this.getCity(latitude, longitude);
                resultDiv.querySelector('.accordion__label__location').textContent = location;
            } catch (error) {
                // console.log(`Wystąpił błąd: ${error.message}`);
            }

            // Dodanie event listenera do ikony zmiany jednostki
            const changeUnitIcon = resultDiv.querySelector('.accordion__content__change-unit');
            if (changeUnitIcon) {
                changeUnitIcon.addEventListener('click', () => {
                    this.toggleUnits(index, latitudeDMS, longitudeDMS, latitude, longitude);
                });
            }
        }
    }

    // inicjalizacja funkcjonalności kopiowania
    initCopyFunctionality() {
        this.accordionContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('fa-copy')) {
                const copyButton = event.target.closest('.accordion__content__copy');
                if (copyButton) {
                    const targetId = copyButton.getAttribute('data-copy-target');
                    const targetElement = document.querySelector(`[data-copy-id="${targetId}"]`);
                    
                    if (targetElement) {
                        const textToCopy = targetElement.textContent;
                        navigator.clipboard.writeText(textToCopy);
                    }
                }
            }
        });
    }

    // inicjalizacja funkcjonalności zmiany jednostiki
    toggleUnits(index, latitudeDMS, longitudeDMS, latitude, longitude) {
        this.unitsDMS = !this.unitsDMS; // Zmiana jednostki

        const resultDiv = document.getElementById(`Zone${index + 1}`);
        if (resultDiv) {
            if (this.unitsDMS) {
                resultDiv.querySelector('.accordion__content__lat-result').textContent = latitudeDMS;
                resultDiv.querySelector('.accordion__content__lon-result').textContent = longitudeDMS;
            } else {
                resultDiv.querySelector('.accordion__content__lat-result').textContent = latitude.toFixed(3);
                resultDiv.querySelector('.accordion__content__lon-result').textContent = longitude.toFixed(3);
            }
        }
    }

    // Wczytywania miasta, wykorzystywanie w metodzie asynchronicznej updateResults
    async getCity(longitude, latitude) {
        if (!latitude || !longitude) return "Brak!";
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${longitude}&lon=${latitude}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Błąd sieci');

            const data = await response.json();
            return data?.address?.city || data?.address?.town || data?.address?.village || "Brak!";
        } catch (error) {
            // console.log(`Wystąpił błąd: ${error.message}`);
            return "Błąd!";
        }
    }

    // Wyczyść wyniki przed ich zmianą:
    clearResults(){
        document.querySelectorAll('.accordion__label__location').forEach(locationDiv => {
            locationDiv.textContent = '';
        });
        document.querySelectorAll('.accordion__content__lat-result').forEach(latResultDiv => {
            latResultDiv.textContent = '';
        });
        document.querySelectorAll('.accordion__content__lon-result').forEach(lonResultDiv => {
            lonResultDiv.textContent = '';
        });
    }
}

export default Accordion;