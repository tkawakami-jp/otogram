var AudioContext = window.AudioContext||window.webkitAudioContext;
var AudioCtx = new AudioContext();

var createjs = createjs || {};
var Canvas, Stage;
var ScoreBoard, ScoreLayer;

var Sounds = [];
var SoundNum = 3;//音源
var SoundScale = [19,17,16,14,12,11,9,7,5,4,2,0,-2];//音階
//var SoundScale = [11,9,7,5,4,2,0];//音階[0,シ][1,ラ][2,ソ][3,フ][4,ミ][5,レ][6,ド]

var gridWscale = 80;
var gridHalf = gridWscale / 2;
var gridMarginLeft = gridWscale * 1.5
var gridX, gridY;

var Scores = {};
Scores.bpm = 120;　　　　　　　　　　//BEAT PER MINUTE
Scores.ms = 60 / Scores.bpm * 1000;  //1拍の長さ(ミリ秒)
Scores.len = 16;                      //曲の拍数
Scores.time = Scores.len * Scores.ms //曲の長さ(ミリ秒)
Scores.width = Scores.len * gridWscale + gridMarginLeft //曲の長さ(px)
Scores.notes = [];

var March;

/*------------------------------------------------------------------------------
window.load
------------------------------------------------------------------------------*/
window.addEventListener('load', function(){
  //Sounds作成
  for (var i=1; i<=SoundNum; i++) {
    var tmp = '0';
    tmp += i.toString();
    var filePath = '/sounds/sound' + tmp.substr(-2) + '.mp3';
    Sounds[i-1] = new SoundClass(filePath);
  }
  
  //Scores作成
  var arr = [];
  for(var i=0; i<Scores.len; i++) arr[i] = [];
  Scores.notes = arr;
  
  //March作成
  March = new MarchClass();
  
  //createjs設定
  Canvas = document.getElementById('Canvas');
  Stage = new createjs.Stage(Canvas);
  Stage.snapPixelsEnabled = true;
  createjs.Touch.enable(Stage);
  createjs.Ticker.setFPS(30);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on('tick', TickHandler);
  
  //Winサイズ
  var winW = window.innerWidth * window.devicePixelRatio;//実寸
  //var winH = window.innerHeight * window.devicePixelRatio;//実寸
  //var style_winW = window.innerWidth + 'px';//375px
  //var style_winH = window.innerHeight + 'px';//559px
  
  //Objサイズ
  var objW = 640;
  var objH = gridHalf * SoundScale.length + gridHalf;
  var style_objW = objW / window.devicePixelRati + 'px';
  var style_objH = objH / window.devicePixelRatio + 'px';
  
  //Canvasサイズ
  Canvas.width = objW;
  Canvas.height = objH;
  Canvas.style.width = style_objW;
  Canvas.style.height = style_objH;
  Canvas.style.background = 'rgba(255,255,255,1)';
  
  //Scoreコンテナー
  ScoreBoard = new createjs.Container();
  ScoreBoard.x = gridMarginLeft;
  Stage.addChild(ScoreBoard);
  var bg = new createjs.Shape();
  bg.graphics.beginFill('rgba(255,255,255,0.1)').drawRect(0,0,objW, objH).endStroke();
  ScoreBoard.addChild(bg);
  
  //Scoreコンテナー(表示&削除用)
  ScoreLayer = new createjs.Container();
  ScoreLayer.x = ScoreLayer.defaultX = gridMarginLeft;
  ScoreLayer.width = Scores.width;
  ScoreLayer.height = objH;
  Stage.addChild(ScoreLayer);
  
  //HIT線
  var HitLine = new createjs.Shape();
  HitLine.graphics.setStrokeStyle(4);
  HitLine.graphics.beginStroke('#000');
  HitLine.graphics.moveTo(gridWscale,0);
  HitLine.graphics.lineTo(gridWscale,objH)
  HitLine.graphics.endStroke();
  Stage.addChild(HitLine);
  
  //横線
  var Xline = new createjs.Container();
  Stage.addChild(Xline);
  for(var i=1;i<SoundScale.length;i++){
    if(i%2==0 && i<11){
      var line = new createjs.Shape();
      line.graphics.setStrokeStyle(2);
      line.graphics.beginStroke('#000');
      line.graphics.moveTo(0,i*gridHalf);
      line.graphics.lineTo(objW,i*gridHalf)
      line.graphics.endStroke();
      Xline.addChild(line);
    }
  }
  
  //MouseListener
  Stage.on('click', ClickListener);
  Stage.on('dblclick',DoubleClickListener);
  
  //button
  $('#Play').on('click', function(){
    var targetX = ScoreLayer.x - Scores.width + gridMarginLeft;
    createjs.Tween.get(ScoreLayer, {override:true})
      .to({x:targetX}, Scores.time)
      .pause()
  });
  $('#Stop').on('click', function(){
    createjs.Tween.get(ScoreLayer, {override:true})
      .pause();
  });
  $('#Clear').on('click', function(){
    createjs.Tween.get(ScoreLayer, {override:true})
      .pause()
      .call(function(){
        ScoreLayer.x = gridMarginLeft;
        March.pos = 1;
      });
  });
  
  //Foundation5
  var scroll = $('#Scroll');
  scroll.on('change.fndtn.slider', function(){
    var minX = (ScoreLayer.width - ScoreLayer.defaultX)/ 100;
    var scrollX = -parseInt(scroll.attr('data-slider'));
    ScoreLayer.x = minX * scrollX + ScoreLayer.defaultX;
    //March.pos = parseInt(-scrollX / gridMarginLeft * 10) + 1;
  });
  
  //Sound読込
  Promise.all(
    //bufferロード
    Sounds.map( function(soundArr,i){ return soundArr.load() })
  ).then(
    //bufferセット
    function(resultArr){
      resultArr.map(function(buffer,i){ Sounds[i].buffer = buffer });
    }
  ).catch(
    function(err){console.log(err)}
  );
},false);
/*------------------------------------------------------------------------------
ClickListener
------------------------------------------------------------------------------*/
function ClickListener(e) {
  //e.preventDefault();
  
  var mouse = ScoreLayer.globalToLocal(Stage.mouseX, Stage.mouseY);
  
  gridX  = Math.floor(mouse.x / gridWscale);
  gridY  = Math.floor(mouse.y / gridHalf);
  //console.log(gridX,gridY)
  
  var x = gridX * gridWscale;
  var y = gridY * gridHalf;
  var r = gridHalf;
  //console.log(x,y,r)
  
  if(gridY == 13) return;//最下GreidはNG
  
  var note = gridY;
  var notes = Scores.notes[gridX];
  
  if(notes.indexOf(note) != -1) return;//同じ音階はNG
  
  notes.push(note);
  
  Sounds[0].play(gridY);
}
/*------------------------------------------------------------------------------
DoubleClickListener
------------------------------------------------------------------------------*/
function DoubleClickListener(e) {
  //e.preventDefault();
  
  var mouse = ScoreLayer.globalToLocal(Stage.mouseX, Stage.mouseY);
  
  gridX  = Math.floor(mouse.x / gridWscale);
  gridY  = Math.floor(mouse.y / gridHalf);
  //console.log(gridX,gridY)
  
  var x = gridX * gridWscale;
  var y = gridY * gridHalf;
  var r = gridHalf;
  //console.log(x,y,r)
  
  if(gridY == 13) return;//最下GreidはNG
  
  var note = gridY;
  var notes = Scores.notes[gridX];
  
  for (var i=notes.length-1; i>=0; i--) {
    if ((notes[i] & 0x3F) == gridY) {
      notes.splice(i, 1);
      Scores.notes[gridX] = notes;
      break;
    }
  }
  return;
  
}
/*------------------------------------------------------------------------------
TickHandler
------------------------------------------------------------------------------*/
function TickHandler(e) {
  
  ScoreLayer.removeAllChildren();
  
  //縦線
  var Yline = new createjs.Container();
  Yline.x -= gridHalf;
  ScoreLayer.addChild(Yline);
  for(var i=1;i<Scores.len+1;i++){
    var line = new createjs.Shape();
    line.graphics.setStrokeDash([2,2]);
    line.graphics.setStrokeStyle(2);
    line.graphics.beginStroke('#000');
    line.graphics.moveTo(i*gridWscale,0);
    line.graphics.lineTo(i*gridWscale,ScoreLayer.height)
    line.graphics.endStroke();
    Yline.addChild(line);
  }
  
  //音符表示
  var notes = Scores.notes;
  for (var i=0; i<notes.length; i++) {
    var note = Scores.notes[i];
    for (var j=0; j<note.length; j++) {

      //var timbre = note[j] >> 8;//音色
      var scale  = note[j] & 0x0F;//音階
      
      var x = i * gridWscale;
      var y = scale * gridHalf;
      var r = gridHalf;
      //console.log(x,y,r)
      
      var Mark = new createjs.Shape();
      Mark.graphics.beginFill('rgba(255,0,0,0.5)').drawCircle(x,y,r);
      Mark.regX = Mark.regY = -gridHalf;
      ScoreLayer.addChild(Mark)
    }
  }
  
  var minX = (ScoreLayer.width - ScoreLayer.defaultX) / 100;
  var scroll = -parseInt((ScoreLayer.x - 120) / minX);
  $('#Scroll').foundation('slider', 'set_value', scroll);
  
  March.play();
  
  Stage.update();
}
/*------------------------------------------------------------------------------
SoundClass
------------------------------------------------------------------------------*/
function SoundClass(filePath){
  this.filePath = filePath;
  this.diff = SoundScale;
  this.buffer = null;
}
SoundClass.prototype.play = function(scale) {
  var tmpscale = scale & 0x0F;//音階
  var semitone = this.diff[tmpscale];
  var semitoneRatio = Math.pow(2, 1/12);
  
  //半音
  if ((scale & 0x80) != 0) semitone++;
  else if ((scale & 0x40) != 0) semitone--;
  
  var source = AudioCtx.createBufferSource();
  source.buffer = this.buffer;
  source.playbackRate.value = Math.pow(semitoneRatio, semitone);
  source.connect(AudioCtx.destination);
  source.start(0);
}
SoundClass.prototype.playChord = function(noteList) {
  
  for (var i = 0; i < noteList.length; i++) {
    var scale = noteList[i] & 0x0F;//音階
    var semitone = this.diff[scale];
    var semitoneRatio = Math.pow(2, 1/12);
    
    //半音
    if ((noteList[i] & 0x80) != 0) semitone++;
    else if ((noteList[i] & 0x40) != 0) semitone--;
    
    var source = AudioCtx.createBufferSource();
    source.buffer = this.buffer;
    source.playbackRate.value = Math.pow(semitoneRatio, semitone);
    source.connect(AudioCtx.destination);
    source.start(0);
  }
};
SoundClass.prototype.schedule = function(notes) {
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
  //console.log(dic)
  for (var i in dic) {
    //Sound[i].playChord(dic[i]);
    Sounds[0].playChord(dic[i]);
  }
};
SoundClass.prototype.load = function() {
  var filePath = this.filePath;
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      AudioCtx.decodeAudioData(
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
}
/*------------------------------------------------------------------------------
MarchClass
------------------------------------------------------------------------------*/
function MarchClass() {
  this.pos = 1;
}
MarchClass.prototype.play = function() {
  
  //小節END
  //if(this.pos >= ScoreX - 1) RAF(animeStop);
  
  function scheduleAndPlay(notes) {
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
    //console.log(dic)
    for (var i in dic) {
      //Sound[i].playChord(dic[i]);
      Sounds[0].playChord(dic[i]);
    }
  }
  
  var nextBar = this.pos *-gridWscale + gridMarginLeft;

  if (ScoreLayer.x <= nextBar) {
    this.pos++;
    scheduleAndPlay(Scores.notes[this.pos-2]);
  }
};