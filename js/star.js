window.onload = function () {
  let map = {
    obj: $("#map"),
  
    bounderies: {
      w: $(document).width(),
      h: $(document).height()
    },
  
    stars: {
      template: $("<b></b>"),
      total: 100,
      star: [] //top, left, size, shine time
    }
  };
  
  for (let index = 1; index <= map.stars.total; index++) {
    let star = $("<b></b>"),
      star_top = Math.round(Math.random() * map.bounderies.h + 1),
      star_left = Math.round(Math.random() * map.bounderies.w + 1),
      star_size = Math.round(Math.random() * 3 + 1),
      star_shine = Math.round(Math.random() * 100) + 1,
      star_shine_speed = "";
  
    star.addClass("star").css({
      top: star_top,
      left: star_left,
      width: star_size,
      height: star_size
    });
  
    if (index % 3 == 0) {
      star_shine_speed =
        (Math.round(Math.random() * 2) + 1) % 2 == 0
          ? "shine-fast"
          : "shine-slow";
      star.addClass(star_shine_speed);
    }
  
    map.obj.append(star);
  }
};