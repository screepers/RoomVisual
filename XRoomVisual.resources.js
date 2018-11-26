const Color = {
    white:  ["#ffffff", "#4c4c4c"],
    grey:   ["#b4b4b4", "#4c4c4c"],
    red:    ["#ff7b7b", "#592121"],
    yellow: ["#fdd388", "#5d4c2e"],
    green:  ["#00f4a2", "#236144"],
    blue:   ["#50d7f9", "#006181"],
    purple: ["#a071ff", "#371383"],
};
const MineralColor = {
    [RESOURCE_ENERGY]:    Color.yellow,
    [RESOURCE_POWER]:     Color.red,
    
    [RESOURCE_HYDROGEN]:  Color.grey,
    [RESOURCE_OXYGEN]:    Color.grey,
    [RESOURCE_UTRIUM]:    Color.blue,
    [RESOURCE_LEMERGIUM]: Color.green,
    [RESOURCE_KEANIUM]:   Color.purple,
    [RESOURCE_ZYNTHIUM]:  Color.yellow,
    [RESOURCE_CATALYST]:  Color.red,
    [RESOURCE_GHODIUM]:   Color.white,

    [RESOURCE_HYDROXIDE]:         Color.grey,
    [RESOURCE_ZYNTHIUM_KEANITE]:  Color.grey,
    [RESOURCE_UTRIUM_LEMERGITE]:  Color.grey,

    [RESOURCE_UTRIUM_HYDRIDE]:    Color.blue,
    [RESOURCE_UTRIUM_OXIDE]:      Color.blue,
    [RESOURCE_KEANIUM_HYDRIDE]:   Color.purple,
    [RESOURCE_KEANIUM_OXIDE]:     Color.purple,
    [RESOURCE_LEMERGIUM_HYDRIDE]: Color.green,
    [RESOURCE_LEMERGIUM_OXIDE]:   Color.green,
    [RESOURCE_ZYNTHIUM_HYDRIDE]:  Color.yellow,
    [RESOURCE_ZYNTHIUM_OXIDE]:    Color.yellow,
    [RESOURCE_GHODIUM_HYDRIDE]:   Color.white,
    [RESOURCE_GHODIUM_OXIDE]:     Color.white,

    [RESOURCE_UTRIUM_ACID]:       Color.blue,
    [RESOURCE_UTRIUM_ALKALIDE]:   Color.blue,
    [RESOURCE_KEANIUM_ACID]:      Color.purple,
    [RESOURCE_KEANIUM_ALKALIDE]:  Color.purple,
    [RESOURCE_LEMERGIUM_ACID]:    Color.green,
    [RESOURCE_LEMERGIUM_ALKALIDE]:Color.green,
    [RESOURCE_ZYNTHIUM_ACID]:     Color.yellow,
    [RESOURCE_ZYNTHIUM_ALKALIDE]: Color.yellow,
    [RESOURCE_GHODIUM_ACID]:      Color.white,
    [RESOURCE_GHODIUM_ALKALIDE]:  Color.white,

    [RESOURCE_CATALYZED_UTRIUM_ACID]:         Color.blue,
    [RESOURCE_CATALYZED_UTRIUM_ALKALIDE]:     Color.blue,
    [RESOURCE_CATALYZED_KEANIUM_ACID]:        Color.purple,
    [RESOURCE_CATALYZED_KEANIUM_ALKALIDE]:    Color.purple,
    [RESOURCE_CATALYZED_LEMERGIUM_ACID]:      Color.green,
    [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]:  Color.green,
    [RESOURCE_CATALYZED_ZYNTHIUM_ACID]:       Color.yellow,
    [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]:   Color.yellow,
    [RESOURCE_CATALYZED_GHODIUM_ACID]:        Color.white,
    [RESOURCE_CATALYZED_GHODIUM_ALKALIDE]:    Color.white,
};


RoomVisual.prototype.resource = function(type, x, y, size = 0.25){
    if (type == RESOURCE_ENERGY || type == RESOURCE_POWER)
        this.fluid(type, x, y, size);
    else if ([RESOURCE_CATALYST, RESOURCE_HYDROGEN, RESOURCE_OXYGEN, RESOURCE_LEMERGIUM, RESOURCE_UTRIUM, RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM]
        .includes(type))
        this.mineral(type, x, y, size);
    else if (MineralColor[type] != undefined)
        this.compound(type, x, y, size);
    else
        return ERR_INVALID_ARGS
    return OK;
};
RoomVisual.prototype.fluid = function (type, x, y, size = 0.25) {
    this.circle(x, y, {
        radius: size,
        fill: MineralColor[type][0],
        opacity: 1,
    })
    this.text(type[0], x, y-(size*0.1), {
        font: (size*1.5),
        color: MineralColor[type][1],
        backgroundColor: MineralColor[type][0],
        backgroundPadding: 0,
    })
};
RoomVisual.prototype.mineral = function (type, x, y, size = 0.25) {
    this.circle(x, y, {
        radius: size,
        fill: MineralColor[type][0],
        opacity: 1,
    })
    this.circle(x, y, {
        radius: size * 0.8,
        fill: MineralColor[type][1],
        opacity: 1,
    })
    this.text(type, x, y+(size*0.03), {
        font: "bold "+(size*1.25)+" arial",
        color: MineralColor[type][0],
        backgroundColor: MineralColor[type][1],
        backgroundPadding: 0,
    })
};
RoomVisual.prototype.compound = function (type, x, y, size = 0.25) {
    let label = type.replace("2", '₂');
    
    this.text(label, x, y, {
        font: "bold "+(size*1)+" arial",
        color: MineralColor[type][1],
        backgroundColor: MineralColor[type][0],
        backgroundPadding: 0.3*size,
    })
};