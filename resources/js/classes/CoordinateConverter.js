import proj4 from 'proj4';

class CoordinateConverter {
    constructor() {
        this.projWGS84 = '+proj=longlat +datum=WGS84 +no_defs';
        this.allZones = [
            '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
            '+proj=tmerc +lat_0=0 +lon_0=15 +k=0.999923 +x_0=5500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
            '+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
            '+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
            '+proj=tmerc +lat_0=0 +lon_0=24 +k=0.999923 +x_0=8500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
            '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs',
            '+proj=utm +zone=34 +datum=WGS84 +units=m +no_defs',
        ];
        this.latitude, this.latitudeDMS, this.longitude, this.longitudeDMS;
    }

    convertToWGS84(zone, coordinates) {
        return proj4(zone, this.projWGS84, coordinates);
    }

    toDMS(coordinate, type) {
        const absolute = Math.abs(coordinate);
        const degrees = Math.floor(absolute);
        const minutesNotTruncated = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesNotTruncated);
        const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
        const direction = coordinate >= 0 ? (type === 'lon' ? 'E' : 'N') : (type === 'lon' ? 'W' : 'S');
        return `${degrees}°${minutes}'${seconds}"${direction}`;
    }

    setAccordion(accordion) {
        this.accordion = accordion;
    }

    async displayResults(index, coordinates) {
        const wgs84Coordinates = this.convertToWGS84(this.allZones[index], coordinates);

        this.latitude = wgs84Coordinates[1];
        this.longitude = wgs84Coordinates[0];
        this.latitudeDMS = this.toDMS(this.latitude, 'lat');
        this.longitudeDMS = this.toDMS(this.longitude, 'lon');

        // Przypisanie wartości szerokości i długości do odpowiednich divów z wykorzstaniem metody klasy Accordion
        if (this.accordion) this.accordion.showResults(index, this.latitudeDMS, this.longitudeDMS, this.latitude, this.longitude);
    }
}

export default CoordinateConverter;