
window.gb_preview_experiments = [
{'id': '002' ,'main': {
    trigger: function(){
        if (document.location.pathname.includes('/src-test-4')) {
            return true;
        }
        return false;
    },
    variants: [
        // Control
        function(){
            console.log('EXP 2 - running code for control (0.0)');
        },
        // Variant 1
        function(){
            console.log('EXP 2 - running code for variant 1');
        }
        // Add more variants if needed
    ]
}
, 'gb_settings':{'coverage': 1, 'weights': [0.5, 0.5], 'hashAttribute': 'id'}},
{'id': '008' ,'main': {
    trigger: function(){
        // Running on the homepage only
        if (document.location.pathname == '/') {
            return true;
        }
        return false;
    },
    variants: [
        // Control
        function(){
            console.log('running code for control (8.0)');
        },
        // Variant 1
        function(){
            console.log('running code for variant (8.0)');
        }
    ]
}
, 'gb_settings':{'coverage': 1, 'weights': [0.3334, 0.3333, 0.3333], 'hashAttribute': 'anonymous_id'}},

];

window.gb_snippet_version='2025-02-05 12:02:04.061460';