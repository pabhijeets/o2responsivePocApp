(function($) {
  // @todo Document this.
  $.noConflict();
  $.extend($,{ placeholder: {
      browser_supported: function() {
        return this._supported !== undefined ?
          this._supported :
          ( this._supported = !!('placeholder' in $('<input type="text">')[0]) );
      },
      shim: function(opts) {
        var config = {
          color: '#d2d2d2',
          cls: 'placeholder',
          selector: 'input[placeholder!="Search"][placeholder], textarea[placeholder]'
        };
        $.extend(config,opts);
        return !this.browser_supported() && $(config.selector)._placeholder_shim(config);
      }
  }});

  $.extend($.fn,{
    _placeholder_shim: function(config) {
      function calcPositionCss(target)
      {
        var op = $(target).offsetParent().offset();
        var ot = $(target).offset();

        return {
          top: ot.top - op.top,
          left: ot.left - op.left,
          width: $(target).width()
        };
      }
      function adjustToResizing(label) {
        var $target = label.data('target');
        if(typeof $target !== "undefined") {
          label.css(calcPositionCss($target));
          $(window).one("resize", function () { adjustToResizing(label); });
        }
      }
      return this.each(function() {
        var $this = $(this);

        if( $this.is(':visible') ) {

          if( $this.data('placeholder') ) {
            var $ol = $this.data('placeholder');
            $ol.css(calcPositionCss($this));
            return true;
          }

          var possible_line_height = {};
          if( !$this.is('textarea') && $this.css('height') != 'auto') {
            possible_line_height = { lineHeight: $this.css('height'), whiteSpace: 'nowrap' };
          }

          var isBorderBox = ($this.css('box-sizing') === 'border-box');

          var ol = $('<label />')
            .text($this.attr('placeholder'))
            .addClass(config.cls)
            .css($.extend({
              position:'absolute',
              display: 'inline',
              'float':'none',
              
              color: config.color,
              cursor: 'text',
              paddingTop: isBorderBox ? '0' : $this.css('padding-top'),
              paddingRight: $this.css('padding-right'),
              paddingBottom: isBorderBox ? '0' : $this.css('padding-bottom'),
              paddingLeft: $this.css('padding-left'),
              
              backgroundColor: 'transparent',
              zIndex: 99
            }, possible_line_height))
            .css(calcPositionCss(this))
            .attr('for', this.id)
            .data('target',$this)
            .click(function(){
              $(this).data('target').focus();
            })
            .insertBefore(this);
          $this
            .data('placeholder',ol)
            .keydown(function(){
              ol.hide();
            })
            .blur(function() {
              ol[$this.val().length ? 'hide' : 'show']();
            }).triggerHandler('blur');

          $(window).one("resize", function () { adjustToResizing(ol); });
        }
      });
    }
  });
})(jQ17);

jQ17(document).add(window).bind('ready load', function() {
  if (jQ17.placeholder) {
    jQ17.placeholder.shim();
  }
});