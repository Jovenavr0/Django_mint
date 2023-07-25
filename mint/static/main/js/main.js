function t121_setHeight(recid) {
  var rec = $("#rec" + recid);
  var div = $("#youtubeiframe" + recid);
  var height = div.width() * 0.5625;
  div.height(height);
  div.parent().height(height);
  var videoLazy = rec.find(".t-video-lazyload");
  if (videoLazy !== undefined) {
    var iframeLazy = videoLazy.find("iframe");
    var heightLazy = videoLazy.width() * 0.5625;
    videoLazy.height(heightLazy);
    iframeLazy.height(heightLazy);
    setTimeout(function () {
      div = $("#youtubeiframe" + recid);
      div.height(div.width() * 0.5625);
    }, 200);
  }
}
function t142_checkSize(recid) {
  var el = $("#rec" + recid).find(".t142__submit");
  if (el.length) {
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
    }
  }
}
function t452_scrollToTop() {
  var duration = 700;
  var difference = window.pageYOffset;
  var step = (10 * difference) / duration;
  var timer = setInterval(function () {
    difference -= step;
    window.scrollTo(0, difference);
    document.body.setAttribute("data-scrollable", "true");
    if (window.pageYOffset === 0) {
      document.body.removeAttribute("data-scrollable");
      clearInterval(timer);
    }
  }, 10);
}
function t456_setListMagin(recid, imglogo) {
  if ($(window).width() > 980) {
    var t456__menu = $("#rec" + recid + " .t456");
    var t456__leftpart = t456__menu.find(".t456__leftwrapper");
    var t456__listpart = t456__menu.find(".t456__list");
    if (imglogo) {
      t456__listpart.css("margin-right", t456__leftpart.width());
    } else {
      t456__listpart.css("margin-right", t456__leftpart.width() + 30);
    }
  }
}
function t456_highlight() {
  var url = window.location.href;
  var pathname = window.location.pathname;
  if (url.substr(url.length - 1) == "/") {
    url = url.slice(0, -1);
  }
  if (pathname.substr(pathname.length - 1) == "/") {
    pathname = pathname.slice(0, -1);
  }
  if (pathname.charAt(0) == "/") {
    pathname = pathname.slice(1);
  }
  if (pathname == "") {
    pathname = "/";
  }
  $(".t456__list_item a[href='" + url + "']").addClass("t-active");
  $(".t456__list_item a[href='" + url + "/']").addClass("t-active");
  $(".t456__list_item a[href='" + pathname + "']").addClass("t-active");
  $(".t456__list_item a[href='/" + pathname + "']").addClass("t-active");
  $(".t456__list_item a[href='" + pathname + "/']").addClass("t-active");
  $(".t456__list_item a[href='/" + pathname + "/']").addClass("t-active");
}
function t456_checkAnchorLinks(recid) {
  if ($(window).width() >= 960) {
    var t456_navLinks = $(
      "#rec" + recid + " .t456__list_item a:not(.tooltipstered)[href*='#']"
    );
    if (t456_navLinks.length > 0) {
      t456_catchScroll(t456_navLinks);
    }
  }
}
function t456_catchScroll(t456_navLinks) {
  var t456_clickedSectionId = null,
    t456_sections = new Array(),
    t456_sectionIdTonavigationLink = [],
    t456_interval = 100,
    t456_lastCall,
    t456_timeoutId;
  t456_navLinks = $(t456_navLinks.get().reverse());
  t456_navLinks.each(function () {
    var t456_cursection = t456_getSectionByHref($(this));
    if (typeof t456_cursection !== "undefined") {
      if (typeof t456_cursection.attr("id") != "undefined") {
        t456_sections.push(t456_cursection);
      }
      t456_sectionIdTonavigationLink[t456_cursection.attr("id")] = $(this);
    }
  });
  t456_updateSectionsOffsets(t456_sections);
  t456_sections.sort(function (a, b) {
    return b.attr("data-offset-top") - a.attr("data-offset-top");
  });
  $(window).bind(
    "resize",
    t_throttle(function () {
      t456_updateSectionsOffsets(t456_sections);
    }, 200)
  );
  $(".t456").bind("displayChanged", function () {
    t456_updateSectionsOffsets(t456_sections);
  });
  setInterval(function () {
    t456_updateSectionsOffsets(t456_sections);
  }, 5000);
  t456_highlightNavLinks(
    t456_navLinks,
    t456_sections,
    t456_sectionIdTonavigationLink,
    t456_clickedSectionId
  );
  t456_navLinks.click(function () {
    var t456_clickedSection = t456_getSectionByHref($(this));
    if (
      typeof t456_clickedSection !== "undefined" &&
      !$(this).hasClass("tooltipstered") &&
      typeof t456_clickedSection.attr("id") != "undefined"
    ) {
      t456_navLinks.removeClass("t-active");
      $(this).addClass("t-active");
      t456_clickedSectionId = t456_getSectionByHref($(this)).attr("id");
    }
  });
  $(window).scroll(function () {
    var t456_now = new Date().getTime();
    if (t456_lastCall && t456_now < t456_lastCall + t456_interval) {
      clearTimeout(t456_timeoutId);
      t456_timeoutId = setTimeout(function () {
        t456_lastCall = t456_now;
        t456_clickedSectionId = t456_highlightNavLinks(
          t456_navLinks,
          t456_sections,
          t456_sectionIdTonavigationLink,
          t456_clickedSectionId
        );
      }, t456_interval - (t456_now - t456_lastCall));
    } else {
      t456_lastCall = t456_now;
      t456_clickedSectionId = t456_highlightNavLinks(
        t456_navLinks,
        t456_sections,
        t456_sectionIdTonavigationLink,
        t456_clickedSectionId
      );
    }
  });
}
function t456_updateSectionsOffsets(sections) {
  $(sections).each(function () {
    var t456_curSection = $(this);
    t456_curSection.attr("data-offset-top", t456_curSection.offset().top);
  });
}
function t456_getSectionByHref(curlink) {
  var hash = curlink.attr("href").replace(/\s+/g, "").replace(/.*#/, "");
  var block = $(".r[id='" + hash + "']");
  var anchor = $(".r[data-record-type='215']").has("a[name='" + hash + "']");
  if (curlink.is('[href*="#rec"]')) {
    return block;
  } else if (anchor.length === 1) {
    return anchor;
  } else {
    return undefined;
  }
}
function t456_highlightNavLinks(
  t456_navLinks,
  t456_sections,
  t456_sectionIdTonavigationLink,
  t456_clickedSectionId
) {
  var t456_scrollPosition = $(window).scrollTop(),
    t456_valueToReturn = t456_clickedSectionId;
  if (
    t456_sections.length != 0 &&
    t456_clickedSectionId == null &&
    t456_sections[t456_sections.length - 1].attr("data-offset-top") >
      t456_scrollPosition + 300
  ) {
    t456_navLinks.removeClass("t-active");
    return null;
  }
  $(t456_sections).each(function (e) {
    var t456_curSection = $(this),
      t456_sectionTop = t456_curSection.attr("data-offset-top"),
      t456_id = t456_curSection.attr("id"),
      t456_navLink = t456_sectionIdTonavigationLink[t456_id];
    if (
      t456_scrollPosition + 300 >= t456_sectionTop ||
      (t456_sections[0].attr("id") == t456_id &&
        t456_scrollPosition >= $(document).height() - $(window).height())
    ) {
      if (t456_clickedSectionId == null && !t456_navLink.hasClass("t-active")) {
        t456_navLinks.removeClass("t-active");
        t456_navLink.addClass("t-active");
        t456_valueToReturn = null;
      } else {
        if (t456_clickedSectionId != null && t456_id == t456_clickedSectionId) {
          t456_valueToReturn = null;
        }
      }
      return !1;
    }
  });
  return t456_valueToReturn;
}
function t456_setPath() {}
function t456_setBg(recid) {
  var window_width = $(window).width();
  if (window_width > 980) {
    $(".t456").each(function () {
      var el = $(this);
      if (el.attr("data-bgcolor-setbyscript") == "yes") {
        var bgcolor = el.attr("data-bgcolor-rgba");
        el.css("background-color", bgcolor);
      }
    });
  } else {
    $(".t456").each(function () {
      var el = $(this);
      var bgcolor = el.attr("data-bgcolor-hex");
      el.css("background-color", bgcolor);
      el.attr("data-bgcolor-setbyscript", "yes");
    });
  }
}
function t456_appearMenu(recid) {
  var window_width = $(window).width();
  if (window_width > 980) {
    $(".t456").each(function () {
      var el = $(this);
      var appearoffset = el.attr("data-appearoffset");
      if (appearoffset != "") {
        if (appearoffset.indexOf("vh") > -1) {
          appearoffset = Math.floor(
            window.innerHeight * (parseInt(appearoffset) / 100)
          );
        }
        appearoffset = parseInt(appearoffset, 10);
        if ($(window).scrollTop() >= appearoffset) {
          if (el.css("visibility") == "hidden") {
            el.finish();
            el.css("top", "-50px");
            el.css("visibility", "visible");
            el.animate({ opacity: "1", top: "0px" }, 200, function () {});
          }
        } else {
          el.stop();
          el.css("visibility", "hidden");
        }
      }
    });
  }
}
function t456_changebgopacitymenu(recid) {
  var window_width = $(window).width();
  if (window_width > 980) {
    $(".t456").each(function () {
      var el = $(this);
      var bgcolor = el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone = el.attr("data-bgopacity");
      var bgopacitytwo = el.attr("data-bgopacity-two");
      var menushadow = el.attr("data-menushadow");
      if (menushadow == "100") {
        var menushadowvalue = menushadow;
      } else {
        var menushadowvalue = "0." + menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color", bgcolor_afterscroll);
        if (bgopacitytwo == "0" || menushadow == " ") {
          el.css("box-shadow", "none");
        } else {
          el.css(
            "box-shadow",
            "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")"
          );
        }
      } else {
        el.css("background-color", bgcolor);
        if (bgopacityone == "0.0" || menushadow == " ") {
          el.css("box-shadow", "none");
        } else {
          el.css(
            "box-shadow",
            "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")"
          );
        }
      }
    });
  }
}
function t456_createMobileMenu(recid) {
  var window_width = $(window).width(),
    el = $("#rec" + recid),
    menu = el.find(".t456"),
    burger = el.find(".t456__mobile");
  burger.click(function (e) {
    menu.fadeToggle(300);
    $(this).toggleClass("t456_opened");
  });
  $(window).bind(
    "resize",
    t_throttle(function () {
      window_width = $(window).width();
      if (window_width > 980) {
        menu.fadeIn(0);
      }
    }, 200)
  );
}
function t509_setHeight(recid) {
  var t509__el = $("#rec" + recid);
  var t509__image = t509__el.find(".t509__blockimg");
  t509__image.each(function () {
    var t509__width = $(this).attr("data-image-width");
    var t509__height = $(this).attr("data-image-height");
    t509__height =
      t509__height.indexOf("vh") === -1
        ? parseInt(t509__height, 10)
        : (parseInt(t509__height, 10) / 100) * $(window).height();
    var t509__ratio = t509__height / t509__width;
    var t509__padding = t509__ratio * 100;
    $(this).css("padding-bottom", t509__padding + "%");
  });
  if ($(window).width() > 960) {
    var t509__textwr = t509__el.find(".t509__textwrapper");
    var t509__deskimg = t509__el.find(".t509__desktopimg");
    t509__textwr.each(function () {
      $(this).css("height", t509__deskimg.innerHeight());
    });
  }
}
function t674_init(recid) {
  var el = $("#rec" + recid);
  el.find(".t674__img-holder")
    .on("load", function () {
      var delay = 0;
      if ($("#allrecords").attr("data-blocks-animationoff") !== "yes") {
        delay = 600;
      }
      setTimeout(function () {
        $("body").addClass("t674__body_with-bg");
      }, delay);
    })
    .each(function () {
      if (this.complete) $(this).trigger("load");
    });
}
function t702_initPopup(recid) {
  $("#rec" + recid).attr("data-animationappear", "off");
  $("#rec" + recid).css("opacity", "1");
  var el = $("#rec" + recid).find(".t-popup"),
    hook = el.attr("data-tooltip-hook"),
    analitics = el.attr("data-track-popup");
  el.bind(
    "scroll",
    t_throttle(function () {
      if (
        window.lazy === "y" ||
        $("#allrecords").attr("data-tilda-lazy") === "yes"
      ) {
        t_onFuncLoad("t_lazyload_update", function () {
          t_lazyload_update();
        });
      }
    })
  );
  if (hook !== "") {
    $(".r").on("click", 'a[href="' + hook + '"]', function (e) {
      t702_showPopup(recid);
      t702_resizePopup(recid);
      e.preventDefault();
      if (
        window.lazy === "y" ||
        $("#allrecords").attr("data-tilda-lazy") === "yes"
      ) {
        t_onFuncLoad("t_lazyload_update", function () {
          t_lazyload_update();
        });
      }
      if (analitics > "") {
        var virtTitle = hook;
        if (virtTitle.substring(0, 7) == "#popup:") {
          virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}
function t702_onSuccess(t702_form) {
  var t702_inputsWrapper = t702_form.find(".t-form__inputsbox");
  var t702_inputsHeight = t702_inputsWrapper.height();
  var t702_inputsOffset = t702_inputsWrapper.offset().top;
  var t702_inputsBottom = t702_inputsHeight + t702_inputsOffset;
  var t702_targetOffset = t702_form.find(".t-form__successbox").offset().top;
  if ($(window).width() > 960) {
    var t702_target = t702_targetOffset - 200;
  } else {
    var t702_target = t702_targetOffset - 100;
  }
  if (
    t702_targetOffset > $(window).scrollTop() ||
    $(document).height() - t702_inputsBottom < $(window).height() - 100
  ) {
    t702_inputsWrapper.addClass("t702__inputsbox_hidden");
    setTimeout(function () {
      if ($(window).height() > $(".t-body").height()) {
        $(".t-tildalabel").animate({ opacity: 0 }, 50);
      }
    }, 300);
  } else {
    $("html, body").animate({ scrollTop: t702_target }, 400);
    setTimeout(function () {
      t702_inputsWrapper.addClass("t702__inputsbox_hidden");
    }, 400);
  }
  var successurl = t702_form.data("success-url");
  if (successurl && successurl.length > 0) {
    setTimeout(function () {
      window.location.href = successurl;
    }, 500);
  }
}
function t702_lockScroll() {
  var body = $("body");
  if (!body.hasClass("t-body_scroll-locked")) {
    var bodyScrollTop =
      typeof window.pageYOffset !== "undefined"
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;
    body.css("top", "-" + bodyScrollTop + "px");
    body.attr("data-popup-scrolltop", bodyScrollTop);
  }
}
function t702_unlockScroll() {
  var body = $("body");
  if (body.hasClass("t-body_scroll-locked")) {
    var bodyScrollTop = $("body").attr("data-popup-scrolltop");
    body.removeClass("t-body_scroll-locked");
    body.css("top", "");
    body.removeAttr("data-popup-scrolltop");
    window.scrollTo(0, bodyScrollTop);
  }
}
function t702_showPopup(recid) {
  var rec = $("#rec" + recid);
  var popup = rec.find(".t-popup");
  popup.css("display", "block");
  var $range = rec.find(".t-range");
  $range.trigger("popupOpened");
  var range = $range.get(0);
  if (range) {
    var triggerChangeEvent;
    if (/msie|trident/.test(navigator.userAgent)) {
      triggerChangeEvent = document.createEvent("Event");
      triggerChangeEvent.initEvent("popupOpened", !0, !1);
    } else {
      triggerChangeEvent = new Event("popupOpened");
    }
    range.dispatchEvent(triggerChangeEvent);
  }
  if (
    window.lazy === "y" ||
    $("#allrecords").attr("data-tilda-lazy") === "yes"
  ) {
    t_onFuncLoad("t_lazyload_update", function () {
      t_lazyload_update();
    });
  }
  setTimeout(function () {
    popup.find(".t-popup__container").addClass("t-popup__container-animated");
    popup.addClass("t-popup_show");
  }, 50);
  $("body").addClass("t-body_popupshowed t702__body_popupshowed");
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    setTimeout(function () {
      t702_lockScroll();
    }, 500);
  }
  rec.find(".t-popup").mousedown(function (e) {
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if (e.clientX > windowWithoutScrollBar) {
      return;
    }
    if (e.target == this) {
      t702_closePopup(recid);
    }
  });
  rec.find(".t-popup__close").click(function (e) {
    t702_closePopup(recid);
  });
  rec.find('.t-submit[href*="#"]').click(function (e) {
    if ($("body").hasClass("t-body_scroll-locked")) {
      $("body").removeClass("t-body_scroll-locked");
    }
  });
  rec.find('a[href*="#"]').click(function (e) {
    var url = $(this).attr("href");
    if (!url || url.substring(0, 7) != "#price:") {
      t702_closePopup(recid);
      if (!url || url.substring(0, 7) == "#popup:") {
        setTimeout(function () {
          $("body").addClass("t-body_popupshowed");
        }, 300);
      }
    }
  });
  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      t702_closePopup(recid);
    }
  });
}
function t702_closePopup(recid) {
  $("body").removeClass("t-body_popupshowed t702__body_popupshowed");
  $("#rec" + recid + " .t-popup").removeClass("t-popup_show");
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
    t702_unlockScroll();
  }
  setTimeout(function () {
    $(".t-popup").not(".t-popup_show").css("display", "none");
  }, 300);
}
function t702_resizePopup(recid) {
  var el = $("#rec" + recid),
    div = el.find(".t-popup__container").height(),
    win = $(window).height() - 120,
    popup = el.find(".t-popup__container");
  if (div > win) {
    popup.addClass("t-popup__container-static");
  } else {
    popup.removeClass("t-popup__container-static");
  }
}
function t702_sendPopupEventToStatistics(popupname) {
  var virtPage = "/tilda/popup/";
  var virtTitle = "Popup: ";
  if (popupname.substring(0, 7) == "#popup:") {
    popupname = popupname.substring(7);
  }
  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == "function") {
    Tilda.sendEventToStatistics(virtPage, virtTitle, "", 0);
  } else {
    if (ga) {
      if (window.mainTracker != "tilda") {
        ga("send", { hitType: "pageview", page: virtPage, title: virtTitle });
      }
    }
    if (window.mainMetrika > "" && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {
        title: virtTitle,
        referer: window.location.href,
      });
    }
  }
}
function t706_onSuccessCallback(t706_form) {
  $(".t706__cartwin-products").slideUp(10, function () {});
  $(".t706__cartwin-bottom").slideUp(10, function () {});
  $(".t706 .t-form__inputsbox").slideUp(700, function () {});
  try {
    tcart__unlockScroll();
  } catch (e) {}
}
function t754__init(recid) {
  setTimeout(function () {
    t_onFuncLoad("t_prod__init", function () {
      t_prod__init(recid);
    });
    t754__hoverZoom_init(recid);
    t754_initPopup(recid);
    t754__updateLazyLoad(recid);
    t754__alignButtons_init(recid);
    if (typeof t_store_addProductQuantityEvents !== "undefined") {
      t754_initProductQuantity(recid);
    }
    $("body").trigger("twishlist_addbtn");
  }, 500);
}
function t754_initProductQuantity(recid) {
  var el = $("#rec" + recid);
  var productList = el.find(".t754__col, .t754__product-full");
  productList.each(function (i, product) {
    t_store_addProductQuantityEvents($(product));
  });
}
function t754__showMore(recid) {
  var el = $("#rec" + recid).find(".t754");
  var showmore = el.find(".t754__showmore");
  var cards_count = parseInt(el.attr("data-show-count"), 10);
  if (cards_count > 0) {
    if (showmore.text() === "") {
      showmore.find("td").text(t754__dict("loadmore"));
    }
    showmore.show();
    el.find(".t754__col").hide();
    var cards_size = el.find(".t754__col").size();
    var cards_count = parseInt(el.attr("data-show-count"), 10);
    var x = cards_count;
    var y = cards_count;
    t754__showSeparator(el, x);
    el.find(".t754__col:lt(" + x + ")").show();
    showmore.click(function () {
      x = x + y <= cards_size ? x + y : cards_size;
      el.find(".t754__col:lt(" + x + ")").show();
      if (x == cards_size) {
        showmore.hide();
      }
      if (typeof $(".t-records").attr("data-tilda-mode") == "undefined") {
        if (
          window.lazy === "y" ||
          $("#allrecords").attr("data-tilda-lazy") === "yes"
        ) {
          t_onFuncLoad("t_lazyload_update", function () {
            t_lazyload_update();
          });
        }
      }
      t754__showSeparator(el, x);
      if ($("#rec" + recid).find("[data-buttons-v-align]")[0]) {
        t754__alignButtons(recid);
      }
    });
  }
}
function t754__showSeparator(el, x) {
  el.find(".t754__separator_number").addClass("t754__separator_hide");
  el.find(".t754__separator_hide").each(function () {
    if ($(this).attr("data-product-separator-number") <= x) {
      $(this).removeClass("t754__separator_hide");
    }
  });
}
function t754__dict(msg) {
  var dict = [];
  dict.loadmore = {
    EN: "Load more",
    RU: "Загрузить еще",
    FR: "Charger plus",
    DE: "Mehr laden",
    ES: "Carga más",
    PT: "Carregue mais",
    UK: "Завантажити ще",
    JA: "もっと読み込む",
    ZH: "裝載更多",
  };
  var lang = window.browserLang;
  if (typeof dict[msg] !== "undefined") {
    if (typeof dict[msg][lang] !== "undefined" && dict[msg][lang] != "") {
      return dict[msg][lang];
    } else {
      return dict[msg].EN;
    }
  }
  return 'Text not found "' + msg + '"';
}
function t754__alignButtons_init(recid) {
  var el = $("#rec" + recid);
  if (el.find("[data-buttons-v-align]")[0]) {
    try {
      t754__alignButtons(recid);
      $(window).bind(
        "resize",
        t_throttle(function () {
          if (
            typeof window.noAdaptive !== "undefined" &&
            window.noAdaptive === !0 &&
            $isMobile
          ) {
            return;
          }
          t754__alignButtons(recid);
        }, 200)
      );
      el.find(".t754").bind("displayChanged", function () {
        t754__alignButtons(recid);
      });
      if ($isMobile) {
        $(window).on("orientationchange", function () {
          t754__alignButtons(recid);
        });
      }
    } catch (e) {
      console.log("buttons-v-align error: " + e.message);
    }
  }
}
function t754__alignButtons(recid) {
  var rec = $("#rec" + recid);
  var wrappers = rec.find(".t754__textwrapper");
  var maxHeight = 0;
  var itemsInRow = rec.find(".t-container").attr("data-blocks-per-row") * 1;
  var mobileView = $(window).width() <= 480;
  var tableView = $(window).width() <= 960 && $(window).width() > 480;
  var mobileOneRow =
    $(window).width() <= 960 && rec.find(".t754__container_mobile-flex")[0]
      ? !0
      : !1;
  var mobileTwoItemsInRow =
    $(window).width() <= 480 && rec.find(".t754 .mobile-two-columns")[0]
      ? !0
      : !1;
  if (mobileView) {
    itemsInRow = 1;
  }
  if (tableView) {
    itemsInRow = 2;
  }
  if (mobileTwoItemsInRow) {
    itemsInRow = 2;
  }
  if (mobileOneRow) {
    itemsInRow = 999999;
  }
  var i = 1;
  var wrappersInRow = [];
  $.each(wrappers, function (key, element) {
    element.style.height = "auto";
    if (itemsInRow === 1) {
      element.style.height = "auto";
    } else {
      wrappersInRow.push(element);
      if (element.offsetHeight > maxHeight) {
        maxHeight = element.offsetHeight;
      }
      $.each(wrappersInRow, function (key, wrapper) {
        wrapper.style.height = maxHeight + "px";
      });
      if (i === itemsInRow) {
        i = 0;
        maxHeight = 0;
        wrappersInRow = [];
      }
      i++;
    }
  });
}
function t754__hoverZoom_init(recid) {
  if (isMobile) {
    return;
  }
  var rec = $("#rec" + recid);
  try {
    if (rec.find("[data-hover-zoom]")[0]) {
      if (!jQuery.cachedZoomScript) {
        jQuery.cachedZoomScript = function (url) {
          var options = { dataType: "script", cache: !0, url: url };
          return jQuery.ajax(options);
        };
      }
      $.cachedZoomScript(
        "https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js"
      ).done(function (script, textStatus) {
        if (textStatus == "success") {
          setTimeout(function () {
            t_hoverZoom_init(recid, ".t-slds__container");
          }, 500);
        } else {
          console.log("Upload script error: " + textStatus);
        }
      });
    }
  } catch (e) {
    console.log("Zoom image init error: " + e.message);
  }
}
function t754__updateLazyLoad(recid) {
  var scrollContainer = $("#rec" + recid + " .t754__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
    scrollContainer.bind(
      "scroll",
      t_throttle(function () {
        if (
          window.lazy === "y" ||
          $("#allrecords").attr("data-tilda-lazy") === "yes"
        ) {
          t_onFuncLoad("t_lazyload_update", function () {
            t_lazyload_update();
          });
        }
      })
    );
  }
}
function t754_initPopup(recid) {
  var rec = $("#rec" + recid);
  rec.find('[href^="#prodpopup"]').one("click", function (e) {
    e.preventDefault();
    var el_popup = rec.find(".t-popup");
    var el_prod = $(this).closest(".js-product");
    var lid_prod = el_prod.attr("data-product-lid");
    t_onFuncLoad("t_sldsInit", function () {
      t_sldsInit(recid + " #t754__product-" + lid_prod + "");
    });
  });
  rec.find('[href^="#prodpopup"]').click(function (e) {
    e.preventDefault();
    if (
      $(e.target).hasClass("t1002__addBtn") ||
      $(e.target).parents().hasClass("t1002__addBtn")
    ) {
      return;
    }
    t754_showPopup(recid);
    var el_popup = rec.find(".t-popup");
    var el_prod = $(this).closest(".js-product");
    var lid_prod = el_prod.attr("data-product-lid");
    el_popup.find(".js-product").css("display", "none");
    var el_fullprod = el_popup.find(
      '.js-product[data-product-lid="' + lid_prod + '"]'
    );
    el_fullprod.css("display", "block");
    var analitics = el_popup.attr("data-track-popup");
    if (analitics > "") {
      var virtTitle = el_fullprod.find(".js-product-name").text();
      if (!virtTitle) {
        virtTitle = "prod" + lid_prod;
      }
      Tilda.sendEventToStatistics(analitics, virtTitle);
    }
    var curUrl = window.location.href;
    if (
      curUrl.indexOf("#!/tproduct/") < 0 &&
      curUrl.indexOf("%23!/tproduct/") < 0 &&
      curUrl.indexOf("#%21%2Ftproduct%2F") < 0
    ) {
      if (typeof history.replaceState != "undefined") {
        window.history.replaceState(
          "",
          "",
          window.location.href + "#!/tproduct/" + recid + "-" + lid_prod
        );
      }
    }
    t754_updateSlider(recid + " #t754__product-" + lid_prod + "");
    if (
      window.lazy === "y" ||
      $("#allrecords").attr("data-tilda-lazy") === "yes"
    ) {
      t_onFuncLoad("t_lazyload_update", function () {
        t_lazyload_update();
      });
    }
  });
  if ($("#record" + recid).length == 0) {
    t754_checkUrl(recid);
  }
  t754_copyTypography(recid);
}
function t754_checkUrl(recid) {
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf("#!/tproduct/");
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
    tprodIndex = curUrl.indexOf("%23!/tproduct/");
    if (tprodIndex < 0) {
      tprodIndex = curUrl.indexOf("#%21%2Ftproduct%2F");
    }
  }
  if (tprodIndex >= 0) {
    var curUrl = curUrl.substring(tprodIndex, curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf("-") + 1, curUrl.length);
    var rec = $("#rec" + recid);
    if (
      curUrl.indexOf(recid) >= 0 &&
      rec.find("[data-product-lid=" + curProdLid + "]").length
    ) {
      rec
        .find("[data-product-lid=" + curProdLid + '] [href^="#prodpopup"]')
        .triggerHandler("click");
    }
  }
}
function t754_updateSlider(recid) {
  var el = $("#rec" + recid);
  t_onFuncLoad("t_slds_SliderWidth", function () {
    t_slds_SliderWidth(recid);
  });
  var sliderWrapper = el.find(".t-slds__items-wrapper");
  var sliderWidth = el.find(".t-slds__container").width();
  var pos = parseFloat(sliderWrapper.attr("data-slider-pos"));
  sliderWrapper.css({
    transform: "translate3d(-" + sliderWidth * pos + "px, 0, 0)",
  });
  t_onFuncLoad("t_slds_UpdateSliderHeight", function () {
    t_slds_UpdateSliderHeight(recid);
  });
  t_onFuncLoad("t_slds_UpdateSliderArrowsHeight", function () {
    t_slds_UpdateSliderArrowsHeight(recid);
  });
}
function t754_showPopup(recid) {
  var el = $("#rec" + recid);
  var popup = el.find(".t-popup");
  popup.css("display", "block");
  setTimeout(function () {
    popup.find(".t-popup__container").addClass("t-popup__container-animated");
    popup.addClass("t-popup_show");
    if (
      window.lazy === "y" ||
      $("#allrecords").attr("data-tilda-lazy") === "yes"
    ) {
      t_onFuncLoad("t_lazyload_update", function () {
        t_lazyload_update();
      });
    }
  }, 50);
  $("body").addClass("t-body_popupshowed");
  $("body").trigger("twishlist_addbtn");
  el.find(".t-popup").mousedown(function (e) {
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if (e.clientX > windowWithoutScrollBar) {
      return;
    }
    if (e.target == this) {
      t754_closePopup();
    }
  });
  el.find(".t-popup__close, .t754__close-text").click(function (e) {
    t754_closePopup();
  });
  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      t754_closePopup();
    }
  });
}
function t754_closePopup() {
  $("body").removeClass("t-body_popupshowed");
  $(".t-popup").removeClass("t-popup_show");
  $("body").trigger("twishlist_addbtn");
  var curUrl = window.location.href;
  var indexToRemove = curUrl.indexOf("#!/tproduct/");
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
    indexToRemove = curUrl.indexOf("%23!/tproduct/");
    if (indexToRemove < 0) {
      indexToRemove = curUrl.indexOf("#%21%2Ftproduct%2F");
    }
  }
  curUrl = curUrl.substring(0, indexToRemove);
  setTimeout(function () {
    $(".t-popup").scrollTop(0);
    $(".t-popup").not(".t-popup_show").css("display", "none");
    if (typeof history.replaceState != "undefined") {
      window.history.replaceState("", "", curUrl);
    }
  }, 300);
}
function t754_removeSizeStyles(styleStr) {
  if (
    typeof styleStr != "undefined" &&
    (styleStr.indexOf("font-size") >= 0 ||
      styleStr.indexOf("padding-top") >= 0 ||
      styleStr.indexOf("padding-bottom") >= 0)
  ) {
    var styleStrSplitted = styleStr.split(";");
    styleStr = "";
    for (var i = 0; i < styleStrSplitted.length; i++) {
      if (
        styleStrSplitted[i].indexOf("font-size") >= 0 ||
        styleStrSplitted[i].indexOf("padding-top") >= 0 ||
        styleStrSplitted[i].indexOf("padding-bottom") >= 0
      ) {
        styleStrSplitted.splice(i, 1);
        i--;
        continue;
      }
      if (styleStrSplitted[i] == "") {
        continue;
      }
      styleStr += styleStrSplitted[i] + ";";
    }
  }
  return styleStr;
}
function t754_copyTypography(recid) {
  var rec = $("#rec" + recid);
  var titleStyle = rec.find(".t754__title").attr("style");
  var descrStyle = rec.find(".t754__descr").attr("style");
  rec
    .find(".t-popup .t754__title")
    .attr("style", t754_removeSizeStyles(titleStyle));
  rec
    .find(".t-popup .t754__descr, .t-popup .t754__text")
    .attr("style", t754_removeSizeStyles(descrStyle));
}
