

  $(function () {
    var search = $(".search");
    var searchIcon = $("#search-icon");
    var input = search.find("#search-input");

    searchIcon.on("click", function () {
      input.toggleClass("search-opened");
      searchIcon.find(".fa").toggleClass("fa-close");
      input.focus();
    });
  });
