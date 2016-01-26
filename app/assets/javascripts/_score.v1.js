var UA = (Modernizr.touch) ? 'sp' : 'pc';
var AudioContext = window.AudioContext||window.webkitAudioContext;
var AC = new AudioContext();
var RAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var CAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var Sound = [];
var Score = {};
var March = null;
var SoundNum = 1;//音源
//var SoundScale = [19,17,16,14,12,11,9,7,5,4,2,0,-2];//音階
var SoundScale = [14,12,11,9,7,6,4,2,0,-1,-3,-5,-6];//音階
var ScoreLength = 96;//拍数 現在8以上

var Timbre = 0;
var Tempo = 120;
var AnimeID = 0;

var MouseX = 0;
var MouseY =0;
var GridX = 0;
var GridY = 0;

var CanvasW = 640;
var GridCount = 8;
var Grid = CanvasW / GridCount;
var GridHalf = Grid / 2;
var CanvasH = GridHalf * SoundScale.length + GridHalf;

var ScrollMax = ScoreLength - GridCount;
var ScrollX = 0;

//GameStatus: Game mode
// 0:Edit
// 1:Playing
var GameStatus = 0;
/*------------------------------------------------------------------------------
Canvas
------------------------------------------------------------------------------*/
var Canvas = document.getElementById('Canvas');
var Layer = Canvas.getContext('2d');
var DoubleClick = null;

//Canvasサイズ
var style_CanvasW = CanvasW / window.devicePixelRatio + 'px';
var style_CanvasH = CanvasH / window.devicePixelRatio + 'px';

Canvas.width = CanvasW;
Canvas.height = CanvasH;
Canvas.style.width = style_CanvasW;
Canvas.style.height = style_CanvasH;
Canvas.style.background = 'rgba(255,255,255,1)';
Canvas.style.borderRadius ='6px';

Canvas.addEventListener('contextmenu', mouseClickListener);
Canvas.addEventListener('click', mouseClickListener);

function mouseClickListener(e) {
  e.preventDefault();
  
  if(GridY == 13) return;//最下GreidはNG
  
  //半音
  if (e.shiftKey) GridY |= 0x80;
  if (e.ctrlKey) GridY |= 0x40;
  
  var note = (Timbre << 8) | GridY;//複数の音色対応
  
  var scrollGridX = ScrollX + GridX;//Scroll制御
  var notes = Score.notes[scrollGridX];
  
  //ダブルクリックの判定
	if(DoubleClick == null){
		DoubleClick = setTimeout(function(){
			DoubleClick = null;
		},500);
	}else{
		DoubleClick = null;
		//Score削除
		//if (e.button == 2) {
    for (var i = notes.length - 1; i >= 0; i--) {
      if ((notes[i] & 0x3F) == GridY) {
        notes.splice(i, 1);
        Score.notes[scrollGridX] = notes;//Scroll制御
        break;
      }
    }
    return;
    //}
	}
	
  //同じ音階はNG
  if (notes.indexOf(note) != -1) return;
  
  //Score記録
  notes.push(note);
  
  //音を出す
  Sound[Timbre].play(GridY);
}

Canvas.addEventListener('mousemove', function(e) {
  var rect = event.target.getBoundingClientRect() ;
  MouseX = (e.clientX - rect.left) * window.devicePixelRatio;
  MouseY = (e.clientY - rect.top) * window.devicePixelRatio;
  GridX = Math.floor(MouseX / Grid);
  GridY = Math.floor(MouseY / GridHalf);
});
/*------------------------------------------------------------------------------
drawScore
------------------------------------------------------------------------------*/
function drawScore(timestamp) {
  
  Layer.clearRect(0, 0, CanvasW, CanvasH);

  //横線
  for(var i=1;i<SoundScale.length;i++){
    if(i%2==0 && i!=12){
      Layer.lineWidth = 2;
      Layer.strokeStyle = 'rgba(0,0,0,1)';
      Layer.beginPath();
      Layer.moveTo(0, i*GridHalf);
      Layer.lineTo(CanvasW, i*GridHalf);
      Layer.stroke();
    }
  }
  
  //赤枠
  if(UA == 'pc' && GameStatus == 0){
    if(GridY >= 12) GridY = 12;
    var x = GridX * Grid;
    var y = GridY * GridHalf;
    Layer.lineWidth = 2;
    Layer.strokeStyle = 'rgba(255,0,0,1)';
    Layer.beginPath();
    Layer.rect(x,y,Grid,Grid);
    Layer.stroke();
  }
  
  var orange = 3 - (March.pos % 4);

  for (var i=0; i<GridCount+1; i++) {
    
    //縦線
    var barX = i * Grid + GridHalf - March.scroll;
    Layer.lineWidth = 2;
    Layer.strokeStyle = 'rgba(0,0,0,0.1)';
    //if(i%4 == orange)Layer.strokeStyle = 'rgba(255,204,0,0.5)';
    Layer.beginPath();
    Layer.moveTo(barX, 0);
    Layer.lineTo(barX, CanvasH);
    Layer.stroke();
    
    //音符
    var barNum = ScrollX + i;//scroll制御
    var b = Score.notes[barNum];
    if(b == undefined) continue;
    
    var markX = i * Grid + GridHalf - March.scroll;
    
    for (var j = 0; j < b.length; j++) {
      //console.log(b[j]);
      
      //var timbre = b[j] >> 8;//音色
      var scale  = b[j];//音階
      
      //var x = i * Grid - March.scroll;//scroll制御
      var markY = scale * GridHalf + GridHalf;
      
      Layer.fillStyle = 'rgba(255,0,0,0.5)';
      Layer.beginPath();
      Layer.arc(markX,markY,GridHalf,0,Math.PI*2);
      Layer.fill();
    }
    
  }
}

/*------------------------------------------------------------------------------
SoundClass
------------------------------------------------------------------------------*/
function SoundClass(path) {
  this.path = path;
  this.buffer = null;
  this.diff = SoundScale;
}
SoundClass.prototype.play = function(scale) {
  
  var tmpscale = scale & 0x0F;//音階
  var semitone = this.diff[tmpscale];
  var semitoneRatio = Math.pow(2, 1/12);
  
  //半音
  if ((scale & 0x80) != 0) semitone++;
  else if ((scale & 0x40) != 0) semitone--;
  
  
  var source = AC.createBufferSource();
  source.buffer = this.buffer;
  source.playbackRate.value = Math.pow(semitoneRatio, semitone);
  source.connect(AC.destination);
  source.start(0);
};
SoundClass.prototype.playChord = function(noteList) {
  
  for (var i = 0; i < noteList.length; i++) {
    var scale = noteList[i] & 0x0F;//音階
    var semitone = this.diff[scale];
    var semitoneRatio = Math.pow(2, 1/12);
    
    //半音
    if ((noteList[i] & 0x80) != 0) semitone++;
    else if ((noteList[i] & 0x40) != 0) semitone--;
    
    var source = AC.createBufferSource();
    source.buffer = this.buffer;
    source.playbackRate.value = Math.pow(semitoneRatio, semitone);
    source.connect(AC.destination);
    source.start(0);
  }
};
SoundClass.prototype.load = function() {
  var filepath = this.path;
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', filepath, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      AC.decodeAudioData(
        request.response,
        function(buffer) {
          resolve(buffer);
        },
        function(error) {
          reject('decodeAudioData error:' + error);
        }
     );
    };
    request.onerror = function() {
      reject('BufferLoader: XHR error');
    };
    request.send();
  });
};

/*------------------------------------------------------------------------------
MarchClass
------------------------------------------------------------------------------*/
function MarchClass() {
  this.x = 0;
  this.pos = 0;
  this.lastTime = 0;
  this.scroll = 0;
}

MarchClass.prototype.play = function(timestamp) {
  
  if(this.pos > ScoreLength) return;//小節END
  
  function scheduleAndPlay(notes) {
    
    if (notes == undefined || notes.length == 0) return;
    
    var dic = {};
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      
      var timbre = note >> 8;//音色
      var scale = note & 0xFF;//音階
      //console.log(note, timbre, scale)
      
      if  (!dic[timbre]) dic[timbre] = [scale];
      else dic[timbre].push(scale);
      //console.log(dic[num])
    }
    for (var i in dic) {
      //Sound[i].playChord(dic[i]);
      Sound[Timbre].playChord(dic[i]);
    }
  }
  
  //速さの計算？？
  var diff = timestamp - this.lastTime;
  if(diff>32) diff = 16;
  this.lastTime = timestamp;
  var xpm = (Tempo / 60 * Grid) / 1000 // x per ms
  var step = xpm * diff;
  
  var nextBar = this.pos * Grid + GridHalf;
  
  if(this.x < 280){
    this.x += step;
    if(this.x >= nextBar) {
      scheduleAndPlay(Score.notes[this.pos]);
      this.pos++;
    }
  }else if(ScrollX < ScrollMax){
    this.x = 280;
    this.scroll += step;
    if(this.scroll >= 80){
      scheduleAndPlay(Score.notes[this.pos]);
      this.pos++;
      this.scroll -= 80;
      ScrollX++;
      posFix = this.pos - 4;
    }
  }else{
    nextBar = (this.pos - posFix) * Grid + GridHalf;
    this.x += step;
    if(this.x >= nextBar) {
      scheduleAndPlay(Score.notes[this.pos]);
      this.pos++;
    }
  }
  
  //進行赤枠
  Layer.lineWidth = 8;
  Layer.strokeStyle = 'rgba(255,0,0,0.5)';
  Layer.beginPath();
  Layer.moveTo(this.x, 0);
  Layer.lineTo(this.x, CanvasH);
  Layer.stroke();
};
/*------------------------------------------------------------------------------
RAF(requestAnimationFrame)
------------------------------------------------------------------------------*/
function animeDisplay(timestamp) {
  drawScore(timestamp);
  RAF(animeDisplay);
}
function animePlay(timestamp) {
  March.play(timestamp);
  AnimeID = RAF(animePlay);
}
function animeStop() {
  if (AnimeID != 0) CAF(AnimeID);
  March.x = 0;
  March.pos = 0;
  March.lastTime = 0;
  March.scroll = 0;
  ScrollX = 0
  $('#Scroll').foundation('slider', 'set_value', ScrollX);
  GameStatus = 0;
}
/*------------------------------------------------------------------------------
Load
------------------------------------------------------------------------------*/
window.addEventListener('load', function(){
  //Sound
  for (var i = 1; i <= SoundNum; i++) {
    var tmp = '0';
    tmp += i.toString();
    //var file = '/sounds/sound' + tmp.substr(-2) + '.mp3';
    var file = '/wav/sound' + tmp.substr(-2) + '.wav';
    Sound[i-1] = new SoundClass(file);
  }
  
  //Score
  var arr = [];
  for (var i = 0; i < ScoreLength; i++) arr[i] = [];
  Score.notes = arr;
  Score.tempo = Tempo = 120;
  $('#Tempo').val(Tempo);
  
  //setScore
  Score = JSON.parse(JSON.stringify(
    {"notes":[[4,11],[0],[2,11],[0],[4,7],[0],[2,7],[0],[4,6],[1],[4,6],[1],[0,2,7],[],[],[],[1,6,8],[4],[1,6,8],[4],[2,7,9],[4],[2,7,9],[4],[3,5,10],[7],[3,10],[5],[3,9,11],[],[],[],[7,9],[0],[7,9],[0],[8,10],[0],[8,10],[0],[9,11],[0],[9,11],[0],[10,12],[],[],[],[7],[0,4],[7],[0,4],[8],[0,4],[8],[0,4],[9],[0,4],[9],[0,4],[3,5,10],[],[],[],[9,11],[11],[9,11],[11],[7,9],[9],[7,9],[9],[6,8],[8],[6,8],[8],[0,7,9],[],[],[],[6,8],[8],[6,8],[5],[4,9],[7],[4,9],[],[3,7,10],[],[3,7,10],[],[4,9,11],[],[],[],[]],"tempo":"178"}
  ));
  Tempo = Score.tempo;
  
  //March
  March = new MarchClass();
  
  //Button
  $('#Play').on('click', function(){
    GameStatus = 1;
    RAF(animePlay);
  });
  $('#Stop').on('click', function(){
    animeStop();
  });
  $('#Clear').on('click', function(){
    animeStop();
    var arr = [];
    for (var i = 0; i < ScoreLength; i++) arr[i] = [];
    Score.notes = arr;
  });
  $('#Data').on('click', function(){
    var json = JSON.stringify(Score);
    console.log(json)
  });

  $('form').on('submit', function(e){
    e.preventDefault();
    var json = JSON.stringify(Score);
    $('#timbre_json').val(json);
    $(this)[0].submit();
  });
  
  //Foundation5
  
  $('#Scroll').attr({ 
    'data-slider': 0,
    'data-options': '{start:0; end:'+ScrollMax+';}'
  });
  $('#Scroll').on('change.fndtn.slider', function(){
    ScrollX = parseInt($('#Scroll').attr('data-slider'));
  });
  
  //Promise
  Promise.all(
    Sound.map(function(sc){
      //console.log(sc);
      return sc.load();
    })
 ).then(
    function(val){
      //console.log(val);
      val.map(function(buffer,i) { Sound[i].buffer = buffer });
      RAF(animeDisplay);
    }
 ).catch(
    function(err){console.log(err)}
 );
});