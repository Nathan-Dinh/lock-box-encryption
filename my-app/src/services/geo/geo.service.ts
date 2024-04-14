import { Injectable } from '@angular/core';
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'
import 'here-js-api/scripts/mapsjs-ui'
import 'here-js-api/scripts/mapsjs-mapevents'
import 'here-js-api/scripts/mapsjs-clustering'

declare const H: any

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor() {}

  getCurrentLocation(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (e) => {
          reject({ code: e.code, message: e.message })
        },
        {
          timeout: 1000,
          maximumAge: 0,
          enableHighAccuracy: true,
        }
      )
    })
  }

  async showMap(lat: string, lng: string, container: HTMLElement) {
    container.innerHTML = ''
    try {
      const PLATFORM = new H.service.Platform({
        apikey: 'urccOV2buSNx-OguAYvGG4jJ--DiEu2IJABPsNGRlFk',
      })
      const MAP_TYPE = PLATFORM.createDefaultLayers()
      const MAP = new H.Map(container, MAP_TYPE.vector.normal.map, {
        zoom: 15,
        center: {
          lng: lng,
          lat: lat,
        },
      })
      const icon = new H.map.Icon('../../assets/person-bounding-box.svg')
      const MARKER = new H.map.Marker({ lat: lat, lng: lng }, { icon: icon })
      MAP.addObject(MARKER)
    } catch (error) {
      alert(error)
    }
  }
}
