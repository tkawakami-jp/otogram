var UA = (Modernizr.touch) ? 'sp' : 'pc';
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

var UI = {};

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
Canvas.style.borderRadius ='4px';

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

  var notes = Score.notes[Track.track-1].note[scrollGridX];

  //ダブルクリックの判定(Score削除)
  if(DoubleClick == null){
    DoubleClick = setTimeout(function(){
    DoubleClick = null;
    },500);
  }else{
    DoubleClick = null;
    //if (e.button == 2) {
    for (var i = notes.length - 1; i >= 0; i--) {
      if ((notes[i] & 0x3F) == GridY) {
        notes.splice(i, 1);
        Score.notes[Track.track-1].note[scrollGridX] = notes;
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
      Layer.lineWidth = 4;
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
    Layer.lineWidth = 4;
    Layer.strokeStyle = 'rgba(255,0,0,1)';
    Layer.beginPath();
    Layer.rect(x,y,Grid,Grid);
    Layer.stroke();
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
    for(var j = 0; j < Score.notes.length; j++){
      //表示判定
      if(Track.show.indexOf(String(j+1)) >= 0 && Score.notes[j].note){

      var b = Score.notes[j].note[barNum];
      if(b == undefined) continue;

      for (var k = 0; k < b.length; k++) {
        //console.log(b[j]);
        var timbre = b[k] >> 8;//音色
        var scale  = b[k] & 0x0F;
        //var scale  = b[j];//音階
        var y = scale * GridHalf + GridHalf + bound;

        if(j){
          Layer.fillStyle = 'rgba(0,0,255,0.5)';
        }else{
          Layer.fillStyle = 'rgba(255,0,0,0.5)';
        }
        Layer.beginPath();
        Layer.arc(x,y,GridHalf,0,Math.PI*2);
        Layer.fill();
      }

      }
    }
    //}

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

  //小節END
  if(this.pos > ScoreLength) isPaused = true;

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
  var xpm = (Score.bpm / 60 * Grid) / 1000 // x per ms
  var step = xpm * diff;

  var nextBar = (this.pos - ScrollX) * Grid + GridHalf;

  if(this.x < 280){ //START
    this.x += step;
    if(this.x >= nextBar) {
      for(var i = 0; i < Score.notes.length; i++){
        //演奏判定
        if(Track.show.indexOf(String(i+1)) >= 0 && Score.notes[i].note){
          scheduleAndPlay(Score.notes[i].note[this.pos]);
        }
      }
      this.pos++;
    }
  }else if(ScrollX < ScrollMax){ //SCROLL
    this.x = 280;
    this.scroll += step;
    if(this.scroll >= 80){
      for(var i = 0; i < Score.notes.length; i++){
        //演奏判定
        if(Track.show.indexOf(String(i+1)) >= 0 && Score.notes[i].note){
          scheduleAndPlay(Score.notes[i].note[this.pos]);
        }
      }
      this.pos++;
      this.scroll -= 80;
      ScrollX++;
      UI.scrool.value = ScrollX;
    }
  }else{ //END
    this.x += step;
    if(this.x >= nextBar) {
      for(var i = 0; i < Score.notes.length; i++){
        //演奏判定
        if(Track.show.indexOf(String(i+1)) >= 0 && Score.notes[i].note){
          scheduleAndPlay(Score.notes[i].note[this.pos]);
        }
      }
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
  GameStatus = 0;

  UI.scrool.value = ScrollX = 0
}
/*------------------------------------------------------------------------------
Load
------------------------------------------------------------------------------*/
window.addEventListener('load', function(){

  //Sound
  for (var i = 1; i <= SoundNum; i++) {
    var tmp = '0';
    tmp += i.toString();
    var file = '/wav/sound' + tmp.substr(-2) + '.wav';
    Sound[i-1] = new SoundClass(file);
  }

  //Score
  var len = $('[id^=data]').length;
  Score.notes = [];
  if(len){
    for(var i=1;i<=len;i++){
      var id = '#data'+i;
      var data = JSON.parse(JSON.stringify(JSON.parse($(id).val())));
      Score.notes[i-1] = data;
      if(i==1){
        Score.bpm = data.bpm;
        Score.beat = data.note.length;
        ScrollMax = Score.beat - GridCount;
      }
    }
  }else{
    Score.bpm = 120;
    Score.beat = 8;
    var arr = [];
    for (var i=0;i<Score.beat;i++) arr[i] = [];
    Score.notes[0] = arr;
    ScrollMax = Score.beat - GridCount;
  }
  //console.log(Score);

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
    UI.scrool.disabled = true;
  });

  $('#Stop').on('click', function(){
    Sound[17].play(8);
    animeStop();
    UI.scrool.disabled = false;
  });

  $('#Clear').on('click', function(){
    Sound[17].play(8);
    animeStop();
    for (var j=0;j<Score.notes.length;j++){
      var arr = [];
      for (var i=0;i<Score.beat;i++) arr[i] = [];
      Score.notes[j].note = arr;
    }
  });

  if(UA=='sp') $('#Data').css('display','none');
  $('#Data').on('click', function(){
    Sound[17].play(8);
    var json = JSON.stringify(Score);
    console.log(json)
  });

  $('form').on('submit', function(e){
    e.preventDefault();
    var json = JSON.stringify(Score);
    $('#data').val(json);
    $(this)[0].submit();
  });

  UI.scrool = document.querySelector('#Scroll');
  UI.scrool.max = ScrollMax;
  UI.scrool.min = 0;
  UI.scrool.value = 0;
  UI.scrool.step = 1;
  UI.scrool.addEventListener('input', function(e) {
    March.pos = ScrollX = parseInt(this.value);
  });

  //Track
  Track.track = $("[name=track]:checked").val();
  Track.show = $("[name=show]:checked").map(function(){ return $(this).val() }).get();
  $('input').on('change', function(){
    Track.track = $("[name=track]:checked").val();
    Track.show = $("[name=show]:checked").map(function(){ return $(this).val() }).get();
    //console.log(Track)
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

var Song = [];
//きらきら星
Song[0] = {
  //{"notes":[[4,11],[0],[2,11],[0],[4,7],[0],[2,7],[0],[4,6],[1],[4,6],[1],[0,2,7],[],[],[],[1,6,8],[4],[1,6,8],[4],[2,7,9],[4],[2,7,9],[4],[3,5,10],[7],[3,10],[5],[4,9,11],[],[],[],[7,9],[0],[7,9],[0],[8,10],[0],[8,10],[0],[9,11],[0],[9,11],[0],[10,12],[],[],[],[7],[0,4],[7],[0,4],[8],[0,4],[8],[0,4],[9],[0,4],[9],[0,4],[3,5,10],[],[],[],[9,11],[11],[9,11],[11],[7,9],[9],[7,9],[9],[6,8],[8],[6,8],[8],[0,7,9],[],[],[],[6,8],[8],[6,8],[5],[4,9],[7],[4,9],[],[3,7,10],[],[3,7,10],[],[4,9,11],[],[],[],[]],"BPM":"178"}
  "notes" :[[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11]],
  "notes2":[[4],[0],[2],[0],[4],[0],[2],[0],[4],[1],[4],[1],[0,2],[],[],[],[1,6],[4],[1,6],[4],[2,7],[4],[2,7],[4],[3,5],[7],[3],[5],[4,9],[],[],[],[9],[0],[9],[0],[10],[0],[10],[0],[11],[0],[11],[0],[12],[],[],[],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[3,5],[],[],[],[9],[11],[9],[11],[9],[9],[9],[9],[8],[8],[8],[8],[0,9],[],[],[],[6],[8],[6],[5],[4],[7],[4],[],[3,7],[],[3,7],[],[4,9]],
  "BPM" :"178"
}
//マリオ
Song[1] = {
  "notes" :[[1026,2313],[1026,2313],[],[1026,2313],[],[1028,2315],[1026,2313],[],[1024,2311],[],[],[],[517,3591,265],[],[],[],[2818,2820,267],[],[3072,3595],[3072,2818,3595],[2817,2820,267],[],[3072,3592],[3072,2817,3591],[2816,2819,267],[],[3072,3591],[2816,1287,3595],[2817,1286,1288],[262,1288,1290],[1286,3591,1288],[1285,1287,266],[2,3595,3084],[],[256],[257,3595],[4,3593,3084],[],[256],[257,7,3593],[6,3592,3084],[4],[256,3592],[257,4,3590],[3084],[256],[],[257,6,3591],[7,3084],[3591],[256,4,3592],[257],[4,3593,3084],[],[0,3594],[257],[2,3591],[1031],[256,1030],[3,1029,3592],[1028],[1027,262],[1026],[1025,263],[1026,266,3595],[7],[2050,4],[7,266,3595],[1028,3593,266],[7],[2050,4],[5,1031,3593],[1030,3592,266],[1028,6,2568],[4],[1,1028,3590],[264],[2049,2,260],[3,260],[261,1030],[1031,266],[3584,2,7],[1028],[1,5,7],[1025,3591],[1026],[1027],[],[1028],[258,3588],[],[260,3595],[261,3595],[],[261,267]],
  "notes2":[],
  "BPM" :"370"
}