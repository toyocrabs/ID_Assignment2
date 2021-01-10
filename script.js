let map;
let home;
let geocoder;
let userAddress;
let markers = [];

function initMap() {

  //displays a google map
  let center = new google.maps.LatLng(1.3521, 103.8198);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 15,
  });

  //User input has autocomplete
  let input = document.getElementById('input');
  let autocomplete = new google.maps.places.Autocomplete(input);

  geocoder = new google.maps.Geocoder();

  //when user clicks on "locate", marker will be set on the location user has stated
  document.getElementById('submit').addEventListener('click',
  function getPlaces(){
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    //based on the option chosen by the user, the type of location and icon displayed on the screen will change
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

    //gets the radius where places will be displayed
    let radius = document.getElementById('Distance').value;

    //if user did not enter radius, there will be an alert to tell the user to enter radius
    if(!radius){
      alert("Please specify radius!");
    }

    //gets location from user input
    userAddress = document.getElementById('input').value;

    //if user did not input location, there will be an alert to tell the user to enter location
    if(!userAddress){
      alert("Please specify location!");
    }

    //sets the map to the location entered by the user and adds markers to display nearby places.
    geocoder.geocode({address: userAddress}, (results, status) => {
      if(status === 'OK'){
        map.setCenter(results[0].geometry.location);
        let homeMarker = new google.maps.Marker ({
          map: map,
          animation: google.maps.Animation.DROP,
          position: results[0].geometry.location,
        });

        //adds the 'home location' (location entered by the user) to the markers array
        markers.push(homeMarker);
        
        let request = {
          location: results[0].geometry.location,
          radius: radius,
          types: [type]
        };
        
        //searches for the nearbyplaces
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
      }
    })
  })
}

//if places are found, markers will be created for those places
function callback(result, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK){
    for(let i =0; i<result.length; i++){
      createMarkers(result[i]);
    }
  }
}

//creates markers for nearbyplaces. Different types of places will have different icons.
function createMarkers(place){
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: icon
  });
  markers.push(marker);
}