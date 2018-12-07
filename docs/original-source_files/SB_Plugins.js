var G_Tmr_Search;
var G_SW_Cat_Coin = '';
var LocDIr, LocTextAlign, LocRevereseTextAlign, isResponsiveInIE8 = "true";
var vidmute = 0;
$(document).ready(function () {
    FuncSB_Plugins_OnLoad()
});
function FuncSB_Plugins_OnLoad() 
{
    LocDIr = LocGSB_Direction, "RTL" == LocGSB_Direction ? (LocTextAlign = "right", LocRevereseTextAlign = "left") : (LocTextAlign = "left", LocRevereseTextAlign = "right");
    funcMarquee_Load_Init();
    func_SB_ScrollBox_Load_Init();

    var e = navigator.appVersion;
    if (e = e.toUpperCase(), 
    (e.indexOf("MSIE 8") > -1 || e.indexOf("MSIE 7") > -1) && (isResponsiveInIE8 = "false"),
    $(".clsPricingTable").length > 0) {
        var t = '<style type="text/css">'; t += ".clsPricingTable {border: 1px solid #F1F1F1; border-radius: 4px;box-shadow: 1px 0px 8px 0px #DBDBDB;}",
        t += ".clsPricingTable:hover{box-shadow: 0 2px 4px 0 gray;}", 
        t += ".clsPricingTable_Header {border-bottom: 1px solid #F1F1F1; background-color:#6EA7EA; color:white; border-top-left-radius: 4px;border-top-right-radius: 4px; text-align:center;}",
        t += ".clsPricingTable_Price {border-bottom: 1px solid #F1F1F1; background-color:#3E81D0; color:white;font-weight:bold;}",
        t += ".clsPricingTable_Properties p {border-bottom: 1px solid #F1F1F1; text-align:center;}",
        t += ".clsPricingTable_Price {text-align:center; font-size:40px;}",
        t += ".clsPricingTable_BuyNow {text-align:center; border-bottom-left-radius: 4px;border-bottom-right-radius: 4px;}",
        t += ".clsPricingTable_BuyNow a{background-color: #F1F1F1; width: 90%; margin-top: 6px;margin-bottom: 6px; color:#333; font-size:17px; border:1px solid #B1B1B1; border-radius:4px;}",
        t += ".clsPricingTable_BuyNow a:hover{background-color: #F6F6F6;}",
        t += "</style>",
        $("head").append(t)
    }
    if ($(".view ").length > 0) {
        var a = '<style type="text/css">';
        a += ".effect img {  -webkit-transition: all .2s ease-in-out; transform:scale(1,1) ;}  ",
        a += ".effect:hover img {  -webkit-transform: scale(1.1); } ",
        a += "</style>",
        $("head").append(a)
    }
    if ($(".wow").length > 0) {
        var i;!$('link[href*="/animate.css"]').length > 0 && (i = '<link href="' + LocG_Domain2all_CDN + 'JavaScript/WOW/css/libs/animate.min.css" rel="stylesheet" type="text/css">',
        $("head").append(i)),
        !$('script[src*="/wow.min.js"]').length > 0 && jQuery(function () {
            $.when($.getScript(LocG_Domain2all_CDN + "JavaScript/WOW/dist/wow.min.js"), $.Deferred(function (e) { $(e.resolve) })).done(function () {
                try {
                    //(new WOW).init();
                    // dolev 16072018 - ad this to add wow after first scroll only to fix seo
                    $(document).ready(function () {
                        $(window).one('scroll', function () { (new WOW).init();});
                    });
                } catch (e) { }
            })
        })
    }
    if ($(".clsDndChangeColor").length > 0) {
        var r = '<script type="text/javascript">$(document).ready(function() { funcChangeColor(); function funcChangeColor(){ '   
        r = r + 'var ColorToChange = "rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ")";'
        r = r + ' $(".clsDndChangeColor").animate( { color: ColorToChange }, 2000);    funcChangeColor(); }  });</script>';
        $("head").append(r)
    }
    if ($(".clsDndChangeColor1").length > 0) {
        var n = '<script type="text/javascript">$(document).ready(function() {  $( ".clsDndChangeColor1" ).css("color","gray"); '
        n = n + 'funcChangeColor1(); function funcChangeColor1(){   $( ".clsDndChangeColor1" ).animate({  color: "blue" }, 2000, function() { '
        n = n + ' $( ".clsDndChangeColor1" ).animate({  color: "gray" }, 2000) ;    funcChangeColor1();    });     }  });</script>';
        $("head").append(n)
    } 
    if ($("a.SB_C_LinkOpenImage").length > 0) {
        if (!$('link[href*="/lightbox.css"]').length > 0) {var l = '<link href="' + LocG_Domain2all_CDN + 'GalleryJS/Gallery5/css/lightbox.css" rel="stylesheet" type="text/css">'; $("head").append(l)}
        if (!$('script[src*="/lightbox.js"]').length > 0) { var o = '<script src="' + LocG_Domain2all_CDN + 'GalleryJS/Gallery5/js/lightbox.js" type="text/javascript"></script>'; $("head").append(o) }
    }
    if ($(".SB_C_YT_BG").length > 0) {
        if ($('script[src*="/jquery.youtubebackground.js"]').length == 0) {
            $.when(
            $.getScript(LocG_Domain2all_CDN + 'JavaScript/jQuery.YoutubeBackground/src/jquery.youtubebackground.js'),
            //$.getScript(LocG_Domain2all_CDN + 'JavaScript/script4324234.min.js'),
            $.Deferred(function (deferred) {
                $(deferred.resolve);
            })
            ).done(function () {
                funcYT_BG_Init()
            });
        }
    }
    if ($(".SB_C_Counter").length > 0) {
        //if (!$('script[src*="/waypoint.js"]').length > 0) { var z1 = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/waypoints/lib/jquery.waypoints.min.js" type="text/javascript"></script>'; $("head").append(z1) }
        //if (!$('script[src*="/jquery.counterup.min.js"]').length > 0) { var z2 = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/Counter-Up/jquery.counterup.min.js" type="text/javascript"></script>'; $("head").append(z2) }

        if ( $('script[src*="/waypoint.js"]').length==0 && $('script[src*="/jquery.counterup.min.js"]').length == 0) {
            $.when(
            $.getScript(LocG_Domain2all_CDN + 'JavaScript/waypoints/lib/jquery.waypoints.min.js'),
            $.getScript(LocG_Domain2all_CDN + 'JavaScript/Counter-Up/jquery.counterup.min.js'),
            $.Deferred(function (deferred) {
                $(deferred.resolve);
            })
            ).done(function () {
                $('.SB_C_Counter').counterUp({
                    delay: 10,
                    time: 1000
                });
            });
        }                                    
    }
    if (1 > 10) {
        if (!$('script[src*="/query.tubular.1.0.js"]').length > 0) { var z3 = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/tubular/js/jquery.tubular.1.0.js" type="text/javascript"></script>'; $("head").append(z3) }
        var options = { videoId: 'ab0TSkLe-E0', start: 3 };
        //$('body').append('<div id="wrapper"></div>')
        $("body").wrapInner("<div id='wrapper'></div>");
        //$('#wrapper').tubular(options);
        $('#wrapper').tubular(options);
    }
    /*SB_C_UsersLogin start*/ 
    var IntCount = 0;
    $('div.SB_C_UsersLogin').each(function () {
        $(this).append("<div class='UsersLoginLoading'></div>")
        if (IntCount == 0) { }
        var LocSB_ID = LocGSB_ID;
        var ObjID = "SB_C_UsersLogin" + IntCount;
        this.id = ObjID;
        funcUsersLogin_Load(LocSB_ID, ObjID);
        IntCount++;
    });

    if (IntCount > 0) {
        $('.SB_C_UsersLogin').each(function () {
            var LocSB_ID = LocGSB_ID;
            var ObjID = $(this).attr('ID');
            $(this).find('.UsersLoginLoading').fadeOut(3000);
            IntCount++;
        });
    }
    /*SB_C_UsersLogin end*/

    /*SB_C_UsersLogin2 start*/
    var IntCount = 0;

    if ($('div.SB_C_UsersLogin2').length) {
        funcUsersLogin2_GetStyleAndIncludes();
    }
    $('div.SB_C_UsersLogin2').each(function () {        
        $(this).append("<div class='UsersLoginLoading2'></div>")

        var LocSB_ID = LocGSB_ID;
        var LocIsAfterLogin = $(this).attr('isafterlogin');
        var ObjID = "SB_C_UsersLogin2_" + IntCount;
        this.id = ObjID;
        funcUsersLogin_2_Load(LocSB_ID, ObjID, LocIsAfterLogin);
        IntCount++;
    });

    if (IntCount > 0) {
        $('.SB_C_UsersLogin2').each(function () {
            var LocSB_ID = LocGSB_ID;
            var ObjID = $(this).attr('ID');
            $(this).find('.UsersLoginLoading2').fadeOut(3000);
            IntCount++;
        });
    }
    /*SB_C_UsersLogin2 end*/
    var IntCount = 1;
    $('select.clsCatalogSearch_slct').each(function () {

        $(this).one("mouseover", function (event) {
            funcLoadCategoriesTo_CatalogSearchSelect(this);
        });

        var ObjID = "clsCatalogSearch_slct_" + IntCount;
        this.id = ObjID;
    });
    /*SB_C_Filter start*/
    var IntCount = 1; /*here strat from 1 and not 0*/
    if ($('div.SB_C_Filter').length) {
        var FilterResult = funcFilter_GetStyleAndIncludes();
        var sstrSB_C_Filter_Style = FilterResult[0];
        var strSB_C_Filter = FilterResult[1];
        $("head").append(strSB_C_Filter);
    }

    $('div.SB_C_Filter').each(function () {
        $(this).append("<div class='FilterLoading'></div>")

        var LocSB_ID = LocGSB_ID;
        var LocIDS = $(this).attr('IDS');
        var ObjID = "SB_C_Filter_" + IntCount;
        this.id = ObjID;
        $(this).attr('FIlterPluginId', IntCount)
        funcFilter_Load(LocSB_ID, ObjID, LocIDS, IntCount);
        IntCount++;
    });

    if (IntCount > 1) {
        $('.SB_C_Filter').each(function () {
            var LocSB_ID = $(this).attr('sb_id');
            var ObjID = $(this).attr('ID');
            $(this).find('.FilterLoading').fadeOut(3000);
            IntCount++;
        });
    }
    /*SB_C_Filter end*/

    /*SB _FilterImported start*/
    var IntCount = 1; /*here strat from 1 and not 0*/

    if ($('div.SB_FilterImported').length) {
        var FilterResult = funcFilterImported_GetStyleAndIncludes();
        var strSB_FilterImported_Style = FilterResult[0];
        var strSB_FilterImported_Scripts = FilterResult[1];
        $("head").append(strSB_FilterImported_Scripts);
    }

    $('div.SB_FilterImported').each(function () {
        $(this).append("<div class='FilterLoading'></div>");
        var LocSB_ID = LocGSB_ID;
        var LocPluginID = $(this).attr('PluginID');
        var ObjID = "SB_FilterImported" + IntCount;
        var LocRows = $(this).attr('rows');
        this.id = ObjID;
        var Title1 = $(this).attr('Title1');
        var Title2 = $(this).attr('Title2');
        var Title3 = $(this).attr('Title3');
        var Title4 = $(this).attr('Title4');

        funcFilterImported_Load(LocSB_ID, ObjID, LocPluginID, LocRows, IntCount, Title1, Title2, Title3, Title4);
        IntCount++;
    });

    if (IntCount > 1) {
        $('.SB_FilterImported').each(function () {
            var LocSB_ID = LocGSB_ID;
            var ObjID = $(this).attr('ID');
            $(this).find('.FilterLoading').fadeOut(3000);
            IntCount++;
        });
    }
    /*SB _FilterImported end*/

    /*SB_Catalog_Search start*/
    if ($("#SW,input.SB_Catalog_Search,input.SB_CatSearchPlugin_Input,input.clsCatalogSearch_Txt").length > 0) {
        $('body').append("<div id='SB_Catalog_Search_Results' class='clsSB_Catalog_Search_Results'></div>")

        $("#SW,input.SB_Catalog_Search,input.SB_CatSearchPlugin_Input,input.clsCatalogSearch_Txt").on('keyup click input', function () {
            var SB_Catalog_Search_Obj;
            var SB_Catalog_Search_Text = '';
            var SB_Catalog_Search_Characters_len = 0;
            var LocSrcHeight;
            var Tmp_T1 = -3;
            var Tmp_T2 = -3;
            var LocOffset = $(this).offset();
            LocSrcHeight = $(this).outerHeight();
            var LocTmpLeft = 0
            LocTmpLeft = LocOffset.left - $('#SB_Catalog_Search_Results').outerWidth() + $(this).outerWidth()
            if (LocTmpLeft < 1) { LocTmpLeft = 1 }
            $('#SB_Catalog_Search_Results').css('position', 'absolute').css('top', LocOffset.top + LocSrcHeight).css('left', LocTmpLeft);

            SB_Catalog_Search_Obj = $(this);
            SB_Catalog_Search_Text = $(this).val();
            SB_Catalog_Search_Text = $.trim(SB_Catalog_Search_Text);

            if ($(this).parent().find('.clsCatalogSearch_slct').length) {            
                var element = $(this).parent().find('.clsCatalogSearch_slct').find('option:selected');
                Tmp_T1 = element.attr("t1");
                Tmp_T2 = element.attr("t2");
            }
            SB_Catalog_Search_Characters_len = SB_Catalog_Search_Text.length;
            if (G_SW_Cat_Coin == '') {
                funcSB_Catalog_GetData(LocGSB_ID)
            }

            clearInterval(G_Tmr_Search)
            if (SB_Catalog_Search_Characters_len >= 3) {
                $('#SB_Catalog_Search_Results').show();
                G_Tmr_Search = setInterval(function () {
                    funcSB_Catalog_Search_GetAjax(LocGSB_ID, SB_Catalog_Search_Obj, SB_Catalog_Search_Text, Tmp_T1, Tmp_T2) 
                }, 500)
            }
            else {
                $('#SB_Catalog_Search_Results').slideUp('slow');
                $('#SB_Catalog_Search_Results').html('');
            }
        });
    }
    /*SB_Catalog_Search end*/

    var s = 0;$("div.SB_C_ArticlesSlider").each(function () {
        var ObjThis = this;
        if ($(this).append("<div class='ArticlesSliderLoading'></div>"), 0 == s) {
            var e = funcArticlesSlider_GetStyleAndIncludes(), t = e[0], a = e[1];
            $("head").append(t), $("head").append(a)
        } var i = LocGSB_ID, r = "SB_C_ArticlesSlider" + s; this.id = r; var n = $(this).width(), l = $(this).height();
        funcArticlesSlider_Load(ObjThis, i, r, n, l, s), s++
    }), s > 0 && $(".SB_C_ArticlesSlider").each(function () { LocGSB_ID, $(this).attr("ID"); $(this).find(".ArticlesSliderLoading").fadeOut(3e3), s++ }),
        s = 0, $("div.SB_C_ArticlesBlock").each(function () {
            if (0 == s) {
                var e = funcArticlesBlock_GetStyleAndIncludes(), t = e[0]; $("head").append(t)
            } var a = LocGSB_ID, i = "SB_C_ArticlesBlock" + s; this.id = i;
            var r = $(this).attr("Subjid"), n = $(this).attr("BlockType"), l = $(this).attr("RowsToShow"); funcArticlesBlock_Load(a, i, r, s, n, l), s++
        })
    , s > 0 && $(".SB_C_ArticlesBlock").each(function () { LocGSB_ID, $(this).attr("ID"); s++ })

        // ------------------------------------------------------------------ //
        func_SB_C_FlashGallery_Load_Init();
        func_SB_C_GallerySlider_Load_Init();
        func_SB_C_LBGallery_Load_Init();

       // alert($('div.SB_C_marquee2').html());

        func_SB_C_MarqueeSlider_Load_Init();

        funcSB_ShowForm();
        //func111();
        // ------------------------------------------------------------------ //
        //Background Slider start

        if ($('div.SB_C_BackgroundSlider').length) {
            funcBackgroundSlider_GetStyleAndIncludes();
        }

        //Background Slider end    
        // ------------------------------------------------------------------ //

        // ------------------------------------------------------------------ //
        //Background Slider New start
        var IntCount = 0;

        if ($('div.SB_C1_BackgroundSlider').length) {
            funcBackgroundSlider_New_GetStyleAndIncludes();
        }
        $('div.SB_C1_BackgroundSlider').each(function () {
            if (IntCount == 0)  // can be only one
            { // get styles and includes for first time			
                var LocSB_ID = LocGSB_ID;
                var ObjID = "SB_C1_BackgroundSlider" + IntCount
                this.id = ObjID
                var LocGalleryID = $(this).attr('GalleryID');
                funcBackgroundSlider_Load_New(LocSB_ID, ObjID, LocGalleryID);
                IntCount++;
            }
        });
        //Background Slider New end    
        // ------------------------------------------------------------------ //   
        if ($('div.photopile-wrapper').length) {                      
            if ($('link[href*="/photopile.css"]').length == 0) {
                var strSB_photopile_link = '<link href="' + LocG_Domain2all_CDN + 'JavaScript/Photopile/css/photopile.css" rel="stylesheet" type="text/css">'
                $("head").append(strSB_photopile_link);
            }
            if ($('script[src*="/photopile.js"]').length == 0) {
                strSB_photopile_script = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/Photopile/js/Photopile.js" type="text/javascript"></script>'
                $("head").append(strSB_photopile_script);
            }
            if ($('script[src*="/jquery.ui.touch-punch.min.js"]').length == 0) {
                TempLinkScript = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerRotator/js/jquery.ui.touch-punch.min.js" type="text/javascript"></script>';
                $("head").append(TempLinkScript);
            }              
        }
}

function funcSB_Catalog_Search_GetAjax(LocSB_ID, SB_Catalog_Search_Obj, SB_Catalog_Search_Text, Tmp_T1, Tmp_T2) {
    clearInterval(G_Tmr_Search)
    var tmpParam = 'LocSB_ID=' + LocSB_ID + '&SB_Catalog_Search_Text=' + SB_Catalog_Search_Text + '&Coin=' + G_SW_Cat_Coin;
    tmpParam = tmpParam  + '&LocGCat_IsShoppingCartInPage=' + LocGCat_IsShoppingCartInPage + '&LocGCat_IsAddToBasketOnSearch=' + LocGCat_IsAddToBasketOnSearch;
    tmpParam = tmpParam + '&Tmp_T1=' + Tmp_T1 + '&Tmp_T2=' + Tmp_T2 + '&lang=' + LocGSblang;
    var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=15";
    $.ajax({
        url: dataurl,
        type: 'get',
        data: tmpParam,
        dataType: 'jsonp',
        crossDomain: true
    });
}

function funcSB_Catalog_GetData(LocSB_ID) {
    if (LocG_IsEditMode == 1) { return; }
    var tmpParam = 'LocSB_ID=' + LocSB_ID;
    var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=14";
    $.ajax({
        url: dataurl,
        type: 'get',
        data: tmpParam,
        dataType: 'jsonp',
        crossDomain: true
    });
}

function funcLoadCategoriesTo_CatalogSearchSelect(Obj) {
    var Loc_SB_T1 = $(Obj).attr('SB_T1');
    var LocObjID = $(Obj).attr('id');
    var tmpParam = 'Loc_SB_T1=' + Loc_SB_T1 + '&ObjID=' + LocObjID + '&LocSB_ID=' + LocGSB_ID;
    var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=17";
    $.ajax({
        url: dataurl,
        type: 'get',
        data: tmpParam,
        dataType: 'jsonp',
        crossDomain: true
    });
}

/*SB_C_UsersLogin start*/
function funcUsersLogin_Load(LocSB_ID, LocObjID) {
    if (LocG_IsEditMode == 1) { return; }  
    var tmpParam = 'SB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&lang=' + LocGSblang
    var dataurl = "action.asp?action=12";
    $.ajax({
        url: dataurl,
        //async: false,
        type: 'POST',
        data: tmpParam,
        cache: false,
        dataType: 'html',
        success: function (data) {
            var LocResult = $(data).filter('.SB_UsersLogin');
            $('#' + LocObjID).html(LocResult);     
        }
    });
}
/*SB_C_UsersLogin end*/

/*SB_C_UsersLogin2 start*/
function funcUsersLogin_2_Load(LocSB_ID, LocObjID, LocIsAfterLogin) {
    if (LocG_IsEditMode == 1) {return;}
    var tmpParam = 'SB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&lang=' + LocGSblang + '&IsAfterLogin=' + LocIsAfterLogin;
    var dataurl = "action.asp?action=13";
    $.ajax({
        url: dataurl,
        //async: false,
        type: 'POST',
        data: tmpParam,
        cache: false,
        dataType: 'html',
        success: function (data) {
            //console.log('aaaaaaaaa')
            var ObjData = $(data);
            $('#' + LocObjID).html('');
            $('#' + LocObjID).append(ObjData);
            $('#' + LocObjID).removeClass('sf-MA-Login-icon-connected');
            if ($('#' + LocObjID).find('div.sb-connected').length > 0) {
                $('#' + LocObjID).parents('.sf-MA-Login').find('.sf-MA-Icon').addClass('sf-MA-Login-icon-connected');
            }
        }
    });
}
/*SB_C_UsersLogin2 end*/

/*SB_C_BackgroundSlider_2 start*/
var LocIntCount = 0;

if ($('div.SB_C_BackgroundSlider_2').length) {
    if ($('link[href*="/SB.css"]').length == 0) {
        var strSB_C_BackgroundSlider_2 = '<link href="' + LocG_Domain2all_CDN + 'JavaScript/CSS3FullscreenSlideshow/css/SB.css" rel="stylesheet" type="text/css">'
        $("head").append(strSB_C_BackgroundSlider_2);
    }
}

$('div.SB_C_BackgroundSlider_2').each(function () {    
    if (LocIntCount == 0) {
        var LocSB_ID = LocGSB_ID;
        var GalleryID = $(this).attr('galleryid');        
        var ObjID = "SB_C_BackgroundSlider_2_" + LocIntCount;
        this.id = ObjID;
        funcBackgroundSlider_2_Load(LocSB_ID, ObjID, GalleryID);
    }
    LocIntCount++;
});

function funcBackgroundSlider_2_Load(LocSB_ID, LocObjID, GalleryID) {
    var tmpParam = 'LocSB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&GalleryID=' + GalleryID;
    var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=16";   
    $.ajax({
        url: dataurl,
        type: 'get',
        data: tmpParam,
        dataType: 'jsonp',
        crossDomain: true
    });
}
/*SB_C_BackgroundSlider_2 end*/

/*SB_C_Filter start*/
function funcFilter_Load(LocSB_ID, LocObjID, LocIDS, IntCount) {
    var LocQueryString = location.search;
    if(LocQueryString.length > 4)
    {
        LocQueryString = LocQueryString.replace('?','')
    }    
    var tmpParam = 'LocSB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&LocIDS=' + LocIDS + '&IntCount=' + IntCount ;
    var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=12&" + LocQueryString;
    $.ajax({
        url: dataurl,
        type: 'get',
        data: tmpParam,
        dataType: 'jsonp',
        crossDomain: true
    });
}
/*SB_C_Filter end*/

/*SB_FilterImported start*/
function funcFilterImported_Load(LocSB_ID, LocObjID, LocPluginID, LocRows, IntCount, Title1, Title2, Title3, Title4) {
    var tmpParam = 'LocSB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&LocPluginID=' + LocPluginID + '&LocRows=' + LocRows + '&IntCount=' + IntCount + '&Title1=' + Title1 + '&Title2=' + Title2 + '&Title3=' + Title3 + '&Title4=' + Title4;
    var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=18";   
    $.ajax({
        url: dataurl,
        type: 'get',
        data: tmpParam,
        dataType: 'jsonp',
        crossDomain: true
    });
}
/*SB_FilterImported end*/

function funcFilter_GetStyleAndIncludes() {
    var strFilter_Style = '';  
    var strFilter_Includes = '<script src="' + LocGGDomainWeb + 'FilterPlugin.js" type="text/javascript"></script>'
    return [strFilter_Style, strFilter_Includes];
}

function funcFilterImported_GetStyleAndIncludes() {
    var strFilter_Style = '';
    var strFilter_Includes = '<script src="' + LocGGDomainWeb + 'FilterImportedPlugin.js" type="text/javascript"></script>'
    return [strFilter_Style, strFilter_Includes];
}

function funcUsersLogin2_GetStyleAndIncludes() {
    var strUsersLogin2_Style = '<style>'    
    if (LocGSB_Direction == "RTL" || LocGSB_Direction == "rtl") {
        strUsersLogin2_Style = strUsersLogin2_Style + '.SB_UsersLoginImgCont{float:right;}.SB_UsersLoginTextCont{float:right;padding-right:8px;}.SB_UsersLoginActionsCont li{float:right;}.SB_UsersLoginActionsCont i.fa-chevron-down{margin-right:6px;}';
    }
    else
    {
        strUsersLogin2_Style = strUsersLogin2_Style + '.SB_UsersLoginImgCont{float:left;}.SB_UsersLoginTextCont{float:left;padding-left:8px;}.SB_UsersLoginActionsCont li{float:left;}.SB_UsersLoginActionsCont i.fa-chevron-down{margin-left:6px;}';
    }
    strUsersLogin2_Style = strUsersLogin2_Style + '.SB_UsersLoginTextCont{cursor:pointer;}.SB_UsersLoginActionsCont li{padding-right:2px; padding-left:2px;}'
    strUsersLogin2_Style = strUsersLogin2_Style + '.SB_UsersLoginMoreActions{position:absolute;top:35px;background-color:White;border:1px solid gray;z-index:99999;padding:6px; padding-top:10px;width:150px;}'
    strUsersLogin2_Style = strUsersLogin2_Style + '.SB_UsersLoginMoreActions_cont{position:absolute;top:1px;}.SB_UsersLoginActionsCont .SB_UsersLoginMoreActions_cont {display:none;}'
    strUsersLogin2_Style = strUsersLogin2_Style + '.SB_UsersLoginActionsCont:hover .SB_UsersLoginMoreActions_cont {display:block !important;}SB_UsersLoginActionsCont .SB_UsersLoginMoreActions_cont {width:150px;height:40px;}'
    strUsersLogin2_Style = strUsersLogin2_Style + '.arrow_border {position:absolute;width:12px;height: 7px;top: -7px;right:68px;overflow:hidden;}.arrow_border i i {border-color:transparent transparent #fff transparent;top: -79px;}'
    strUsersLogin2_Style = strUsersLogin2_Style + '.arrow_border i{display:block;height:0px;width:0px;border:80px solid;border-color:transparent transparent black transparent;position:absolute;top:-80px;left:50%;margin-left:-80px;}'
    strUsersLogin2_Style = strUsersLogin2_Style + '</style>';
    $("head").append(strUsersLogin2_Style);
}

function funcArticlesSlider_Load(ObjThis,e, t, a, i, r) {
    var n = "LocSB_ID=" + e + "&ObjID=" + t + "&ArticlesSliderWidth=" + a + "&ArticlesSliderHeight=" + i; n = n + "&LocGGDomainWeb=" + LocGGDomainWeb + "&IntCount=" + r;
    var l = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=1";
    $.ajax({ url: l, jsonp: !1, type: "get", data: n, dataType: "jsonp",
        crossDomain: !0
         , complete: function (Obj) {
             var Loc_enableTouchScreen = true; if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { Loc_enableTouchScreen = false; }
             $('#allinone_bannerWithPlaylist_elegant_' + t).allinone_bannerWithPlaylist({ skin: "elegant", responsive: true, width: a, height: i, origThumbImgW: 90, origThumbImgH: 90, enableTouchScreen: Loc_enableTouchScreen, defaultEffect: "fade" });
         }
    })
} 
 function funcArticlesBlock_Load(e, t, a, i, r, n) {
     var l = "LocSB_ID=" + e + "&ObjID=" + t + "&BlockType=" + r;
     l = l + "&LocGGDomainWeb=" + LocGGDomainWeb + "&Subjid=" + a + "&IntCount=" + i + "&RowsToShow=" + n;
     var o = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=4";
     $.ajax({ url: o, jsonp: !1, type: "get", data: l, dataType: "jsonp", crossDomain: !0 })
 }

 function funcBackgroundSlider_Load(e, t, a) {
     var i = "LocSB_ID=" + e + "&ObjID=" + t + "&GalleryID=" + a, r = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=5";
     $.ajax({ url: r, jsonp: !1, type: "get", data: i, dataType: "jsonp", crossDomain: !0
       /*, complete: function (Obj) {
           alert($(Obj));
       }*/
     })
 }

 function funcBackgroundSlider_GetStyleAndIncludes() {
     var TempLinkScript='';
     if ($('link[href*="/jquery.vegas.css"]').length == 0) {
         TempLinkScript =  '<link href="' + LocG_Domain2all_CDN + 'JavaScript/vegas/jquery.vegas.css" rel="stylesheet" type="text/css">';
         $("head").append(TempLinkScript);
     }

     if ($('script[src*="/jquery.vegas.js"]').length == 0) {
         $.when(
            $.getScript(LocG_Domain2all_CDN + 'JavaScript/vegas/jquery.vegas.js'),
            $.Deferred(function (deferred) {
                $(deferred.resolve);
            })
            ).done(function () {                
                funcLoad_BackgroundSlider();
            });
     }
        else {
         funcLoad_BackgroundSlider();
     }
 }

 function funcBackgroundSlider_New_GetStyleAndIncludes() {
     var TempLinkScript = '';
     if ($('script[src*="/jquery.sublimeSlideshow.js"]').length == 0) {
         TempLinkScript = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/BackgroundSlideshow/js/jquery.sublimeSlideshow.js" type="text/javascript"></script>'
         $("head").append(TempLinkScript);
     }
 }
 
 function funcBackgroundSlider_Load_New(e, t, a) {
     var i = "LocSB_ID=" + e + "&ObjID=" + t + "&GalleryID=" + a, r = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=11";
     $.ajax({ url: r, jsonp: !1, type: "get", data: i, dataType: "jsonp", crossDomain: !0 }) 
 }

 function funcArticlesBlock_GetStyleAndIncludes() {
     var e = "<style>@media (min-width:768px) {.SB_C_ArticlesBlock {overflow:auto;}}.CSS_ArticleBlockBox_T1{clear:both;}.CSS_ArticleBlockBox_T4{clear:both;}"
     e = e + ".CssFloatRight {float:" + LocTextAlign + ";} .CSS_ArticleBlockBox_T2{width: 116px;height: 116px;margin-" + LocRevereseTextAlign + ": 4px;}"
     e = e + ".CSS_ArticleBlockTitle_Container_T2{overflow:hidden;}.CSS_ArticleBlockTitle_T2{color:#1C1C1C;}.CSS_ArticleBlockTitle_T2 span{" + LocTextAlign + ":2px;position:relative;}"
     e = e + ".CSS_ArticleBlockBoxRight_T3 {width:120px;} .CSS_ArticleTime_T1{font-size: 11px;} .CSS_ArticleTime_T2{font-size: 11px;} .CSS_ArticleTime_T3{font-size: 11px;}"
     e = e + ".CSS_ArticleTime_T4{font-size: 11px;} .CSS_ArticleBlockTitleImg_Main_T4{width:200px;} @media (max-width:767px) {.SB_C_ArticlesBlock_T2{text-align:center;}"
     e = e + "div.SB_C_ArticlesBlock{width:100% !important;}.CssFloatRight {float:none;}"
     e = e + ".CSS_ArticleBlockBox_T1,.CSS_ArticleBlockBox_T2,.CSS_ArticleBlockBox_T3,.CSS_ArticleBlockBox_T4{display:inline-block;}}</style>"
     , t = ""; 
     return [e, t] 
 }

 function funcArticlesSlider_GetStyleAndIncludes() {
     var e = "<style>.allinone_bannerWithPlaylistBorder{direction:ltr;}.thumbsHolder_ThumbOFF img,.thumbsHolder_ThumbON img{float:right !important;}"
     e = e + ".allinone_bannerWithPlaylist_text_line textElement11_elegant{height:40px !important;}  @media screen and (max-width:767px){"
     e = e + "#containingDiv {width:100% !important;margin:0 auto;padding:60px 0 0 0;}#bottomText{width:100%;border-top:1px solid #cccccc; padding:10px 0 0 0;margin-top:50px; text-align:center;}}  ";
     e = e + '.ArticlesSliderLoading {background: url("' + LocGGDomainWeb + 'JpgNew/gif/loading.gif") no-repeat center center;height: 66px;width: 66px;position: absolute; left: 50%;top: 50%;margin: -25px 0 0 -25px;z-index: 1000;}'
     , e += " @media (max-width:767px){.containingDivCls {width:100%;margin:0 auto;} } ", e += "</style>";
     var t = '<link href="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerWithPlaylist/allinone_bannerWithPlaylist.css" rel="stylesheet" type="text/css">';
     t += '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerWithPlaylist/js_UNCODED/allinone_bannerWithPlaylist.js" type="text/javascript"></script>';
     t += '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerWithPlaylist/js/jquery.mousewheel.min.js" type="text/javascript"></script>';
     t += '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerWithPlaylist/js/jquery.ui.touch-punch.min.js" type="text/javascript"></script>';
     return [e, t] 
 }

 function funcFBGallery_Load(LocSB_ID, LocObjID, LocGalleryID) {
     var tmpParam = 'LocSB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&GalleryID=' + LocGalleryID;
     var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=3";
     $.ajax({
         url: dataurl,
         jsonp: false,
         type: 'get',
         data: tmpParam,
         dataType: 'jsonp',
         crossDomain: true
     });
 }
 
 function funcGallery_GetStyleAndIncludes(LocGalleryType) 
 {
     var strGallery_Includes = '';
     var TempLinkScript='';
     if (LocGalleryType == 1 || LocGalleryType == 2 || LocGalleryType == 3)//flash gallery
     {
         if ($(".SB_C_FlashGallery").length > 0) {
             if ($('link[href*="/allinone_bannerRotator.css"]').length == 0) {
                 TempLinkScript = '<link href="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerRotator/allinone_bannerRotator.css" rel="stylesheet" type="text/css">';
                 $("head").append(TempLinkScript);
             }
             // dolev 14032018 - remove this and use new version with : jquery.touchSwipe.min.js
             if ($('script[src*="/jquery.ui.touch-punch.min.js"]').length == 0) {
                 TempLinkScript = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerRotator/js/jquery.ui.touch-punch.min.js" type="text/javascript"></script>';
                 $("head").append(TempLinkScript);
             }
             // dolev 14032018 - not in use for new version version with : jquery.touchSwipe.min.js
            // if ($('script[src*="/jquery.touchSwipe.min.js"]').length == 0) {
            //     TempLinkScript = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerRotator/js/jquery.touchSwipe.min.js" type="text/javascript"></script>';
            //     $("head").append(TempLinkScript);
            // }

             if ($('script[src*="/allinone_bannerRotator.js"]').length == 0) {
                 TempLinkScript = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerRotator/js/allinone_bannerRotator.js" type="text/javascript"></script>'
                 $("head").append(TempLinkScript);
             }
         }
     }
     else if (LocGalleryType == 4)//LB gallery
     {
         if ($(".SB_C_LBGallery").length > 0) {
             if ($('link[href*="/lightbox.css"]').length == 0) {
                 TempLinkScript = '<link href="' + LocG_Domain2all_CDN + 'GalleryJS/Gallery5/css/lightbox.css" rel="stylesheet" type="text/css">'
                 $("head").append(TempLinkScript);
             }
             if ($('script[src*="/lightbox.js"]').length == 0) {
                 TempLinkScript = strGallery_Includes + '<script src="' + LocG_Domain2all_CDN + 'GalleryJS/Gallery5/js/lightbox.js" type="text/javascript"></script>'
                 $("head").append(TempLinkScript);
             }
         }
     }

     else if (LocGalleryType == 6) //flash gallery jcarousel
     {
         if ($(".SB_C_FlashGallery5").length > 0) {
             if ($('link[href*="/liquidcarousel.css"]').length == 0) {
                 TempLinkScript = '<link href="' + LocG_Domain2all_CDN + 'JavaScript/liquidcarousel/css/liquidcarousel.css" rel="stylesheet" type="text/css">'
                 $("head").append(TempLinkScript);
             }
         }
     }
     //return (strGallery_Includes);
 }

 /* start New Code*/

 function funcMarquee_Load_Init() {
     var s = 0;
     var ObjThis = '';

     marquee_GetStyleAndIncludes('')

     $("div.SB_C_marquee").each(function () {

         // dolev 23022018 - remove this
         // if ($(this).append("<div class='marqueLoading'></div>"), 0 == s) 
         // {
         // {
         //    var e = marquee_GetStyleAndIncludes($(this).attr("data-direction")),
         //    t = e[0]; e[1]
         //     }
         //     $("head").append(t)
         // }

         ObjThis = this;
         var a = LocGSB_ID,
     i = "SB_C_marquee" + s;
         this.id = i;
         var r = $(this).attr("data-direction"),
     n = $(this).attr("M_Width"),
     l = $(this).attr("M_Height"),
     o = $(this).attr("ImgWidth"),
     c = $(this).attr("ImgHeight"),
     d = $(this).width(),
     h = $(this).height(),
    dd = $(this).attr("duration");
         var ObjID = "SB_C_marquee_" + s;
         this.id = ObjID;
         funcMarquee_Load(ObjThis, a, i, d, h, s, r, n, l, o, c, dd, ObjID),
        s++
     }
    ),
     s > 0 && $(".SB_C_marquee").each(function () {
         LocGSB_ID,
         $(this).attr("ID");
         $(this).find(".marqueLoading").fadeOut(3e3),
         s++
     });
 }

 function marquee_GetStyleAndIncludes(LocDataDirection) {
    // dolev 23022018
     if ($('div.SB_C_marquee').length > 0) {
         if ($('script[src*="/jquery.marquee.min.js"]').length == 0) {
             var t = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/jQueryMarquee/jquery.marquee.min.js" type="text/javascript"></script>';
             $("head").append(t)
         }
     }
 }

 function funcMarquee_Load(ObjThis, e, t, a, i, r, n, l, o, s, c, dd, LocObjID) {
     var d = "LocSB_ID=" + LocGSB_ID + '&ObjID=' + LocObjID 
     var h = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=10";
     $.ajax({
         url: h, jsonp: !1, type: "get", data: d, dataType: "jsonp",
         crossDomain: !0,
         complete: function (Obj, b) {
             //$(ObjThis).html(Obj.responseText); /*remove 28-aug, seems that the obj get filled in the ajax and Obj.responseText is undefined*/
             $(ObjThis).attr('width', s).css('height', o + "px");
             $(ObjThis).find('.clsCatMarqueeContainer').css('width', l + "px").css('height', o + "px");
             if (s != 0) {
                 $(ObjThis).find('.clsCatMarqueeImg').css('max-width', s + "px");
             }
             if (c != 0) {
                 $(ObjThis).find('.clsCatMarqueeImg').css('max-height', c + "px");
             }
             $(ObjThis).marquee({ duration: dd, delayBeforeStart: 0, pauseOnHover: true, duplicated: true, gap: 0 });
         }
     })
 }
  
 function func_SB_ScrollBox_Load_Init() {
     var s = 0;
     var ObjScrollBox = '';

     func_SB_ScrollBox_GetStyleAndIncludes()

     $("div.SB_C_ScrollBox").each(function () {
            ObjThis = this;
            var a = '';
            var i = '';
            var r = $(this).attr("data-direction") || '',
            n = $(this).attr("M_Width"),
            l = $(this).attr("M_Height"),
            o = $(this).attr("ImgWidth"),
            c = $(this).attr("ImgHeight"),
            d = $(this).width(),
            h = $(this).height(),
            dd = $(this).attr("duration");
            var ObjID = "SB_C_ScrollBox" + s;
            this.id = ObjID;
            func_SB_ScrollBox_Load(ObjThis, a, i, d, h, s, r, n, l, o, c, dd, ObjID)
     })
 }

 function func_SB_ScrollBox_GetStyleAndIncludes() {
     // dolev 23022018
     if ($('div.SB_C_ScrollBox').length > 0) {
         if ($('script[src*="/jquery.scrollbox.js"]').length == 0) {
             var t = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/scrollbox/jquery.scrollbox.js" type="text/javascript"></script>';
             $("head").append(t)
             //$.getScript(t)
         }
     }
 }

 function func_SB_ScrollBox_Load(ObjThis, e, t, a, i, r, n, l, o, s, c, dd, LocObjID) {
     var d = "LocSB_ID=" + LocGSB_ID + '&ObjID=' + LocObjID;
     var h = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=10";
     $.ajax({
         url: h, jsonp: !1, type: "get", data: d, dataType: "jsonp",
         crossDomain: !0,
         complete: function (Obj, b) {
             if (s != 0) {
            //     $(ObjThis).find('.clsCatMarqueeImg').css('max-width', s + "px");
             }
             if (c != 0) {
            //     $(ObjThis).find('.clsCatMarqueeImg').css('max-height', c + "px");
             }
             $(ObjThis).find('.clsCatMarqueeContainer').scrollbox({ direction: 'h' });
         }
     })
 }

 function func_SB_ScrollBox_Fix_IMG_Size(ObjThis) {
     var ObjIMG = $(ObjThis).find('.clsCatMarqueeCellContainer')
     var ItemCount = ObjIMG.length
     var TotalWidth = 0
     var MaxImgHeight = 0
     var TmpHeight = 0;
     $(ObjIMG).each(function () {
         TotalWidth = TotalWidth + $(this).width();
         TmpHeight = $(this).find('.clsCatMarqueeImg').height();
         if (TmpHeight > MaxImgHeight) {
             MaxImgHeight = TmpHeight
         }
     })
     $(ObjIMG).find('.clsCatMarqueeImg').width(TotalWidth / ItemCount)
     $(ObjIMG).find('.clsCatMarqueeImgContainer').height(MaxImgHeight)
 }

 /* FlashGallery start*/
 // ------------------------------------------------------------------ //
 function func_SB_C_LBGallery_Load_Init() {
     if ($('div.SB_C_LBGallery').length) {
         //FBGallery start
         IntCount = 0;
         funcGallery_GetStyleAndIncludes(4);
         $("head").append('<style>.SB_C_LBGallery_a{float:' + LocTextAlign + '; max-width:200px; max-height:200px; overflow:hidden;margin:6px;}</style>')
         $('div.SB_C_LBGallery').each(function () {// check by class SB_C_FlashGallery
             var LocSB_ID = LocGSB_ID;
             var ObjID = "SB_C_LBGallery" + IntCount
             this.id = ObjID
             var LocGalleryID = $(this).attr('GalleryID');
             funcFBGallery_Load(LocSB_ID, ObjID, LocGalleryID);
             IntCount++;
         });
     }
 }
 //FBGallery end

 function func_SB_C_GallerySlider_Load_Init() {
     if ($('div.SB_C_GallerySlider').length) {
         func_SB_C_GallerySlider_GetStyleAndIncludes(0);

         if ($('script[src*="/owl.carousel.min.js"]').length == 0) {
             $.when(
            $.getScript(LocG_Domain2all_CDN + 'JavaScript/OwlCarousel/dist/owl.carousel.min.js'),
            $.Deferred(function (deferred) {
                $(deferred.resolve);
            })
            ).done(function () {
                func_SB_C_GallerySlider_Before_Ajax();
            });
         }
         else {
             func_SB_C_GallerySlider_Before_Ajax();
         }          
     }
 }

 function func_SB_C_GallerySlider_Before_Ajax() 
{
    IntCount = 0;
    $('div.SB_C_GallerySlider').each(function () {// check by class SB_C_FlashGallery      
        var ObjThis = this
         var LocSB_ID = LocGSB_ID;
         var ObjID = "SB_C_GallerySlider_" + IntCount
         this.id = ObjID
         var LocGalleryID = $(this).attr('GalleryID');
         var LocGalleryType = $(this).attr('GalleryType');
         var FlashGalleryWidth = $(this).width();         
         var FlashGalleryHeight = $(this).height();
         var autoheight = $(this).attr('autoheight');
         funcGallerySlider_Load(ObjThis, LocSB_ID, ObjID, LocGalleryID, LocGalleryType, FlashGalleryWidth, FlashGalleryHeight, autoheight);
         IntCount++;
     });
}

function funcGallerySlider_Load(ObjThis, LocSB_ID, LocObjID, LocGalleryID, LocGalleryType, LocFlashGalleryWidth, LocFlashGalleryHeight, autoheight) {
    var tmpParam = 'LocSB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&GalleryID=' + LocGalleryID + '&GalleryType=' + LocGalleryType + '&FlashGalleryWidth=' + LocFlashGalleryWidth + '&FlashGalleryHeight=' + LocFlashGalleryHeight + '&isResponsiveInIE8=' + isResponsiveInIE8 + '&autoheight=' + autoheight;
     var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=19";
     $.ajax({
         url: dataurl,
         jsonp: false,
         type: 'get',
         data: tmpParam,
         dataType: 'jsonp',
         crossDomain: true,
         complete: function (Obj) {
             var isRtl = false;
             var NavIcons = ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
             if (LocGSB_Direction == 'rtl') {
                 isRtl = true;
                 NavIcons = ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>']
             }
             var currId = $(ObjThis).attr('id');

             if (autoheight == 1) {
                 setTimeout(function () {
                    
                     $(ObjThis).find('.owl-carousel').owlCarousel({
                         rtl: isRtl,
                         loop: true,
                         nav: true,
                         navText: NavIcons,
                         autoplay: true,
                         margin: 10,
                         autoHeight: true,
                         items: 1
                     });
                     $(ObjThis).find('.owl-carousel').css('visibility', 'visible');
                 },100);
             }
             else {
                 $(ObjThis).find('.owl-carousel').owlCarousel({
                     rtl: isRtl,
                     loop: true,
                     nav: true,
                     navText: NavIcons,
                     autoplay: true,
                     margin: 10,
                     autoWidth: true,
                     items: 4
                 });
                 $(ObjThis).find('.owl-carousel').css('visibility', 'visible');
             }             
         }
     });
 }

 function func_SB_C_MarqueeSlider_Load_Init() {
     if ($('div.SB_C_marquee2:not(.sb_complete_load)').length) {
         func_SB_C_GallerySlider_GetStyleAndIncludes(1)

         if ($('script[src*="/owl.carousel.min.js"]').length == 0) {
             $.when(
            $.getScript(LocG_Domain2all_CDN + 'JavaScript/OwlCarousel/dist/owl.carousel.min.js'),
            $.Deferred(function (deferred) {
                $(deferred.resolve);
            })
            ).done(function () {
                func_SB_C_MarqueeSlider_Before_Ajax();
            });
         }
         else {
             func_SB_C_MarqueeSlider_Before_Ajax();
         }          
     }
 }

 function func_SB_C_MarqueeSlider_Before_Ajax() {
     IntCount = 0;
     $('div.SB_C_marquee2').each(function () {
         var ObjThis = this;
         var LocSB_ID = LocGSB_ID;
         var ObjID = "SB_C_marquee2_" + IntCount
         this.id = ObjID;
         var LocImgHeight = $(this).attr("ImgHeight");
         $(ObjThis).css('height', '250px;');
         funcMarqueeSlider_Load(ObjThis, LocSB_ID, ObjID, LocImgHeight);
         IntCount++;
     });
 }

 //gil remove , we have funcGallery_GetStyleAndIncludes(1)
 function funcFlashGallery_Load_StyleAndIncludes(GalleryType) {
     // dolev 23022018
     if ($('div.SB_C_FlashGallery').length > 0) {
         if ($('script[src*="/jquery.ui.touch-punch.min.js"]').length == 0) {
             var t = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerRotator/js/jquery.ui.touch-punch.min.js" type="text/javascript"></script>';
             $("head").append(t)
         }
         // GalleryType==1
         if ($('script[src*="/allinone_bannerRotator.js"]').length == 0) {
             var t = '<script src="' + LocG_Domain2all_CDN + 'JavaScript/JquerySlider/main_v3/bannerRotator/js/allinone_bannerRotator.js" type="text/javascript"></script>';
             $("head").append(t)
         }
         // GalleryType==2
     }
     // jQuery(function (){ var Loc_enableTouchScreen = true;if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){Loc_enableTouchScreen = false;}"
 }
 /*  FlashGallery start*/

 function func_SB_C_FlashGallery_Load_Init() {
     if ($('div.SB_C_FlashGallery').length) {
         IntCount = 0;
         funcGallery_GetStyleAndIncludes(1);
         $('div.SB_C_FlashGallery').each(function () {// check by class SB_C_FlashGallery
             var ObjThis = this
             var LocSB_ID = LocGSB_ID;
             var ObjID = "SB_C_FlashGallery_" + IntCount
             this.id = ObjID
             var LocGalleryID = $(this).attr('GalleryID');
             var LocGalleryType = $(this).attr('GalleryType');
             var FlashGalleryWidth = $(this).width();
             var FlashGalleryHeight = $(this).height();
             //funcFlashGallery_Load_StyleAndIncludes(LocGalleryType); // gil remove , we have funcGallery_GetStyleAndIncludes(1)
             funcFlashGallery_Load(ObjThis, LocSB_ID, ObjID, LocGalleryID, LocGalleryType, FlashGalleryWidth, FlashGalleryHeight);
             IntCount++;
         });
     }
 }

 function funcFlashGallery_Load(ObjThis, LocSB_ID, LocObjID, LocGalleryID, LocGalleryType, LocFlashGalleryWidth, LocFlashGalleryHeight) {
     var tmpParam = 'LocSB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&GalleryID=' + LocGalleryID + '&GalleryType=' + LocGalleryType + '&FlashGalleryWidth=' + LocFlashGalleryWidth + '&FlashGalleryHeight=' + LocFlashGalleryHeight + '&isResponsiveInIE8=' + isResponsiveInIE8;
     var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=2";
     if (LocFlashGalleryHeight == 0) {
         LocFlashGalleryHeight = 'auto'
     }
     $.ajax({
         url: dataurl,
         jsonp: false,
         type: 'get',
         data: tmpParam,
         dataType: 'jsonp',
         crossDomain: true,
         complete: function (Obj) {
             // $(ObjThis).html(Obj.responseText)
             var LocGalleryEffectBetweenPictures = $(ObjThis).find('.SB_FlashGallery_Container').attr('GalleryEffectBetweenPictures');
             if (LocGalleryEffectBetweenPictures === undefined) {
                 LocGalleryEffectBetweenPictures = 'random';
             }
             var Loc_enableTouchScreen = true; if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { Loc_enableTouchScreen = false; }
             if (LocGalleryType == 1) {                 
                 //$('#allinone_bannerRotator_classic_' + LocObjID).allinone_bannerRotator({ skin: 'classic', width: LocFlashGalleryWidth, responsive: true, width100Proc: false, responsiveRelativeToBrowser: isResponsiveInIE8, height: LocFlashGalleryHeight, thumbsWrapperMarginBottom: 5, enableTouchScreen: Loc_enableTouchScreen, defaultEffect: LocGalleryEffectBetweenPictures });
                 //$('#allinone_bannerRotator_classic_' + LocObjID).allinone_bannerRotator({ skin: 'classic', width: LocFlashGalleryWidth, responsive: true, width100Proc: false, responsiveRelativeToBrowser: isResponsiveInIE8, thumbsWrapperMarginBottom: 5, enableTouchScreen: Loc_enableTouchScreen, defaultEffect: LocGalleryEffectBetweenPictures });
             }
             if (LocGalleryType == 2 || LocGalleryType == 3) {
                 //$('#allinone_bannerRotator_classic_' + LocObjID).allinone_bannerRotator({ skin: 'universal', width: LocFlashGalleryWidth, height: LocFlashGalleryHeight, thumbsWrapperMarginBottom: -35, autoHideBottomNav: false, showPreviewThumbs: false, enableTouchScreen: Loc_enableTouchScreen, defaultEffect: LocGalleryEffectBetweenPictures });
             }
         }
     });
 }

 function funcMarqueeSlider_Load(ObjThis, LocSB_ID, LocObjID, LocImgHeight) {

     var tmpParam = 'LocSB_ID=' + LocSB_ID + '&ObjID=' + LocObjID + '&ImgHeight=' + LocImgHeight;
     var dataurl = LocGGDomainWeb + "SB_Plugins_Ajax.asp?action=20";
     $.ajax({
         url: dataurl,
         jsonp: false,
         type: 'get',
         data: tmpParam,
         dataType: 'jsonp',
         crossDomain: true,
         complete: function (Obj) {

             var isRtl = false;
             var NavIcons = ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
             if (LocGSB_Direction == 'rtl') {
                 isRtl = true;
                 NavIcons = ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>']
             }
             
             $(window).on("load", function () { /*change back 05-jul-2018 fix bug when save in editor*/
                 $(ObjThis).addClass('sb_complete_load')
                 //$(document).ready(function () {
                 var TmpWidth, ImgWidth, ImgHeight;
                 var TmpHeight = $(ObjThis).attr('ImgHeight');
                 if (TmpHeight !== undefined) {
                     TmpHeight = TmpHeight.replace('px', '');
                 }
                 else {
                     TmpHeight = 200;
                 }
                 if (TmpHeight === undefined) {
                     TmpHeight = 200;
                 }
                 var ObjThiscls = $(ObjThis).attr('class');

                 var cnt1 = 0
                 $(ObjThis).find('div.item img.clsCatMarqueeImg').each(function () {
                     ImgWidth = $(this).width();
                     ImgHeight = $(this).height();
                     TmpWidth = ImgWidth / (ImgHeight / TmpHeight);
                     $(this).css('width', TmpWidth + 'px').css('height', TmpHeight + 'px');
                     $(this).parents('.item').find('.clsCatMarquee2Tilte').css('width', TmpWidth + 'px')
                     cnt1 = cnt1 + 1
                 });

                 $(ObjThis).find('.owl-carousel').css('visibility', 'visible');
                 $(ObjThis).trigger('destroy.owl.carousel');
                 $(ObjThis).find('.owl-carousel').owlCarousel({
                     rtl: isRtl,
                     loop: true,
                     nav: true,
                     navText: NavIcons,
                     autoplay: true,
                     autoplayTimeout: 2000,
                     /*slideSpeed: 300,*/
                     margin: 10,
                     autoWidth: true,
                     items: 6
                 });
                 $(ObjThis).parents('.SB_C_marquee2').css('height', '');
             }); //load

         }
     });
}

function func_SB_C_GallerySlider_GetStyleAndIncludes(LocType) {       
        if ($('link[href*="/owl.carousel.min.css"]').length == 0) {
            var strSB_Owl_link1 = '<link href="' + LocG_Domain2all_CDN + 'JavaScript/OwlCarousel/dist/assets/owl.carousel.min.css" rel="stylesheet" type="text/css">'
            $("head").append(strSB_Owl_link1);
        }
        if ($('link[href*="/owl.theme.default.min.css"]').length == 0) {
            var strSB_Owl_link2 = '<link href="' + LocG_Domain2all_CDN + 'JavaScript/OwlCarousel/dist/assets/owl.theme.default.min.css" rel="stylesheet" type="text/css">'
            $("head").append(strSB_Owl_link2);
        }
}

function funcYT_BG_Init() {
    var IntCount = 0;
        $('div.SB_C_YT_BG').each(function () {
            var ObjThis = this
            var LocSB_ID = LocGSB_ID;
            var ObjID = "SB_C_YT_BG_" + IntCount;
            this.id = ObjID;
            var LocVideoId = $(this).attr('VideoId');
            var LocIsBackground = $(this).attr('IsBackground');
            var LocIsMute = $(this).attr('IsMute');
            var LocIsMuteBtn = $(this).attr('IsMuteBtn');
            var LocIsRepeat = $(this).attr('IsRepeat');

            funcYT_BG_Load(ObjThis, LocSB_ID, ObjID, LocVideoId, LocIsBackground, LocIsMute, LocIsMuteBtn, LocIsRepeat);
            IntCount++;
        });
    }

    function funcYT_BG_Load(ObjThis, LocSB_ID, ObjID, LocVideoId, LocIsBackground, LocIsMute, LocIsMuteBtn, LocIsRepeat) {
        var LocErrFlag = 0;
        var Loc_fitToBackground = false;
        //vidmute = 0;

        var LocIsMute = $(ObjThis).attr('ismute');        
        if (LocIsMute == '1') {
            vidmute = 1;            
        }

        if (LocIsBackground == 1) {
            if ($('body').find('#videoCont').length == 0) {
                $('body').prepend('<div id="videoCont" style="position:absolute;top:1px;left:1px;width:100%;height:700px;overflow:hidden;"><div id="video" style="background-color:#eeeeee;"></div></div>');
                Loc_fitToBackground = true;
            }
            else {
                LocErrFlag = 1; //more then one video BG plugin
            }
        }
        
        if (LocIsRepeat == 0)
        {
            LocIsRepeat = false;
        }
        else
        {
            LocIsRepeat = true;
        }

        if (LocIsBackground == 1 && LocIsMuteBtn == 1) {
            if ($('body').find('#videomute').length == 0) {
                if (vidmute == 1)
                    $('body').prepend('<div id="videomute" style="position:absolute;top:40px;right:1px;cursor:pointer;z-index: 9999"><span class="glyphicon glyphicon-volume-off" style="font-size: 26px;"></div>');
                else
                    $('body').prepend('<div id="videomute" style="position:absolute;top:40px;right:1px;cursor:pointer;z-index: 9999"><span class="fa fa-volume-up" style="font-size: 26px;"></div>');
                $('#videomute').click(function () {
                    var player = $('#video').data('ytPlayer').player;                    
                    if (vidmute == 0) {
                        player.mute(true);
                        $('#videomute').html('<span class="glyphicon glyphicon-volume-off" style="font-size: 26px;"></span>');
                        vidmute = 1;
                    } 
                    else 
                    {
                        player.unMute(true);
                        $('#videomute').html('<span class="fa fa-volume-up" style="font-size: 26px;">');
                        vidmute = 0;
                    }
                })
            }
        }
        //Loc_fitToBackground = true;
        var ObjVideo = ObjThis;
        if (LocIsBackground == 1) {
            ObjVideo = $('#video');
            var Ret1 = removeQueryStringParameter('autoplay', LocVideoId);
            Ret1 = removeQueryStringParameter('rel', Ret1);  
            LocVideoId = Ret1 + '&autoplay=1&rel=0';
        }
        var TempIsMute;
        if (vidmute == 1)
            TempIsMute = true;
        else
            TempIsMute = false;
        //&playlist=Pi5RRft3w0k
        if (LocErrFlag == 0) {
            $(ObjVideo).YTPlayer({
             //$('#video').YTPlayer({
            //$(ObjThis).YTPlayer({
                fitToBackground: Loc_fitToBackground,
                //videoId: 'jKCyFB5LmPo',
               // videoId: '_1MKjWCoeS8',
                videoId: LocVideoId, //'5dsGWM5XGdg?wmode=transparent',               
                mute: TempIsMute, //false,/*ie,ch remmembers last video watched state*/
                repeat: LocIsRepeat/*,
                //origin: 'h  ttp://rochestb.github.io/jQuery.YoutubeBackground/',*/
                ,playerVars: {
                    modestbranding: 0,
                    autoplay: 1,
                    controls: 1,
                    showinfo: 0,
                    wmode: 'transparent',
                    branding: 0,
                    rel: 0,
                    autohide: 0,
                    origin: window.location.origin
                }
            });

        }
    }

    function funcLoad_BackgroundSlider() {
        var IntCount = 0;
        //if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            $('div.SB_C_BackgroundSlider').each(function () {
                if (IntCount == 0)  // can be only one
                { // get styles and includes for first time

                    var LocSB_ID = LocGSB_ID;
                    //var ObjID = $(this).attr('ID');
                    var ObjID = "SB_C_BackgroundSlider" + IntCount;
                    this.id = ObjID
                    var LocGalleryID = $(this).attr('GalleryID');
                    funcBackgroundSlider_Load(LocSB_ID, ObjID, LocGalleryID);
                    IntCount++;
                }
            });
        //}
    }

    function func111() {
        return;
        if ($('div.CssCatalogAdjusted_CateogeryCont_I').length) {
            func_SB_C_GallerySlider_GetStyleAndIncludes(2);

            if ($('script[src*="/owl.carousel.min.js"]').length == 0) {
                $.when(
                    $.getScript(LocG_Domain2all_CDN + 'JavaScript/OwlCarousel/dist/owl.carousel.min.js'),
                    $.Deferred(function (deferred) {
                $(deferred.resolve);
                    })
                ).done(function () {
                func222();
                });
            }
            else {
                func222();
            }
        }
    }

    function func222() {
        $('.CssCatalogAdjusted_CateogeryCont_I .CssCatalogAdjusted_product_Container').addClass('Item');
        $('.CssCatalogAdjusted_CateogeryCont_I').addClass('owl-carousel').addClass('owl-theme');

        var TmpHeight = 200; // can get it from Elem and change dynamiclly
        var cnt1 = 0
        $('.CssCatalogAdjusted_CateogeryCont_I').find('img.Cat_ImgTNpic').each(function () {
            ImgWidth = $(this).width();
            alert('ImgWidth:' + ImgWidth);
            //alert($(this).css('width'));
            ImgHeight = $(this).height();
            TmpWidth = ImgWidth / (ImgHeight / TmpHeight);

            //alert(':' + TmpWidth);

            //$(this).css('width', TmpWidth + 'px').css('height', TmpHeight + 'px');
            ////$(this).parents('.item').find('.clsCatMarquee2Tilte').css('width', TmpWidth + 'px')
            cnt1 = cnt1 + 1
        });
       // CssCatalogAdjusted_CateogeryCont_I       
        var isRtl = false;
        var NavIcons = ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
        if (LocGSB_Direction == 'rtl') {
            isRtl = true;
            NavIcons = ['<i class="fa fa-angle-right" aria-hidden="true"></i>', '<i class="fa fa-angle-left" aria-hidden="true"></i>']
        }
        $('.CssCatalogAdjusted_CateogeryCont_I').owlCarousel({
            rtl: isRtl,
            nav: true,
            navText: NavIcons, 
            autoplay: true,
            autoplayTimeout: 2000,
            margin: 10,
            autoWidth: true,
            loop: true,            
            items:4
        });
    }

    function funcSB_ShowForm() {
        // ------------------------------------------------------------------ //    
        //Form start
        var IntCount = 0;
        $('div.SB_C_Form').each(function () {
            var ObjID = "SB_C_Form" + IntCount
            this.id = ObjID;
            var LocTemplate = $(this).attr('templateid');
            var LocIntFormId = $(this).attr('IntFormId');
            //LocTemplate = 4;
            var LocThis = this
            //$(this).load(LocGGDomainWeb + 'crsd/SB_FormShowDnd.asp?TemplateID=' + LocTemplate + '&sb_id=' + LocGSB_ID + '&IntFormId=' + LocIntFormId + '&LocGSblang=' + LocGSblang + '&LocGSB_Direction=' + LocGSB_Direction + '&LocFormCount=' + IntCount);
            //return;
            var tmpParam = ''; //'TemplateID=' + LocTemplate + '&sb_id=' + LocGSB_ID + '&IntFormId=' + LocIntFormId + '&LocGSblang=' + LocGSblang + '&LocGSB_Direction=' + LocGSB_Direction + '&LocFormCount=' + IntCount;
            //var dataurl = LocGGDomainWeb + 'crsd/SB_FormShowDnd.asp';
            var dataurl = LocGGDomainWeb + 'crsd/' + 'SB_FormShowDnd.asp?NotIframe=1&TemplateID=' + LocTemplate + '&sb_id=' + LocGSB_ID + '&IntFormId=' + LocIntFormId + '&LocGSblang=' + LocGSblang + '&LocGSB_Direction=' + LocGSB_Direction + '&LocFormCount=' + IntCount + '&ObjID=' + encodeURIComponent(ObjID);
            //var dataurl = LocGGDomainWeb + 'SB_FormShowDnd.asp';

            $.ajax({
                url: dataurl,
                //jsonp: false,
                type: 'get',
                data: tmpParam,
                //dataType: 'jsonp',
                //crossDomain: true,
                success: function (data) {
                     $(LocThis).html(data);
                }
            });

            //var url = 'crsd/SB_FormShowDnd.asp?TemplateID=' + LocTemplate + '&sb_id=' + LocGSB_ID + '&LocGSblang=' + LocGSblang + '&LocGSB_Direction=' + LocGSB_Direction + '&LocFormCount=' + IntCount;
            //var params = '';
            //        $.ajax({
            //            url: LocGGDomainWeb + url,
            //            type: 'POST',
            //            data: params,
            //            cache: false,
            //            crossDomain: true,
            //            dataType: 'html',
            //            success: function (data) {                
            //                $('#' + ObjID).html(data);
            //            },
            //            error: function (data) {
            //                //handleHttpResponse(obj);
            //                // alert(data);
            //                alert(data);
            //            }
            //        });

            IntCount++;
        });
    }



    //Form end
    // ------------------------------------------------------------------ //    