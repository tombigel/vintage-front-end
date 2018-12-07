var G_ViewPort = 0;
var G_ViewPortScale = 0;
var G_V_MobileWidth = 360;  //480;
var G_V_IsExistPositionAbsoluteElements = 0;  //480;
var LocFlagIsKeypress13_CatalogSearch = 0;
var G_Func_divTopLeft_Button_Flag = 2;
var G_Func_divTopLeft_BasketLoad = 0;
var G_Func_divTopLeft_WishListLoad = 0;
var SB_Mobile_Header_Menu_TopPos_top = '';
var SB_Mobile_Header_Menu_TopPos_MA_top = '';
var SB_Mobile_Header_Cont_top = '';
$(document).ready(function () {
    $('.clsCatalogSearch_Txt').on("keypress", function (e) {
        if (e.keyCode == 13) {
            if (LocFlagIsKeypress13_CatalogSearch == 0) {
                LocFlagIsKeypress13_CatalogSearch = 1;
                funcCatalogSearch(this);
                return false;
            }
        }
    });


    G_V_IsExistPositionAbsoluteElements = $('body .SB_Elm_PositionAbsolute').first().length
    func_SB_FixPositionAbsoluteElements();
    funcCheckIfZoomOnMobile_Pattern();

    func_SB_SpecialMenuLinks();

    func_SB_CatalogProduct_ChangeImg();
    Func_OpenCloseFloatingCart_build(); // need to be before funcMenuMobileStart
    funcMenuMobileStart();
    funcSticyType();
    funcSmoothScrollOnAnchor();

    var TestAgainIsInEditMode = func_SB_IsPageLoadInEditor()
    if (TestAgainIsInEditMode == 1) {
        // just for security check if i in editor mode
        G_SB_IsEditMode = 1
    }
    if (G_SB_IsEditMode == 0) {
        $(window).resize(function () {
            func_SB_FixPositionAbsoluteElements();
            funcCheckIfZoomOnMobile_Pattern();
        })
        // מתקן קריאות לאייפריים בSSL
        funcSB_SSLUrlFix();
        FuncGoogleAdwordsConverstionTelOnClick()
        // מנסה לתקן מצב של טעינה בתוך IFRAME - כדי לפתור באג במעבר מזאפ לאתר ואז לתשלום בריווחית
        //func_SB_FixPageLoadInside_Zap_Ifrmae();
    }
    else {
        //            $(window).resize(function () {
        //                funcCheckIfZoomOnMobile_Pattern();
        //            });
    }
    
    $.scrollUp({ animation: 'fade', scrollImg: { active: true, type: 'background'} });

    //$('.SB_Rating_StarsDisp .fa').mouseover(func_Mouseover_Rating_Stars);
    $('.SB_Rating_StarsDisp .fa').on('mouseover', function () { func_Mouseover_Rating_Stars(this) });
    //$('.SB_Rating_StarsDisp .fa').mouseover(function () {
    //    func_Mouseover_Rating_Stars(this)
    //});
});

function funcUserNamePannel_ShowModal(LocPage, LocTitle, optionalWidth, optionalHeight, optionalIsRefreshOnClose) 
{
	var winW, winH;
	optionalWidth = optionalWidth || 0;
	if (optionalWidth > 0) {		    
		winW = optionalWidth;
	}
	else {
		//winW = $(window).width() * 95 / 100;
		winW = 320;
	}

	optionalHeight = optionalHeight || 0;
	if (optionalHeight > 0) {
		winH = optionalHeight;
	}        
	else {
		winH = $(window).height() * 95 / 100;
	}

	var Loc_Iphone_ScroolFixCss = '';
	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	if (LocPage.indexOf("action.asp?Action=2") >= 0 && iOS) {
		Loc_Iphone_ScroolFixCss = '-webkit-overflow-scrolling:touch;overflow-y:scroll;'
	}
	var $dialog = $('<div id="DialogReg" style="' + Loc_Iphone_ScroolFixCss + '"></div>')
	.html('<iframe id="ifrModal" style="border: 0px; " src="' + LocPage + '" width="100%" height="100%"></iframe>')
	.dialog({
		autoOpen: false,
		modal: true,
		height: winH,
		width: winW,
		resizable: false,
		draggable: false,
		title: LocTitle,
		open: function (event, ui) {
			//$('.ui-dialog').css('z-index',999993);
			//$('.ui-widget-overlay').css('z-index',999992);
			//$('.ui-dialog .ui-dialog-titlebar.ui-widget-header').css('cursor','move').css('background','#FFF !important').css('color','#999 !important').css('border','0px !important').css('border-bottom','1px solid #E5E5E5 !important');
		}
		, show: {
			effect: "fade",
			duration: 600
		},
		hide: {
			effect: "fade",
			duration: 600
		}
		, close: function () {
			$("#DialogReg").fadeIn(
				"slow",
				function () {
					var LocLocation = window.location.href.toLowerCase();
					if (LocLocation.indexOf("page=newpaying.asp") !== -1 || optionalIsRefreshOnClose == 1) {
						window.location.reload();
					}
					$("#DialogReg").dialog("destroy");
				}
			);
		}
	});
	$("#DialogReg").dialog('open');
}

function funcUserNamePannel_CloseModal()
{
	$('#DialogReg').dialog("close");
}

function resizeIframe(obj) {
    // dolev 01/03/2015 : this is a problem to use this function because cross domain so we cant use it anymore, just support old websites
    // in use for contact form and flow basket !
    try {
        var a = obj.contentWindow.document.body.scrollHeight;
        obj.style.height = 0;
        obj.style.height =  a + 'px';
    }
    catch (e) {
    }
}
 
function resizeShoppingIframe() {
    // dolev 01/03/2015 : this is a problem to use this function because cross domain so we cant use it anymore, just support old websites
    // in use for contact form and flow basket !
    obj = document.getElementById("frmShoppingCart")
    try {
        var a = obj.contentWindow.document.body.scrollHeight;
        obj.style.height = 0;
        obj.style.height = a + 'px';
    }
    catch (e) {
    }
}

function funcUserNamePannel_CloseModalAndRefresh() {
    $('#DialogReg').dialog("close");
    window.location.reload();
}

function funcUserNamePannel_CloseModalAndGoToAfterLogin() {
    $('#DialogReg').dialog("close");
    window.location = "AfterLogin.asp";
}

function funcUserNamePannel_RedirectCloseModalAndRefresh(DefaultPageAccess) {
    $('#DialogReg').dialog("close");
    window.location = DefaultPageAccess;
}

function PopupCenter(url, title, w, h) {   
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    if (window.focus) {
        newWindow.focus();
    }
}

function func_SB_FixPositionAbsoluteElements() {

    // screen:480 left:400 width:60 right:20
    // screen:400 left:400 width:60 

    var WindWidth = $(window).width();
    //var TmpWidth = $(document).width();
    G_ViewPort = WindWidth
    G_ViewPortScale = 1 //G_ViewPort/480

    if (WindWidth < 768) {
        func_SB_SelectStyleForMobileOrWeb(1, 0)
        //if (G_SB_IsEditMode == 0) {
            // מבטל את החישוב כדי לעשות זום !!!
            //func_SB_FixPosition_Scale_New(WindWidth);
        //}
        // מתקן סטיות מהמסך
        func_SB_FixPosition_ChaeckLeftRightPos(1,0)
    }
    else {
        func_SB_SelectStyleForMobileOrWeb(0, 0)

        // מתקן סטיות מהמסך
        func_SB_FixPosition_ChaeckLeftRightPos(0, 0)
    }
}
 
function funcCatalogSearch(Obj) {
    var LocSW = $(Obj).parents('.clsCatalogSearch').find('.clsCatalogSearch_Txt').val();
    LocSW = $.trim(LocSW);   
    if(LocSW != "")
    {
        document.location = "catalog.asp?Action=Search&SW=" + LocSW;
    }
}

function funcCheckIfZoomOnMobile_Pattern() {
    // dolev 06052018 - לא מבין למה צריך את התנאי הזה
    //if ($('.SB_Mobile_Header_Cont').length) {
        var WindWidth = $(window).innerWidth();
        var ScreenWidth = screen.width;
        var scale = WindWidth / LocG_PageAllWebWidth;
        var ObjContCls = '.SB_Mobile_Header_Cont,.SB_Mobile_Header_Menu_TopPos,.SB_Mobile_Header2_Cont,.SB_Mobile_Page_Container,.Css_Mobile_Footer,.SB_Mobile_Menu_Container,.SB_FlashGallery_Container,.SB_Mobile_LMenu_Container'
        // dolev temp  if (scale < 1 && WindWidth >= 768) { //768
        if (scale < 1 && WindWidth >= 768) { //768
            $('html').css('zoom', scale); /*chrome fix*/
            setTimeout(function () {
                $('.wow').css('visibility', 'visible');
            }, 3000);
            // מנקה מצב סלולר אם חוזרים למצב מחשב 
            $(ObjContCls).css('zoom', ''); 
        }
        else if ((WindWidth < 768) && (G_V_IsExistPositionAbsoluteElements>0)) {
            scale = WindWidth / G_V_MobileWidth
            //$('html').css('zoom', scale); /*chrome fix*/
            //var ObjCont = $('.SB_Mobile_Header_Cont,.SB_Mobile_Header_Menu_TopPos,.SB_Mobile_Header2_Cont,.SB_Mobile_Page_Container,.SB_Mobile_Bottom_Background,.SB_Mobile_Menu_Container,.SB_FlashGallery_Container,.SB_Mobile_LMenu_Container').has('.SB_Elm_PositionAbsolute')
            var ObjCont = $(ObjContCls).has('.SB_Elm_PositionAbsolute')
            $(ObjCont).css('zoom', scale);
            setTimeout(function () { $('.wow').css('visibility', 'visible'); }, 3000);
        }
        else {
            $('html').css('zoom', '');
            //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { }
        }
    // }
}

function func_SB_SelectStyleForMobileOrWeb(IsMobile, IsEditMode) {
    if (IsMobile == 1) {

        // 06052018 dolev - add this *.SB_Elm_PositionAbsolute because of fix position backup style in : func_SB_FixPosition_ChaeckLeftRightPos
        $('*[styleM],*.SB_Elm_PositionAbsolute').each(function () {
            var a = $(this).attr('style');
            var w = $(this).attr('styleW');
            if (!w) // רק אם עדיין לא גיביתי את המצב ווב אני מגבה פעם אחת
            {
                $(this).attr('styleW', a);
            }
            var m = $(this).attr('styleM');
            if (m) {
                $(this).attr('style', m);
            }
        });
    }
    else {
        // 06052018 dolev - add this *.SB_Elm_PositionAbsolute because of fix position backup style in : func_SB_FixPosition_ChaeckLeftRightPos
        $('*[styleM],*.SB_Elm_PositionAbsolute').each(function () {
            //var a = $(this).attr('style');
            var w = $(this).attr('styleW');
            if (w) {
                $(this).attr('style', w);
            }
        });
    }
}

function func_SB_FixPosition_Scale_New(ContWidth) {
    var fxp = 0
    var r = 0;
    $('.SB_Elm_PositionAbsolute,.SB_Elm_PositionAbsolute span').each(function () {
        //var p = $(this).position();
        //var objWidth = $(this).width()
        //var objHeight = $(this).outerHeight()
        //var offset = $(this).offset();
        var fontsize = $(this).css('font-size').replace('px', '');
        if ($(this).hasClass('SB_Elm_PositionAbsolute')) {
            func_SB_FixPosition_Calc(this, 'left', ContWidth)
            func_SB_FixPosition_Calc(this, 'width', ContWidth)
            func_SB_FixPosition_Calc(this, 'padding-top', ContWidth)
            func_SB_FixPosition_Calc(this, 'padding-left', ContWidth)
            func_SB_FixPosition_Calc(this, 'padding-right', ContWidth)
            func_SB_FixPosition_Calc(this, 'padding-bottom', ContWidth)
            func_SB_FixPosition_Calc(this, 'margin-top', ContWidth)
            func_SB_FixPosition_Calc(this, 'margin-left', ContWidth)
            func_SB_FixPosition_Calc(this, 'margin-right', ContWidth)
            func_SB_FixPosition_Calc(this, 'margin-bottom', ContWidth)
            if (ContWidth < G_V_MobileWidth) {
                func_SB_FixPosition_Calc(this, 'height', ContWidth)
                func_SB_FixPosition_Calc(this, 'font-size', ContWidth , 1)
            }
            else {
                fxp = ContWidth - ((ContWidth - G_V_MobileWidth) / 3)
               // fxp = ContWidth
                func_SB_FixPosition_Calc(this, 'height', fxp)
                func_SB_FixPosition_Calc(this, 'font-size', fxp , 1)
            }
        }
        else {
            // לא נראה לי שהתנאי הזה מתקיים
            if (ContWidth < G_V_MobileWidth) {
                func_SB_FixPosition_Calc(this, 'font-size', ContWidth, 1)
            }
        }
    })
}

function func_SB_FixPosition_Calc(obj,cssname, locContWidth,isDataStore) {
    var r
    var val
   // if (isDataStore==1) 
    if (1 == 1) 
    {
      val = $(obj).data(cssname)
      if (!val)
      {
        val = $(obj).css(cssname).replace('px', '');
        $(obj).data(cssname,val)
      }
    }
    else
    {
        val = $(obj).css(cssname).replace('px', '');
    }

    if (val != '') {
        r = parseInt((val / G_V_MobileWidth) * locContWidth);
        $(obj).css(cssname, r + 'px');
    }
}

function func_SB_FixPosition_ChaeckLeftRightPos(IsMobile, IsEditMode) {
    // מתקן סטיות מהמסך
    var WindWidth = G_V_MobileWidth; //$(window).width();
    if (IsMobile == 1)
    { WindWidth = G_V_MobileWidth }
    else { WindWidth = $(window).width(); }

    var HTMLZoom = parseFloat($('html').css('zoom'))
    if (isNaN(HTMLZoom) || (HTMLZoom < 0) || (HTMLZoom > 1)) {
        HTMLZoom = 1 
     }

    var IsFix = 0;
    $('.SB_Elm_PositionAbsolute').each(function () {
        var Obj = this
        var objWidth = $(Obj).outerWidth()
        var objHeight = $(Obj).outerHeight()
        var offset = $(Obj).offset();
        IsFix = 0;
        if (offset.top < 1) {
            var loctop = 1;
            $(Obj).css('top', loctop + 'px')
            IsFix = 1;
        }
        if ((offset.left + objWidth) > WindWidth) {
            // if ((offset.left) > WindWidth) { // רק אם האלמנט יוצא לגמרי מהמסך
            //var locleft = WindWidth - objWidth; // WindWidth - $(Obj).width() ;
            // $(Obj).css('left', locleft + 'px') // התיקון הזה לא טוב אז אני בינתיים מאפס את המיקום
            var prntOffset = $(Obj).offsetParent().offset();
            var prntLeft = prntOffset.left;

            var LeftExtra = WindWidth - ((prntLeft + Obj.offsetLeft + objWidth)*HTMLZoom)
            if (LeftExtra < 0) {
                $(Obj).css('left', (Obj.offsetLeft+LeftExtra) + 'px')
            }
            //$(Obj).css('left', '1px')
            IsFix = 1;
        }
        if ((offset.left) < 1) {
            var prntOffset = $(Obj).offsetParent().offset();
            var prntLeft = prntOffset.left;
            //var LeftExtra = ((prntLeft + Obj.offsetLeft) * HTMLZoom)

            if (offset.left < 0) {
                $(Obj).css('left', ((prntLeft*HTMLZoom)*-1) + 'px')
            }

            // var locleft = 1; // WindWidth - $(Obj).width() ;
            // $(Obj).css('left', locleft + 'px')
            IsFix = 1;
        }
    });
}

function func_SB_CatalogProduct_ChangeImg() {
    var LocOrigImg, LocSecondImg;
    $('.Cat_ImgTNpic2').mouseover(function () {
        var pic2 = $(this).attr('Pic2')
        var ObjParent = $(this).parent('.Cat_ImgLink')
        if ($(ObjParent).find('.Cat_ImgTNpic3').length == 0) {
            $(ObjParent).append('<img src="' + pic2 + '" class="Cat_ImgTNpic3" style="display:none;">')
        }
        this.style.opacity = '0.1';

        var pic1 = $(this).attr('src')
        var pic2 = $(this).attr('Pic2')
        $(this).data('pic', pic1)
        var objthis = this
        setTimeout(function () { $(objthis).attr('src', pic2); objthis.style.opacity = '1'; }, 300);
    });

    $('.Cat_ImgTNpic2').mouseout(function () {
        var pic1 = $(this).data('pic')
        this.style.opacity = '0.1';
        var objthis = this
        setTimeout(function () { $(objthis).attr('src', pic1); objthis.style.opacity = '1'; }, 300);
    });

    /* 28062017 dolev :  צריך לבדוק אם זה פותר את הבעיה של העלמת התמונה באיפון בלחיצה */
    /*$(".Cat_ImgTNpic2").on("mouseup", function (event) {
    var pic1 = $(this).data('pic')
    $(this).attr('src', pic1);
    this.style.opacity = '1';
    })*/    
}

function funcSB_SSLUrlFix() {
    //alert(location.protocol)
    // פונקציה שמתקנת טעינה של IFRAME בSSL הישן או בכלל בדף מאובטח
    $('iframe').each(function () {
        var tmpurl = $(this).attr('src')

        if (typeof tmpurl  !== "undefined")
        {
            tmpurl = tmpurl.toLowerCase();
            if (location.protocol === 'https:') {
                // page is secure
                if (tmpurl.indexOf("https://secure.2all.co.il/") != -1) {
                    tmpurl = tmpurl.replace("https://secure.2all.co.il/", "https://www.2all.co.il/");
                    $(this).attr('src', tmpurl)
                }
                if (tmpurl.indexOf("http://www.2all.co.il/") != -1) {
                    tmpurl = tmpurl.replace("http://www.2all.co.il/", "https://www.2all.co.il/");
                    $(this).attr('src', tmpurl)
                }
                if (tmpurl.indexOf("http://2all.co.il/") != -1) {
                    tmpurl = tmpurl.replace("http://2all.co.il/", "https://www.2all.co.il/");
                    $(this).attr('src', tmpurl)
                }
            }
            else {
                if (tmpurl.indexOf("https://secure.2all.co.il/") != -1) {
                    tmpurl = tmpurl.replace("https://secure.2all.co.il/", "http://www.2all.co.il/");
                    $(this).attr('src', tmpurl)
                }
            }
        }
    });
}

$(document).on("keyup", ".clsCatProductCount", function () {
    var Loc_IsInventoryManage = $(this).attr('IsInventoryManage');
    funcCatalogPhaseCounterValidate($(this)); /*צריך לשמור על הסדר של 2 הפונקציות*/
    if (Loc_IsInventoryManage > 0) {
        funcCatalogQuantityValidate($(this));
    }
    funcCatalogMaxQuantityPerOrderValidate($(this));
});

$(document).on("blur", ".clsCatProductCount", function () {
    //funcCatalogPhaseCounterValidate($(this));
});

function funcCatalogChangeQuantity(Obj, ValToAdd, Loc_IsInventoryManage, Loc_MaxQuantityPerOrder) {
    //console.log('CatalogChangeQuantity')
    var CurrVal = $(Obj).val();
    CurrVal = CurrVal * 1;
    ValToAdd = ValToAdd * 1;
    $(Obj).val(CurrVal + ValToAdd);

    funcCatalogPhaseCounterValidate(Obj); /*צריך לשמור על הסדר של 2 הפונקציות*/
    if (Loc_IsInventoryManage > 0) {
        funcCatalogQuantityValidate(Obj);
    }
    funcCatalogMaxQuantityPerOrderValidate(Obj);

}

function funcCatalogMaxQuantityPerOrderValidate(Obj) {
    Loc_MaxQuantityPerOrder = $(Obj).attr('maxquantityperorder')
    Loc_MaxQuantityPerOrder = Loc_MaxQuantityPerOrder * 1 // just to convert to numeric
    if (Loc_MaxQuantityPerOrder > 0) {
        CurrVal = $(Obj).val();
        CurrVal = CurrVal * 1;
        if (Loc_MaxQuantityPerOrder < CurrVal) {
            $(Obj).val(Loc_MaxQuantityPerOrder);
            $(Obj).css('background', '#e91e63')
            $(Obj).css('color', '#ffffff')
        }
        else {
            $(Obj).css('background', '')
            $(Obj).css('color', '')
        }
    }

}


function funcCatalogQuantityValidate(Obj) {
    var CurrVal = $(Obj).val();
    CurrVal = CurrVal * 1;
    if (CurrVal < 0) {
        $( Obj).val(0);
        return;
    }
    var maxquantity = $(Obj).attr('maxQuantity');
    if (maxquantity != 'undefined' && maxquantity != '') {
        if (CurrVal > maxquantity) {
            maxquantity = maxquantity * 1;
            //alert('in funcCatalogQuantityValidate maxquantity=' + maxquantity)       
            $( Obj).val(maxquantity);
        }
    }
}

function funcCatalogPhaseCounterValidate(Obj)
{  /*בודק כפולות של שינוי כמות בעזרת כפתורים - start*/
    var CurrVal = $(Obj).val();

    if (CurrVal == '') {        
        return;/*add 25-jun-2018,fix when deleting on mobile*/
    }

    CurrVal = CurrVal * 1;

    if (CurrVal <= 0) { // if (CurrVal <= 0 ) { //28-sep sho
        var DefaultCount = $(Obj).attr('DefaultCount');
        if (DefaultCount > 0) {
            CurrVal = DefaultCount * 1;
            $(Obj).val(CurrVal);
        }
    }

    var PhaseCounter = $(Obj).attr('PhaseCounter');
    PhaseCounter = PhaseCounter * 1;
    if (PhaseCounter <= 0)
    {
        return;
    }
    if (CurrVal % PhaseCounter)/*יש שארית*/
    {        
        var val_left = CurrVal % PhaseCounter;
        val_left = val_left * 1;        
        var val_new = CurrVal + PhaseCounter - val_left;
        val_new = Math.round(val_new * 100) / 100;
        if (val_new == 0) {
            val_new = PhaseCounter;
        }
        $(Obj).val(val_new);
    }
}

/* mobile menu */
function funcMenuMobileStart() {
    var ObjDivMenu = $('.sf-ma-ul,.sf-menu')
    if (ObjDivMenu.length > 0) {
        //alert('ObjDivMenu len = ' + $(ObjDivMenu).length);
        $(ObjDivMenu).find('.sf-MA-Search a').on('click', function () {
            var objParent = $(this).parents('li.sf-MA-Search').first();
            if ($(objParent).length == 0) {
                objParent = $(this).parents('.sf-ma-ul,.sf-menu').first();
            }

            var ObjSearch = $(objParent).find('.clsCatalogSearch');
            if ($(ObjSearch).length == 0) {
                ObjSearch = $(objParent).parents('.sf-ma-ul-MobileMenu-DivConteiner').find('.clsCatalogSearch').first();
            }
     
            $(ObjSearch).toggleClass('sf-MA-Search-show');

            $('.sf-MA-Search-show').not($(ObjSearch)).removeClass('sf-MA-Search-show');

            if ($(ObjSearch).hasClass('sf-MA-Search-show')) {
                $(ObjSearch).find('input').first().focus()
            }
            if ($(objParent).hasClass('sf-MA-Search-For_desktop')) {
                var dwidth = $(document).width();
                var offset = $(ObjSearch).offset();
                if (offset.left > (dwidth / 2)) {
                    $(ObjSearch).css('left', 'auto')
                    $(ObjSearch).css('right', '1px')
                }
            }
        });

        $(ObjDivMenu).find('.sf-MA-Login a').on('click', function () {
            var objParent = $(this).parent('li');

            var ObjSearch = $(objParent).find('.SB_C_UsersLogin2').first();
            if ($(ObjSearch).hasClass('sf-MA-Login-show')) {
                $(ObjSearch).removeClass('sf-MA-Login-show');
            }
            else {
                $(ObjSearch).addClass('sf-MA-Login-show');
            }
        });

        if ($(ObjDivMenu).find('.sf-MA-WishList').length > 0) {
            $('.CssCatalogAdjusted_pic,.CssCatProductAdjusted_BigPic').append('<span class="fa fa-heart-o sf-MA-WishList-add" ></span>')
            if ($('#Cat_WishList_Iframe').length == 0) {
                $('body').append('<div id="Cat_WishList_Iframe"></div>')
            }                
            funcSB_WishList_LoadData();
            FuncCatalog_Show_WishList_Count();
            funcSB_WishList_Selected()
            $('body').off('click', '.sf-MA-WishList-add')
            $('body').on('click', '.sf-MA-WishList-add', function () {
                $(this).toggleClass('sf-MA-WishList-add-Select')
                if ($(this).hasClass('sf-MA-WishList-add-Select')) {
                    //$(this).removeClass('fa-heart').removeClass('fa-heart-o').addClass('fa-heart')
                    funcSB_Basket_FormSubmitAjax(this, 1)
                }
                else {
                    //$(this).removeClass('fa-heart').removeClass('fa-heart-o').addClass('fa-heart-o')
                    funcSB_Basket_FormSubmitAjax_deleteProduct(this, 1)
                }
                return false;
            })
        }
        $(ObjDivMenu).find('.sf-MA-WishList a').on('click', function () {
            var objParent = $(this).parents('li')
            var ObjWishList = $(objParent).find('.sf-MA-WishList-div')
            if ($(ObjWishList).find('#Cat_WishList_Iframe').length==0)
            {
                $(ObjWishList).append($('#Cat_WishList_Iframe'));
            }
            $(ObjWishList).toggleClass('sf-MA-WishList-Show')
            //if ($(ObjWishList).hasClass('sf-MA-WishList-Show')) {}
            if ($(objParent).hasClass('sf-MA-Search-For_desktop')) {
                var dwidth = $(document).width();
                var offset = $(ObjWishList).offset();
                if (offset.left > (dwidth / 2)) {
                    $(ObjWishList).css('left', 'auto')
                    $(ObjWishList).css('right', '1px')
                }
            }
        });        

        var ObjShopping = $(ObjDivMenu).find('.sf-MA-Shopping')
        if ($(ObjShopping).length > 0) {
            var objIframe = $('#Cat_Basket_Iframe')
            var IsExistLeftIframe = 1;
            if ($(objIframe).length == 0) {
                $('body').append('<div id="Cat_Basket_Iframe" style="display:none;"></div>');
                IsExistLeftIframe = 0
            }
            else {
                $('#divTopLeft').addClass('sf-MA-Shopping-iframe');
            }
            funcSB_Basket_LoadData();             
            $(ObjShopping).find('a').on('click', function () {                
                if (IsExistLeftIframe == 1) {
                    Func_OpenCloseFloatingCart(0);
                }
                else {
                    document.location = "catalog.asp?page=NewShoping.asp"
                }
            })
            //$('#divTopLeft').css('display', 'none')
        }
    }
}
/* end mobile menu */

/*  catalog javascript  */
function Func_OpenCloseFloatingCart_build()
{
    if ($('#divTopLeft').length > 0) {
       // $('.SB_BODY').append($('#divTopLeft'));
        funcSB_Basket_LoadData();
        G_Func_divTopLeft_BasketLoad = 1;
    }
}

function func_OpenCloseFloatingCart_Position() {
    $('#divTopLeft').stop().animate({ "marginTop": ($(window).scrollTop()) + "px" }, 400);
   // dolev $('#divTopLeft').css("left", $(window).scrollLeft() + "px");
    var h = $(window).height() - 50;
    var ifrh = $('.clsCat_Basket_Iframe_Data').height()
    if (h > 600) {
        h = 600;
    }
}

function Func_OpenCloseFloatingCart(FlagOpen) {
    if (G_Func_divTopLeft_BasketLoad == 0) {
        funcSB_Basket_LoadData();
        G_Func_divTopLeft_BasketLoad = 1;
    }
    if (FlagOpen == 1) {
        // dolev $("#Cat_Basket_Iframe").css('width', '320px');
        $("#divTopLeft").addClass('divTopLeft_Open').removeClass('divTopLeft_Close');
        G_Func_divTopLeft_Button_Flag = 1
        //func_OpenCloseFloatingCart_Position();
    }
    else {
        if (G_Func_divTopLeft_Button_Flag == 1) //close
        {
            // dolev $("#Cat_Basket_Iframe").css('width', '1px');
            $("#divTopLeft").addClass('divTopLeft_Close').removeClass('divTopLeft_Open');
            G_Func_divTopLeft_Button_Flag = 2;
        }
        else     // open
        {
            // dolev func_OpenCloseFloatingCart_Position();
            // dolev $("#Cat_Basket_Iframe").css('width', '320px');
            $("#divTopLeft").addClass('divTopLeft_Open').removeClass('divTopLeft_Close');
            G_Func_divTopLeft_Button_Flag = 1
        }
    }
}

function funcSB_Basket_LoadData() {

    if (G_Func_divTopLeft_BasketLoad == 0) 
    {
        try { 
            var url = 'catalog.asp?Page=NewShoping.asp&IsCatalogAjax=1'
            $.ajax({
                url: url,
                async: false,
                type: 'POST',
                cache: false,
                dataType: 'html',
                success: function (data) {
                    $('#Cat_Basket_Iframe').html(data);
                    FuncCatalog_Show_Basket_Count();
                }
            });
        }
        catch (e) { }
    }
}

function funcSB_Basket_FormSubmitAjax_deleteProduct(ObjThis, IsWishListMode) {
    //var formobj = $('#' + formID)
    var formobj = $(ObjThis).parents('.FrmCatalogBasket_Row')
    if ($(formobj).length == 0) {
        formobj = $(ObjThis).parents('#FrmCatalog,form,.cssFrmCatalog')
    }
    var param = 'T1=' + encodeURIComponent($(formobj).find('#T1').val());
    param += '&T2=' + encodeURIComponent($(formobj).find('#T2').val());
    param += '&T3=' + encodeURIComponent($(formobj).find('#T3').val());
    param += '&PicID=' + encodeURIComponent($(formobj).find('#PicID').val());
    param += '&Price=' + encodeURIComponent($(formobj).find('#Price').val());
    param += '&Special=' + encodeURIComponent($(formobj).find('#Special').val());
    param += '&Makat=' + encodeURIComponent($(formobj).find('#Makat').val());
    param += '&money=' + encodeURIComponent($(formobj).find('#money').val());
    param += '&BtnDltProd=1';
    var url = 'catalog.asp?Page=NewShoping.asp&Action=MODIFY&IsCatalogAjax=1&IsWishList=' + IsWishListMode ;  //$(formobj).attr('action')
    $.ajax({
        url: url,
        async: false,
        type: 'POST',
        data: param,
        cache: false,
        dataType: 'html',
        success: function (data) {
            if (IsWishListMode != 1) {
                $('#Cat_Basket_Iframe').html(data);
                FuncCatalog_Show_Basket_Count();
            }
            else {
                $('#Cat_WishList_Iframe').html(data);
                FuncCatalog_Show_WishList_Count();
            }
        }
    });
}

function funcSB_Basket_FormSubmitAjax_updateQuantity(ObjThis) {
    //var formobj = $('#' + formID)
    var formobj = $(ObjThis).parents('.FrmCatalogBasket_Row')
    var param = 'T1=' + encodeURIComponent($(formobj).find('#T1').val());
    param += '&T2=' + encodeURIComponent($(formobj).find('#T2').val());
    param += '&T3=' + encodeURIComponent($(formobj).find('#T3').val());
    param += '&PicID=' + encodeURIComponent($(formobj).find('#PicID').val());
    param += '&Price=' + encodeURIComponent($(formobj).find('#Price').val());
    param += '&Special=' + encodeURIComponent($(formobj).find('#Special').val());
    param += '&Makat=' + encodeURIComponent($(formobj).find('#Makat').val());
    param += '&money=' + encodeURIComponent($(formobj).find('#money').val());
    param += '&Count=' + encodeURIComponent($(formobj).find('#Count').val());
    param += '&BtnQntyUpdate=1';
    var url = 'catalog.asp?Page=NewShoping.asp&Action=MODIFY&IsCatalogAjax=1'; //$(formobj).attr('action')
    $.ajax({
        url: url,
        async: false,
        type: 'POST',
        data: param,
        cache: false,
        dataType: 'html',
        success: function (data) {
            $('#Cat_Basket_Iframe').html(data);
            FuncCatalog_Show_Basket_Count();
        }
    });
}

function FuncCatalogTxtQuantityUpdate(objThis) {
    var ObjIcon = $(objThis).parents('.clsCatalogBasket_PriceRow').find('.clsCatalogBasket_CountUpdate .fa')
    $(objThis).css('border', '2px solid #E91E63')
    $(ObjIcon).css('color', '#E91E63')
    $(ObjIcon).css('font-size', '18px')
    
    var ObjTotlal = $(objThis).parents('.clsCat_Basket_Iframe_Data').find('.clsCatalogBasket_TotalPriceVal')
    $(ObjTotlal).css('opacity', '0.3')
    $(ObjTotlal).css('font-size', '12px')

    $(objThis).addClass('NeedToUpdateQuantity')

    if (event.keyCode == 13) {
        // dolev 14082018 : this create multiple calls when use lost onblur for update so i use : NeedToUpdateQuantity
        $(objThis).removeClass('NeedToUpdateQuantity')
        funcSB_Basket_FormSubmitAjax_updateQuantity(objThis);
    }
}

function FuncCatalogTxtQuantityUpdateOnBlur(objThis) {
    if (!$(objThis).hasClass('NeedToUpdateQuantity')) {
        return;
    }
    var ObjIcon = $(objThis).parents('.clsCatalogBasket_PriceRow').find('.clsCatalogBasket_CountUpdate .fa')
    $(ObjIcon).css('color', '#E91E63')
    $(ObjIcon).css('font-size', '18px')
    // dolev 14082018 : this create multiple calls when use lost onblur for update
    funcSB_Basket_FormSubmitAjax_updateQuantity(objThis);
}

function FuncCatalog_Show_Basket_Count() {
    var objVal;

    objVal = $('#Cat_Basket_Iframe .cat_Basket_Count');
    if ($(objVal).length > 0) {
        $('.clsCat_Basket_Count').html($(objVal).val());
    }
    else
    {
        $('.clsCat_Basket_Count').html('');
    }
}

function FuncCatalog_Show_WishList_Count() {
    var objVal

    objVal = $('#Cat_WishList_Iframe .cat_Basket_Count');
    if ($(objVal).length > 0) {
        $('.clsCat_WishList_Count').html($(objVal).val());
    }
    else {
        $('.clsCat_WishList_Count').html('');
    }
}

function funcSB_WishList_LoadData() {
    if (G_Func_divTopLeft_WishListLoad == 0) 
    {
        try{
            var url = 'catalog.asp?Page=NewShoping.asp&IsCatalogAjax=1&IsWishList=1'
            $.ajax({
                url: url,
                async: false,
                type: 'POST',
                cache: false,
                dataType: 'html',
                success: function (data) {
                    $('#Cat_WishList_Iframe').html(data);
                    FuncCatalog_Show_Basket_Count();
                }
            });
        }
        catch (e) { }
    }
}

function funcGetData_ProductExtraProperties_OnProductsPage(ObjThis) {
    var formobj = $(ObjThis).parents('form');
    if ($(formobj).length == 0) {
        formobj = ObjThis;
    }
    var LocPicID = encodeURIComponent($(formobj).find('#PicID').val());
    var param = 'PicID=' + LocPicID;
    var url = 'catalog.asp?Page=catalog.asp&IsCatalogAjax=2&PicID=' + LocPicID;
    $.ajax({
        url: url,
        async: false,
        type: 'POST',
        data: param,
        cache: false,
        dataType: 'html',
        success: function (data) {
            $(formobj).append(data);
        }
    });
}
/*  end catalog javascript */
function funcSB_WishList_Selected() 
{
    $('#Cat_WishList_Iframe .FrmCatalogBasket_Row').each(function () {
        var picID = $(this).find('#PicID');
        var PicIDProd = $(".cssFrmCatalog #PicID[value='" + picID.val() + "']");
        var objCont = $(PicIDProd).parents('.cssFrmCatalog');
        var objWish = $(objCont).find('.sf-MA-WishList-add').addClass('sf-MA-WishList-add-Select');
    });
}

function funcSticyType()
{
    var StickyFlag = 0;
    if ($('body').hasClass('SB_Sticky_1')){StickyFlag = 1;}
    if ($('body').hasClass('SB_Sticky_2')){StickyFlag = 2;}
    if ($('body').hasClass('SB_Sticky_3')){StickyFlag = 3;}
    if ($('body').hasClass('SB_Sticky_4')){StickyFlag = 4;}
    if ($('body').hasClass('SB_Sticky_5')){StickyFlag = 5;}

    $('.SB_Mobile_Header_Menu_TopPos,.SB_Mobile_Header_Menu_TopPos_MA,.SB_Mobile_Header_Cont,.SB_Header_Cont').removeClass('clsFixedTop');
    $('.SB_Mobile_Header_Menu_TopPos,.SB_Mobile_Header_Menu_TopPos_MA,.SB_Mobile_Header_Cont,.SB_Header_Cont').removeClass('clsFixedTop-WithHeader');
        
    var OrigHeaderHeight;
    if (StickyFlag > 0) {
        var ObjClass;        
        if (StickyFlag == 1) {
            ObjClass = '.SB_Mobile_Header_Menu_TopPos,.SB_Header_Menu_TopPos';
        }
        if (StickyFlag == 2) {
            ObjClass = '.SB_Mobile_Header_Menu_TopPos,.SB_Mobile_Header_Menu_TopPos_MA,.SB_Mobile_Header_Cont,.SB_Header_Cont';
        }
        if (StickyFlag == 3) {
            var WindWidth = $(window).width();
            
            if (WindWidth <= 767) {
                ObjClass = '.SB_Mobile_Header_Menu_TopPos,.SB_Header_Menu_TopPos';
            }
            else {
                ObjClass = '.SB_Mobile_Header_Menu_TopPos,.SB_Mobile_Header_Menu_TopPos_MA,.SB_Mobile_Header_Cont,.SB_Header_Cont';
            }
        }
        if (StickyFlag == 4) {
            var WindWidth = $(window).width();

            if (WindWidth <= 767) {
                ObjClass = '.SB_Mobile_Header_Menu_TopPos,.SB_Header_Menu_TopPos';
            }
        }
        if (StickyFlag == 5) {
            var WindWidth = $(window).width();
            if (WindWidth > 767) {
                ObjClass = '.SB_Mobile_Header_Menu_TopPos,.SB_Header_Menu_TopPos';
            }
        }
        Objs = $(ObjClass);
        if ($(Objs).length > 0) { /*mobile or wp*/
            //if (StickyFlag == 2) {
            var MaxTop;
            $(window).off('scroll')
            $(window).on('scroll', function () {
                if (!$(Objs).hasClass('clsFixedTop')) {
                    MaxTop = -1;
                    var HeightCounter = 0
                    Objs.each(function () {
                        var ObjTop = $(this).offset().top;
                        var ObjHeight = $(this).outerHeight();
                        if (MaxTop == -1) { MaxTop = ObjTop; }
                        $(this).css('top', HeightCounter + 'px')
                        HeightCounter = HeightCounter + ObjHeight
                    })
                    $('body').css('margin-top', HeightCounter + 'px')

                }
                if ($(window).scrollTop() > MaxTop) { $(Objs).addClass('clsFixedTop'); }
                else {
                    $(Objs).removeClass('clsFixedTop');
                    $('body').css('margin-top', '');
                    $(Objs).css('top', '');
                }
            });
        }
    }
}

function funcCloseSearchResults(Obj) {
    $(Obj).parent('#SB_Catalog_Search_Results').hide();
}

function filterPath(string) {
    return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
}
   
function funcSmoothScrollOnAnchor()
{
    var locationPath = filterPath(location.pathname);
    $('a[href^="#"]:not([role="tab"]):not([data-toggle="tab"])').each(function () { /* 26-aug-2018 change from  $('a[href*="#"] to $('a[href^="#"]*/
        var thisPath = filterPath(this.pathname) || locationPath;
        var hash = this.hash;
        if ($("#" + hash.replace(/#/, '')).length) {
            if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
                var $target = $(hash),
                target = this.hash;
                if (target) {
                    $(this).click(function (event) {
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: $target.offset().top
                        }, 1000, function () {
                            location.hash = target;
                            $target.focus();
                            if ($target.is(":focus")) { //checking if the target was focused
                                $target.css('outline', '0');//add remove border/outline when object selected;
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); //Adding tabindex for elements not focusable
                                $target.focus(); //Setting focus
                            };
                        });
                    });
                }
            }
        }
    });
}

function func_SB_IsPageLoadInEditor() {
    // פונקציה שבודקת שוב ליתר ביטחון אם אני במצב עריכה 
    var Rslt = 0
    var url1='';
    var url2='';
    var indx1, indx2
    try { url1 = window.top.location.href.toLowerCase() } catch (e) { Rslt = -1 }
    try { url2 = window.self.location.href.toLowerCase() } catch (e) { Rslt = -1 }
    if (url1.indexOf("sb_mainpage.aspx") > -1 || url1.indexOf("sb_mainpageiframe.aspx") > -1 || url2.indexOf("sb_mainpage.aspx") > -1 || url2.indexOf("sb_mainpageiframe.aspx") > -1) 
    {
            return 1 // this is edit mode
    }
    return Rslt
}

function func_SB_IsPageLoadInsideIframe() {
    try { return window.self !== window.top;} catch (e) {return true;}
}

function func_SB_Dialog(Elem, CloseUrl, isHideTitle) {
    var DialogHeight, DialogWidth, WHeightPercentage, WWidthPercentage;
    var WindHeight = $('body').height();
    var WindWidth = $('body').width();
        
    if (WindWidth < 768) {
        WHeightPercentage = 0.95
        WWidthPercentage = 0.95
    }
    else {
        WHeightPercentage = 0.95
        WWidthPercentage = 0.8
    }
    DialogHeight = WindHeight * WHeightPercentage
    DialogWidth = WindWidth * WWidthPercentage
    $(Elem).dialog({ modal: true,
        width: DialogWidth,
        height: DialogHeight,
        dialogClass: "no-titlebar",
        create: function (event, ui) {
            if (isHideTitle == 1) {
                $(".ui-widget-header").hide();
            }
        },
        close: function (event, ui) {
            if (CloseUrl != '') {
                window.location.href = CloseUrl;
            }
        }
    });
}

function removeQueryStringParameter(key, url) {
    if (!url) url = window.location.href;
    var hashParts = url.split('#');
    var regex = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
    if (hashParts[0].match(regex)) {
        //REMOVE KEY AND VALUE
        url = hashParts[0].replace(regex, '$1');
        //REMOVE TRAILING ? OR &
        url = url.replace(/([?&])$/, '');
        //ADD HASH
        if (typeof hashParts[1] !== 'undefined' && hashParts[1] !== null)
            url += '#' + hashParts[1];
    }
    return url;
}
/*jquery.scrollUp.min.js start*/
!function (l, o, e) { "use strict"; l.fn.scrollUp = function (o) { l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o)) }, l.fn.scrollUp.init = function (r) { var s, t, c, i, n, a, d, p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r), f = !1; switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", { id: p.scrollName, href: "#top" }), p.scrollTitle && d.attr("title", p.scrollTitle), d.appendTo("body"), p.scrollImg || p.scrollTrigger || d.html(p.scrollText), d.css({ display: "none", position: "fixed", zIndex: p.zIndex }), p.activeOverlay && l("<div/>", { id: p.scrollName + "-active" }).css({ position: "absolute", top: p.scrollDistance + "px", width: "100%", borderTop: "1px dotted" + p.activeOverlay, zIndex: p.zIndex }).appendTo("body"), p.animation) { case "fade": s = "fadeIn", t = "fadeOut", c = p.animationSpeed; break; case "slide": s = "slideDown", t = "slideUp", c = p.animationSpeed; break; default: s = "show", t = "hide", c = 0 } i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance, n = l(o).scroll(function () { l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c), f = !1) }), p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0, d.click(function (o) { o.preventDefault(), l("html, body").animate({ scrollTop: a }, p.scrollSpeed, p.easingType) }) }, l.fn.scrollUp.defaults = { scrollName: "scrollUp", scrollDistance: 300, scrollFrom: "top", scrollSpeed: 300, easingType: "linear", animation: "fade", animationSpeed: 200, scrollTrigger: !1, scrollTarget: !1, scrollText: "Scroll to top", scrollTitle: !1, scrollImg: !1, activeOverlay: !1, zIndex: 2147483647 }, l.fn.scrollUp.destroy = function (r) { l.removeData(e.body, "scrollUp"), l("#" + l.fn.scrollUp.settings.scrollName).remove(), l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(), l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r) }, l.scrollUp = l.fn.scrollUp } (jQuery, window, document);
/*jquery.scrollUp.min.js end*/


function funcSB_FormShow_before_submit(obj) {
    var i;
  var IntCount;
  var tmpobjname;
  var tmpobjvalue;
  var tmpobjboxtype;
  var tmpcount
  var ObjRadio
  IntCount = document.getElementById("objcount").value;
  //  SubFormLoadTitle();

  try {
  document.getElementById("reffTitle").value = document.title; }
  catch (err) { } 
  var ObjParentForm =  $(obj).parents('.clsSB_FormShow');
  var locHeb_Eng =  $(ObjParentForm).find('.cls_Heb_Eng').val(); // <%=Heb_Eng%>;
  for(i=0;i<IntCount;i++) {//$(ObjParentForm).find('.cls_Heb_Eng').val();
    tmpobjname = "IsMust_" + String(i);    
    tmpobjname = "Box_" + String(i);
    // tmpobjboxtype = document.getElementById(tmpobjname).value
    tmpobjboxtype = $(ObjParentForm).find('#' + tmpobjname).val();    
    tmpobjboxtype = String(tmpobjboxtype)
    if (tmpobjboxtype!="7" && tmpobjboxtype!="9")
    {
		tmpobjname = "IsMust_" + String(i);
		//if (document.getElementById(tmpobjname).value == "True")
		//if ($(ObjParentForm).find('#' + tmpobjname).is(":checked"))
		if ($(ObjParentForm).find('#' + tmpobjname).val() == "True")
		{
		    tmpobjname="Value_" + String(i);
		    //tmpobjvalue= document.getElementById(tmpobjname).value;
            tmpobjvalue= $(ObjParentForm).find('#' + tmpobjname).val();
            
            if (tmpobjboxtype =='3')
            {
                 //if(document.getElementById(tmpobjname).checked == false)
                 if($(ObjParentForm).find('#' + tmpobjname).checked == false)
                 {			       		   
			       var tmpStr;
			       if (locHeb_Eng==1)
					    tmpStr='חובה לסמן את השדה  ' ;
				    else if (locHeb_Eng==2)
					    tmpStr='You must choose the field ';	
				    else if (locHeb_Eng==4)
					    tmpStr='Вы должны выбрать поле';
				    else if (locHeb_Eng==3)  
					    tmpStr='يجب عليك اختيار المجال';
	                else if (locHeb_Eng==5)  
					    tmpStr='Usted debe elegir el campo';
	                // alert(tmpStr + ' : ' + document.getElementById("NameBox_" + String(i)).value);
	                alert(tmpStr + ' : ' + $(ObjParentForm).find('#' + "NameBox_" + String(i)).val());
			       return;
                 }
            }
		    else if (tmpobjvalue=="")
		    {
			   var tmpStr;
			   if (locHeb_Eng==1)
					tmpStr='לא הזנת ערך עבור';
				else if (locHeb_Eng==2)
					tmpStr='You did not enter a value for';
				else if (locHeb_Eng==4)
					tmpStr='Вы не ввели значение для';
				else if (locHeb_Eng==3)
					tmpStr='لم تقم بإدخال قيمة ل';
				else if (locHeb_Eng == 5)
				    tmpStr = 'No ha especificado un valor para';

				//alert( tmpStr + ' : ' + document.getElementById("NameBox_" + String(i)).value);
	            alert(tmpStr + ' : ' + $(ObjParentForm).find('#' + "NameBox_" + String(i)).val());
	            $(ObjParentForm).find('#' + "Value_" + String(i)).focus();

			   return;
			}
		}
	}
  }
    //document.getElementById("FormMsg").style.display = ""
    //$(obj).find("#FormMsg").css('display','block');
$(ObjParentForm).find("#FormMsg").show();

    //document.getElementById("IsSubmit").value = "SendMyFormNow"
$(ObjParentForm).find("#IsSubmit").val("SendMyFormNow");

    //document.getElementById("FormFields").style.display = "none"
$(ObjParentForm).find("#FormFields").css('display', 'none');

    //alert("Befor submit");
//document.FormPreview.submit();
//$(ObjParentForm).off('submit');
//$(ObjParentForm).on('submit',function () { alert(1); });

//return;
$(ObjParentForm).submit(function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    funcSB_FormShow_SaveData(ObjParentForm,formData);
   // return false;
});

$(ObjParentForm).submit();
//funcSB_FormShow_SaveData(ObjParentForm);
//   return false;
}

function funcSB_FormShow_SaveData(ObjForm,formData) {
    var ObjParent_SB_C_Form = $(ObjForm).parents('.SB_C_Form');

    //var formid = $(obj).find('#TxtFormID').val();
    var LocTemplate = $(ObjParent_SB_C_Form).attr('templateid');
    var LocIntFormId = $(ObjParent_SB_C_Form).attr('IntFormId');
    var ObjID = $(ObjParent_SB_C_Form).attr('id');
    //var url = 'SB_FormShowDnd.asp?action=1&IntFormId=' + formid + '&SB_ID=' + LocGSB_ID + '&IsSubmit=1'
    //var url = 'SB_FormShowDnd.asp?action=1&TemplateID=' + LocTemplate + '&SB_ID=' + LocGSB_ID + '&IsSubmit=1';
    var dataurl = LocGGDomainWeb + 'crsd/' + 'SB_FormShowDnd.asp?NotIframe=1&action=1&IsSubmit=1&TemplateID=' + LocTemplate + '&sb_id=' + LocGSB_ID + '&IntFormId=' + LocIntFormId + '&ObjID=' + encodeURIComponent(ObjID) + '&Loc_Affiliate_REF=' + encodeURIComponent(LocG_Affiliate_REF);
    var tmpParam = '';

    $.ajax({
        url: dataurl,
        //jsonp: false,
        //mimeType: "multipart/form-data",
        //contentType: 'multipart/form-data',
        //enctype: 'multipart/form-data',
        type: 'POST',
        data: formData,
        //dataType: 'jsonp',
        contentType: false,
        processData: false,
        //crossDomain: true,
        success: function (returndata) {
            //alert('success:' + returndata);
            $(ObjParent_SB_C_Form).html(returndata);

            $(ObjParent_SB_C_Form).attr('intformid', '0');
            $(ObjParent_SB_C_Form).attr('templateid', '0');
        }
    });
}

function funcSB_FormShow_SetTextValue(ObjText, ObjVal) {
    document.getElementById(ObjText).value = ObjVal;
}
/*rating start*/


function func_SendRating(LocSB_ID, Rating_IsShowWithoutApprove) {
    var ObjRating = $('#SB_RatingMsgCont');
    if ($(ObjRating).length == 0) {
        return;
    }
    if (j_GCat_PicID == 0) {
        return;
    }

    var RatingUsername = $(ObjRating).find('#SB_Rating_Username').val();
    var RatingGuestname = $(ObjRating).find('#SB_Rating_Guestname').val();
    var RatingDesc = $(ObjRating).find('#SB_Rating_Desc').val();
    var RatingStars = $(ObjRating).find('#SB_Rating_Stars').val();

    RatingUsername = $.trim(RatingUsername);
    RatingGuestname = $.trim(RatingGuestname);
    RatingDesc = $.trim(RatingDesc);

    RatingDesc = RatingDesc.replace(/(<([^>]+)>)/ig, "");

    if (RatingGuestname == '') {
        alert('עליך למלא שם');
        $(ObjRating).find('#SB_Rating_Guestname').focus();
        return;
    }
    if (RatingDesc == '') {
        alert('עליך למלא חוות דעת');
        $(ObjRating).find('#RatingDesc').focus();
        return;
    }
    if (RatingStars == '') {
        alert('עליך לבחור מספר כוכבים לדירוג');
        return;
    }
    RatingStars = parseInt(RatingStars)
    if (RatingStars > 5 || RatingStars < 1) {
        alert('עליך לבחור מספר כוכבים לדירוג');
        return;
    }

    var IsApproved;
    if (Rating_IsShowWithoutApprove == 1) {
        IsApproved = 1;
    }
    else {
        IsApproved = 0;
    }
    // + '&lang=' + LocGSblang
    var tmpParam = 'SB_ID=' + LocSB_ID + '&IsApproved=' + IsApproved + '&RatingType=1&RatingTypeRowID=' + j_GCat_PicID;
    tmpParam = tmpParam + '&RatingUsername=' + encodeURIComponent(RatingUsername) + '&RatingGuestname=' + encodeURIComponent(RatingGuestname);
    tmpParam = tmpParam + '&RatingDesc=' + encodeURIComponent(RatingDesc) + '&RatingStars=' + RatingStars;
    var dataurl = "action.asp?action=22";
    $.ajax({
        url: dataurl,
        //async: false,
        type: 'POST',
        data: tmpParam,
        cache: false,
        dataType: 'html',
        success: function (data) {

            if (data == 'dup') {
                alert('לא ניתן להוסיף יותר מחוות דעת אחת')
            }
            else {
                if (IsApproved == 1) {
                    $('#SB_RatingMsgCont').html('<span style="font-weight:bold;">תודה על חוות הדעת שצירפת.</span>');
                }
                else {
                    $('#SB_RatingMsgCont').html('<span style="font-weight:bold;">תודה על חוות הדעת שצירפת. חוות הדעת תעלה לאתר לאחר אישור מנהל האתר</span>');
                }
            }
        }
    });
}

function func_Mouseover_Rating_Stars(ObjThis) {
    var ObjStar = ObjThis;
    var star_num = $(ObjStar).attr('star_num');
    func_Rating_SetStars(star_num);
}

function func_Mouseout_Rating_Stars(ObjThis) {
}

$(document).on("click", ".SB_Rating_StarsDisp .fa", function () {
    var star_num = $(this).attr('star_num');
    func_Rating_SetStars(star_num);
    $('#SB_Rating_Stars').val(star_num);
    $('.SB_Rating_StarsDisp .fa').off('mouseover');
    //alert(star_num)
});

function func_Rating_SetStars(star_num) {
    $('.SB_Rating_StarsDisp .SB_RatingIcon').each(function () {
        if ($(this).attr('star_num') <= star_num) {
            $(this).removeClass('fa-star').removeClass('fa-star-o').addClass('fa-star')
        }
        else {
            $(this).removeClass('fa-star').removeClass('fa-star-o').addClass('fa-star-o')
        }
    });
}

function func_SB_SpecialMenuLinks() {
    if ($('.sf-ma-FloatBtns')) {
        $('.sf-ma-FloatBtns').slideDown('slow');
    }
    else {
        return;
    }
    $(document).on("click", '.sf-ma-li.sf-MA-Whatsapp a', function () {
        var LocPhone = $(this).attr('num');
        LocPhone = $.trim(LocPhone);
        if (LocPhone == '') {
            return;
        }
        LocPhone = encodeURIComponent(LocPhone);
        var LocUrl = '';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            LocUrl = "whatsapp://send?phone=" + LocPhone;
            // whatsapp://send/?phone=+972509206066
        }
        else {
            LocUrl = 'https://api.whatsapp.com/send?phone=' + LocPhone;
        }
        window.open(LocUrl);
        return false;
    });

    $(document).on("click", ".sf-MA-Phone a[href^='tel:']", function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return;
        }
        var LocPhone = $(this).attr('href');
        LocPhone = LocPhone.replace('tel:', '');
        //alert(LocPhone);
        var Elem = $(this);
        LocPhone = $.trim(LocPhone);
        if (LocPhone == '') {
            return;
        }
        LocPhone = encodeURIComponent(LocPhone);
        var ObjParent = $(Elem).parents('.sf-MA-Phone')
        var ObjShow = $(ObjParent).find('.clsPhoneShow');
        if ($(ObjShow).length == 0) {
            ObjShow = $("<div class='clsPhoneShow'>" + LocPhone + "</div>");
            $(ObjParent).append(ObjShow).slideDown();
        }

        $(ObjShow).toggleClass('sf-MA-Phone-show');

        var dwidth = $(document).width();
        var offset = $(ObjShow).offset();
        if (offset.left > (dwidth / 2)) {
            $(ObjShow).css('left', 'auto')
            $(ObjShow).css('right', '1px')
        }

    });
}


/*rating end*/

function FuncGoogleAdwordsConverstionTelOnClick() {
    // הפונקציה מוסיפה קוד המרות לטלפון לגוגל אדוורדס
    var FlageIsGoogleConversion = 0;
    if (typeof gtag_report_conversion === "function") {
        FlageIsGoogleConversion = 1;
    }
    if (typeof goog_report_conversion === "function") {
        FlageIsGoogleConversion = 2;
    }
    if (FlageIsGoogleConversion != 0) {
        $('a[href^="tel:"]').each(function () {
            var a = $(this).attr('onclick')
            var h = $(this).attr('href')
            if (!a) {a = '';}
            if (a == '') {
                $(this).on('click', function () {
                    if (FlageIsGoogleConversion == 1) {
                        gtag_report_conversion(h)
                    }
                    if (FlageIsGoogleConversion == 2) {
                        goog_report_conversion(h)
                    }
                    // try {gtag_report_conversion(h)} catch(e1){try {goog_report_conversion(h)} catch(e2){}}
                })
            }
        })
    }
}


