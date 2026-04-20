// Professional Interactive Map using Leaflet.js
document.addEventListener("DOMContentLoaded", function() {
    var mapContainer = document.getElementById('professional-map');
    if (!mapContainer) return;

    // Initialize the map, centered on Mexico
    var map = L.map('professional-map', {
        zoomControl: false,
        scrollWheelZoom: false // Disable scroll wheel to prevent getting stuck
    }).setView([23.6345, -95.2237], 5);

    // Position zoom control at the top right to not interfere with the logo
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Utilizar mapa estándar al estilo Google Maps con océano azul y tierra verde
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        maxZoom: 20
    }).addTo(map);

    // Custom marker icon with a bouncing red map pin and pulse
    var pinSvgHtml = `
        <div class="custom-pin-wrapper">
            <div class="pin-pulse"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36" class="pin-svg">
                <path fill="#e63946" d="M12 0A12 12 0 0 0 0 12c0 6.6 12 24 12 24s12-17.4 12-24A12 12 0 0 0 12 0z"/>
                <path fill="#b8212d" d="M12 0v36s12-17.4 12-24A12 12 0 0 0 12 0z"/>
                <circle cx="12" cy="12" r="5" fill="#FFFFFF"/>
            </svg>
        </div>
    `;

    var pulsingPinIcon = L.divIcon({
        className: 'custom-pin-marker',
        html: pinSvgHtml,
        iconSize: [24, 36],
        iconAnchor: [12, 36], // bottom center of the pin
        popupAnchor: [0, -32] // top of the pin
    });

    // Location Data
    var locations = [
        {
            name: "Panamá City, Florida",
            lat: 30.1588,
            lng: -85.6602,
            content: "<p>1805 Hannah Avenue, Panamá City, Fl.</p><p>Tel. (850) 769.64.27</p><p>Fax (850) 769.64.28</p>"
        },
        {
            name: "Laredo, Texas",
            lat: 27.5064,
            lng: -99.5075,
            content: "<p>Servicios Fronterizos</p><p>Cruce Terrestre</p>"
        },
        {
            name: "Nuevo Laredo, Tamps.",
            lat: 27.4828,
            lng: -99.5100,
            content: "<p>Aduana Fronteriza</p>"
        },
        {
            name: "Altamira, Tamps.",
            lat: 22.3934,
            lng: -97.9352,
            content: "<p>Puerto Marítimo</p>"
        },
        {
            name: "Veracruz, Veracruz",
            lat: 19.1738,
            lng: -96.1342,
            color: "#fca311",
            content: "<p>Av. 5 de Mayo No 842-1A Entre Constitucion y Emparan Col. Centro Veracruz, Ver., CP 91700</p><br><p>Tel. (999) 248 8961</p>"
        },
        {
            name: "Mérida, Yucatán",
            lat: 20.9674,
            lng: -89.6236,
            color: "#fca311",
            content: "<p>Calle 81 No ext. 812 No. Int 3 x 110-A y 110-1, Sambulá, 97259 Mérida, Yucatán.</p><br><p>Tel. (999) 248 8961 Ext. 208</p><b style='color: #fff;'>Oficina Central</b>"
        },
        {
            name: "Puerto Morelos, Q. Roo",
            lat: 20.8466,
            lng: -86.8756,
            content: "<p>Operaciones Logísticas</p>"
        },
        {
            name: "Manzanillo, Col.",
            lat: 19.0535,
            lng: -104.3161,
            content: "<p>Puerto Marítimo en el Pacífico</p>"
        },
        {
            name: "Lázaro Cárdenas, Mich.",
            lat: 17.9547,
            lng: -102.1963,
            content: "<p>Puerto Industrial</p>"
        },
        {
            name: "CDMX y Edo. Méx.",
            lat: 19.4326,
            lng: -99.1332,
            content: "<p>Aeropuerto Internacional de la Ciudad de México</p><p>Aduana Interior de México (Pantaco)</p>"
        },
        {
            name: "Miami, Florida",
            lat: 25.7617,
            lng: -80.1918,
            content: "<p>Operaciones y Enlace</p>"
        }
    ];

    locations.forEach(function(loc) {
        var headerStyle = loc.color ? 'style="color: ' + loc.color + ';"' : '';
        var popupContent = `
            <div class="pro-tooltip-content">
                <div class="pro-tooltip-header" ${headerStyle}>${loc.name}</div>
                <div class="pro-tooltip-body">${loc.content}</div>
            </div>
        `;

        var marker = L.marker([loc.lat, loc.lng], {icon: pulsingPinIcon})
            .addTo(map)
            .bindPopup(popupContent, {
                className: 'pro-popup-wrapper',
                closeButton: true,
                minWidth: 220,
                autoPanPadding: [50, 50]
            });
            
        // Open popup on hover
        marker.on('mouseover', function (e) {
            this.openPopup();
        });
    });
});
