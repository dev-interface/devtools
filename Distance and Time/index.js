function initMap(e) {
    if (e)
    e.preventDefault();
    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -23.2613562, lng: -47.9317394 },
      zoom: 10,
    });
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request
    const origin1 = document.querySelector('#origem').value; //{ lat: 55.93, lng: -3.118 };
    //const origin2 = "Greenwich, England";
    const destinationA = document.querySelector('#destino').value;
    //const destinationB = { lat: 50.087, lng: 14.421 };
    const request = {
      origins: [origin1], //[origin1, origin2],
      destinations: [destinationA],//[destinationA, destinationB]
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
  
    // put request on page
    /*document.getElementById("request").innerText = JSON.stringify(
      request,
      null,
      2
    );*/
    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      // put response
      /*document.getElementById("response").innerText = JSON.stringify(
        response,
        null,
        2
      );*/

      // show on map
      const originList = response.originAddresses;
      const destinationList = response.destinationAddresses;
      const distance = JSON.stringify(response.rows[0].elements[0].distance.text).replace(/(\")/g, "");
      const duration = JSON.stringify(response.rows[0].elements[0].duration.text).replace(/(\")/g, "");
      document.getElementById("resumo").innerHTML = `<h3 style="background-color: black;color: orange"><b>Distância: ` + distance + `<br>Duração: ` + duration + `<br><br>Origem: ` + JSON.stringify(originList).replace(/(\[)|(\])|(\")/g, "") + `<br><br>Destino: ` + JSON.stringify(destinationList).replace(/(\[)|(\])|(\")/g, "") + `</b></h3`;
      
      deleteMarkers(markersArray);
  
      const showGeocodedAddressOnMap = (asDestination) => {
        const handler = ({ results }) => {
          map.fitBounds(bounds.extend(results[0].geometry.location));
          markersArray.push(
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
              label: asDestination ? "D" : "O",
            })
          );
        };
        return handler;
      };
  
      for (let i = 0; i < originList.length; i++) {
        const results = response.rows[i].elements;

        geocoder
          .geocode({ address: originList[i] })
          .then(showGeocodedAddressOnMap(false));
  
        for (let j = 0; j < results.length; j++) {
          geocoder
            .geocode({ address: destinationList[j] })
            .then(showGeocodedAddressOnMap(true));
        }
      }
    });
  }
  
  function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
  
    markersArray = [];
  }
