import './bootstrap';
import proj4 from 'proj4';

document.getElementById('coordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pobranie danych od użytkownika
    const form = event.target;
    const formData = new FormData(form);
    const xCoord = parseFloat(formData.get('xCoord'));
    const yCoord = parseFloat(formData.get('yCoord'));
    const pl2000Coordinates = [yCoord, xCoord];
    
    // Definicje układów współrzędnych PL-2000 dla różnych stref
    const projPL2000AllZones = [
        '+proj=tmerc +lat_0=0 +lon_0=15 +k=0.999923 +x_0=5500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        '+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        '+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        '+proj=tmerc +lat_0=0 +lon_0=24 +k=0.999923 +x_0=8500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
    ]

    // Definicja układu współrzędnych WGS84
    const projWGS84 = '+proj=longlat +datum=WGS84 +no_defs';

    projPL2000AllZones.forEach((selectedProjPL2000, index) => {
        const wgs84Coordinates = proj4(selectedProjPL2000, projWGS84, pl2000Coordinates);

        // Konwersja stopni dziesiętnych na stopnie, minuty, sekundy
        function toDMS(coordinate) {
            const absolute = Math.abs(coordinate);
            const degrees = Math.floor(absolute);
            const minutesNotTruncated = (absolute - degrees) * 60;
            const minutes = Math.floor(minutesNotTruncated);
            const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
            const direction = coordinate >= 0 ? (coordinate === wgs84Coordinates[0] ? 'E' : 'N') : (coordinate === wgs84Coordinates[0] ? 'W' : 'S');
            return `${degrees}°${minutes}'${seconds}"${direction}`;
        }

        async function getCity(latitude, longitude) {
            // Sprawdzenie czy podano współrzędne
            if (!latitude || !longitude) return;

            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${longitude}&lon=${latitude}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Błąd sieci');
                }
                const data = await response.json();
                let location;

                if (data && data.address && data.address.city) location = data.address.city
                else if (data && data.address && data.address.town) location = data.address.town
                else if (data && data.address && data.address.village) location = data.address.village
                else location = "Brak!"
                
                return location

            } catch (error) {
                console.log(`Wystąpił błąd: ${error.message}`);
            }
        }

        async function displayResults(latitude, longitude){
            // Zmiana na stopnie, minuty, sekundy
            const longitudeDMS = toDMS(latitude);
            const latitudeDMS = toDMS(longitude);
            
            // Wyświetlenie na stronie
            const resultDiv = document.getElementById(`PL2000Zone${index + 1}`);

            if (resultDiv) {
                resultDiv.querySelector('.accordion__content__lat-result').textContent = latitudeDMS;
                resultDiv.querySelector('.accordion__content__lon-result').textContent = longitudeDMS;
                
                try {
                    const location = await getCity(wgs84Coordinates[0], wgs84Coordinates[1]); 
                    resultDiv.querySelector('.accordion__label__location').textContent = location;
                } catch (error) {
                    console.log(`Wystąpił błąd: ${error.message}`);
                }
            }

        }

        displayResults(wgs84Coordinates[0], wgs84Coordinates[1])
    });

    
});

document.querySelectorAll('.accordion__label').forEach(label => {
    label.addEventListener('click', function() {
        const contentBox = this.parentElement; // Parent element of the label which is '.accordion__contentBx'

        // Zamknij wszystkie inne elementy
        document.querySelectorAll('.accordion__contentBx').forEach(otherContentBox => {
            if (otherContentBox !== contentBox) {
                otherContentBox.classList.remove('active');
            }
        });

        // Przełącz aktualny element
        contentBox.classList.toggle('active');
    });
});

const accordionContainer = document.querySelector('.accordion');

accordionContainer.addEventListener('click', function(event) {
    // Sprawdź, czy kliknięty element to ikona kopiowania
    if (event.target.classList.contains('fa-copy')) {
        // Znajdź najbliższy element z klasą 'accordion__content__copy'
        const copyButton = event.target.closest('.accordion__content__copy');
        if (copyButton) {
            const targetId = copyButton.getAttribute('data-copy-target');
            const targetElement = document.querySelector(`[data-copy-id="${targetId}"]`);
            
            if (targetElement) {
                const textToCopy = targetElement.textContent;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    console.log(`Copied: ${textToCopy}`);
                    // Możesz dodać tutaj jakiś komunikat lub zmienić styl kopii, aby pokazać, że tekst został skopiowany
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        }
    }
});