// 1. Core snippet 1/2
(function(){
    if (window.GrowthBook){return}function t(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function e(t){return function(t){let e=2166136261;const r=t.length;for(let n=0;n<r;n++)e^=t.charCodeAt(n),e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24);return e>>>0}(t)%1e3/1e3}const r={};function n(t,e){if("$or"in e)return a(t,e.$or);if("$nor"in e)return!a(t,e.$nor);if("$and"in e)return function(t,e){for(let r=0;r<e.length;r++)if(!n(t,e[r]))return!1;return!0}(t,e.$and);if("$not"in e)return!n(t,e.$not);for(const[r,n]of Object.entries(e))if(!s(n,i(t,r)))return!1;return!0}function i(t,e){const r=e.split(".");let n=t;for(let t=0;t<r.length;t++){if(!n||"object"!=typeof n||!(r[t]in n))return null;n=n[r[t]]}return n}function s(t,e){if("string"==typeof t)return e+""===t;if("number"==typeof t)return 1*e===t;if("boolean"==typeof t)return!!e===t;if(Array.isArray(t)||!u(t))return JSON.stringify(e)===JSON.stringify(t);for(const r in t)if(!o(r,e,t[r]))return!1;return!0}function u(t){const e=Object.keys(t);return e.length>0&&e.filter((t=>"$"===t[0])).length===e.length}function o(t,e,i){switch(t){case"$eq":return e===i;case"$ne":return e!==i;case"$lt":return e<i;case"$lte":return e<=i;case"$gt":return e>i;case"$gte":return e>=i;case"$exists":return i?null!==e:null===e;case"$in":return i.includes(e);case"$nin":return!i.includes(e);case"$not":return!s(i,e);case"$size":return!!Array.isArray(e)&&s(i,e.length);case"$elemMatch":return function(t,e){if(!Array.isArray(t))return!1;const r=u(e)?t=>s(e,t):t=>n(t,e);for(let e=0;e<t.length;e++)if(t[e]&&r(t[e]))return!0;return!1}(e,i);case"$all":if(!Array.isArray(e))return!1;for(let t=0;t<i.length;t++){let r=!1;for(let n=0;n<e.length;n++)if(s(i[t],e[n])){r=!0;break}if(!r)return!1}return!0;case"$regex":try{return(o=i,r[o]||(r[o]=new RegExp(o.replace(/([^\\])\//g,"$1\\/"))),r[o]).test(e)}catch(t){return!1}case"$type":return function(t){if(null===t)return"null";if(Array.isArray(t))return"array";const e=typeof t;return["string","number","boolean","object","undefined"].includes(e)?e:"unknown"}(e)===i;default:return console.error("Unknown operator: "+t),!1}var o}function a(t,e){if(!e.length)return!0;for(let r=0;r<e.length;r++)if(n(t,e[r]))return!0;return!1}const c="undefined"!=typeof window&&"undefined"!=typeof document;class h{constructor(e={}){t(this,"_renderer",null),t(this,"_trackedExperiments",new Set),t(this,"_trackedFeatures",{}),t(this,"debug",!1),t(this,"subscriptions",new Set),t(this,"_rtQueue",[]),t(this,"_rtTimer",0),t(this,"assigned",new Map),t(this,"_forcedFeatureValues",new Map),t(this,"_attributeOverrides",{}),this.context=e,c&&!e.disableDevTools&&(window._growthbook=this,document.dispatchEvent(new Event("gbloaded")))}render(){this._renderer&&this._renderer()}setFeatures(t){this.context.features=t,this.render()}setAttributes(t){this.context.attributes=t,this.render()}setAttributeOverrides(t){this._attributeOverrides=t,this.render()}setForcedVariations(t){this.context.forcedVariations=t||{},this.render()}setForcedFeatures(t){this._forcedFeatureValues=t,this.render()}getAttributes(){return{...this.context.attributes,...this._attributeOverrides}}getFeatures(){return this.context.features||{}}subscribe(t){return this.subscriptions.add(t),()=>{this.subscriptions.delete(t)}}getAllResults(){return new Map(this.assigned)}destroy(){this.subscriptions.clear(),this.assigned.clear(),this._trackedExperiments.clear(),this._trackedFeatures={},this._rtQueue=[],this._rtTimer&&clearTimeout(this._rtTimer),c&&window._growthbook===this&&delete window._growthbook}setRenderer(t){this._renderer=t}forceVariation(t,e){this.context.forcedVariations=this.context.forcedVariations||{},this.context.forcedVariations[t]=e,this.render()}run(t){const e=this._run(t),r=t.key,n=this.assigned.get(r);return n&&n.result.inExperiment===e.inExperiment&&n.result.variationId===e.variationId||(this.assigned.set(r,{experiment:t,result:e}),this.subscriptions.forEach((r=>{try{r(t,e)}catch(t){console.error(t)}}))),e}trackFeatureUsage(t,e){if("override"===e.source)return;const r=JSON.stringify(e.value);if(this._trackedFeatures[t]!==r){if(this._trackedFeatures[t]=r,this.context.onFeatureUsage)try{this.context.onFeatureUsage(t,e)}catch(t){}c&&window.fetch&&(this._rtQueue.push({key:t,on:e.on}),this._rtTimer||(this._rtTimer=window.setTimeout((()=>{this._rtTimer=0;const t=[...this._rtQueue];this._rtQueue=[],this.context.realtimeKey&&window.fetch("https://rt.growthbook.io/?key=".concat(this.context.realtimeKey,"&events=").concat(encodeURIComponent(JSON.stringify(t))),{cache:"no-cache",mode:"no-cors"}).catch((()=>{}))}),this.context.realtimeInterval||2e3)))}}getFeatureResult(t,e,r,n,i=null,s=null){const u={value:e,on:!!e,off:!e,source:r,ruleId:n||""};return i&&(u.experiment=i),s&&(u.experimentResult=s),this.trackFeatureUsage(t,u),u}isOn(t){return this.evalFeature(t).on}isOff(t){return this.evalFeature(t).off}getFeatureValue(t,e){var r;return null!==(r=this.evalFeature(t).value)&&void 0!==r?r:e}feature(t){return this.evalFeature(t)}evalFeature(t){var r;if(this._forcedFeatureValues.has(t))return this.getFeatureResult(t,this._forcedFeatureValues.get(t),"override");if(!this.context.features||!this.context.features[t])return this.getFeatureResult(t,null,"unknownFeature");const n=this.context.features[t];if(n.rules)for(const r of n.rules){if(r.condition&&!this.conditionPasses(r.condition))continue;if("force"in r){if("coverage"in r){const{hashValue:n}=this.getHashAttribute(r.hashAttribute);if(!n)continue;if(e(n+t)>r.coverage)continue}return this.getFeatureResult(t,r.force,"force",r.id)}if(!r.variations)continue;const n={variations:r.variations,key:r.key||t};"coverage"in r&&(n.coverage=r.coverage),r.weights&&(n.weights=r.weights),r.hashAttribute&&(n.hashAttribute=r.hashAttribute),r.namespace&&(n.namespace=r.namespace);const i=this.run(n);if(i.inExperiment)return this.getFeatureResult(t,i.value,"experiment",r.id,n,i)}return this.getFeatureResult(t,null!==(r=n.defaultValue)&&void 0!==r?r:null,"defaultValue")}conditionPasses(t){return n(this.getAttributes(),t)}_run(t){const r=t.key,n=t.variations.length;if(n<2)return this.getResult(t);if(!1===this.context.enabled)return this.getResult(t);t=this.mergeOverrides(t);const i=function(t,e,r){if(!e)return null;const n=e.split("?")[1];if(!n)return null;const i=n.replace(/#.*/,"").split("&").map((t=>t.split("=",2))).filter((([e])=>e===t)).map((([,t])=>parseInt(t)));return i.length>0&&i[0]>=0&&i[0]<r?i[0]:null}(r,this.getContextUrl(),n);if(null!==i)return this.getResult(t,i);if(this.context.forcedVariations&&r in this.context.forcedVariations)return this.getResult(t,this.context.forcedVariations[r]);if("draft"===t.status||!1===t.active)return this.getResult(t);const{hashValue:s}=this.getHashAttribute(t.hashAttribute);if(!s)return this.getResult(t);if(t.namespace&&!function(t,r){const n=e(t+"__"+r[0]);return n>=r[1]&&n<r[2]}(s,t.namespace))return this.getResult(t);if(t.include&&!function(t){try{return t()}catch(t){return console.error(t),!1}}(t.include))return this.getResult(t);if(t.condition&&!this.conditionPasses(t.condition))return this.getResult(t);if(t.groups&&!this.hasGroupOverlap(t.groups))return this.getResult(t);if(t.url&&!this.urlIsValid(t.url))return this.getResult(t);const u=function(t,e=1,r){e<0?e=0:e>1&&(e=1);const n=(i=t)<=0?[]:new Array(i).fill(1/i);var i;(r=r||n).length!==t&&(r=n);const s=r.reduce(((t,e)=>e+t),0);(s<.99||s>1.01)&&(r=n);let u=0;return r.map((t=>{const r=u;return u+=t,[r,r+e*t]}))}(n,t.coverage||1,t.weights),o=function(t,e){for(let r=0;r<e.length;r++)if(t>=e[r][0]&&t<e[r][1])return r;return-1}(e(s+r),u);if(o<0)return this.getResult(t);if("force"in t)return this.getResult(t,t.force);if(this.context.qaMode)return this.getResult(t);if("stopped"===t.status)return this.getResult(t);const a=this.getResult(t,o,!0);return this.track(t,a),a}log(t,e){this.debug&&(this.context.log?this.context.log(t,e):console.log(t,e))}track(t,e){if(!this.context.trackingCallback)return;const r=e.hashAttribute+e.hashValue+t.key+e.variationId;if(!this._trackedExperiments.has(r)){this._trackedExperiments.add(r);try{this.context.trackingCallback(t,e)}catch(t){console.error(t)}}}mergeOverrides(t){const e=t.key,r=this.context.overrides;return r&&r[e]&&"string"==typeof(t=Object.assign({},t,r[e])).url&&(t.url=function(t){try{const e=t.replace(/([^\\])\//g,"$1\\/");return new RegExp(e)}catch(t){return void console.error(t)}}(t.url)),t}getHashAttribute(t){const e=t||"id";let r="";return this._attributeOverrides[e]?r=this._attributeOverrides[e]:this.context.attributes?r=this.context.attributes[e]||"":this.context.user&&(r=this.context.user[e]||""),{hashAttribute:e,hashValue:r}}getResult(t,e=0,r=!1){(e<0||e>=t.variations.length)&&(e=0);const{hashAttribute:n,hashValue:i}=this.getHashAttribute(t.hashAttribute);return{inExperiment:r,variationId:e,value:t.variations[e],hashAttribute:n,hashValue:i}}getContextUrl(){return this.context.url||(c?window.location.href:"")}urlIsValid(t){const e=this.getContextUrl();if(!e)return!1;const r=e.replace(/^https?:\/\//,"").replace(/^[^/]*\//,"/");return!!t.test(e)||!!t.test(r)}hasGroupOverlap(t){const e=this.context.groups||{};for(let r=0;r<t.length;r++)if(e[t[r]])return!0;return!1}};
    window.GrowthBook = h;

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
{'id': rd004,'main': {
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
,'gb_settings':{'rules': [{'variations': [0, 1], 'weights': [0.5, 0.5], 'hashAttribute': 'anonymous_id', 'key': 'rd004'}], 'defaultValue': 0}},
];
window.gb_draft_experiments = 
[

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

window.gb_snippet_version='2022-05-22 20:05:45.944511';