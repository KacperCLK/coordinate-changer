import CoordinateConverter from './CoordinateConverter';
import Accordion from './Accordion';

class App {
    constructor() {
        this.coordinateConverter = new CoordinateConverter();
        this.accordion = new Accordion();
        this.init();
    }

    init() {
        document.getElementById('coordForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleSubmit(event);
        });
    }

    handleSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);
        const xCoord = parseFloat(formData.get('xCoord'));
        const yCoord = parseFloat(formData.get('yCoord'));
        const pl2000Coordinates = [yCoord, xCoord];

        this.coordinateConverter.allZones.forEach((zone, index) => {
            this.coordinateConverter.displayResults(index, pl2000Coordinates);
        });
    }
}

export default App;
