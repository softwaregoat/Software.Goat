$(document).ready(function () {
    var url = window.location.href;
    if (url.indexOf('https://www.upwork.com/') < 0) return;

    console.log('script starting...');
    var countries = ['India', 'Pakistan', 'Vietnam', 'Indonesia', 'Bangladesh'];

    setInterval(function () {
        console.clear();
        var new_btn = $('button[data-qa="load-newer-button"]');
        if (new_btn.length > 0) {
            console.log('new jobs', new_btn.length);
            $(new_btn).click();
        }

        var sections = $('[data-test="job-tile-list"]').find('section.up-card-section');

        var is_top = false;
        console.log('sections', sections.length);
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];

            // //*** payment status ***
            var payment = $(section).find('strong.text-muted')[0].innerText.trim();
            if (payment === 'Payment unverified') {
                $(section).css('display', 'none');
                continue;
            }

            var job_type = $(section).find('[data-test="job-type"]')[0].innerText.trim();

            var job_title = $(section).find('.job-tile-title')[0].innerText.trim();

            //*** country ***	
            var country = $(section).find('[data-test="client-country"]')[0].innerText.trim();
            if (countries.indexOf(country) >= 0) {
                $(section).css('display', 'none');
                continue;
            }

            //*** proposals ***
            var proposals = $(section).find('[data-test="proposals"]')[0].innerText.trim();
            if (proposals !== 'Less than 5') {
                $(section).css('display', 'none');
                continue;
            }

            //*** client-feedback ***
            var feedback = $(section).find('[data-test="client-feedback"]')[0].innerText.trim();
            var star = feedback.split('Stars,')[0].trim();
            if (star != '') {
                if (parseFloat(star) < 4.5) {
                    $(section).css('display', 'none');
                    continue;
                }
            }

            if (!is_top) {
                if (!$(section).hasClass('top-section')) {
                    $(section).addClass('top-section');
                }
                is_top = true;
            }
        }
    }, 5000);

    setInterval(function () {
        location.reload()
    }, 1000 * 60 * 30);

});

