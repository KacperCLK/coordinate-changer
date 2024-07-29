<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Result extends Component
{
    public $id;
    public $content;
    
    public function __construct($id, $content)
    {
        $this->id = $id;
        $this->content = $content;
    }

    public function render(): View|Closure|string
    {
        return view('components.result');
    }
}
