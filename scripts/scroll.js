let scroll_vert_long = document.getElementsByClassName('scroll-vert-long');

for (i = 0; i < scroll_vert_long.length; i++) {
    let content_count = scroll_vert_long[i].getElementsByClassName('scroll-content').length;
    let wh = window.innerHeight;
    let div_height = content_count * wh
    scroll_vert_long[i].style.height = div_height + 'px';
    console.log(div_height + 'px', wh, content_count);
}

let scroll_horizontal = document.getElementsByClassName('scroll-horizontal');

for (i = 0; i < scroll_horizontal.length; i++) {
    let content_count = scroll_horizontal[i].getElementsByClassName('scroll-content').length;
    let width = scroll_horizontal[i].closest('.scroll-sticky').clientWidth;
    let div_width = content_count * width
    scroll_horizontal[i].style.width = div_width + 'px';
    console.log(div_width + 'px', width, content_count);
}

let rect = scroll_vert_long[0].getBoundingClientRect();

console.log(rect.top, rect.right, rect.bottom, rect.left);

window.addEventListener('scroll', function(e) {
    scroll_position = window.scrollY;
    for (i = 0; i < scroll_vert_long.length; i++) {
        let rect = scroll_vert_long[i].getBoundingClientRect();
        let relative_x = -rect.top
        let scroll_horizontal = scroll_vert_long[i].getElementsByClassName('scroll-horizontal')[0]
        let scroll_content = scroll_horizontal.getElementsByClassName('scroll-content')[0]
        let end_scroll_x = scroll_horizontal.clientWidth - scroll_content.clientWidth;
        if ((relative_x > 0) & (relative_x < end_scroll_x)) {
            scroll_horizontal.style.transform = "translateX(-" + relative_x + "px)"
        } else if (relative_x <= 0) {
            scroll_horizontal.style.transform = "translateX(0px)"
        } else {
            scroll_horizontal.style.transform = "translateX(-" + end_scroll_x + "px)"
        }
    }
  });

  //scrollmagic parallax