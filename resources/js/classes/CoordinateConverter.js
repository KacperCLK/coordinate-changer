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

    async getCity(longitude, latitude) {
        if (!latitude || !longitude) return "Brak!";
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${longitude}&lon=${latitude}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Błąd sieci');

            const data = await response.json();
            return data?.address?.city || data?.address?.town || data?.address?.village || "Brak!";
        } catch (error) {
            console.log(`Wystąpił błąd: ${error.message}`);
            return "Błąd!";
        }
    }

    async displayResults(index, coordinates) {
        const wgs84Coordinates = this.convertToWGS84(this.allZones[index], coordinates);
        const latitudeDMS = this.toDMS(wgs84Coordinates[1], 'lat');
        const longitudeDMS = this.toDMS(wgs84Coordinates[0], 'lon');
        const resultDiv = document.getElementById(`Zone${index + 1}`);

        if (resultDiv) {
            resultDiv.querySelector('.accordion__content__lat-result').textContent = latitudeDMS;
            resultDiv.querySelector('.accordion__content__lon-result').textContent = longitudeDMS;

            try {
                const location = await this.getCity(wgs84Coordinates[1], wgs84Coordinates[0]);
                resultDiv.querySelector('.accordion__label__location').textContent = location;
            } catch (error) {
                console.log(`Wystąpił błąd: ${error.message}`);
            }
        }
    }
}

export default CoordinateConverter;