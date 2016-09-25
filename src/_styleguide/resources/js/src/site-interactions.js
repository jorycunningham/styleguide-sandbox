
//---------------  Site Interactions

var styleguideSandbox = (function(){
  var mediumBreakpoint = 704;
  var currentWindowWidth;


	var codeExamplesGenerator = (function(){
			var init = function() {
				// find all examples marked with the data-code attribute
				var exampleUnit;
				var codeExamples = document.querySelectorAll('[data-code]');

				if (codeExamples.length){

					for (exampleUnit of codeExamples) {
						// grab the html in these examples, escape it and print it in <pre class="prettyprint"></pre>

						var exampleHTML = escapeHtml(exampleUnit.innerHTML);

						var formattedExample = document.createElement("pre");
								formattedExample.innerHTML = exampleHTML;
								formattedExample.classList.add('prettyprint');

						// remove the data-code attribute to mark the example as copied
						exampleUnit.removeAttribute('data-code');


						insertCopiedCodeSnippet(formattedExample, exampleUnit);

					}

					prettyPrint();

				};

				function insertCopiedCodeSnippet(newNode, referenceNode) {
					referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
				}

				function escapeHtml(htmlString) {
					return htmlString
					 .replace(/&/g, "&amp;")
					 .replace(/></g, "&gt;\n&lt;")
					 .replace(/</g, "&lt;")
					 .replace(/>/g, "&gt;")
					 .replace(/"/g, "&quot;")
					 .replace(/'/g, "&#039;");
				}

			};

			return {
				init: init
			};


	})();

  var scrollToTargetUtility = (function(){
 		// uses https://github.com/cferdinandi/smooth-scroll

        var init = function(){

					smoothScroll.init({
				    selector: '[data-action="scrollTo"]',
				    selectorHeader: null,
				    speed: 600,
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
        var $sideNavigation = document.querySelector('[data-module="SideNavigation"]');
        var $sideNavigationToggleWrap = document.querySelector('[data-module="SideNavigation__toggle-wrap"]');
        var $toggleLink = $sideNavigationToggleWrap.querySelector('[data-action="SideNavigation_toggle"]');
        var $wrap = document.querySelector('[data-module="wrap-all-content"]');
        var $mainContent = document.querySelector('[data-module="main-content"]');
        var openNavClass = 'js-is-sidenav-open';
        var navClosedManuallyClass = 'js-is-sidenav-closed-manually';


        // Start sub functions

        var checkWidth = function(){

          currentWindowWidth = window.innerWidth;

          if (currentWindowWidth < 900){

              closeNav();


            } else {

              if(!$sideNavigation.classList.contains(navClosedManuallyClass)){
                openNav();
              }
            }
        };


        var checkNavOpen = function(isManual){

          if ($wrap.classList.contains(openNavClass)){

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
               $wrap.classList.remove(openNavClass);
            }, 150);


            if(isManual){
              $sideNavigation.classList.add(navClosedManuallyClass);
            }

            $mainContent.removeEventListener('click', closeNav);
        };

        var openNav = function(){

            if(!firstTimeLoad){
              toggleAnimation();
            }
            setTimeout(function(){
               $wrap.classList.add(openNavClass);
            }, 150);

            $sideNavigation.classList.remove(navClosedManuallyClass);
        };

        var openIfClosed = function(isManual){

          if (!$wrap.classList.contains(openNavClass)){

              openNav();

            }
        };

        var toggleAnimation = function(){

          var flipClass = 'js-toggle-wrap--flip';


          setTimeout(function(){
            $sideNavigationToggleWrap.classList.remove(flipClass);
          }, 650);

          $sideNavigationToggleWrap.classList.add(flipClass);

        };


        var init =  function(){

          // set nav height and nav state on load
          checkWidth();

          // init button toggle

          $toggleLink.addEventListener('click', function(e){

            checkNavOpen(true);

            e.preventDefault();

          });

           // init nav toggle on click if nav closed

          $sideNavigation.addEventListener('click', function(e){

            openIfClosed(true);


          });

          // on window resize some things need to get recalculated

			function debounce (func, wait, immediate) {
					var timeout;
					return function() {
						var context = this, args = arguments;
						var later = function() {
							timeout = null;
							if (!immediate) func.apply(context, args);
						};
						var callNow = immediate && !timeout;
						clearTimeout(timeout);
						timeout = setTimeout(later, wait);
						if (callNow) func.apply(context, args);
					};
				};

				window.addEventListener("resize", debounce(function() {
							checkWidth();
				}, 500));


          // set first time load to false for animation

          firstTimeLoad = false;

        };

       return {
        init: init
       };

    })();

  // Initialize Modules

		function ready(fn) {
			if (document.readyState != 'loading'){
				fn();
			} else {
				document.addEventListener('DOMContentLoaded', fn);
			}
		}


    var init = function(){

			ready(function(){
				sideNavigation.init();
				scrollToTargetUtility.init();
				codeExamplesGenerator.init();
			})
    };

    return {
        init: init
    };

})();



  styleguideSandbox.init();
