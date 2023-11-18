const player = "p"
const brick = "b"
const web = "w"
const enemy = "e"
const block="l"
setLegend(
	[ player, bitmap`
...0000000000...
..033333333330..
..033333333330..
.03333333333330.
0300333333330030
0022033333302200
0022203333022200
0222220330222220
0222222002222220
0222222002222220
.00222033022200.
.03000333300030.
.00333333333300.
..033333333330..
...0333333330...
....00000000....` ],
    [ brick, bitmap`
LLL11110LL110L11
LLLLLL10LLL10LL1
LLLLLL10LLL10LL1
LLLLLL10LLL10LL1
0000000000000000
0LLLL1110LLLL111
0LLLLLL10LLLLLL1
0LLLLLL10LLLLLL1
0LLLLLL10LLLLLL1
0000000000000000
L110LLL1110LL111
LL10LLLLL10LLLL1
LL10LLLLL10LLLL1
LL10LLLLL10LLLL1
0000000000000000
LLLL110LLLLLLL11` ],
    [ web, bitmap`
................
..1.11..1....1..
...1..11111.11..
..1.11..1.111...
..1111.11.1.1...
..1..1.1..11.1..
..1..1.111...1..
..1..111.1...1..
..111..1111111..
...11111.1...1..
...111.1111.11..
....1..1...11...
...111.1.11.1...
..1..11111..11..
..1.............
................` ],
    [ enemy, bitmap`
...LLLLLLLLLL...
..L0000000000L..
..L0000000000L..
.L002000000200L.
L0L2220000222L0L
LL222000000222LL
LL222L0000L222LL
L22222L00L22222L
L222222LL222222L
L222222LL222222L
.LL222L00L222LL.
.L0LLL0000LLL0L.
.LL003F3F3F30LL.
..L0033333330L..
...L03FF3FF3L...
....LLLLLLLL....` ],
    [ block, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C000000000000C0
0C0C0CCCCCC0C0C0
0C00C0CCCC0C00C0
0C0C0C0CC0C0C0C0
0C0CC0C00C0CC0C0
0C0CCC0LL0CCC0C0
0C0CCC0LL0CCC0C0
0C0CC0C00C0CC0C0
0C0C0C0CC0C0C0C0
0C00C0CCCC0C00C0
0C0C0CCCCCC0C0C0
0C000000000000C0
0CCCCCCCCCCCCCC0
0000000000000000` ],
)

setSolids([player, brick, block])

let level = 0
const levels = [
	map`
bbbbbbbbbbbbbbbbbbb
bp.bb.....ebbbb...w
b..bbe.bbllbbbb....
b..bb..bb..bbbb..bb
b..bb..bb..bbbb..bb
b..bb..bb..bbbb..bb
bllbb..bb..bbbb..bb
b....lebb.lbbbb..bb
b......bbe.......bb
bbbbbbbbb........bb`,
    map`
bbbbbbbbbbbbbbbbbbb
p..bb..e..........b
...bb.ll..........b
b..bb..bbbbbllbbbbb
b..bb..b.......l..b
b..bb..b.......e..b
bllbb..bbbbbbbbbl.b
be.....b.........eb
b.....ebe.........b
bbbbbbbbb.wbbbbbbbb`,
]

setMap(levels[level])

setPushables({
	[ player ]: [block]
})

onInput("s", () => {
	getFirst(player).y += 1;
});
onInput("w", ()=> {
    getFirst(player).y -= 1;
});
onInput("a", () => {
    getFirst(player).x -=1;
});
onInput("d", () => {
    getFirst(player).x +=1;
});

onInput("j", () => {
    setMap(levels[level])
});

setInterval(() => {
  
}, 500) 


afterInput(() => {
  const goalsCovered = tilesWith(player, web);
  const hitenemy = tilesWith(player, enemy);

   if (goalsCovered.length >= 1) {
     level = level + 1;

     if (level<levels.length) {
         setMap(levels[level]);
   } else{
      addText("you win!", {y:4, color: color`7`});
     }
   }
  if (hitenemy.length>0) {
    setMap(levels[level])
  }
  
})