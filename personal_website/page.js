$('.row.segment')
  .transition({
    animation : 'jiggle',
    duration  : 800,
    interval  : 200
  })
;
// $(function(){
// 	$("#blog_image").click(function(){
// 		$(".blog_image").modal({
// 		closable: true,
// 		blurring: true,

// 		});
// 		$(".blog_image").modal('show');
// 	});
// });
$('.blog_image1')
	.modal({
    blurring: true
  })
  	.modal('attach events', '#blog_image', 'show')
  	.modal('attach events', '.blog_image2 .button.prev', 'show')
;

$('.blogs.modal')
  .modal({
    allowMultiple: false
  })
;
$('.blog_image2')
  .modal('attach events', '.blog_image1 .button')
;

$('.camp_image1')
	.modal({
    blurring: true
  })
  	.modal('attach events', '#camp_image', 'show')
  	.modal('attach events', '.camp_image2 .button.prev', 'show')
;

$('.camps.modal')
  .modal({
    allowMultiple: false
  })
;
$('.camp_image2')
  .modal('attach events', '.camp_image1 .button')
  .modal('attach events', '.camp_image3 .button.prev')
;

$('.camp_image3')
  .modal('attach events','.camp_image2 .button.next')
;
