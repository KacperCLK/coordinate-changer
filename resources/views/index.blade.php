<x-layouts.layout>
    <div class="card">
        <div class="grid">
            <div class="grid__title">Coordinate changer</div>
            <div class="grid__customersCoords">
                <form class="grid__customersCoords__form" id="coordForm">
                    <div class="grid__description">
                        <p>Proszę w poniższych polach podać współrzędne. Układ nie ma znaczenia, wyświetlone zostaną
                            wszystkie możliwości.</p>
                        <p class="grid__link">
                            <a href="{{ route('coord-changer.zone-explanation') }}">
                                Informacje na temat jednostek oraz układów
                            </a>
                        </p>
                    </div>

                    <div class="grid__customersCoords__coodrd-field">
                        <input type="text" id="xCoord" name="xCoord" placeholder="Długość" required>
                        <input type="text" id="yCoord" name="yCoord" placeholder="Szerokość" required>
                    </div>


                    <button type="submit">Konwertuj</button>
                </form>
            </div>

            <div class="accordion">
                <x-result id="Zone1" content="Układ 1992:" />
                <x-result id="Zone2" content="Układ 2000 - Strefa 1:" />
                <x-result id="Zone3" content="Układ 2000 - Strefa 2:" />
                <x-result id="Zone4" content="Układ 2000 - Strefa 3:" />
                <x-result id="Zone5" content="Układ 2000 - Strefa 4:" />
                <x-result id="Zone6" content="Układ UTM - Strefa 33:" />
                <x-result id="Zone7" content="Układ UTM - Strefa 34:" />
            </div>
        </div>
    </div>
</x-layouts.layout>