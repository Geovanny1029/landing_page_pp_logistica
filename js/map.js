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

    // ---- Category colors ----
    var COLORS = {
        puerto: '#e63946',   // Rojo
        bodega: '#3b82f6',   // Azul
        oficina: '#10b981'   // Verde
    };

    // ---- Marker Icon Factories ----

    // Single-color pin
    function createPinIcon(color) {
        var svgHtml =
            '<div class="custom-pin-wrapper">' +
                '<div class="pin-pulse" style="background-color: ' + color + '80;"></div>' +
                '<div class="pin-pulse-ring" style="--pulse-color: ' + color + ';"></div>' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36" class="pin-svg">' +
                    '<path fill="' + color + '" d="M12 0A12 12 0 0 0 0 12c0 6.6 12 24 12 24s12-17.4 12-24A12 12 0 0 0 12 0z"/>' +
                    '<circle cx="12" cy="12" r="5" fill="#FFFFFF"/>' +
                '</svg>' +
            '</div>';
        return L.divIcon({
            className: 'custom-pin-marker',
            html: svgHtml,
            iconSize: [24, 36],
            iconAnchor: [12, 36],
            popupAnchor: [0, -32]
        });
    }

    // Multi-color pin (2 colors split vertically)
    function createDualPinIcon(colorLeft, colorRight) {
        var svgHtml =
            '<div class="custom-pin-wrapper">' +
                '<div class="pin-pulse" style="background-color: ' + colorLeft + '80;"></div>' +
                '<div class="pin-pulse-ring" style="--pulse-color: ' + colorLeft + ';"></div>' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="40" class="pin-svg">' +
                    '<defs>' +
                        '<clipPath id="leftHalf"><rect x="0" y="0" width="12" height="36"/></clipPath>' +
                        '<clipPath id="rightHalf"><rect x="12" y="0" width="12" height="36"/></clipPath>' +
                    '</defs>' +
                    '<path clip-path="url(#leftHalf)" fill="' + colorLeft + '" d="M12 0A12 12 0 0 0 0 12c0 6.6 12 24 12 24s12-17.4 12-24A12 12 0 0 0 12 0z"/>' +
                    '<path clip-path="url(#rightHalf)" fill="' + colorRight + '" d="M12 0A12 12 0 0 0 0 12c0 6.6 12 24 12 24s12-17.4 12-24A12 12 0 0 0 12 0z"/>' +
                    '<circle cx="12" cy="12" r="5" fill="#FFFFFF"/>' +
                '</svg>' +
            '</div>';
        return L.divIcon({
            className: 'custom-pin-marker',
            html: svgHtml,
            iconSize: [28, 40],
            iconAnchor: [14, 40],
            popupAnchor: [0, -36]
        });
    }

    // Multi-color pin (3 colors split in thirds)
    function createTriplePinIcon(color1, color2, color3) {
        var svgHtml =
            '<div class="custom-pin-wrapper">' +
                '<div class="pin-pulse" style="background-color: ' + color1 + '80;"></div>' +
                '<div class="pin-pulse-ring" style="--pulse-color: ' + color1 + ';"></div>' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="40" class="pin-svg">' +
                    '<defs>' +
                        '<clipPath id="thirdLeft"><rect x="0" y="0" width="8" height="36"/></clipPath>' +
                        '<clipPath id="thirdCenter"><rect x="8" y="0" width="8" height="36"/></clipPath>' +
                        '<clipPath id="thirdRight"><rect x="16" y="0" width="8" height="36"/></clipPath>' +
                    '</defs>' +
                    '<path clip-path="url(#thirdLeft)" fill="' + color1 + '" d="M12 0A12 12 0 0 0 0 12c0 6.6 12 24 12 24s12-17.4 12-24A12 12 0 0 0 12 0z"/>' +
                    '<path clip-path="url(#thirdCenter)" fill="' + color2 + '" d="M12 0A12 12 0 0 0 0 12c0 6.6 12 24 12 24s12-17.4 12-24A12 12 0 0 0 12 0z"/>' +
                    '<path clip-path="url(#thirdRight)" fill="' + color3 + '" d="M12 0A12 12 0 0 0 0 12c0 6.6 12 24 12 24s12-17.4 12-24A12 12 0 0 0 12 0z"/>' +
                    '<circle cx="12" cy="12" r="5" fill="#FFFFFF"/>' +
                '</svg>' +
            '</div>';
        return L.divIcon({
            className: 'custom-pin-marker',
            html: svgHtml,
            iconSize: [28, 40],
            iconAnchor: [14, 40],
            popupAnchor: [0, -36]
        });
    }

    // ---- Location Data ----

    // 1. Puertos de Operación (Rojo) — keyed by region name for merging
    var puertosOperacion = [
        { key: "lazaro_cardenas", name: "Lázaro Cárdenas", lat: 17.9547, lng: -102.1963 },
        { key: "veracruz", name: "Veracruz", lat: 19.1738, lng: -96.1342 },
        { key: "puerto_morelos", name: "Puerto Morelos", lat: 20.8493, lng: -86.8743 },
        { key: "manzanillo", name: "Manzanillo", lat: 19.0513, lng: -104.3188 },
        { key: "tijuana", name: "Tijuana", lat: 32.5149, lng: -117.0382 },
        { key: "nuevo_laredo", name: "Nuevo Laredo", lat: 27.4761, lng: -99.5068 },
        { key: "merida", name: "Mérida", lat: 20.9674, lng: -89.6236 },
        { key: "aicm", name: "AICM (Ciudad de México)", lat: 19.4363, lng: -99.0721 },
        { key: "aifa", name: "AIFA (Santa Lucía)", lat: 19.7380, lng: -99.0145 },
        { key: "progreso", name: "Progreso", lat: 21.2836, lng: -89.6628 },
        { key: "cancun", name: "Cancún", lat: 21.1619, lng: -86.8515 },
        { key: "altamira", name: "Altamira", lat: 22.3924, lng: -97.9431 }
    ];

    // 2. Bodegas (Azul)
    var bodegas = [
        { key: "miami", name: "Miami, Florida", lat: 25.8371, lng: -80.3277, address: "8001 NW 79 Ave, FL 33166" },
        { key: "panama_city", name: "Panama City, Florida", lat: 30.1588, lng: -85.6602, address: "5323 W Hwy 98 suite 215, Panama City, FL 32401" },
        { key: "laredo", name: "Laredo, Texas", lat: 27.5064, lng: -99.5075, address: "610 Vidal Cantu Rd Suite 2, Laredo, TX 78045, Estados Unidos" }
    ];

    // 3. Oficinas de Atención (Verde)
    var oficinas = [
        { key: "cancun", name: "Cancún, Q. Roo", lat: 21.1619, lng: -86.8515, address: "Apto. SMZA. 301, MZA. 8, Carretera Cancún Lote 8 Parque Logístico APQ, 77560 Cancún, Q.R." },
        { key: "progreso", name: "Progreso, Yucatán", lat: 21.2836, lng: -89.6628, address: "C. 27 168 A, Centro, 97320 Progreso, Yuc." },
        { key: "merida", name: "Mérida, Yucatán", lat: 20.9674, lng: -89.6236, address: "Calle 81 No. 812 x 110 – A y 110 - 1, Sambulá, 97259 Mérida, Yuc." },
        { key: "lazaro_cardenas", name: "Lázaro Cárdenas, Mich.", lat: 17.9547, lng: -102.1963, address: "Colonia Brisas Lote 9, entre Lirios y Bahía, José Green, 60950 Cdad. Lázaro Cárdenas, Mich." },
        { key: "cdmx", name: "Ciudad de México", lat: 19.4190, lng: -99.0878, address: "C. Aviación Militar 53, Industrial Puerto Aéreo, Venustiano Carranza, 15710 Ciudad de México, CDMX" },
        { key: "veracruz", name: "Veracruz, Ver.", lat: 19.1738, lng: -96.1342, address: "Calle Constitución número 99 entre Avenida Independencia y Callejón la Pastora, Col. Centro, C.P. 91700" },
        { key: "laredo", name: "Laredo, Texas", lat: 27.5064, lng: -99.5075, address: "610 Vidal Cantu Rd Suite 2, Laredo, TX 78045, Estados Unidos" }
    ];

    // ---- Merge overlapping locations by proximity ----
    var OVERLAP_THRESHOLD = 0.08; // ~8 km

    // Build a merged map: group locations that are close together
    var mergedPoints = [];

    // Helper: find if a merged point already exists near this lat/lng
    function findNearbyMerged(lat, lng) {
        for (var i = 0; i < mergedPoints.length; i++) {
            if (Math.abs(mergedPoints[i].lat - lat) < OVERLAP_THRESHOLD &&
                Math.abs(mergedPoints[i].lng - lng) < OVERLAP_THRESHOLD) {
                return mergedPoints[i];
            }
        }
        return null;
    }

    // Add puertos
    puertosOperacion.forEach(function (loc) {
        var existing = findNearbyMerged(loc.lat, loc.lng);
        if (existing) {
            existing.isPuerto = true;
            existing.puertoName = loc.name;
        } else {
            mergedPoints.push({
                lat: loc.lat, lng: loc.lng,
                displayName: loc.name,
                isPuerto: true, puertoName: loc.name,
                isBodega: false, bodegaName: null, bodegaAddress: null,
                isOficina: false, oficinaName: null, oficinaAddress: null
            });
        }
    });

    // Add bodegas
    bodegas.forEach(function (loc) {
        var existing = findNearbyMerged(loc.lat, loc.lng);
        if (existing) {
            existing.isBodega = true;
            existing.bodegaName = loc.name;
            existing.bodegaAddress = loc.address;
        } else {
            mergedPoints.push({
                lat: loc.lat, lng: loc.lng,
                displayName: loc.name,
                isPuerto: false, puertoName: null,
                isBodega: true, bodegaName: loc.name, bodegaAddress: loc.address,
                isOficina: false, oficinaName: null, oficinaAddress: null
            });
        }
    });

    // Add oficinas
    oficinas.forEach(function (loc) {
        var existing = findNearbyMerged(loc.lat, loc.lng);
        if (existing) {
            existing.isOficina = true;
            existing.oficinaName = loc.name;
            existing.oficinaAddress = loc.address;
            // Update display name to the most descriptive one
            if (loc.name.length > existing.displayName.length) {
                existing.displayName = loc.name;
            }
        } else {
            mergedPoints.push({
                lat: loc.lat, lng: loc.lng,
                displayName: loc.name,
                isPuerto: false, puertoName: null,
                isBodega: false, bodegaName: null, bodegaAddress: null,
                isOficina: true, oficinaName: loc.name, oficinaAddress: loc.address
            });
        }
    });

    // ---- Choose icon and build popup for each merged point ----
    mergedPoints.forEach(function (pt) {
        var cats = [];
        if (pt.isPuerto) cats.push('puerto');
        if (pt.isBodega) cats.push('bodega');
        if (pt.isOficina) cats.push('oficina');

        // Select icon based on active categories
        var icon;
        if (cats.length === 3) {
            icon = createTriplePinIcon(COLORS.puerto, COLORS.bodega, COLORS.oficina);
        } else if (cats.length === 2) {
            var c1 = COLORS[cats[0]];
            var c2 = COLORS[cats[1]];
            icon = createDualPinIcon(c1, c2);
        } else {
            icon = createPinIcon(COLORS[cats[0]]);
        }

        // Build popup content with all categories
        var popupSections = '';

        if (pt.isPuerto) {
            popupSections +=
                '<div class="pro-tooltip-section">' +
                    '<span class="pro-tooltip-dot" style="background-color:' + COLORS.puerto + ';"></span>' +
                    '<span class="pro-tooltip-category-label">Puerto de Operación</span>' +
                '</div>';
        }

        if (pt.isBodega) {
            popupSections +=
                '<div class="pro-tooltip-section">' +
                    '<span class="pro-tooltip-dot" style="background-color:' + COLORS.bodega + ';"></span>' +
                    '<span class="pro-tooltip-category-label">Bodega</span>' +
                    '<p class="pro-tooltip-address">' + pt.bodegaAddress + '</p>' +
                '</div>';
        }

        if (pt.isOficina) {
            popupSections +=
                '<div class="pro-tooltip-section">' +
                    '<span class="pro-tooltip-dot" style="background-color:' + COLORS.oficina + ';"></span>' +
                    '<span class="pro-tooltip-category-label">Oficina de Atención</span>' +
                    '<p class="pro-tooltip-address">' + pt.oficinaAddress + '</p>' +
                '</div>';
        }

        var popupContent =
            '<div class="pro-tooltip-content">' +
                '<div class="pro-tooltip-header">' + pt.displayName + '</div>' +
                '<div class="pro-tooltip-body">' + popupSections + '</div>' +
            '</div>';

        var marker = L.marker([pt.lat, pt.lng], { icon: icon })
            .addTo(map)
            .bindPopup(popupContent, {
                className: 'pro-popup-wrapper',
                closeButton: true,
                minWidth: 240,
                autoPanPadding: [50, 50]
            });

        marker.on('mouseover', function () {
            this.openPopup();
        });
    });
});
