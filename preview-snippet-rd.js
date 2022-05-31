
window.gb_preview_experiments = [
{'id': 'rd004' ,'main': {
    trigger: function(){
        // Running on all pages
        if (document.location.pathname.includes('/')) {
            return true;
        }
        return false;
    },
    variants: [
        // Control
        function(){
            console.log('running code for control (newsletter test)');
        },
        // Variant 1
        function(){
            function defer(method) {
                if (window.jQuery) {
                    method();
                } else {
                    setTimeout(function() { defer(method) }, 50);
                }
            }
            defer(function(){
                jQuery(document).ready(function(){
                    jQuery('.mc4wp-form h3').each(function(){
                        jQuery(this).text(jQuery(this).text().replace('7900+', '11,900+'));
                        jQuery(this).text(jQuery(this).text().replace('data-savvy digital experts', 'data-driven marketers'));
                    });
                });
            });
            window.like_what_youre_reading_popup_copy = "Join 11,900+ data-driven marketers on our list!";
        }
    ]
}
},
{'id': 'rd005' ,'main': {
    trigger: function(){
        // Running on all pages
        if (document.location.pathname.includes('/')) {
            return true;
        }
        return false;
    },
    variants: [
        // Control
        function(){
            console.log('running code for control (5.1)');
        },
        // Variant 1
        function(){
            console.log('running code for control (5.2)');
        }
    ]
}
},
{'id': 'rd006' ,'main': {
    trigger: function(){
        // Running on the homepage only
        if (document.location.pathname == '/')) {
            return true;
        }
        return false;
    },
    variants: [
        // Control
        function(){
            console.log('running code for control (6.0)');
        },
        // Variant 1
        function(){
            console.log('running code for control (6.0)');
            document.querySelector('.elementor-element-30197cf h2').innerHTML = 'test'
        }
    ]
}
},

];

window.gb_snippet_version='2022-05-31 14:31:26.322820';