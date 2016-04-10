// ==UserScript==
// @id             iitc-plugin-outdoormaps@vrabcak
// @name           IITC plugin: various outdoor maps tiles
// @category       Map Tiles
// @version        0.1.0
// @namespace      https://github.com/vrabcak/iitc-outdoormaps
// @updateURL      
// @downloadURL    
// @description    Add various outdoor map tiles as an optional layer.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @include        https://www.ingress.com/mission/*
// @include        http://www.ingress.com/mission/*
// @match          https://www.ingress.com/mission/*
// @match          http://www.ingress.com/mission/*
// @grant          none
// ==/UserScript==

/*jshint esnext: true*/

function wrapper(plugin_info) {
  // ensure plugin framework is there, even if iitc is not yet loaded
  if (typeof window.plugin !== 'function') window.plugin = function () {};
  // PLUGIN START ////////////////////////////////////////////////////////


  // use own namespace for plugin
  window.plugin.outdoorMaps = function () {};

  window.plugin.outdoorMaps.addLayer = function () {

    /*global L, layerChooser*/
    const osmAttribution = `Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, 
<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>"`;
    const seznamAttribution = `<a href='http://mapy.cz><img src="http://mapy.cz/img/logo-small.svg"/></a> © Seznam.cz,a.s, 
© Přispěvatelé <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>,
© NASA`;

    const PNKLayer = L.tileLayer('http://tiles.prahounakole.cz/{z}/{x}/{y}.png', {
      attribution: osmAttribution,
      maxNativeZoom: 18,
      maxZoom: 22
    });

    const MTBMapLayer = L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
      attribution: osmAttribution,
      maxNativeZoom: 18,
      maxZoom: 22
    });

    const waymarkedTrailsCyclingLayer = L.tileLayer('http://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
      attribution: osmAttribution,
      maxNativeZoom: 17,
      maxZoom: 22
    });

    const waymarkedTrailsHikingLayer = L.tileLayer('http://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
      attribution: osmAttribution,
      maxNativeZoom: 17,
      maxZoom: 22
    });

    const mapyCzHikingLayer = L.tileLayer('http://m{s}.mapserver.mapy.cz/turist_trail_bike-m/{z}-{x}-{y}', {
      attribution: seznamAttribution,
      subdomains: '1234',
      maxNativeZoom: 18,
      maxZoom: 22
    });
    
    const mapyCzWinterLayer = L.tileLayer('http://m{s}.mapserver.mapy.cz/wturist_winter-m/{z}-{x}-{y}', {
      attribution: seznamAttribution,
      subdomains: '1234',
      maxNativeZoom: 18,
      maxZoom: 22
    });
    
    const mapyCzOrtophotoLayer = L.tileLayer('http://m{s}.mapserver.mapy.cz/ophoto-m/{z}-{x}-{y}', {
      attribution: seznamAttribution,
      subdomains: '1234',
      maxNativeZoom: 18,
      maxZoom: 22
    });


    // base layers
    layerChooser.addBaseLayer(mapyCzHikingLayer, 'Mapy.cz cykloturist.');
    layerChooser.addBaseLayer(mapyCzWinterLayer, 'Mapy.cz ski');
    layerChooser.addBaseLayer(mapyCzOrtophotoLayer, 'Mapy.cz ortophoto');
    layerChooser.addBaseLayer(PNKLayer, 'Prahou na kole');
    layerChooser.addBaseLayer(MTBMapLayer, 'MTB map');
    // overlays
    layerChooser.addOverlay(waymarkedTrailsHikingLayer, 'Waymarked Trails hiking');
    layerChooser.addOverlay(waymarkedTrailsCyclingLayer, 'Waymarked Trails cycling');

  };

  const setup = window.plugin.outdoorMaps.addLayer;

  // PLUGIN END //////////////////////////////////////////////////////////
  setup.info = plugin_info; //add the script info data to the function as a property
  if (!window.bootPlugins) window.bootPlugins = [];
  window.bootPlugins.push(setup);
  // if IITC has already booted, immediately run the 'setup' function
  if (window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};

/*global GM_info*/
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = {
  version: GM_info.script.version,
  name: GM_info.script.name,
  description: GM_info.script.description
};
script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ');'));
(document.body || document.head || document.documentElement).appendChild(script);
