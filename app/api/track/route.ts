import { type NextRequest } from "next/server"

import { buildGPX, GarminBuilder } from 'gpx-builder'
import ky from 'ky'
const { Point } = GarminBuilder.MODELS

// parse gmt+08:00 timezone date to utc
const parseDate = (s: string) => {
  const [date, time] = s.split(' ')
  return new Date(`${date}T${time}+08:00`)
}

const getData = async (track_id: string) => {
  const r = await ky.get(`https://api.fenxuekeji.com/api/tracks/${track_id}`)
  return await r.json() as any
}

const convert = async (geo: any) => {
  const points = []
  const { track, track_detail, altitude_arr, speed_arr, status_arr } = geo.data

  for (const i in track_detail) {
    for (const r in track_detail[i]) {
      // might be the other way around
      const [lon, lat] = track_detail[i][r]
      const [altitude, time] = altitude_arr[i][r] as [number, string]
      const [speed, ...restSpeedAttr] = speed_arr[i][r]
      const [status] = status_arr[i][r]

      const point = new Point(
        lat, lon, {
          ele: altitude,
          time: parseDate(time),
          // convert km/h -> m/s
          speed: typeof speed === 'number' ? speed / 3.6 : 0
        }
      )

      points.push(point)
    }
  }

  const gpxData = new GarminBuilder()
  gpxData.setSegmentPoints(points)

  const xml = buildGPX(gpxData.toObject())

  return xml
}


export async function GET (request: NextRequest) {
  const track_id = request.nextUrl.searchParams.get('track_id')

  if (!track_id) {
    return Response.json({ 
      msg: 'track_id not provided'
    }, {
      status: 404
    })
  }

  const data = await getData(track_id)
  const gpx = await convert(data)

  return new Response(gpx, {
    status: 200,
    headers: {
      'Context-Type': 'application/xml',
      'Content-Disposition': `attachment; filename=huabei-${data.data.track.start_at_str}.gpx`
    }
  })
}
