<div class="accordion__contentBx" id="{{$id}}">
    <div class="accordion__label">
        <div class="accordion__label__content">
            {{ $content }}
        </div>
        <div class="accordion__label__location"></div>
    </div>
    <div class="accordion__content">
        <div class="accordion__content__lat">
            Szerokość:
            <div class="accordion__content__lat-result" data-copy-id="{{$id}}-lat-result"></div>
        </div>
        <x-copy id={{$id}} direction="lat"/>
        
        <div class="accordion__content__lon">
            Długość:
            <div class="accordion__content__lon-result" data-copy-id="{{$id}}-lon-result"></div>
        </div>
        <x-copy id={{$id}} direction="lon"/>

        <div class="accordion__content__change-unit tooltip tooltip-hover">
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
            <span class="tooltiptext">Zmień jednostkę</span>
        </div>
    </div>
</div>