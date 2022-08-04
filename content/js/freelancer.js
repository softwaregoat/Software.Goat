$(document).ready(function () {
    var url = window.location.href;
    if (url.indexOf('https://www.freelancer.com/') < 0) return;

    var min_hourly_budget = 25;
    var min_fixed_budget = 30;
    var MatchingSkills_count = 1;

    var skillFilter = Array('Shopify', 'WordPress', 'HTML', 'CSS', 'Website Design', 'PHP', 'Javascript ES6', '$', 'Javascript', 'PSD to HTML', 'Bootstrap', 'eCommerce', 'WooCommerce', 'Python', 'Django', 'Angular.js', 'React.js', 'React Native', 'Web Development', 'CSS3', 'Graphic Design', 'Shopify Templates', 'HTML5', 'Wix', 'DUDA', 'Squarespace', '$ / Prototype', 'Landing Pages', 'Shopify Development', 'Website Build', 'Website Optimization', 'BigCommerce', 'Templates', 'Software Architecture', 'AJAX', 'Web Services', 'phpMyAdmin', 'Graphic Design', 'Landing Pages', 'PHP', 'JavaScript', 'Google Sheets', 'Python', 'C# Programming', 'MySQL', 'HTML', 'Visual Basic', '.NET', 'AJAX', 'Azure', 'HTML5', '$ / Prototype', 'Google Chrome', 'Laravel', 'Extensions & Additions', 'Web Development', 'ASP', 'Graphic Design', 'Mobile App Development', 'Ruby on Rails', 'Android', 'WordPress', 'CSS', 'Web Scraping', 'Django', 'Arts & Crafts', 'eCommerce', 'Electronic', 'Forms', 'OSCommerce', 'Microsoft', 'MVC', 'Node.js', 'Shopify', 'Dthreejs', 'Express JS', 'Bootstrap', 'ASP.NET', 'RESTful', 'AngularJS', 'React.js', 'Plugin', 'Wix', 'Squarespace', 'Ionic Framework', 'JSON', 'Coding', 'Programming', 'Typescript', 'Blockchain', 'Ethereum', 'Excel VBA', 'iOS Development', 'Data Scraping', 'Backend Development', 'Flask', 'Sails.js', 'Selenium Webdriver', 'Vue.js', 'Angular Material', 'MongoDB', 'React Native', 'Flutter', '$', 'Vue.js Framework', 'Webflow', 'React.js Framework', '.NET Core', 'Selenium', 'Redux.js', 'MEAN Stack', 'Three.js', 'Solidity', 'Smart Contracts', '.NET Core Web API', 'Angular', 'Angular 4', 'Angular 6', 'Ionic React', 'Google Apps Scripts', 'BigCommerce');

    var block_keywords = Array('re-type', 're type', 'www.wishnow.website', 'combine 24 excel', 'unitiy', 'rewrite fifty excel', 'raspberry', 'conversion of', 'metatrader', 'asteric', 'excel picture', 'project for', 'are you there', '34 excel files', 'reverse', 'machine learning', 'scanned hand-written', 'csgo', '@ gmail dot com', 'data entry', 'virtual assistance', 'instagram', 'facebook', 'google ad', 'free#lancer bidd#ing sys#tem', 'free`lancer bidd`ing sys`tem', 'bi-dding sy-stem', 'pdf to document', 'personal assistant', 'female assistant', 'proxy', 'pdf to word', 'before release of product', 'pdf file to excel', 'marketing for', 'click funnels', 'copy typing', 'new software release', 'type documents', 'retyping ', 'data entry clerk', 'customer service', 'virtural assistant', 'pdf to excel', 'mt4', 'cs:go', 'social media research', 'minecraft', ' dating ', 'lighthearted', 'arduino', 'upwork', 'global meeting', 'satellitetv24.com', 'telegram', 'mengerjakan', 'adult', 'linkedin');

    var block_currencies = Array("INR", "IDR", "CNY");

    var listOfBlockedCountries = Array("Albania", "Algeria", "Argentina", "Azerbaijan", "Bulgaria", "Armenia", "Bangladesh", "Belarus", "Cambodia", "China", "Colombia", "Egypt", "Ethiopia", "Ghana", "India", "Iraq", "Kazakhstan", "Kenya", "Kuwait", "Lao People's Democratic Republic", "Mongolia", "Morocco", "Nepal", "Nigeria", "Pakistan", "Palestinian Territory", "Philippines", "Romania", "Russian Federation", "Serbia", "Slovenia", "Sri Lanka", "Tanzania", "Tunisia", "Turkey", "Uganda", "Ukraine", "Vietnam", "Yemen", "Czech Republic");

    var listofblocktitleparts = Array('data entry', 'ebay product listing', 'minecraft developer', '@_gmail_dot_com', 'RE-TYPE A DOCUMENT');

    var listofblockdesparts = Array('@gmail', '@gmail.com', 'bilingual game', '@_gmaildot', '@ g mail', '@mail.com', '@ g mail dot com', '@ gmail dot com', '@ gmail com', '@ gmail .com', '*gmail*dot*', '@m.com', 'www.down2u.xyz', 'at gmail dot com', '_gmail_dot', 'j/o/h/n/k/r/i/s/t/3/7/g/m/a/i/l/d/o/t/c/o/m', '@_gma_il_dot', 'RE-TYPE A DOCUMENT', 'pdf to word');

    var blocked = false;

    if (url.toLowerCase().indexOf("search/projects") >= 0) {
        $(".search-result-list").append(
            `<li class="extra-project-info" ng-repeat="project in search.results.projects">
	    	<span class="project-id">{[{project.id}]}</span>
	    	<span class="ownner-id">{[{project.owner_id}]}</span>
	    	<span class="project-type">{[{project.type}]}</span>
	    	<span class="budget-min">{[{project.budget.minimum}]}</span>
	    	<span class="budget-max">{[{project.budget.maximum}]}</span>
	    	<span class="currency-code">{[{project.currency.code}]}</span>
	    	<span class="country_name">{[{project.owner.location.city}]}, {[{project.owner.location.country.name}]} | {[{project.owner.chosen_role}]} , {[{project.owner.role}]}</span>
	    	<span class="project_des">{[{project.description}]}</span>
	    </li>`);
        // Live project feed page
        var ownner_country = "";
        var ownner_role = "";
        setInterval(function () {
            blocked = false;
            console.clear();
            $('fl-bit.SearchResultsHeader-notification.ng-star-inserted > fl-floating-action').click();

            if ($('.search-result-newProjectAlert-icon').length === 1) {

                $('.search-result-newProjectAlert-icon').click();

                var primary_li = $('.search-result-list>li').first();

                var project_url = primary_li.find('a').attr('href');
                primary_li.find('a').attr('href', project_url + "?ngsw-bypass=&w=f#placebid");

                var extra_li = $('.search-result-list>.extra-project-info').first();
                var project_id = extra_li.find('span.project-id').text();
                var project_type = extra_li.find('span.project-type').text();
                var budget_min = parseInt(extra_li.find('span.budget-min').text());
                var budget_max = parseInt(extra_li.find('span.budget-max').text());
                var currency_code = extra_li.find('span.currency-code').text();
                var project_skills = primary_li.find('a>.search-result-item .info-card-skills').text().trim();
                var ownner_id = extra_li.find('.ownner-id').text();
                console.log(ownner_id);
                var ajax_url = 'https://www.freelancer.com/api/users/0.1/users/' + ownner_id;
                var primary_title = primary_li.find('h2.info-card-title').text().trim();
                var project_des = extra_li.find('span.project_des').text();
                $.get(ajax_url, function (data) {
                    ownner_country = data.result.location.country.name;
                    ownner_role = data.result.role;
                    //console.log('min budget: ' + budget_min + "| max buget: " + budget_max);
                    console.log(ownner_role + ' , ' + ownner_country);
                    var user_name = data.result.username;
                    reputation_url = 'https://www.freelancer.com/api/users/0.1/reputations?users%5B%5D=' + ownner_id + '&role=employer&job_history=&project_stats=';
                    $.get(reputation_url, function (data) {
                        var score = data.result[ownner_id].earnings_score;
                        var money_spent = Math.pow(10, (score * 0.5 + 1.0)).toFixed(0) - 10;
                        primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">$' + money_spent + ' Spent </span>');

                        primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">' + user_name + '</span>');
                    });
                    //country filter
                    if (listOfBlockedCountries.indexOf(ownner_country) >= 0) {
                        primary_li.find('.search-result-item').append('<p  class="user-info" style="font-weight:bold;">' + '<span class="alert alert-success">' + ownner_country + '</span>' + '</p>').hide();
                        console.warn(ownner_country + '->Blocked country');

                        blocked = true;

                    } else {
                        primary_li.find('.search-result-item').append('<p class="user-info" style="font-weight:bold;">' + '<span class="alert alert-success">' + ownner_country + '</span>' + '</p>');
                        blocked = false;
                    }

                    //user role fulter
                    if (ownner_role === 'freelancer') {
                        primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">freelancer</span>');
                        console.warn('Posted By ' + ownner_role);
                        blocked = true;
                        return;
                    } else {
                        primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-success">employer</span>');
                    }

                    //skill filter
                    var skill_count = "";
                    var requiredskills = "";
                    skillFilter.forEach(function (element) {
                        if (project_skills.toLowerCase().indexOf(element.toLowerCase()) >= 0) {
                            skill_count++;
                            requiredskills = requiredskills + "," + element;
                        }
                    }, this);

                    if (skill_count < MatchingSkills_count) {
                        primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">No skills matching you.</span>');
                        console.warn('No skills matching you.');
                        return;
                    }

                    listofblocktitleparts.forEach(function (element) {
                        if (primary_title.toLowerCase().indexOf(element.toLowerCase()) >= 0) {
                            primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">Danger Title.</span>');
                            blocked = true;
                            return;
                        }
                    });

                    listofblockdesparts.forEach(function (element) {
                        if (project_des.toLowerCase().indexOf(element.toLowerCase()) >= 0) {
                            primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">Spam content.</span>');
                            blocked = true;
                            return;
                        }
                    });

                    console.log(skill_count + 'skills matching you./n matching skills:' + requiredskills);

                    //currency filter
                    if (block_currencies.indexOf(currency_code) > -1) {
                        primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">block_currency : ' + currency_code + '</span>');
                        console.warn("block_currency : " + currency_code);
                        blocked = true;
                        return;
                    }
                    bid_price = (budget_min + budget_max) / 2;

                    var ajax_data = '';
                    var result = 'Success Ajax';

                    if (project_type == "hourly") {
                        if (budget_min < min_hourly_budget) {
                            primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">hourly min_budget : ' + budget_min + '</span>');
                            console.warn("hourly min_budget : " + budget_min);
                            blocked = true;
                            return;
                        }
                        //console.info(ajax_data);

                        if (requiredskills.indexOf('WordPress') > -1 && budget_min >= 25 || requiredskills.indexOf('Shopify') > -1 && budget_min >= 25) {
                        }
                    }
                    else if (project_type == "fixed") {
                        if (budget_min < min_fixed_budget) {
                            primary_li.find('.search-result-item').find('p.user-info').append('  |  <span class="alert alert-danger">fixed min_budget : ' + budget_min + '</span>');
                            console.warn("fixed min_budget : " + budget_min);
                            blocked = true;
                            return;
                        }
                        //console.log(ajax_data);

                        if (requiredskills.indexOf('WordPress') > -1 && budget_min >= 200 || requiredskills.indexOf('Shopify') > -1 && budget_min >= 200) {

                        }
                    }
                    else {
                        console.log('--------------------------------------------');
                        return;
                    }

                    if (!blocked) window.open("https://www.freelancer.com" + project_url + "?ngsw-bypass=&w=f#placebid", "_blank");
                });
            }
        }, 2000);
    }
    else if (url.toLowerCase().indexOf("com/projects/") >= 0) {
        // Place bid page
        var requireskills = Array('WordPress', 'Shopify', 'Woocommerce');
        var project_skills = $('.skills-required').text();
        console.log();
        var interval = setInterval(function () {
            var country = $('.user-flag img').attr('title');
            if (country.indexOf("undefined") < 0 && $('.bidButton').length > 0) {
                var blockbid = false;
                var num_bid = $('#num-bids').text();
                if (parseInt(num_bid.trim()) > 100) {
                    //blockbid = true;
                }
                if (!blockbid) {
                    requireskills.forEach(function (element) {
                        if (project_skills.toLowerCase().indexOf(element.toLowerCase()) >= 0) {
                            //$('.bidButton').get(0).click();
                            clearInterval(interval);
                        }
                    }, this);
                }
                else {
                    window.close();
                }
                clearInterval(interval);
            }
        }, 100);
        setTimeout(function () { window.close() }, 180000);
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /* --- keyboard click action on bid proposal board --- */
    $(document).bind('keypress', function (event) {
        if (event.ctrlKey && event.which === 10) {
            console.log('=== Ctrl + Enter keydown event ===');
            if ($('#place-bid').length || $('#place-bid-step2').length) {
                $('#place-bid').get(0).click();
                // $('#place-bid-step2').get(0).click();
            }
            if ($('[fltrackinglabel="PlaceBidButton"] button').length) {
                $('[fltrackinglabel="PlaceBidButton"] button').click();
            }
        }
    });


    let fake = "Our team consists of a skillful and creative staff with a diverse ability to design Websites, Graphic design, Custom development.";
});