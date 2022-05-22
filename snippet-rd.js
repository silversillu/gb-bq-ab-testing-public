// 1. Core snippet 1/2
(function(){
    if (window.GrowthBook){return}function t(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}const e="undefined"!=typeof window;class r{constructor(r){t(this,"_renderer",null),t(this,"_trackedExperiments",new Set),t(this,"debug",!1),t(this,"subscriptions",new Set),t(this,"assigned",new Map),this.context=r||{},e&&(window._growthbook=this)}subscribe(t){return this.subscriptions.add(t),()=>{this.subscriptions.delete(t)}}getAllResults(){return new Map(this.assigned)}destroy(){this.subscriptions.clear(),this.assigned.clear(),this._trackedExperiments.clear(),e&&window._growthbook===this&&delete window._growthbook}setRenderer(t){this._renderer=t}forceVariation(t,e){this.context&&(this.context.forcedVariations=this.context.forcedVariations||{},this.context.forcedVariations[t]=e,this._renderer&&this._renderer())}run(t){const e=this._run(t),r=this.assigned.get(t.key);return r&&r.result.inExperiment===e.inExperiment&&r.result.variationId===e.variationId||(this.assigned.set(t.key,{experiment:t,result:e}),this.subscriptions.forEach((r=>{try{r(t,e)}catch(t){console.error(t)}}))),e}_run(t){if(t.variations.length<2)return this.getResult(t);if(!1===this.context.enabled)return this.getResult(t);const e=function(t,e){if(!e)return null;const r=e.split("?")[1];if(!r)return null;const s=r.replace(/#.*/,"").split("&").map((t=>t.split("=",2))).filter((([e])=>e===t)).map((([,t])=>parseInt(t)));return s.length>0&&s[0]>=-1&&s[0]<10?s[0]:null}((t=this.mergeOverrides(t)).key,this.getContextUrl());if(null!==e)return this.getResult(t,e);if(this.context.forcedVariations&&t.key in this.context.forcedVariations)return this.getResult(t,this.context.forcedVariations[t.key]);if("draft"===t.status)return this.getResult(t);const{hashValue:r}=this.getHashAttribute(t);if(!r)return this.getResult(t);if(t.include&&!function(t){try{return t()}catch(t){return console.error(t),!1}}(t.include))return this.getResult(t);if(t.groups&&!this.hasGroupOverlap(t.groups))return this.getResult(t);if(t.url&&!this.urlIsValid(t.url))return this.getResult(t);if("force"in t)return this.getResult(t,t.force);if("stopped"===t.status)return this.getResult(t);if(this.context.qaMode)return this.getResult(t);const s=function(t,e){for(let r=0;r<e.length;r++)if(t>=e[r][0]&&t<e[r][1])return r;return-1}(function(t){let e=2166136261;const r=t.length;for(let s=0;s<r;s++)e^=t.charCodeAt(s),e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24);return e>>>0}(r+t.key)%1e3/1e3,function(t,e=1,r){e<0?e=0:e>1&&(e=1);const s=new Array(t).fill(1/t);(r=r||s).length!==t&&(r=s);const i=r.reduce(((t,e)=>e+t),0);(i<.99||i>1.01)&&(r=s);let n=0;return r.map((t=>{const r=n;return n+=t,[r,r+e*t]}))}(t.variations.length,t.coverage||1,t.weights));if(s<0)return this.getResult(t);const i=this.getResult(t,s,!0);return this.track(t,i),i}log(t,e){this.debug&&console.log(t,e)}track(t,e){if(!this.context.trackingCallback)return;const r=e.hashAttribute+e.hashValue+t.key+e.variationId;if(!this._trackedExperiments.has(r)){this._trackedExperiments.add(r);try{this.context.trackingCallback(t,e)}catch(t){console.error(t)}}}mergeOverrides(t){const e=this.context.overrides;return e&&e[t.key]&&"string"==typeof(t=Object.assign({},t,e[t.key])).url&&(t.url=function(t){try{const e=t.replace(/([^\\])\//g,"$1\\/");return new RegExp(e)}catch(t){return void console.error(t)}}(t.url)),t}getHashAttribute(t){const e=t.hashAttribute||"id";return{hashAttribute:e,hashValue:this.context.user&&this.context.user[e]||""}}getResult(t,e=0,r=!1){(e<0||e>=t.variations.length)&&(e=0);const{hashAttribute:s,hashValue:i}=this.getHashAttribute(t);return{inExperiment:r,variationId:e,value:t.variations[e],hashAttribute:s,hashValue:i}}getContextUrl(){return this.context.url||(e?window.location.href:"")}urlIsValid(t){const e=this.getContextUrl();if(!e)return!1;const r=e.replace(/^https?:\/\//,"").replace(/^[^/]*\//,"/");return!!t.test(e)||!!t.test(r)}hasGroupOverlap(t){const e=this.context.groups||{};for(let r=0;r<t.length;r++)if(e[t[r]])return!0;return!1}};
    window.GrowthBook = r;

    // 2. Helper functions
    // 2.1 Set & get cookies
    window.gb_setCookie = function(t){const o=new Date;o.setTime(o.getTime()+24*365*60*60*1e3);let i="expires="+o.toUTCString();document.cookie="gb-gb-anon-id="+t+";"+i+";path=/";return t}
    window.gb_getCookie = function(t){let e=t+"=",n=document.cookie.split(";");for(let t=0;t<n.length;t++){let o=n[t];for(;" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(e)){const t=o.substring(e.length,o.length);return window.gb_getCookie(t),t}}return!1}
    // 2.1 Generate anonymous ID
    window.gb_generateAnonID = function(){const n=50;for(var r=Date.now()+'.',t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=t.length,o=0;o<n;o++)r+=t.charAt(Math.floor(Math.random()*a));return r}
})();

// 3. init.js
window.growthbook = new GrowthBook({
    // The attributes used to assign variations
    user: { anonId: gb_getCookie('gb-gb-anon-id') ? gb_getCookie('gb-gb-anon-id') : gb_setCookie(gb_generateAnonID()) },

    // Called when a user is put into an experiment
    trackingCallback: function(experiment, result) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'growthbook-variant-assigned',
            'growthbook-experiment-id': experiment.key,
            'growthbook-variant-id': result.variationId
        });
    }
});
console.log('Growthbook initiated');

// 4. global.js
console.log('global JS loaded');

// 5. Experiments
window.gb_running_experiments = [
{'id': 001,'main': {
    trigger: function(){
        if (document.location.pathname.includes('/blog')) {
            return true;
        }
        return false;
    },
    variants: [
        // Control
        function(){
            console.log('running code for control (0.4)');
        },
        // Variant 1
        function(){
            console.log('running code for variant 1.4');
        }
        // Add more variants if needed
    ]
}
,'gb_settings':{'status': 'running', 'url': '.*', 'coverage': 1, 'weights': [0.5, 0.5]}},{'id': 003,'main': {
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
            jQuery('.mc4wp-form h3').each(function(){
                jQuery(this).text(jQuery(this).text().replace('7900+', '11,900+'));
                jQuery(this).text(jQuery(this).text().replace('data-savvy digital experts', 'data-driven marketers'));
            });
            window.like_what_youre_reading_popup_copy = "Join 11,900+ data-driven marketers on our list!";
        }
    ]
}
,'gb_settings':{'status': 'running', 'coverage': 1, 'weights': [0.5, 0.5]}},
];
window.gb_draft_experiments = 
[
{'id': 002,'main': {
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
,'gb_settings':{'status': 'draft', 'coverage': 1, 'weights': [0.5, 0.5]}},
];

// 6. Core snippet 2/2
(function(){
    window.gb_run_experiment = function(e,v){
        if (v.inExperiment) {
            if (e.main.trigger() === true) {
                e.main.variants[v.variationId]()
            }
        }
    }
    for (var i = 0; i < window.gb_running_experiments.length; i++) {
        var e = window.gb_running_experiments[i];
        var variations = [];
        for (var i2 = 0; i2 < e.main.variants.length; i2++) {
            variations.push(i2);
        }
        var gb_value = window.growthbook.run({
            "key": e.id,
            "variations": variations,
            "status": e.gb_settings.status,
            "coverage":  e.gb_settings.coverage,
            "weights":  e.gb_settings.weights,
            "hashAttribute": "anonId"
        });
        window.gb_run_experiment(e,gb_value)
    }
})();

window.gb_snippet_version='2022-05-22 08:14:17.483070';