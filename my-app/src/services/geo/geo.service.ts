import { Injectable } from '@angular/core';
import { map } from 'rxjs'

declare var H: any

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
          timeout: 5000,
          maximumAge: 0,
          enableHighAccuracy: true,
        }
      )
    })
  }

  showMap(lat: string, lng: string, container: HTMLElement) {
    container.innerHTML = ''
    const PlATFORM = new H.service.Platform({
      apikey: 'urccOV2buSNx-OguAYvGG4jJ--DiEu2IJABPsNGRlFk',
    })
    const MAP_TYPE = PlATFORM.createDefaultLayers()
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
  }
}
