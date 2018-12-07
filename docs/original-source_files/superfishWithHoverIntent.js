$.fn.hoverIntent = function (handlerIn, handlerOut, selector) { var cfg = { interval: 100, sensitivity: 7, timeout: 0 }; if (typeof handlerIn === "object") { cfg = $.extend(cfg, handlerIn); } else if ($.isFunction(handlerOut)) { cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector }); } else { cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut }); } var cX, cY, pX, pY; var track = function (ev) { cX = ev.pageX; cY = ev.pageY; }; var compare = function (ev, ob) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) { $(ob).off("mousemove.hoverIntent", track); ob.hoverIntent_s = 1; return cfg.over.apply(ob, [ev]); } else { pX = cX; pY = cY; ob.hoverIntent_t = setTimeout(function () { compare(ev, ob); }, cfg.interval); } }; var delay = function (ev, ob) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); ob.hoverIntent_s = 0; return cfg.out.apply(ob, [ev]); }; var handleHover = function (e) { var ev = jQuery.extend({}, e); var ob = this; if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); } if (e.type == "mouseenter") { pX = ev.pageX; pY = ev.pageY; $(ob).on("mousemove.hoverIntent", track); if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout(function () { compare(ev, ob); }, cfg.interval); } } else { $(ob).off("mousemove.hoverIntent", track); if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout(function () { delay(ev, ob); }, cfg.timeout); } } }; return this.on({ 'mouseenter.hoverIntent': handleHover, 'mouseleave.hoverIntent': handleHover }, cfg.selector); }; (function ($) {
var G_Is_sf_menu_mobile = 0; 
$.fn.superfish = function (op) { jQuery('ul.sf-menu').css('display', ''); var sf = $.fn.superfish, c = sf.c, 
// dolev 08022018 : $arrow = $(['<span class="', c.arrowClass, '"> &#187;</span>'].join('')),
$arrow = $(['<span class="', c.arrowClass, '"> </span>'].join('')),
over = function () { var $$ = $(this), menu = getMenu($$); clearTimeout(menu.sfTimer); $$.showSuperfishUl().siblings().hideSuperfishUl(); }, out = function () { var $$ = $(this), menu = getMenu($$), o = sf.op; clearTimeout(menu.sfTimer); menu.sfTimer = setTimeout(function () { o.retainPath = ($.inArray($$[0], o.$path) > -1); $$.hideSuperfishUl(); if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1) { over.call(o.$path); } }, o.delay); }, getMenu = function ($menu) { var menu = $menu.parents(['ul.', c.menuClass, ':first'].join(''))[0]; sf.op = sf.o[menu.serial]; return menu; }, addArrow = function ($a) { $a.addClass(c.anchorClass).append($arrow.clone()); }; jQuery('ul.sf-menu').css('display', ''); return this.each(function () { var s = this.serial = sf.o.length; var o = $.extend({}, sf.defaults, op); o.$path = $('li.' + o.pathClass, this).slice(0, o.pathLevels).each(function () { $(this).addClass([o.hoverClass, c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass); }); sf.o[s] = sf.op = o; $('li:has(ul)', this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over, out).each(function () { if (o.autoArrows) addArrow($('>a:first-child', this)); }).not('.' + c.bcClass).hideSuperfishUl(); var $a = $('a', this); $a.each(function (i) { var $li = $a.eq(i).parents('li'); $a.eq(i).focus(function () { over.call($li); }).blur(function () { out.call($li); }); });o.onInit.call(this); }).each(function () {var menuClasses = [c.menuClass]; 
// dolev 14122017 - remove because jquery 3.2.1 dont support $.msie
//if (sf.op.dropShadows && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass); 
$(this).addClass(menuClasses.join(' ')); }); }; var sf = $.fn.superfish; sf.o = []; sf.op = {}; sf.IE7fix = function () {var o = sf.op; 
// dolev 14122017 - remove because jquery 3.2.1 dont support $.msie
//if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined) this.toggleClass(sf.c.shadowClass + '-off'); 
}; 
sf.c = { bcClass: 'sf-breadcrumb', menuClass: 'sf-js-enabled', anchorClass: 'sf-with-ul', arrowClass: 'sf-sub-indicator', shadowClass: 'sf-shadow' }; sf.defaults = { hoverClass: 'sfHover', pathClass: 'overideThisToUse', pathLevels: 1, delay: 800, animation: { opacity: 'show', height: 'show' }, animationOut: { opacity: 'hide', height: 'hide' }, speed: 'slow', speedOut: 'slow', autoArrows: true, dropShadows: true, disableHI: false, onInit: function () { }, onBeforeShow: function () { if (G_Is_sf_menu_mobile == 0) { /*$(this).css('margin-top', '0px'); remove 13-dec-2015*/ $(this).fadeIn('fast', function () { $('.cls_div_menu_h, .cls_div_menu_v').removeClass('cls_div_menu_Zindex'); $('.cls_div_menu_h *, .cls_div_menu_v *').removeClass('cls_div_menu_Zindex'); var objParent = $(this).parents('.cls_div_menu_h, .cls_div_menu_v'); $(objParent).addClass('cls_div_menu_Zindex'); $(objParent).find('.sf-menu li:hover ul,.sf-menu li:hover ul li,.sf-menu li:hover li').addClass('cls_div_menu_Zindex'); var MiniMenuOffsetTop = $(this).offset().top; var tmpScreenHeight = $(window).height(); var tmpMenuHeight = $(this).height(); var tmpScrollTop = $(window).scrollTop(); if (MiniMenuOffsetTop + tmpMenuHeight > tmpScreenHeight + tmpScrollTop) { var topPos; var tmp1 = (tmpScreenHeight + tmpScrollTop) - tmpMenuHeight; var tmp2 = MiniMenuOffsetTop - tmp1; tmp2 = tmp2 * -1; if ((MiniMenuOffsetTop + tmp2) < tmpScrollTop) { tmp2 = (MiniMenuOffsetTop - tmpScrollTop) * -1; } $(this).animate({ 'margin-top': tmp2 + 'px' }, 50); } }); } }, onShow: function () { $('.cls_div_menu_v ul.sf-menu,.cls_div_menu_h ul.sf-menu,.cls_div_menu_v ul.sf-menu ul,.cls_div_menu_h ul.sf-menu ul').css("overflow", "visible"); }, onHide: function () { $('.cls_div_menu_h,.cls_div_menu_v').removeClass('cls_div_menu_Zindex'); $('.cls_div_menu_h *,.cls_div_menu_v *').removeClass('cls_div_menu_Zindex'); } }; $.fn.extend({ hideSuperfishUl: function () {var o = sf.op, not = (o.retainPath === true) ? o.$path : ''; o.retainPath = false;
var $ul=$(['li.',o.hoverClass].join(''), this).add(this).not(not).removeClass(o.hoverClass).find('>ul').hide()
/*.css('visibility', 'hidden')*/
;o.onHide.call($ul);return this;},showSuperfishUl: function () 
{var o = sf.op,sh = sf.c.shadowClass + '-off',$ul = this.addClass(o.hoverClass)
.find('>ul:hidden')/*.css('visibility', 'visible')*/
;sf.IE7fix.call($ul);o.onBeforeShow.call($ul);$ul.animate(o.animation, o.speed, function () { sf.IE7fix.call($ul); o.onShow.call($ul); });return this;}});jQuery('ul.sf-menu').css('display','');jQuery('ul.sf-menu').superfish();jQuery('ul.sf-menu').css('display','');var $this;if($(".sf-menu li") && $(".sf-menu li") != 'undefined'){$(".sf-menu li").each(function(){$this=$(this);if($this.find("li.active").length)$this.addClass("active");});}

$('.sf-js-disable').removeClass('sf-js-disable')

$('.sf-menu-mobile-btn').click(function(){
var objParent=$(this).parents('.cls_div_menu_h,.cls_div_menu_v');
$(objParent).find('.sf-menu').toggleClass("sf-menu-mobile-showsubmenu",100);
G_Is_sf_menu_mobile=1;return(false);
});

// mobile menu slide

$('.sf-menu-mobile-btn0').click(function(){
    var objParent=$(this).parents('div').find('.cls_div_menu_h,.cls_div_menu_v');
    $(objParent).find('.sf-menu').toggleClass("sf-menu-mobile-showsubmenu",100);
    G_Is_sf_menu_mobile=1;return(false);
});

$('.sf-menu-mobile-btn1,.sf-menu-mobile-btn3').parents('div').find('.cls_div_menu_h,.cls_div_menu_v').addClass('sf-ma-sidenav').addClass('sf-ma-sidenav-left')
$('.sf-menu-mobile-btn1,.sf-menu-mobile-btn3').click(function(){
 func_sf_Menu_MA_SlideIt_OnClick(this)
});

$('.sf-menu-mobile-btn2,.sf-menu-mobile-btn4').parents('div').find('.cls_div_menu_h,.cls_div_menu_v').addClass('sf-ma-sidenav').addClass('sf-ma-sidenav-right')
$('.sf-menu-mobile-btn2,.sf-menu-mobile-btn4').click(function(){
    func_sf_Menu_MA_SlideIt_OnClick(this)
});

// נראה לי שזה בא לתקן לחיצה על פתיחת תת תפריט כשיש קישור אז מונע את הלחיצה על הלינק //
$('.sf-with-ul').click(function(e){if (G_Is_sf_menu_mobile==1){var tmpSubMenu=$(this).parent('li').find('ul:first');
$(tmpSubMenu).toggle();return false;}else{if ($(this).attr('href')=="" || $(this).attr('href')=="#"){$(this).attr('href')=='javascript:return false;';return false;}}});})(jQuery);


function func_sf_Menu_MA_SlideIt_OnClick(objthis)
{
    var sf_containers = '.SB_Mobile_Header_Cont, .SB_Mobile_Header2_Cont ,.Css_Mobile_PageContent, .SB_Mobile_Bottom_Background,.SB_Mobile_Menu_Container,.clsNG_Main,.SB_FlashGallery_Container,.SB_P_F_C,.SB_Mobile_LMenu_Container'
    var objParent=$(objthis).parents('div')
    $(objParent).find('.sf-menu').toggleClass("sf-menu-mobile-showsubmenu",100);
    $(objParent).find('.sf-ma-sidenav').toggleClass("sf-ma-sidenav-open");
    $(sf_containers).toggleClass("sf-ma-sidenav-opasity");
    if ($(objthis).hasClass('sf-menu-mobile-btn3')) {func_sf_Menu_Content_Margin(objParent,1,sf_containers)}
    if ($(objthis).hasClass('sf-menu-mobile-btn4')) {func_sf_Menu_Content_Margin(objParent,2,sf_containers)}
    func_sf_Menu_FixPositin_AddFixClass(objParent)
    G_Is_sf_menu_mobile=1;return(false);

}

function func_sf_Menu_FixPositin_AddFixClass(obj)
{
    var objwithfix
    objwithfix = $(obj).parents('.SB_Mobile_Header_Menu_TopPos,.SB_Header_Menu_TopPos')
   // $(objwithfix).toggleClass("sf-ma-MainDiv-MenuOpen",50);
    if ($(obj).find(".sf-ma-sidenav-open").length==0)
    {
         setTimeout(function(){$(objwithfix).removeClass('sf-ma-MainDiv-MenuOpen')},600);
    }
    else
    {
        $(objwithfix).addClass('sf-ma-MainDiv-MenuOpen')
    }
}

function func_sf_Menu_Content_Margin(obj,marginDirection,sf_containers)
{
    var objwithfix
    if ($(obj).find(".sf-ma-sidenav-open").length>0) {
         $(sf_containers).css('overflow-x','hidden') // try to fix bug of body marging after close menu
         if (marginDirection==1)
         {
            $(sf_containers).addClass('sf-ma-sidenav-MarginLeft')
         }
         else
         {
            $(sf_containers).addClass('sf-ma-sidenav-MarginRight')
         }
    }
    else
    {
        $(sf_containers).addClass('sf-ma-sidenav-MarginClear').removeClass('sf-ma-sidenav-MarginLeft').removeClass('sf-ma-sidenav-MarginRight')
        setTimeout(function () { $(sf_containers).removeClass('sf-ma-sidenav-MarginClear') }, 600);
        //$(sf_containers).css('overflow-x', '')
        //setTimeout(function () { $('body').css('overflow-x','hidden') }, 700);
        //setTimeout(function () { $('body').css('margin-left', '') }, 1000);
    }
}