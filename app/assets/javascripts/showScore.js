var UA = (Modernizr.touch)?'sp':'pc';
var AudioContext = window.AudioContext || window.webkitAudioContext;
var AC = new AudioContext();
var RAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var CAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var Sound = [];
var Score = {};
var March = null;
var SoundNum = 20;//音源
//var SoundScale = [19,17,16,14,12,11,9,7,5,4,2,0,-2];//音階
var SoundScale = [14,12,11,9,7,6,4,2,0,-1,-3,-5,-6];//音階
var ScoreLength = 93;//拍数 現在8以上

var Timbre = 0;
var Tempo = 120;
var Track = {};
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

var GameStatus = 0; // 0:Edit, 1:Playing
var isPaused = true;

/*------------------------------------------------------------------------------
Canvas
------------------------------------------------------------------------------*/
var Canvas = document.getElementById('Canvas');
var Layer = Canvas.getContext('2d');

//Canvasサイズ
var style_CanvasW = CanvasW / window.devicePixelRatio + 'px';
var style_CanvasH = CanvasH / window.devicePixelRatio + 'px';

Canvas.width = CanvasW;
Canvas.height = CanvasH;
Canvas.style.width = style_CanvasW;
Canvas.style.height = style_CanvasH;
Canvas.style.background = 'rgba(255,255,255,1)';
Canvas.style.borderRadius ='4px';
/*------------------------------------------------------------------------------
drawScore
------------------------------------------------------------------------------*/
function drawScore(timestamp) {
  
  Layer.clearRect(0, 0, CanvasW, CanvasH);

  //横線
  for(var i=1;i<SoundScale.length;i++){
    if(i%2==0 && i!=12){
      Layer.lineWidth = 4;
      Layer.strokeStyle = 'rgba(0,0,0,1)';
      Layer.beginPath();
      Layer.moveTo(0, i*GridHalf);
      Layer.lineTo(CanvasW, i*GridHalf);
      Layer.stroke();
    }
  }
  
  //進行棒
  if(GameStatus == 1){
    Layer.lineWidth = 4;
    Layer.strokeStyle = 'rgba(0,0,0,0.5)';
    Layer.beginPath();
    Layer.moveTo(March.x, 0);
    Layer.lineTo(March.x, CanvasH);
    Layer.stroke();
  }
  
  //縦線用
  var orangeBarLine = 3 - ((ScrollX+3) % 4);
  
  for (var i=0; i<GridCount+1; i++) {
    
    var x = i * Grid + GridHalf - March.scroll;//scroll制御
    var barNum = ScrollX + i;//scroll制御
    
    //縦線
    Layer.lineWidth = 2;
    Layer.strokeStyle = 'rgba(0,0,0,0.1)';
    if(i%4 == orangeBarLine)Layer.strokeStyle = 'rgba(255,204,0,1)';
    Layer.beginPath();
    Layer.moveTo(x, 0);
    Layer.lineTo(x, CanvasH);
    Layer.stroke();
    
    //跳ね
    var bound = 0;
    if(March.pos-1 == barNum){
      var index = Math.round((March.x - x) / 3)
      var arr = [0,2,5,5,10,10,15,15,20,20,25,25,30,30,30,30,30,25,25,20,20,15,15,10,10,5,5,2,2,0];
      bound = arr[index];
    }
    
    //楽譜
    var b = Score.notes[barNum];
    if(b == undefined) continue;
    
    for (var j = 0; j < b.length; j++) {
      //console.log(b[j]);
      var timbre = b[j] >> 8;//音色
      var scale  = b[j] & 0x0F;
      //var scale  = b[j];//音階
      var y = scale * GridHalf + GridHalf + bound;
      Layer.fillStyle = 'rgba(255,0,0,0.5)';
      Layer.beginPath();
      Layer.arc(x,y,GridHalf,0,Math.PI*2);
      Layer.fill();
    }
    
    //楽譜2
    var barNum = ScrollX + i;//scroll制御
    var b = Score.notes2[barNum];
    if(b == undefined) continue;
    
    for (var j = 0; j < b.length; j++) {
      //console.log(b[j]);
      //var timbre = b[j] >> 8;//音色
      var scale  = b[j];//音階
      var y = scale * GridHalf + GridHalf + bound;
      Layer.fillStyle = 'rgba(0,0,255,0.5)';
      Layer.beginPath();
      Layer.arc(x,y,GridHalf,0,Math.PI*2);
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
      Sound[i].playChord(dic[i]);
      //Sound[Timbre].playChord(dic[i]);
    }
  }
  
  //速さの計算？？
  var diff = timestamp - this.lastTime;
  if(diff>32) diff = 16;
  this.lastTime = timestamp;
  var xpm = (Tempo / 60 * Grid) / 1000 // x per ms
  var step = xpm * diff;
  
  var nextBar = (this.pos - ScrollX) * Grid + GridHalf;
  
  if(this.x < 280){ //START
    this.x += step;
    if(this.x >= nextBar) {
      scheduleAndPlay(Score.notes[this.pos]);
      scheduleAndPlay(Score.notes2[this.pos]);
      this.pos++;
    }
  }else if(ScrollX < ScrollMax){ //SCROLL
    this.x = 280;
    this.scroll += step;
    if(this.scroll >= 80){
      scheduleAndPlay(Score.notes[this.pos]);
      scheduleAndPlay(Score.notes2[this.pos]);
      this.pos++;
      this.scroll -= 80;
      ScrollX++;
    }
  }else{ //END
    this.x += step;
    if(this.x >= nextBar) {
      scheduleAndPlay(Score.notes[this.pos]);
      scheduleAndPlay(Score.notes2[this.pos]);
      this.pos++;
    }
  }
};
/*------------------------------------------------------------------------------
RAF(requestAnimationFrame)
------------------------------------------------------------------------------*/
function animeDisplay(timestamp) {
  drawScore(timestamp);
  RAF(animeDisplay);
}
function animePlay(timestamp) {
  //一時停止
  if(isPaused) return;
  
  //演奏終了
  if(March.x > CanvasW) return animeStop();
  
  March.play(timestamp);
  AnimeID = RAF(animePlay);
}
function animeStop() {
  isPaused = true;
  $('#Play').text('Play');
  
  if(AnimeID != 0) CAF(AnimeID);
  March.x = 0;
  March.pos = 0;
  March.lastTime = 0;
  March.scroll = 0;
  ScrollX = 0;
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
  
  //setScore
  var elem = document.querySelector('#Data');
  var data = elem.dataset.score;
  if(data){
    Score = JSON.parse(data);
    Tempo = Score.tempo;
    ScoreLength = Score.notes.length;
    ScrollMax = ScoreLength - GridCount;
  }else{
    var arr = [], arr2 = [];
    for (var i = 0; i < ScoreLength; i++) arr[i] = arr2[i] = [];
    Score.notes = arr;
    Score.notes2 = arr2;
    Tempo = Score.tempo = 120;
  }
  
  //March
  March = new MarchClass();
  
  //Button
  $('#Play').on('click', function(){
    Sound[17].play(8);
    if(isPaused){
      GameStatus = 1;
      RAF(animePlay);
      $(this).text('Pause');
    }else{
      $(this).text('Play');
    }
    isPaused = !isPaused;
  });
  
  $('#Stop').on('click', function(){
    Sound[17].play(8);
    animeStop();
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
      //start
      RAF(animeDisplay);
    }
  ).catch(
    function(err){console.log(err)}
  );
});