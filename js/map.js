// Professional Interactive Map using Leaflet.js
document.addEventListener("DOMContentLoaded", function () {
    var mapContainer = document.getElementById('professional-map');
    if (!mapContainer) return;

    // Initialize the map, centered between Mexico and southern US
    var map = L.map('professional-map', {
        zoomControl: false,
        scrollWheelZoom: false
    }).setView([23.5, -92], 5);

    // Position zoom control at the top right
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Google Maps tile layer
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        maxZoom: 20
    }).addTo(map);

    // ---- Marker Icon Factories ----
    function createPinIcon(color) {
        var svgHtml = `
            <div class="custom-pin-wrapper">
                <div class="pin-pulse" style="background-color: ${color}80;"></div>
                <div class="pin-pulse-ring" style="--pulse-color: ${color};"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36" class="pin-svg">
                    <path fill="${color}" d="M12 0A12 12 0 0 0 0 12c0 6.6 12 24 12 24s12-17.4 12-24A12 12 0 0 0 12 0z"/>
                    <circle cx="12" cy="12" r="5" fill="#FFFFFF"/>
                </svg>
            </div>
        `;
        return L.divIcon({
            className: 'custom-pin-marker',
            html: svgHtml,
            iconSize: [24, 36],
            iconAnchor: [12, 36],
            popupAnchor: [0, -32]
        });
    }

    var puertosIcon = createPinIcon('#e63946');  // Rojo
    var bodegasIcon = createPinIcon('#3b82f6');  // Azul

    // ---- Location Data ----

    // 1. Puertos de Operación (Rojo)
    var puertosOperacion = [
        {
            name: "Cancún, Q. Roo",
            lat: 21.1619,
            lng: -86.8515,
            address: "Apto. SMZA. 301, MZA. 8, Carretera Cancún Lote 8 Parque Logístico APQ, 77560 Cancún, Q.R."
        },
        {
            name: "Progreso, Yucatán",
            lat: 21.2836,
            lng: -89.6628,
            address: "C. 27 168 A, Centro, 97320 Progreso, Yuc."
        },
        {
            name: "Mérida, Yucatán",
            lat: 20.9674,
            lng: -89.6236,
            address: "Calle 81 No. 812 x 110 – A y 110 - 1, Sambulá, 97259 Mérida, Yuc."
        },
        {
            name: "Lázaro Cárdenas, Mich.",
            lat: 17.9547,
            lng: -102.1963,
            address: "Colonia Brisas Lote 9, entre Lirios y Bahía, José Green, 60950 Cdad. Lázaro Cárdenas, Mich."
        },
        {
            name: "Ciudad de México",
            lat: 19.4190,
            lng: -99.0878,
            address: "C. Aviación Militar 53, Industrial Puerto Aéreo, Venustiano Carranza, 15710 Ciudad de México, CDMX"
        },
        {
            name: "Veracruz, Ver.",
            lat: 19.1738,
            lng: -96.1342,
            address: "Calle Constitución número 99 entre Avenida Independencia y Callejón la Pastora, Col. Centro, C.P. 91700"
        },
        {
            name: "Laredo, Texas",
            lat: 28.5064,
            lng: -99.5075,
            address: "610 Vidal Cantu Rd Suite 2, Laredo, TX 78045, Estados Unidos"
        }
    ];

    // 2. Bodegas (Azul)
    var bodegas = [
        {
            name: "Miami, Florida",
            lat: 25.8371,
            lng: -80.3277,
            address: "8001 NW 79 Ave, FL 33166"
        },
        {
            name: "Panama City, Florida",
            lat: 30.1588,
            lng: -85.6602,
            address: "5323 W Hwy 98 suite 215, Panama City, FL 32401"
        },
        {
            name: "Laredo, Texas (Bodega)",
            lat: 27.5164,
            lng: -99.4875,
            address: "610 Vidal Cantu Rd Suite 2, Laredo, TX 78045, Estados Unidos"
        }
    ];

    // ---- Add Markers ----
    function addMarkers(locations, icon, category) {
        locations.forEach(function (loc) {
            var popupContent = `
                <div class="pro-tooltip-content">
                    <div class="pro-tooltip-header">${loc.name}</div>
                    <div class="pro-tooltip-body">
                        <p class="pro-tooltip-category">${category}</p>
                        <p>${loc.address}</p>
                    </div>
                </div>
            `;

            var marker = L.marker([loc.lat, loc.lng], { icon: icon })
                .addTo(map)
                .bindPopup(popupContent, {
                    className: 'pro-popup-wrapper',
                    closeButton: true,
                    minWidth: 220,
                    autoPanPadding: [50, 50]
                });

            marker.on('mouseover', function (e) {
                this.openPopup();
            });
        });
    }

    addMarkers(puertosOperacion, puertosIcon, 'Puerto de Operación');
    addMarkers(bodegas, bodegasIcon, 'Bodega');
});
