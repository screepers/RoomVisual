const colors = {
  gray: '#555555',
  light: '#AAAAAA',
  road: '#666', // >:D
  dark: '#181818',
  outline: '#8FBB93',
  power: '#f4331f'
}

RoomVisual.prototype.structure = function(x,y,type,opts={}){
  opts = Object.assign({
    opacity: 1
  },opts)
  switch(type){
    case STRUCTURE_EXTENSION:
      this.circle(x,y,{
        radius: 0.5,
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity: opts.opacity
      })
      this.circle(x,y,{
        radius: 0.35,
        fill: colors.gray,
        opacity: opts.opacity
      })
      break
    case STRUCTURE_SPAWN:
      this.circle(x,y,{
        radius: 0.70,
        fill: colors.dark,
        stroke: '#CCCCCC',
        strokeWidth: 0.10,
        opacity: opts.opacity
      })
      break;
    case STRUCTURE_LINK:
    {
      let osize = 0.3
      let isize = 0.2
      let outer = [
        [0.0,-0.5],
        [0.4,0.0],
        [0.0,0.5],
        [-0.4,0.0]
      ]
      let inner = [
        [0.0,-0.3],
        [0.25,0.0],
        [0.0,0.3],
        [-0.25,0.0]
      ]
      outer = relPoly(x,y,outer)
      inner = relPoly(x,y,inner)
      outer.push(outer[0])
      inner.push(inner[0])
      this.poly(outer,{
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity: opts.opacity
      })
      this.poly(inner,{
        fill: colors.gray,
        stroke: false,
        opacity: opts.opacity
      })
      break;
    }
    case STRUCTURE_TERMINAL:
    {
      let outer = [
        [0.0,-0.8],
        [0.55,-0.55],
        [0.8,0.0],
        [0.55,0.55],
        [0.0,0.8],
        [-0.55,0.55],
        [-0.8,0.0],
        [-0.55,-0.55],
      ]
      let inner = [
        [0.0,-0.65],
        [0.45,-0.45],
        [0.65,0.0],
        [0.45,0.45],
        [0.0,0.65],
        [-0.45,0.45],
        [-0.65,0.0],
        [-0.45,-0.45],
      ]
      outer = relPoly(x,y,outer)
      inner = relPoly(x,y,inner)
      outer.push(outer[0])
      inner.push(inner[0])
      this.poly(outer,{
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity: opts.opacity
      })
      this.poly(inner,{
        fill: colors.light,
        stroke: false,
        opacity: opts.opacity
      })
      this.rect(x-0.45,y-0.45,0.9,0.9,{
        fill: colors.gray,
        stroke: colors.dark,
        strokeWidth: 0.1,
        opacity: opts.opacity
      })
      break;
    }
    case STRUCTURE_LAB:
      this.circle(x,y-0.025,{
        radius: 0.55,
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity: opts.opacity
      })
      this.circle(x,y-0.025,{
        radius: 0.40,
        fill: colors.gray,
        opacity: opts.opacity
      })
      this.rect(x-0.45,y+0.3,0.9,0.25,{
        fill: colors.dark,
        stroke: false,
        opacity: opts.opacity
      })
      {
        let box = [
          [-0.45,0.3],
          [-0.45,0.55],
          [0.45,0.55],
          [0.45,0.3],
        ]
        box = relPoly(x,y,box)
        this.poly(box,{
          stroke: colors.outline,
          strokeWidth: 0.05,
          opacity: opts.opacity
        })
      }
      break
    case STRUCTURE_TOWER:
      this.circle(x,y,{
        radius: 0.6,
        fill: colors.dark,
        // fill: 'transparent',
        stroke: colors.outline,
        strokeWidth: 0.05,
        opacity: opts.opacity
      })
      this.rect(x-0.4,y-0.3,0.8,0.6,{
        fill: colors.gray,
        opacity: opts.opacity
      })
      this.rect(x-0.2,y-0.9,0.4,0.5,{
        fill: colors.light,
        stroke: colors.dark,
        strokeWidth: 0.07,
        opacity: opts.opacity
      })
      break;
    case STRUCTURE_POWER_SPAWN:
      this.circle(x,y,{
        radius: 0.70,
        fill: colors.dark,
        stroke: '#CCCCCC',
        strokeWidth: 0.10,
        opacity: opts.opacity
      })
      this.circle(x,y,{
        radius: 0.65,
        stroke: colors.power,
        fill: colors.dark,
        strokeWidth: 0.10,
        opacity: opts.opacity
      })
      this.circle(x,y,{
        radius: 0.45,
        stroke: colors.power,
        fill: colors.dark,
        strokeWidth: 0.15,
        opacity: opts.opacity
      })
      break;
    case STRUCTURE_NUKER:
      let outline = [
        [0,-1],
        [-0.47,0.2],
        [-0.5,0.5],
        [0.5,0.5],
        [0.47,0.2],
        [0,-1],
      ];
      outline = relPoly(x,y,outline)
      this.poly(outline,{
        stroke: colors.outline,
        strokeWidth: 0.05,
        fill: colors.dark,
        opacity: opts.opacity
      })
      let inline = [
        [0,-.80],
        [-0.40,0.2],
        [0.40,0.2],
        [0,-.80],
      ]
      inline = relPoly(x,y,inline)
      this.poly(inline,{
        stroke: colors.outline,
        strokeWidth: 0.01,
        fill: colors.gray,
        opacity: opts.opacity
      })
      break;
    case STRUCTURE_OBSERVER:
      this.circle(x,y,{
        radius: 0.45,
        fill: colors.dark,
        stroke: colors.outline,
        strokeWidth: 0.07,
        opacity: opts.opacity
      })
      this.circle(x,y + .2,{
        radius: 0.2,
        fill: colors.outline,
        stroke: false,
        opacity: opts.opacity
      })
      break;
    case STRUCTURE_ROAD:
      this.circle(x,y,{
        radius: 0.175,
        fill: colors.road,
        stroke: false,
        opacity: opts.opacity
      })
      if(!this.roads) this.roads = []
      this.roads.push([x,y])
      break;
    default:
      this.circle(x, y, {
        fill: colors.light,
        radius: 0.35,
        stroke: colors.dark,
        strokeWidth: 0.20,
        opacity: opts.opacity
      })
      break;
  }
}

const dirs = [
  [],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1]
]

RoomVisual.prototype.connectRoads = function(opts={}){
  let color = opts.color || colors.road || 'white'
  if(!this.roads) return
  // this.text(this.roads.map(r=>r.join(',')).join(' '),25,23)  
  this.roads.forEach(r=>{
    // this.text(`${r[0]},${r[1]}`,r[0],r[1],{ size: 0.2 })
    for(let i=1;i<=4;i++){
      let d = dirs[i]
      let c = [r[0]+d[0],r[1]+d[1]]
      let rd = _.some(this.roads,r=>r[0] == c[0] && r[1] == c[1])
      // this.text(`${c[0]},${c[1]}`,c[0],c[1],{ size: 0.2, color: rd?'green':'red' })
      if(rd){
        this.line(r[0],r[1],c[0],c[1],{
          color: color,
          width: 0.35,
          opacity: opts.opacity || 1
        })
      }
    }
  })
}

function relPoly(x,y,poly){
  return poly.map(p=>{
    p[0] += x
    p[1] += y
    return p
  })
}

RoomVisual.prototype.test = function test(){
  let demopos = [19,24]
  let start = Game.cpu.getUsed()
  this.clear()
  this.structure(demopos[0]+0,demopos[1]+0,STRUCTURE_LAB)
  this.structure(demopos[0]+1,demopos[1]+1,STRUCTURE_TOWER)
  this.structure(demopos[0]+2,demopos[1]+0,STRUCTURE_LINK)
  this.structure(demopos[0]+3,demopos[1]+1,STRUCTURE_TERMINAL)
  this.structure(demopos[0]+4,demopos[1]+0,STRUCTURE_EXTENSION)
  this.structure(demopos[0]+5,demopos[1]+1,STRUCTURE_SPAWN)
  this.structure(demopos[0]+6,demopos[1]+0STRUCTURE_POWER_SPAWN)
  this.structure(demopos[0]+7,demopos[1]+1,STRUCTURE_NUKER)
  this.structure(demopos[0]+8,demopos[1]+0,STRUCTURE_OBSERVER)

  let stage = (Game.time % 3) + 1
  Game.rooms.E3N31.buildFlower({ x:28, y:28 },stage)
  this.connectRoads()
  let end = Game.cpu.getUsed()
  this.text(this.getSize()+'B',demopos[0]+3,demopos[1]+4)
  this.text(Math.round((end-start)*100)/100,demopos[0]+3,demopos[1]+5)
  // this.structure(20,5,STRUCTURE_TOWER)
  // this.structure(20,3,STRUCTURE_TOWER)
  // this.structure(16,5,STRUCTURE_LAB)
  // this.structure(16,4,STRUCTURE_LAB)
}