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
            <div class="accordion__content__lat-result" data-copy-id="{{$id}}-lat-result">52,000</div>
        </div>
        <div class="accordion__content__copy" data-copy-target="{{$id}}-lat-result"><i class="fa-regular fa-copy"></i></div>
        <div class="accordion__content__lon">
            Długość:
            <div class="accordion__content__lon-result" data-copy-id="{{$id}}-lon-result">52,000</div>
        </div>
        <div class="accordion__content__copy" data-copy-target="{{$id}}-lon-result"><i class="fa-regular fa-copy"></i></div>
        <div class="accordion__content__change-unit"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>
    </div>
</div>
