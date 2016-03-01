var TOUCH = Modernizr.touch;
var DPR = window.devicePixelRatio;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var AC = new AudioContext();
var RAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var CAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var Sound = [];
var Score = {};
var March = null;
var SoundNum = 28;//音源
var SoundScale = [ //音階
  35,33,31,29,28,26,24,        //C6
  23,21,19,17,16,14,12,        //C5
  11,9,7,5,4,2,0,              //C4
  -1,-3,-5,-7,-8,-10,-12,      //C3
  -13,-15,-17,-19,-20,-22,-24, //C2
  -25,-27,-29,-31,-32,-34,-36  //C1
];
var LineC = 21;
var LineT = [11,19];
var LineH = [23,31];
//var ScoreLength = 93;//拍数 現在8以上

//var Timbre = 0;
var Track = {};
var AnimeID = 0;

var MouseX = 0;
var MouseY =0;
var GridX = 0;
var GridY = 0;

var CanvasW = 320 * DPR;
var GridCount = 8;
var Grid = CanvasW / GridCount;
var GridHalf = Grid / 2;
var CanvasH = GridHalf * SoundScale.length + GridHalf;

//var ScrollMax = ScoreLength - GridCount;
var ScrollX = 0;

var GameStatus = 0; // 0:Edit, 1:Playing
var isPaused = true;

var UI = {};
var Color = ['255,0,0,0.5','255,165,0,0.5','0,128,0,0.5','0,255,255,0.5','0,0,255,0.5','148,0,211,0.5','255,0,255,0.5']
/*------------------------------------------------------------------------------
Canvas
------------------------------------------------------------------------------*/
var Canvas = document.getElementById('Canvas');
var Layer = Canvas.getContext('2d');

//Canvasサイズ
var style_CanvasW = CanvasW / DPR + 'px';
var style_CanvasH = CanvasH / DPR + 'px';

Canvas.width = CanvasW;
Canvas.height = CanvasH;
Canvas.style.width = style_CanvasW;
Canvas.style.height = style_CanvasH;
Canvas.style.background = 'rgba(255,255,255,1)';

Canvas.addEventListener('contextmenu', mouseClickListener);
Canvas.addEventListener('click', mouseClickListener);

function mouseClickListener(e) {
  e.preventDefault();

  if(GridY >= SoundScale.length || GameStatus == 1) return;//最下GreidはNG

  //半音
  if (e.shiftKey) GridY |= 0x80;
  if (e.ctrlKey) GridY |= 0x40;
  //console.log(("00000000"+GridY.toString(2)).slice(-8),("00000000"+0x80.toString(2)).slice(-8),("00000000"+(GridY |= 0x80).toString(2)).slice(-8))
  //console.log(("00000000"+GridY.toString(2)).slice(-8),("00000000"+0x40.toString(2)).slice(-8),("00000000"+(GridY |= 0x40).toString(2)).slice(-8))

  var note = (0 << 8) | GridY;//複数の音色対応
  //console.log(("00000000"+note.toString(2)).slice(-8),'GridY:'+note.toString(10),'SoundScale:'+SoundScale[note.toString(10)])

  var scrollGridX = ScrollX + GridX;//Scroll制御
  var notes = Score.notes[Track.track-1].note[scrollGridX];

  //Score削除
  if (e.button == 2) {
    for (var i = notes.length - 1; i >= 0; i--) {
      if ((notes[i] & 0x3F) == GridY) {
        notes.splice(i, 1);
        Score.notes[Track.track-1].note[scrollGridX] = notes;
        break;
      }
    }
    return;
  }

  //同じ音階はNG
  if (notes.indexOf(note) != -1) return;

  //Score記録
  notes.push(note);

  //音を出す
  Sound[0].play(note);
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
  for(var i=1;i<SoundScale.length+1;i++){
    if(i%2==1){
      //五線(ト音記号)
      if(i >= LineT[0] && i <= LineT[1]) {
        Layer.lineWidth = 2 * DPR;
        Layer.strokeStyle = 'rgba(0,0,0,1.0)';
      }
      //ドの赤線
      else if(i == LineC) {
        Layer.lineWidth = 2 * DPR;
        Layer.strokeStyle = 'rgba(255,0,0,0.2)';
      }
      //五線(ヘ音記号)
      else if(i >= LineH[0] && i <= LineH[1]) {
        Layer.lineWidth = 2 * DPR;
        Layer.strokeStyle = 'rgba(0,0,255,0.2)';
      }
      //その他の線
      else {
        Layer.lineWidth = 1 * DPR;
        Layer.strokeStyle = 'rgba(0,0,0,0.1)';
      }
      Layer.beginPath();
      Layer.moveTo(0, i*GridHalf);
      Layer.lineTo(CanvasW, i*GridHalf);
      Layer.stroke();
    }
  }

  //赤枠
  if(!TOUCH && GameStatus == 0 && GridY < SoundScale.length){
    var x = GridX * Grid;
    var y = GridY * GridHalf;
    Layer.lineWidth = 2 * DPR;
    Layer.strokeStyle = 'rgba(255,0,0,1)';
    Layer.beginPath();
    Layer.rect(x,y,Grid,Grid);
    Layer.stroke();
  }

  //進行棒
  if(GameStatus == 1){
    Layer.lineWidth = 2 * DPR;
    Layer.strokeStyle = 'rgba(0,0,0,0.5)';
    Layer.beginPath();
    Layer.moveTo(March.x, 0);
    Layer.lineTo(March.x, CanvasH);
    Layer.stroke();
  }

  //縦線用
  //Score.beat;
  var orangeBarLine = Score.beat-1 - ((ScrollX+Score.beat-1) % Score.beat);
  var blackBarLine = 1 - ((ScrollX+1) % 2);

  for (var i=0; i<GridCount+1; i++) {

    var x = i * Grid + GridHalf - March.scroll;//scroll制御
    var barNum = ScrollX + i;//scroll制御

    //縦線
    if(i%Score.beat == orangeBarLine) {
      Layer.lineWidth = 2 * DPR;
      Layer.strokeStyle = 'rgba(255,204,0,1.0)';
    } else if(i%2 == blackBarLine) {
      Layer.lineWidth = 2 * DPR;
      Layer.strokeStyle = 'rgba(190,190,190,0.5)';
    } else {
      Layer.lineWidth = 1 * DPR;
      Layer.strokeStyle = 'rgba(0,0,0,0.1)';
    }
    Layer.beginPath();
    Layer.moveTo(x, 0);
    Layer.lineTo(x, CanvasH);
    Layer.stroke();

    //跳ね
    var bound = 0;
    if(March.pos-1 == barNum){
      var index = Math.round((March.x - x) / (1.5 * DPR))
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
        var scale  = b[k] & 0x3F;//音階
        var y = scale * GridHalf + GridHalf + bound;

        //半音
        if ((b[k] & 0x80) != 0){
          var fontSize = (1.5 * DPR)+'rem Gothic';
          var fontX = x-(7.5 * DPR);
          var fontY = y+(9.5 * DPR);
          Layer.font = fontSize;
          Layer.fillStyle = '#000';
          Layer.fillText('#',fontX,fontY);
        }else if ((b[k] & 0x40) != 0){
          var fontSize = (1.5 * DPR)+'rem Gothic';
          var fontX = x-(10 * DPR);
          var fontY = y+(9 * DPR);
          Layer.font= fontSize;
          Layer.fillStyle = '#000';
          Layer.fillText('♭',fontX,fontY);
        }
        Layer.fillStyle = 'rgba('+Color[Track.color[j%7]-1]+')';
        Layer.beginPath();
        Layer.arc(x,y,GridHalf,0,Math.PI*2);
        Layer.fill();
      }

      }
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
  var semitoneRatio = Math.pow(2, 1/12);

  var scale2 = scale & 0x3F // & 0x3Fは半音対応用
  var semitone = this.diff[scale2]; // 音階
  if((scale & 0x80) != 0) semitone++; //#
  else if((scale & 0x40) != 0) semitone--; //♭
  //console.log(("00000000"+scale.toString(2)).slice(-8),("00000000"+0x3F.toString(2)).slice(-8),("00000000"+scale2.toString(2)).slice(-8))
  //console.log(("00000000"+(scale & 0x80).toString(2)).slice(-8))
  //console.log(("00000000"+(scale & 0x40).toString(2)).slice(-8))

  var source = AC.createBufferSource();
  source.buffer = this.buffer;
  source.playbackRate.value = Math.pow(semitoneRatio, semitone);
  source.connect(AC.destination);
  source.start(0);
};
SoundClass.prototype.playChord = function(noteList) {
  var semitoneRatio = Math.pow(2, 1/12);

  for (var i = 0; i < noteList.length; i++) {
    var scale = noteList[i] & 0x3F;//音階
    var semitone = this.diff[scale];

    //半音
    if ((noteList[i] & 0x80) != 0) semitone++;
    else if ((noteList[i] & 0x40) != 0) semitone--;
    //console.log(("00000000"+noteList[i].toString(2)).slice(-8),("00000000"+0x3F.toString(2)).slice(-8),("00000000"+scale.toString(2)).slice(-8))


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
  if(this.pos > Score.len){
    Sound[17].play(8);
    UI.scroll.disabled = false;
    animeStop();
    //isPaused = true;
  }

  function scheduleAndPlay(notes) {

    if (notes == undefined || notes.length == 0) return;

    var dic = {};
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];

      var timbre = note >> 8;//音色
      var scale = note; //音階
      //var scale = note & 0xFF;
      //console.log(note, timbre, scale)

      if  (!dic[timbre]) dic[timbre] = [scale];
      else dic[timbre].push(scale);
      //console.log(dic[timbre])
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

  //BPM=1分間の拍数
  //1拍の㍉秒数＝60÷BPM×1000×定数A（定数A：[全音符＝4,二分音符＝2,四分音符＝1,八分音符＝0.5,十六分音符＝0.25]）
  var ms = 60 / Score.bpm * 1000 * (4 / Score.beat);
  //速さ = 距離(Grid) / 時間(ms)
  var speed = Grid / ms;
  //???
  var step = speed * diff;

  var nextBar = (this.pos - ScrollX) * Grid + GridHalf;

  var targetX = (Grid * 4 - GridHalf)

  if(this.x < targetX){ //START
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
    this.x = targetX;
    this.scroll += step;
    if(this.scroll >= Grid){
      for(var i = 0; i < Score.notes.length; i++){
        //演奏判定
        if(Track.show.indexOf(String(i+1)) >= 0 && Score.notes[i].note){
          scheduleAndPlay(Score.notes[i].note[this.pos]);
        }
      }
      this.pos++;
      this.scroll -= Grid;
      ScrollX++;
      UI.scroll.value = ScrollX;
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

  UI.scroll.value = ScrollX = 0;
}
/*------------------------------------------------------------------------------
Load
------------------------------------------------------------------------------*/
window.addEventListener('load', function(){

  //自動スクロール
   $('#Frame').scrollTop(GridHalf * 4);

  //Sound
  for (var i = 1; i <= SoundNum; i++) {
    var tmp = '0';
    tmp += i.toString();
    var file = '/wav/sound' + tmp.substr(-2) + '.wav';
    Sound[i-1] = new SoundClass(file);
  }

  //Score
  Score.notes = [];
  var len = $('[id^=data]').length;
  for(var i=1;i<=len;i++){
    var text = $('#data'+i).val();
    //Dataがある
    if(text != ''){
      var data = JSON.parse(JSON.stringify(JSON.parse(text)));
      Score.notes[i-1] = data;
      if(i==1){
        Score.bpm = data.bpm;
        Score.beat = data.beat;
        Score.len = data.note.length;
      }
    }
    //Dataがない＆トラック１
    else if(text == '' && i == 1){
      Score.bpm = $('#Bpm').val();
      Score.beat = $('#Beat').val();
      Score.len = Score.beat * $('#Measure').val();//拍子 * 小節
      var arr = [];
      for (var j=0;j<Score.len;j++) arr[j] = [];
      Score.notes[i-1] = {note: arr};
    }
    //Dataがない＆トラック２以降
    else{
      var arr = [];
      for (var j=0;j<Score.len;j++) arr[j] = [];
      Score.notes[i-1] = {note: arr};
    }
  }

  //BPM
  $('#Bpm').val(Score.bpm);
  $('#Bpm').on('change', function(){
    var min = Number($('#Bpm').attr('min'));
    var bpm = Number($('#Bpm').val());
    if(bpm < min) return $('#Bpm').val(min);
    Score.bpm = bpm;
    //console.log(Score)
  });
  //Beat
  $('#Beat').val(Score.beat);
  $('#Beat').on('change', function(){
    Score.beat = Number($('#Beat').val());
    $('#Measure').val(Score.len / Score.beat);

    UI.scroll.max = ScrollMax = Score.len - GridCount;
    UI.scroll.disabled = false;
    animeStop();
    //console.log(Score)
  });
  //小節
  $('#Measure').val(Score.len / Score.beat)
  $('#Measure').on('change', function(){
    var min = Number($('#Measure').attr('min'));
    var measure = Number($('#Measure').val());
    if(measure < min) return $('#Measure').val(min);

    var beat = Number($('#Beat').val());
    Score.len = measure * beat;

    for(var i = 0; i < Score.notes.length; i++){
      var arr = Score.notes[i].note;
      if(Score.len > arr.length){
        var start = arr.length;
        var end = Score.len;
        for(var j = start; j < end; j++) arr[j] = [];
      }else{
        var diff = arr.length - Score.len;
        for (var j = 0; j < diff; j++) arr.pop();
      }
    }

    UI.scroll.max = ScrollMax = Score.len - GridCount;
    UI.scroll.disabled = false;
    animeStop();
    //console.log(Score)
  });

  //console.log(Score)

  //Button
  $('#Play').on('click', function(){
    Sound[17].play(8);
    if(isPaused){
      GameStatus = 1;
      RAF(animePlay);
      $(this).text('Pause');
      UI.scroll.disabled = true;
    }else{
      GameStatus = 0;
      $(this).text('Play');
      UI.scroll.disabled = false;
      March.lastTime = 0;
      March.scroll = 0;
    }
    isPaused = !isPaused;
  });

  $('#Stop').on('click', function(){
    Sound[17].play(8);
    animeStop();
    UI.scroll.disabled = false;
  });

  $('#Clear').on('click', function(){
    Sound[17].play(8);
    animeStop();
    for (var j=0;j<Score.notes.length;j++){
      var arr = [];
      for (var i=0;i<Score.len;i++) arr[i] = [];
      Score.notes[j] = {note: arr};
    }
  });

  if(TOUCH) $('#Data').css('display','none');
  $('#Data').on('click', function(){
    Sound[17].play(8);
    for (var i=1;i<=Score.notes.length;i++){
      var noteArr = Score.notes[i-1].note;
      var json = JSON.stringify({"note":noteArr,"bpm":Score.bpm,"beat":Score.beat,"len":Score.len})
      console.log(json)
    }
  });

  $('form').on('submit', function(e){
    e.preventDefault();
    for (var i=1;i<=Score.notes.length;i++){
      var noteArr = Score.notes[i-1].note;
      var json = JSON.stringify({"note":noteArr,"bpm":Score.bpm,"beat":Score.beat,"len":Score.len})
      $('#data'+i).val(json);
    }
    $(this)[0].submit();
  });

  ScrollMax = Score.len - GridCount;

  //Scroll
  UI.scroll = document.querySelector('#Scroll');
  UI.scroll.max = ScrollMax;
  UI.scroll.min = 0;
  UI.scroll.value = 0;
  UI.scroll.step = 1;
  UI.scroll.addEventListener('input', function(e) {
    March.pos = ScrollX = parseInt(this.value);
    March.x = 0;
    March.lastTime = 0;
    March.scroll = 0;
  });
  $('#ArrowLeft').on('click', function(e){
    e.preventDefault();
    if(UI.scroll.min < ScrollX){
      ScrollX--;
      UI.scroll.value = March.pos = ScrollX;
      March.x = 0;
      March.lastTime = 0;
      March.scroll = 0;
    }
  });
  $('#ArrowRight').on('click', function(e){
    e.preventDefault();
    if(UI.scroll.max > ScrollX){
      ScrollX++;
      UI.scroll.value = March.pos = ScrollX;
      March.x = 0;
      March.lastTime = 0;
      March.scroll = 0;
    }
  });

  //Track
  Track.color = $(".TrackColor").map(function(){ return $(this).val() }).get();
  Track.track = $("[name=track]:checked").val();
  Track.show = $("[name=show]:checked").map(function(){ return $(this).val() }).get();
  $("[name=track]").on('change', function(){
    Track.track = $("[name=track]:checked").val();
  });
  $("[name=show]").on('change', function(){
    Track.show = $("[name=show]:checked").map(function(){ return $(this).val() }).get();
  });
  //console.log(Track)

  //March
  March = new MarchClass();

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
