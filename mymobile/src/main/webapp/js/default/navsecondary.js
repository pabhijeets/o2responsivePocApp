showMore = function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $trigger = jQuery(e.currentTarget);
    var $menu = $trigger.closest('ul');
    $menu.show();
    $menu.children('li').show();
    $trigger.parent().hide();
};

showMoreSecondary = function(e) {
    e.preventDefault();
    e.stopPropagation();

    jQuery('.overflow-menu').css({'margin-left' : 0});

    var $overflowMenu = jQuery('.overflow-menu'),
        $trigger = jQuery(e.currentTarget),
        $menu = $trigger.children('ul'),
        $overflowItems = $overflowMenu.find('li a');

    $overflowItems.attr('tabIndex', 0);
    $trigger.addClass('is-hover');
    $menu.show();

    var overFlowMenuWidth = $overflowMenu.width(),
        buttonWidth = jQuery('#nav-secondary').find('.show-more').innerWidth() - 2;

    $overflowMenu.css({'margin-left' : - (overFlowMenuWidth) + buttonWidth + 'px'});
};

hideMoreSecondary = function(e) {

    e.preventDefault();
    e.stopPropagation();

    var $trigger = jQuery(e.currentTarget),
        $menu = $trigger.children('ul');

    $trigger.removeClass('is-hover');
    $menu.hide();
};

hideMoreSecondaryOnFocusOut = function() {

    window.setTimeout(function(){

        var $elementParent = jQuery(document.activeElement).parents();
        var $secondaryNavShowMore = jQuery("#nav-secondary").find('.show-more');

        if (! $elementParent.is('.show-more')) {
            $secondaryNavShowMore.trigger('mouseleave');
        }
    }, 50);
};

reloadPage = function(e) {
    document.location.href = e.currentTarget.href;
};

highlightCurrentPageInNav = function() {
    var thisurl = document.location.href,
        $allLinks = jQuery("#nav-secondary").find("a"),
        $matchingLinks = [];

    if(document.location.hash != "") {
        thisurl = thisurl.substring(0,thisurl.indexOf("#"));
    }
    thisurl = thisurl.substring(0,thisurl.indexOf("?"));

    for(var i=0; i<$allLinks.length; i++) {
        var navUrl = $allLinks[i].href.substring(0,$allLinks[i].href.indexOf("?"));
        if(navUrl == thisurl && $allLinks[i].innerHTML != "More") {
            $matchingLinks.push($allLinks[i]);
        }
    }

    $matchingLinks = jQuery($matchingLinks);
    if (thisurl.indexOf('errors/404') === -1) {


        if ($matchingLinks.size() > 0) {
            var $thisUrlInNav = $matchingLinks.last();
            if ($thisUrlInNav.size() > 0) {
                var $parentListItem = $thisUrlInNav.closest('li');
                var $parentList = $parentListItem.closest('ul');
                $parentListItem.addClass('is-active');
            }
        }
    }
};
