type PointArray = [number, number];
type PointObject = { x:number, y:number };

interface RoomVisualOptions {
  opacity?: number;
  background?: string;
  radius?: number;
  frames?: number;
  color?: string;
  textcolor?: string;
  textstyle?: string;
  textsize?: string;
  textfont?: string;
}

interface ConnectRoadsOptions {
  color?: string;
  opacity?: number;
}

interface RoomVisual {
  structure( x: number, y: number, type: string, opts?: RoomVisualOptions ): RoomVisual;
  terrain( x: number, y: number, type: string, opts?: RoomVisualOptions ): RoomVisual;
  connectRoads( opts?: ConnectRoadsOptions ): RoomVisual;
  speech ( text: string, x: number, y: number, opts?: RoomVisualOptions ): RoomVisual;
  animatedPosition( x: number, y: number, opts?: RoomVisualOptions ): RoomVisual;
  test(): RoomVisual;
  resource(type: string, x: number, y: number, size: number): RoomVisual;
  _fluid(type: string, x: number, y: number, size: number): RoomVisual;
  _mineral(type: string, x: number, y: number, size: number): RoomVisual;
  _compound(type: string, x: number, y: number, size: number): RoomVisual;
  roads?: PointArray[];
}
