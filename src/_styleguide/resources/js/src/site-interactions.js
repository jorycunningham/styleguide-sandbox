
//----------------  Resize debounce Helper function

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  function sharedDebounceUtility (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          }

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }



(function($,sr){


  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', sharedDebounceUtility(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


//---------------  Site Interactions

var styleguideSandbox = (function(){
  var mediumBreakpoint = 704;
  var currentWindowWidth;

  var scrollToTargetUtility = (function(){
         // Utility function for smooth scrolling to provided element
        // $target = jquery object for scroll target
        // speed = animation time (2s, 750ms)

        var scrollToTarget = function($target, speed){
                var scrollTo = $target.offset().top;
                var speed = speed || 600;
      
                $('html, body').animate({
                        scrollTop: scrollTo
                }, speed);

        };

        var init = function(){
            $('[data-action="scrollTo"]').on('click', function(){
                var target = $(this).attr('href');
                var $target = $(target);
                scrollToTarget($target, 600);
                event.preventDefault();
            });
        };

        return {
          init: init
        };

})();
//---------------- Side Navigation Functions
  var sideNavigation = (function(){

        // Function's Global Vars
        var firstTimeLoad = true;
        var $sideNavigation = $('[data-module="SideNavigation"]');
        var $sideNavigationToggleWrap = $('[data-module="SideNavigation__toggle-wrap"]');
        var $toggleLink = $sideNavigationToggleWrap.find('[data-action="SideNavigation_toggle"]');
        var $wrap = $('[data-module="wrap-all-content"]');
        var $mainContent = $('[data-module="main-content"]');
        var openNavClass = 'js-is-sidenav-open';
        var navClosedManuallyClass = 'js-is-sidenav-closed-manually';


        // Start sub functions

        var checkWidth = function(){

          currentWindowWidth = $(window).width();


          if (currentWindowWidth < 900){

              closeNav();
       

            } else {

              if(!$sideNavigation.hasClass(navClosedManuallyClass)){
                openNav();
              }
            }
        };


        var checkNavOpen = function(isManual){

          if ($wrap.hasClass(openNavClass)){

              closeNav(isManual);

            } else {

              openNav();

            }
        };

        var closeNav = function(isManual){

            if(!firstTimeLoad){
              toggleAnimation();
            } 
            
            setTimeout(function(){
               $wrap.removeClass(openNavClass);
            }, 150);
           
            
            if(isManual){
              $sideNavigation.addClass(navClosedManuallyClass);
            }

            $mainContent.off('click', closeNav);
        };

        var openNav = function(){
            
            if(!firstTimeLoad){
              toggleAnimation();
            } 
            setTimeout(function(){
               $wrap.addClass(openNavClass);
            }, 150);
            
            $sideNavigation.removeClass(navClosedManuallyClass);
        };

        var openIfClosed = function(isManual){
          
          if (!$wrap.hasClass(openNavClass)){

              openNav();

            }
        };

        var toggleAnimation = function(){

          var flipClass = 'js-toggle-wrap--flip';
        

          setTimeout(function(){
            $sideNavigationToggleWrap.removeClass(flipClass);
          }, 650);

          $sideNavigationToggleWrap.addClass(flipClass);
          
        };


        var init =  function(){

          // set nav height and nav state on load
          checkWidth();

          // init button toggle

          $toggleLink.on('click', function(e){

            checkNavOpen(true);

            e.preventDefault();

          });

           // init nav toggle on click if nav closed

          $sideNavigation.on('click', function(e){

            openIfClosed(true);
           

          });

          // on window resize some things need to get recalculated

          $(window).smartresize(function(){
            checkWidth();
            
          });

          // set first time load to false for animation

          firstTimeLoad = false;

        };

       return {
        init: init
       };

    })();

  // Initialize Modules
    var init = function(){
      sideNavigation.init();
      scrollToTargetUtility.init();
    };

    return {
        init: init
    };

})();  


$('document').ready(function(){
  styleguideSandbox.init(); 
});