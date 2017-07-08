
//<![CDATA[

/* Slider Widget
--------------------------------------*/

    var slider = $('#slider .widget-content');
    var sliderContent = slider.text().trim();
function getPostUrl(entry) {
      for (var k = 0; k < entry.link.length; k++) {
        if (entry.link[k].rel == 'alternate') {
          var posturl = entry.link[k].href;
          return posturl;
        }
      }
    }

    function getPostImg(entry, img, i) {
      if ("content" in entry) {
        var postcontent = entry.content.$t;
      }

      var s = postcontent, a = s.indexOf("<img"), b = s.indexOf("src=\"",a), c = s.indexOf("\"",b+5), d = s.substr(b+5,c-b-5);

      if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
        img[i] = d;
        var post_image = img[i];
      } else {
        var post_image = no_image_url;
      }

      return post_image;
    }

    function getPostPublishDate(entry) {
      var postdate = entry.published.$t,
          day = postdate.split("-")[2].substring(0,2),
          m = postdate.split("-")[1],
          y = postdate.split("-")[0],
          months = ['January','February','March','April','May','June','July','August','September','Octobor','November','December'],
          month = months[m-1],
          daystr = month + ' ' + day + ', ' + y;

      return postdate ? daystr : "";
    }

    function getPostCategory(entry) {
      var post_category = entry.category;
      if(post_category) {
        post_category = entry.category[0].term;
      }
      var category = '<div class="category-wrapper"><a class="category" href="/search/label/'+ post_category +'?max-results=10">'+ post_category +'</a></div>';

      return post_category ? category : "";
    }

    function Slider(e) {
      var img = new Array(),
          trtd= '',
          numOfEntries = e.feed.entry.length;

      for (var i = 0; i < numOfEntries; i++) {

        var entry = e.feed.entry[i];
        var posttitle = entry.title.$t;
        var posturl = getPostUrl(entry);
        var post_image = getPostImg(entry, img, i);
        var author = entry.author[0].name.$t;
        var daystr = getPostPublishDate(entry);
        var category = getPostCategory(entry);

      trtd = trtd + '<div class="slider-post" style="background: url(&quot;'+ post_image +'&quot;) no-repeat center;background-size: cover"><div class="slider-post-info">'+ category +'<a href="'+ posturl +'" class="post-title"><h2 class="heading">'+ posttitle +'</h2></a><span class="publish-date">'+ daystr +'</span><span class="writer">by '+ author +'</span></div></div>';
      }
      slider.html('<div class="slider-posts">' + trtd + '</div>');

      $('.slider-posts').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        arrows: false,
        responsive: [
          {
            breakpoint: 1367,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 620,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });
    } // function Slider(e)

    if((sliderContent.toLowerCase().trim() !== 'no') && (sliderContent.toLowerCase() !== '"no"') && (sliderContent !== '')) {
      if(sliderContent !== "[recent]") {
       $.ajax({
          url: "/feeds/posts/default/-/"+ sliderContent +"?alt=json-in-script&max-results=6",
          type: "get",
          dataType: "jsonp",
          success: function (e) {
            Slider(e);
          }
        });
      } else {
        $.ajax({
          url: "/feeds/posts/default?alt=json-in-script&max-results=6",
          type: "get",
          dataType: "jsonp",
          success: function (e) {
            Slider(e);
          }
        });
      }
    } else {
      $("#slider").remove();
    }
//]]>


//<![CDATA[

/* Homepage Widgets
--------------------------------------*/

  $(".home-widgets .HTML").each(function (index) {

    var widget = $(this);
    var widgetContent = widget.children(".widget-content");
    var widgetContentText = widgetContent.text().trim();
    var a = widgetContentText.match(/[^[\]]+(?=])/g);

    function getPostUrl(entry) {
      for (var k = 0; k < entry.link.length; k++) {
        if (entry.link[k].rel == 'alternate') {
          var posturl = entry.link[k].href;
          return posturl;
        }
      }
    }

    function getPostImg(entry, img, i) {
      if ("content" in entry) {
        var postcontent = entry.content.$t;
      }

      var s = postcontent, a = s.indexOf("<img"), b = s.indexOf("src=\"",a), c = s.indexOf("\"",b+5), d = s.substr(b+5,c-b-5);

      if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
        img[i] = d;
        var post_image = img[i];
      } else {
        var post_image = no_image_url;
      }

      return post_image;
    }

    function getPostPublishDate(entry) {
      var postdate = entry.published.$t,
          day = postdate.split("-")[2].substring(0,2),
          m = postdate.split("-")[1],
          y = postdate.split("-")[0],
          months = ['January','February','March','April','May','June','July','August','September','Octobor','November','December'],
          month = months[m-1],
          daystr = month + ' ' + day + ', ' + y;

      return postdate ? daystr : "";
    }

    function getPostCategory(entry) {
      var post_category = entry.category;
      if(post_category) {
        post_category = entry.category[0].term;
      }
      var category = '<div class="category-wrapper"><a class="category" href="/search/label/'+ post_category +'?max-results=10">'+ post_category +'</a></div>';

      return post_category ? category : "";
    }

    if(widgetContentText.charAt(0) === "[") {
      a[1] = a[1].toLowerCase();
      widgetContent.addClass(a[1]).addClass("clearfix");

      if(a[1] === "grids") {
       $.ajax({
          url: "/feeds/posts/default/-/"+ a[0] +"?alt=json-in-script&max-results="+ gridsPostsNum +"",
          type: "get",
          dataType: "jsonp",
          success: function (e) {

            var img = new Array(),
                trtd= '',
                numOfEntries = e.feed.entry.length;

            for (var i = 0; i < numOfEntries; i++) {

              var entry = e.feed.entry[i];
              var posttitle = entry.title.$t;
              var posturl = getPostUrl(entry);
              var post_image = getPostImg(entry, img, i);
              var author = entry.author[0].name.$t;
              var daystr = getPostPublishDate(entry);
              var category = getPostCategory(entry);

              trtd = trtd + '<div class="grids-post" style="background: url(&quot;'+ post_image +'&quot;) no-repeat center;background-size: cover"><div class="grids-post-info">'+ category +'<a href="'+ posturl +'" class="post-title"><h2 class="heading">'+ posttitle +'</h2></a><span class="publish-date">'+ daystr +'</span><span class="writer">by '+ author +'</span></div></div>';

            }

            widgetContent.html(trtd);
          }
        });
      } // grids
      else if(a[1] === "twocolumns") {
        $.ajax({
          url: "/feeds/posts/default/-/"+ a[0] +"?alt=json-in-script&max-results="+ twocolumnsPostsNum +"",
          type: "get",
          dataType: "jsonp",
          success: function (e) {

            var img = new Array(),
                trtd= '',
                numOfEntries = e.feed.entry.length;

            for (var i = 0; i < numOfEntries; i++) {
              var entry = e.feed.entry[i];
              var posttitle = entry.title.$t;
              var posturl;

              for (var k = 0; k < entry.link.length; k++) {
                if (entry.link[k].rel == 'alternate') {
                  posturl = entry.link[k].href;
                  break;
                }
              } 

              var postdate = entry.published.$t;

              var day = postdate.split("-")[2].substring(0,2);
              var m = postdate.split("-")[1];
              var y = postdate.split("-")[0];
              var months = ['January','February','March','April','May','June','July','August','September','Octobor','November','December'];
              var month = months[m-1];

              var daystr = month + ' ' + day + ', ' + y;

              if ("content" in entry) {
                var postcontent = entry.content.$t;
              }

              s = postcontent;
              a = s.indexOf("<img");
              b = s.indexOf("src=\"", a);
              c = s.indexOf("\"", b + 5);
              d = s.substr(b + 5, c - b - 5);

              if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                img[i] = d;
                var post_image = img[i];
              } else {
                var post_image = no_image_url;
              }

              var trtd = trtd + '<li class="twocolumns-item clearfix"><a href="'+ posturl +'" class="post-image-square" style="background: url(\&quot;'+ post_image +'\&quot;) no-repeat center; background-size: cover;"></a><span class="publish-date">'+ daystr +'</span><a href="'+ posturl +'" class="post-title anchor-hover"><h2 class="heading">'+ posttitle +'</h2></a></li>';       

            }
            widgetContent.html("<ul class='clearfix'>" + trtd + "</ul>");
          }

        });
      } // twocolumns
      else if (a[1] === "bleft") {
        $.ajax({
          url: "/feeds/posts/default/-/" + a[0] + "?alt=json-in-script&max-results=6",
          type: "get",
          dataType: "jsonp",
          success: function (e) {

            var img = new Array();
            var trtd2= '';
            var numOfEntries = e.feed.entry.length;

            for (var i = 0; i < numOfEntries; i++) {
              var entry = e.feed.entry[i];
              var posttitle = entry.title.$t;
              var posturl;

              for (var k = 0; k < entry.link.length; k++) {
                if (entry.link[k].rel == 'alternate') {
                  posturl = entry.link[k].href;
                  break;
                }
              } 

              if (i === 0) {

                var category = '<a class="post-category" href="/search/label/' + entry.category[0].term + '?max-results=7">'+ entry.category[0].term +'</a>'

                if ("content" in entry) {
                  var postcontent = entry.content.$t;
                }

                s = postcontent;
                a = s.indexOf("<img");
                b = s.indexOf("src=\"", a);
                c = s.indexOf("\"", b + 5);
                d = s.substr(b + 5, c - b - 5);

                if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                  img[i] = d;
                  var post_image = img[i];
                } else {
                  var post_image = no_image_url;
                }

                var trtd1 = '<div class="big-post clearfix" style="background: url(\&quot;'+ post_image +'\&quot;) no-repeat center; background-size: cover;">'+ category +'<a href="'+ posturl +'" class="post-title"><h2>'+ posttitle +'</h2></a></div>';
              } else {

                trtd2 = trtd2 + '<li class="content-item"><a href="'+ posturl +'" class="post-title"><h2>'+ posttitle +'</h2></a></li>';

              }
            }

            widgetContent.html(trtd1 + "<ul class='other-posts'>" + trtd2 + "</ul>");
          }

        });
      } // bleft
        else if(a[1].toLowerCase() === "bsummary") {

          $.ajax({
            url: "/feeds/posts/default/-/" + a[0] + "?alt=json-in-script&max-results=4",
            type: "get",
            dataType: "jsonp",
            success: function (e) {

              var img = new Array(),
                  trtd2= '',
                  numOfEntries = e.feed.entry.length;

              for (var i = 0; i < numOfEntries; i++) {
                var entry = e.feed.entry[i];
                var posttitle = entry.title.$t;
                var posturl = getPostUrl(entry);
                var post_image = getPostImg(entry, img, i);

                if (i === 0) {
                  var trtd1 = '<div class="big-post clearfix"><a href="'+ posturl +'" class="post-image" style="background: url('+ post_image +') no-repeat center; background-size: cover;"></a><a href="'+ posturl +'" class="post-title"><h2 class="heading">'+ posttitle +'</h2></a></div>';
                } else {

                  trtd2 = trtd2 + '<li class="content-item clearfix"><a href="' + posturl + '" class="post-image-square" style="background: url(' + post_image + ') no-repeat center; background-size: cover;"></a><a href="' + posturl + '" class="post-title"><h2 class="heading">' + posttitle + '</h2></a></li>';
                }
              }
              widgetContent.html(trtd1 + "<ul class='other-posts'>" + trtd2 + "</ul>");
            }
          });
        } // bsummary
    }
  });

//]]>



//<![CDATA[

/* Sidebar Widgets
--------------------------------------*/

  $(".sidebar-wrapper .HTML").each(function () {

    var widget = $(this);
    var widgetContent = widget.children(".widget-content");
    var widgetContentText = widgetContent.text().trim();
	var wct = widgetContentText.toLowerCase();

    if((wct === "recentposts") || (wct === "recent posts")) {

      widgetContent.addClass("recentposts");

      $.ajax({
        url: "/feeds/posts/default?alt=json-in-script&max-results="+ Sidebar_Recent_Posts_Num +"",
        type: "get",
        dataType: "jsonp",
        success: function (e) {

          var img = new Array();
          var trtd = '';
          var numOfEntries = e.feed.entry.length;

          for (var i = 0; i < numOfEntries; i++) {
            var entry = e.feed.entry[i];
            var posttitle = entry.title.$t;
            var posturl;

            for (var k = 0; k < entry.link.length; k++) {
              if (entry.link[k].rel == 'alternate') {
                posturl = entry.link[k].href;
                break;
              }
            } 

            if ("content" in entry) {
              var postcontent = entry.content.$t;
            }

            s = postcontent;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);

            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
              img[i] = d;
              var post_image = img[i];
            } else {
              var post_image = no_image_url;
            }

            var trtd = trtd + '<li class="recent-post-item"><a href="'+ posturl +'" class="post-image" style="background: url(\&quot;'+ post_image +'\&quot;) no-repeat center; background-size: cover;"></a><a href="'+ posturl +'" class="post-title"><h2 class="heading">'+ posttitle +'</h2></a></li>';

          }

          widgetContent.html("<ul class='recent-posts-wrapper'>" + trtd + "</ul>");
        }

      });
    } else if(widgetContentText.charAt(0) === "[") {
      var a = widgetContentText.match(/[^[\]]+(?=])/g);
      widgetContent.addClass(a[0]);

      if(a[0].toLowerCase() === "socialcounter") {
        var content = '';
        var c = a.length;

        for(i=1; i<c; i+=3) {
          var content = content + '<li class="social_item-wrapper"><a href="'+ a[i+1] +'" class="social_item social_'+ a[i] +'"><i class="fa fa-'+ a[i] +' social_icon"></i><br/><span class="social_num">'+ a[i+2] +'</span></a></li>' 
        }     

        widgetContent.html('<ul class="social-counter">' +  content + '</ul>');
      }
    }
  });

/*---- Remove the parantheses in the List Label widget ----*/
  var l = $(".Label li span");
  if(l.length) {
    var s;
    var a;
    l.each(function (){
      var _self = $(this);
      s = _self.text().trim();
      a = s.replace(/\D/g, "");
      _self.text(a);
    });
  }


//]]>
