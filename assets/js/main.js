var sky = sky || {};

sky.freeRemote = (function($, window, document, undefined) {
    
    var $buttons,
        $toggleBtn,
        $form,
        $codeField,
        freeCode,
        xhr;
    
    function setup() {
        $toggleBtn = $('.toggle-settings');
        $form      = $('form');
        $codeField = $form.find('#freecode');
        $buttons   = $('.btn-group > li');
        xhr        = new XMLHttpRequest();
        
        storeCode();
        
        if (freeCode) {
            $form.addClass('hidden');
        }
    }
    
    function storeCode() {
        if (window.localStorage.getItem('code') == null || window.localStorage.getItem('code') == "") {
            window.localStorage.setItem('code', $codeField.val());   // ex. 52840098
        }
        freeCode = window.localStorage.getItem('code');
        $codeField.val(freeCode);
    }
    
    function bindEvents() {
        $toggleBtn.on('click', function() {
            $form.toggleClass('hidden');
        });
        
        $form.on('submit', function(evt) {
            evt.preventDefault();
            storeCode();
            $form.addClass('hidden');
        });
        
        $buttons.each(function() {
            var $this = $(this);
            
            // Short press
            Hammer($this).on("tap", function(evt) {
                handleClick($this.data('key'), false);
            });
            // Long press
            Hammer($this).on("hold", function(evt) {
                handleClick($this.data('key'), true);
            });
        });
    }
    
    function handleClick(key, press) {
        if (key != "") {
            xhr.open("GET", "http://hd1.freebox.fr/pub/remote_control?key=" + key + "&long=" + press + "&code=" + freeCode, true);
            xhr.send(null);
        }
    }
        
    return {
        init: function() {
            setup();
            bindEvents();
        }
    };
})(jQuery, window, document); 


jQuery(document).ready(function($) {
    sky.freeRemote.init();
});