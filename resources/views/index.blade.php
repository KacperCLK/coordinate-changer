<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Coordinate changer</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

        <!-- Styles -->
        @vite(['resources/css/app.css', 'resources/scss/app.scss', 'resources/js/app.js'])

    </head>
    <body>
        <div class="card">
            <div class="grid">
                <div class="grid__title">Zmiana współrzędnych</div>
                <div class="grid__customersCoords">
                    <div class="grid__subtitle">
                        Współrzędne:
                    </div>
                    <form class="grid__customersCoords__form" id="coordForm">
                        <div class="grid__customersCoords__coodrd-field">
                            <input type="text" id="xCoord" name="xCoord" placeholder="Szerokość" required>
                            <input type="text" id="yCoord" name="yCoord" placeholder="Długość" required>
                        </div>

                        <div class="grid__description">
                            Proszę w powyższych polach podać współrzędne, układ w jakim zostaną one podane nie ma znaczenia, poniżej zostaną wyświetlone wszystkie możliwości.
                        </div>

                        <button type="submit">Transform</button>
                    </form>
                </div>

                <div class="accordion">
                    <x-result id="PL1992" content="Układ 1992:"/>
                    <x-result id="PL2000Zone1" content="Układ 2000 - Strefa 1:"/>
                    <x-result id="PL2000Zone2" content="Układ 2000 - Strefa 2:"/>
                    <x-result id="PL2000Zone3" content="Układ 2000 - Strefa 3:"/>
                    <x-result id="PL2000Zone4" content="Układ 2000 - Strefa 4:"/>
                    <x-result id="UTM" content="Układ UTM:"/>
                </div>
            </div>
        </div>
    </body>
</html>
