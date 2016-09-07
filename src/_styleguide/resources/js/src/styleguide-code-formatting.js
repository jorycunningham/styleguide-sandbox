  
 var styleGuideInteractions = (function(){

     var codeSampleGenerate = function(){
         $codeSample =  $('[data-code]');

          $codeSample.each(function() {
            var $codeUnit = $(this);
            var code = $codeUnit.html();
            $codeUnit.removeAttr('data-code','');
            $codeUnit.after('<pre class="prettyprint">'+ code + '</pre>');
          });

          codeSampleFormat();
      };


      var codeSampleFormat = function(){
          // find code snippets and escape them
          var $codeFormat = $('.prettyprint, code');
  
            if ($codeFormat.length){

              $codeFormat.each(function(){
                var code = $(this).html();
                  // this requires js/vendor/beautify-html.js
                 code = html_beautify(code, { indent_size: 2, unformatted: ['pre'] });
                $(this).text(code);
              });
        }

          prettyPrint();

      }

      var init = function(){
          codeSampleGenerate();
      }

    return {
        init: init
    };

    })();


 $('document').ready(function(){
    styleGuideInteractions.init();
  });
