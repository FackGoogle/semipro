var flick,
  introHeight,
  isMobile,
  mobileLayout,
  scrollActive,
  scrollSpeed = 750,
  sectionOffset = {
    "about": 0,
    "contact": 0
  },
  sectionOffsetAr = [],
  teamGrid;

// carousel variables
var carousel = {
  currentImage: 1,
  duration: 5000,
  maxImages: 3,
  // start: setTimeout(function ()
  // {
  // 	this.currentImage += 1;

  // 	if (this.currentImage > this.maxImages)
  // 		this.currentImage = 1;

  // 	$(".carousel .image").removeClass("active");
  // 	$(".carousel .i" + this.currentImage).addClass("active");
  // }, this.duration)
  start: function() {
    var self = this;

    this.timer = setInterval(function() {
      self.currentImage += 1;

      if (self.currentImage > self.maxImages)
        self.currentImage = 1;

      $(".carousel .image").removeClass("active");
      $(".carousel .i" + self.currentImage).addClass("active");
    }, self.duration);
  },
  stop: function() {
    var self = this;
    clearInterval(this.timer);
  },
  timer: null
};

// contact form variables
var valeraForm = {
  emailFrom: "",
  fields: ["email_from", "title", "message"], // contact form field names
  form: function() {
    return $(".contact-form")
  }, //
  height: 0, // contact form height
  missing: [],
  removeStatus: function() {
    $(valeraForm.form()).find(".button-container").removeClass("sending error");
    $(".button-cancel").removeClass("disabled");
  },
  setStatus: function(stat) {
    this.removeStatus();

    var el = $(valeraForm.form()).find(".button-container");
    var txt = $(valeraForm.form()).find(".button-send span");
    var fa = $(valeraForm.form()).find(".button-send i");

    if (stat == "default") {
      this.status = "default";
      $(txt).html("Send");
      $(fa).attr("class", "fa fa-paper-plane");
    } else if (stat == "sending") {
      this.status = "sending";
      $(el).addClass("sending");
      $(txt).html("Sending");
      $(fa).attr("class", "fa fa-circle-o-notch fa-spin");
      // change cancel button appearance to inidicate no action while sending
      $(".button-cancel").addClass("disabled");
    } else if (stat == "error") {
      this.status = "error";
      $(el).addClass("error");
      $(txt).html("Try Again");
      $(fa).attr("class", "fa fa-exclamation-triangle");
    }
  },
  status: "default"
};

$(document).on("ready", function() {
  // ===============================================================
  // mobile detect
  md = new MobileDetect(window.navigator.userAgent);

  if (md.mobile()) {
    isMobile = true;
    $("body").addClass("isMobile");
  } else if (!md.mobile()) {
    isMobile = false;
    $("body").addClass("notMobile");
  }

  // ===============================================================
  // mobile layout
  mobileLayout = isMobileLayout();

  // ===============================================================
  // intro height
  introHeight = parseInt($(".intro .main").css("height"));
  checkIntroHeight();

  // ===============================================================
  // get offsets of sections so we know where they are
  // getOffset();

  // ===============================================================
  // fix advisory heights
  // fixAdvisoryHeight();

  // ===============================================================
  // menu click handler
  $("nav .menu").on("click", function() {
    $("nav .flyout").toggleClass("visible");
  });

  // ===============================================================
  // intro subhead click handler
  $(".isMobile .intro .subhead-one").on("click", function(e) {
    $(this).toggleClass("visible");
  });

  // ===============================================================
  // expand detail click handler
  $(".isMobile article.expand-detail, .tech .featured .expand-detail").on("click", function(e) {
    // if (! $($(this).parent(".container").parent()).hasClass("secondary") )
    $(this).toggleClass("expanded");
  });

  // ===============================================================
  // team modal click handler
  $(".team .team-member").on("click", function(e) {
    var member = e.currentTarget;

    if (!isMobileLayout()) // ipad/desktop
    {
      $(member).clone().appendTo(".team-modal .modal");
      //
      $(".modal .close").prependTo(".modal .team-member");
      $(".modal .team-member .bio").removeClass("hidden");
      //
      $(".team-modal").removeClass("hidden");
    } else // mobile
    {
      var targ = $(member).find(".bio");

      if ($(targ).hasClass("hidden")) {
        $.smoothScroll({
          scrollElement: null,
          scrollTarget: e.currentTarget,
          speed: scrollSpeed,
          offset: $('nav').height() * -1 - 10
        });
        // return false;
      }

      $(targ).toggleClass("hidden");

    }
  });

  $(".modal").on("click", function() {
    $(".team-modal").addClass("hidden");
    //
    $(".modal .team-member .close").prependTo(".modal")
    $(".modal .team-member").remove();
  });

  // ===============================================================
  // smoothscroll
  //$.smoothScroll({scrollElement:null});
  // $("nav a").smoothScroll({speed:scrollSpeed});
  $("nav a").smoothScroll({
    speed: scrollSpeed,
    beforeScroll: function(e) {
      //console.log($(this));
      //console.log(e.link.id);
      //
      // var targ = "#" + e.link.id;
      // $("nav a .column").removeClass("selected");

      // if (targ != "#nav-home")
      // 	$(targ + " .column").addClass("selected");

    }
  });
  // $('.team-member').on('click', function(e) {

  // });

  // ===============================================================
  // contact form send button
  $(".button-send").on("click", function() {
    valeraForm.emailFrom = $("[name=email_from]").val();
    checkFields();
  });

  // ===============================================================
  // remove required fields notice
  $(valeraForm.form()).find("input, textarea").on("focus", function() {
    $(this).removeClass("required");
  });

  $(valeraForm.form()).find("input, textarea").on("blur", function() {

    // remove the required text after the fields are filled in and the required text was shown

    var n = $(this).attr("name");
    var current = $("[name=" + n + "]");

    // on blur, if the field has a value...
    if (current.val() != "" || current.val != undefined || current.val() != null) {
      // loop through valeraForm.missing
      for (var h = 0; h < valeraForm.missing.length; h++) {
        // if the current field name is in valeraForm.missing...
        if (n == valeraForm.missing[h]) {
          // remove the current field name from valeraForm.missing and exit the loop
          valeraForm.missing.splice(h, 1);
          break;
        }
      }

      // if valeraForm.missing is finally empty, remove the required text
      // if (valeraForm.missing.length == 0)
      // 	$("label .required").html("");
    }
  });

  // ===============================================================
  // event listeners
  //
  window.addEventListener("scroll", function() {
    if ($("nav .flyout").hasClass("visible")) {
      $("nav .flyout").removeClass("visible");
    }

    // if (scrollActive)
    // 	clearTimeout(scrollActive);

    // scrollActive = setTimeout(function ()
    // {
    // 	var s = window.pageYOffset;
    // 	var arLen = sectionOffsetAr.length;
    // 	// console.log(s);

    // 	// less than first section
    // 	if (s < sectionOffsetAr[0])
    // 	{
    // 		$("nav .flyout .column").removeClass("selected");
    // 	}
    // 	else
    // 	{
    // 		for (var i = 0; i < arLen-1; i++)
    // 		{
    // 			if (s >= sectionOffsetAr[i] && s < sectionOffsetAr[i+1])
    // 			{
    // 				$("nav .flyout .column").removeClass("selected");
    // 				$($("nav .flyout .column")[i]).addClass("selected");
    // 			}
    // 			else if (s >= sectionOffsetAr[arLen-1])
    // 			{
    // 				$("nav .flyout .column").removeClass("selected");
    // 				$($("nav .flyout .column")[arLen-1]).addClass("selected");
    // 			}
    // 		}
    // 	}
    // }, 100);

    if ($("body").hasClass("index-page")) {
      var elemOffset = $("section.chart").offset();
      var elemThreshold = $("nav").height();

      if (window.pageYOffset >= elemOffset.top - elemThreshold && !$("nav").hasClass("light")) {
        // console.log('thresh');
        $("nav").addClass("light");
      } else if (window.pageYOffset < elemOffset.top - elemThreshold && $("nav").hasClass("light")) {
        // console.log('thresh');
        $("nav").removeClass("light");
      }
    }

    // ============================================
    // scroll check for fixed background image
    var elemOffset = $(".solutions").offset() || $(".board").offset();
    var elemThreshold = 0;

    try {
      if (window.pageYOffset >= elemOffset.top + elemThreshold && !$(".fixedbg").hasClass("image2")) {
        // console.log('thresh');
        $(".fixedbg").removeClass("image1");
        $(".fixedbg").addClass("image2");
      } else if (window.pageYOffset < elemOffset.top + elemThreshold && !$(".fixedbg").hasClass("image1")) {
        // console.log('thresh');
        $(".fixedbg").removeClass("image2");
        $(".fixedbg").addClass("image1");
      }
    } catch (e) {
      // console.log("error: " + e);
    }
    // ^^^ try/catch block here b/c at least on news page, there's no element for fixed background images, so this will fail
  });

  window.addEventListener("resize", function() {
    checkIntroHeight();
    // getOffset();
  });

  // start carousel
  carousel.start();
});

function checkIntroHeight() {
  // var targ = ".intro .main, .solutions > .container, .about-intro, .contact-intro";
  var targ = ".flex-row";

  $(targ).css("height", window.innerHeight);
  // if (isMobileLayout())
  // {
  // 	//$(targ).css("height", (window.innerHeight > introHeight ? window.innerHeight : introHeight) );
  // 	$(targ).css("height", window.innerHeight);
  // }
  // else
  // {
  // 	$(targ).removeAttr("style");
  // }

  //
  // on mobile only, set solutions, about, and contact heights to same as intro height
}

function isMobileLayout() {
  // function to check if the layout is currently the mobile layout or not
  // this is tested via the state of the menu button dropdown in the nav
  // if it is seen, the the mobile layout is active
  // if it's not seen, then the current layout is the desktop layout
  return $("nav .menu").css("display") != "none";
}

function teamSelectVisible() {
  return $(".about .team-select").css("display") != "none";
}

//=================================================================================================

function checkFields() {
  //console.log("checking form fields...");
  valeraForm.missing = [];

  for (var i = 0; i < valeraForm.fields.length; i++) {
    var current = valeraForm.fields[i];
    //var placeholderValue = $("[name="+ current +"]").attr("placeholder");
    var fieldValue = $("[name=" + current + "]").val();

    // check to see if fields have a value other than default/empty
    if (fieldValue == "" || fieldValue == undefined || fieldValue == "null") {
      valeraForm.missing.push(valeraForm.fields[i]);
    }

    // check name and city fields for numbers
    if (fieldValue != "") {
      /*
      	************* NOTE ************
      	The focus event wont trigger on an input field if the form is autofilled. So, after the fields are populated and Submit is clicked,
      	the filled input boxes retain the red stroke
      	To remedy this, while checking if the fields are not blank, add the filled class, even before error checking
      	Error checking will happen later and the .filled class can be removed at that point
      	* do not add for select boxes
      */
      //if (valeraForm.fields[i] != "resident" && valeraForm.fields[i] != "prescriptions" && valeraForm.fields[i] != "state" && valeraForm.fields[i] != "contact" && valeraForm.fields[i] != "terms" && valeraForm.fields[i] != "qualityCare" && valeraForm.fields[i] != "marketing")
      //	$("[name="+valeraForm.fields[i]+"]").addClass("filled");			
    }
  }

  // check to see if anything has been pushed into valeraForm.missing
  if (valeraForm.missing.length > 0) {
    showMissing(valeraForm.missing, "Required field");
  } else if (valeraForm.missing.length == 0 && !validateEmail(valeraForm.emailFrom)) {
    valeraForm.missing.push("email_from");
    showMissing(valeraForm.missing, "Please enter a valid email address");
  } else if (valeraForm.missing.length == 0 && validateEmail(valeraForm.emailFrom) && checkSweetness()) {
    // no missing fields and a properly structured email address
    valeraForm.setStatus("sending");

    var frm = $(valeraForm.form()).find("form");

    $.ajax({
      type: "POST",
      url: "scripts/contact.php",

      data: frm.serialize(),
      success: function(data) {
        // console.log("success! data = " + data);
        hideFormOnSuccess();
      },
      error: function(data) {
        valeraForm.setStatus("error");
        // console.log("error! data = " + data);
      }
    });
  }

}

function showMissing(missing, errormsg) {
  var req;

  for (var a in missing) {
    if (missing[a] != "message") {
      // input fields
      $(valeraForm.form()).find("input[name=" + missing[a] + "]").addClass("required");
      // req = getLabelFor($("input"), true);
      // req.html(errormsg);
    } else if (missing[a] == "message") {
      // message
      $(valeraForm.form()).find("textarea").addClass("required");
      // req = getLabelFor($("textarea"), true);
      // req.html(errormsg);

    }
  }
}

function validateEmail(e) {
  // if (e.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))
  if (e.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return true;
  } else {
    return false;
  }
}

function checkSweetness() {
  var a = $("input[name=address]").val();
  var z = $("input[name=zip]").val();
  var res = false;

  if (a == "" && z == "") {
    res = true;
  }

  return res;
}

function hideFormOnSuccess() {
  //console.log("form success!!");

  var frm = $(".contact-form");
  // var h = parseInt($(frm).find(".confirmed").css("height"));

  //$(frm).addClass("success");
  $(frm).addClass("success").delay(4000).queue(function() {
    $(this).dequeue();

    // set form to defaults
    $(".button-cancel").removeClass("disabled");
    $(valeraForm.form()).find("input, textarea").val("");
    $(".confirmed").removeClass("fade-out");
    valeraForm.setStatus("default");

    $(frm).removeClass("success");
  });

  // $(valeraForm.form()).delay(500).css("height", h).queue(function ()
  // {
  // 	$(".confirmed").delay(2000).addClass("fade-out").queue(function ()
  // 	{
  // 		// MUST remove 'disabled' class from cancel button, or else form won't close properly
  // 		$(".button-cancel").removeClass("disabled");

  // 		$(".button-cancel").click().delay(500).queue(function ()
  // 		{
  // 			$(frm).removeClass("success");

  // 			// set form to defaults
  // 			$(valeraForm.form()).find("input, textarea").val("");
  // 			$(".confirmed").removeClass("fade-out");
  // 			valeraForm.setStatus("default");

  // 			$(this).dequeue();
  // 		});

  // 		$(this).dequeue();
  // 	});

  // 	$(this).dequeue();
  // });
}