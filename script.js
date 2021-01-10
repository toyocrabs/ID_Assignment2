let map;
let home;
let geocoder;
let userAddress;
let markers = [];

function initMap() {

  let center = new google.maps.LatLng(1.3521, 103.8198);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 15,
  });

  let input = document.getElementById('input');
  let autocomplete = new google.maps.places.Autocomplete(input);

  geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click',
  function getPlaces(){
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    let placeType = document.getElementById('placeType').value;
    if(placeType == 'Cafés'){
      type = 'cafe';
      icon = {
        url: "http://maps.google.com/mapfiles/kml/shapes/coffee.png",
        scaledSize: new google.maps.Size(30, 30)
      }
    }
    else if(placeType == 'Parking'){
      type = 'parking';
      icon = {
        url: "http://maps.google.com/mapfiles/kml/shapes/parking_lot.png",
        scaledSize: new google.maps.Size(30, 30)
      }
    }
    else if(placeType == 'Shopping Malls'){
      type = 'shopping_mall';
      icon = {
        url: "http://maps.google.com/mapfiles/kml/shapes/shopping.png",
        scaledSize: new google.maps.Size(30, 30)
      }
    }
    else if(placeType == 'ATM'){
      type = 'atm';
      icon = {
        url: "http://maps.google.com/mapfiles/kml/shapes/dollar.png",
        scaledSize: new google.maps.Size(30, 30)
      }
    }
    else if(placeType == 'Toilets'){
      type = 'toilet';
      icon = {
        url: "http://maps.google.com/mapfiles/kml/shapes/toilets.png",
        scaledSize: new google.maps.Size(30, 30)
      }
    }
    let radius = document.getElementById('Distance').value;
    if(!radius){
      alert("Please specify radius!");
    }
    userAddress = document.getElementById('input').value;
    if(!userAddress){
      alert("Please specify location!");
    }
    geocoder.geocode({address: userAddress}, (results, status) => {
      if(status === 'OK'){
        map.setCenter(results[0].geometry.location);
        let homeMarker = new google.maps.Marker ({
          map: map,
          animation: google.maps.Animation.DROP,
          position: results[0].geometry.location,
        });
        markers.push(homeMarker);

        let request = {
          location: results[0].geometry.location,
          radius: radius,
          types: [type]
        };

        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
      }
    })
  })
}

function callback(result, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK){
    for(let i =0; i<result.length; i++){
      createMarkers(result[i]);
    }
  }
}

function createMarkers(place){
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: icon
  });
  markers.push(marker);
}