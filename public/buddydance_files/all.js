/*
$(function(){
	// initialize widget on a container, passing in all the defaults.
	// the defaults will apply to any notification created within this
	// container, but can be overwritten on notification-by-notification
	// basis.
	$container = $("#container").notify();
    function create( template, vars, opts ){
            $container = $("#container").notify();
            return $container.notify("create", template, vars, opts);
    }
	
	// create two when the pg loads
	create("default", { title:'Default Notification', text:'Example of a default notification.  I will fade out after 5 seconds'});
});
*/
//add to lag counter
var localWidth=320;
var localHeight=240;
var bandwidthConstraint=200;
var lagEstimate= new Array();
var lagCount=0;
var lagTime=0;
var parSec=0;
var countDown=6;
var countdownInterval;
var interval;
var CurrentVol=1;
var webrtc;

function countLag() {
      parSec++;
}


//lag average
function lagAverage() {
      lagTime=150;
      if (lagCount==3) {
            lagTime=(lagEstimate[0]+lagEstimate[1]+lagEstimate[2]+lagEstimate[3])/4/2;
      }
      return lagTime;
}

//send lag request
function getLag() {
      webrtc.webrtc.sendToAll('lagRequest',{});
      parSec=0;
      clock=setInterval("countLag()",5);
}

//add to lag counter
function countLag() {
      parSec++;
}

function doSomething(el) {
            //console.log("doSomething called: "+el.value);
            ytplayer.cueVideoById({videoId:el.value, startSeconds:0, suggestedQuality:"medium"});
            webrtc.webrtc.sendToAll('switch',el.value);
            //console.log("success?");
      }

//sender directions to play
function playYoutube() {
      webrtc.webrtc.sendToAll('play',{});
      //ytplayer.style.opacity=.25;
      console.log('buttonclicked');
      //wait to attempt to synchronize... replace with communications on both at some point
      lagTime=lagAverage();
      swapButton('btnPlay','btnPause');

      document.getElementById('countdownDiv').style.marginTop="25px";
      document.getElementById('countdownDiv').style.display="inline";
      document.getElementById('countdownDivBack').style.display="inline";

      if (ytplayer.getCurrentTime()>0) {
            countDown=4;
            document.getElementById('countdownDiv').innerHTML ="";
      } else {
            countDown=6;
            document.getElementById('countdownDiv').innerHTML = "<img src='buddydance_files/text_prepare.png' />";
      }

      interval = setInterval(function() {
                  // console.log('running');
                  --countDown;
                  if (countDown <= 0) {
                        //document.getElementById('countdownDiv').innerHTML = 'You are ready';
                        window.clearInterval(interval);
                        document.getElementById('countdownDiv').style.display="none";
                        document.getElementById('countdownDivBack').style.display="none";
                        //ytplayer.style.opacity=1;
                        setTimeout(ytplayer.playVideo(),lagTime);
                        //countDown=6;
                  } else {
                        document.getElementById('countdownDiv').style.marginTop="0px";
                        document.getElementById('countdownDiv').innerHTML = "<img src='buddydance_files/"+countDown+".png' />";
                        if (countDown==5) {
                              //code
                              ytplayer.playVideo();
                              ytplayer.pauseVideo();
                        }
                  }
                  }, 1000);
}


      

//sender directions to pause
function pauseYoutube() {
      webrtc.webrtc.sendToAll('pause',{});
      //pause after delay to attemp to synchroniz
      setTimeout(ytplayer.pauseVideo(),lagTime);
      //console.log(ytplayer.getCurrentTime());
      //ytplayer.style.opacity=1;
      if (!!interval) {
            window.clearInterval(interval);
            document.getElementById('countdownDiv').style.display="none";
            document.getElementById('countdownDivBack').style.display="none";
      }
      webrtc.webrtc.sendToAll('youTubeStatus',{paused:true,time:ytplayer.getCurrentTime()})
      webrtc.webrtc.sendToAll('pause',{});
}

$( document ).ready(function() {
    function swapButton(eClicked,eReplace) {
            //code
            document.getElementById(eClicked).style.visibility="hidden";
            document.getElementById(eReplace).style.visibility="visible";
      }
      
      //set localVideoConstraints (chrome only)

      /*
      var socket = io();
      socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
      }); */

          

      //sender directions to play
function playYoutube() {
      webrtc.webrtc.sendToAll('play',{});
      //ytplayer.style.opacity=.25;
      console.log('buttonclicked');
      //wait to attempt to synchronize... replace with communications on both at some point
      lagTime=lagAverage();
      swapButton('btnPlay','btnPause');

      document.getElementById('countdownDiv').style.marginTop="25px";
      document.getElementById('countdownDiv').style.display="inline";
      document.getElementById('countdownDivBack').style.display="inline";

      if (ytplayer.getCurrentTime()>0) {
            countDown=4;
            document.getElementById('countdownDiv').innerHTML ="";
      } else {
            countDown=6;
            document.getElementById('countdownDiv').innerHTML = "<img src='buddydance_files/text_prepare.png' />";
      }

      interval = setInterval(function() {
                  // console.log('running');
                  --countDown;
                  if (countDown <= 0) {
                        //document.getElementById('countdownDiv').innerHTML = 'You are ready';
                        window.clearInterval(interval);
                        document.getElementById('countdownDiv').style.display="none";
                        document.getElementById('countdownDivBack').style.display="none";
                        //ytplayer.style.opacity=1;
                        setTimeout(ytplayer.playVideo(),lagTime);
                        //countDown=6;
                  } else {
                        document.getElementById('countdownDiv').style.marginTop="0px";
                        document.getElementById('countdownDiv').innerHTML = "<img src='buddydance_files/"+countDown+".png' />";
                        if (countDown==5) {
                              //code
                              ytplayer.playVideo();
                              ytplayer.pauseVideo();
                        }
                  }
                  }, 1000);
}


      

//sender directions to pause
function pauseYoutube() {
      webrtc.webrtc.sendToAll('pause',{});
      //pause after delay to attemp to synchroniz
      setTimeout(ytplayer.pauseVideo(),lagTime);
      //console.log(ytplayer.getCurrentTime());
      //ytplayer.style.opacity=1;
      if (!!interval) {
            window.clearInterval(interval);
            document.getElementById('countdownDiv').style.display="none";
            document.getElementById('countdownDivBack').style.display="none";
      }
      webrtc.webrtc.sendToAll('youTubeStatus',{paused:true,time:ytplayer.getCurrentTime()})
      webrtc.webrtc.sendToAll('pause',{});
}


      //toggle local
      toggleLocalButton = document.getElementById("toggleLocalButton");
      toggleLocalButton.value =1;
      toggleLocalButton.onclick = function() {
            thisVideo=document.getElementById("localVideo");
            transform(thisVideo,this.title);
            this.title=this.title*-1;
      };
      
      //toggle remotes
      toggleRemotesButton = document.getElementById("toggleRemotesButton");
      toggleRemotesButton.value=-1;
      toggleRemotesButton.onclick=function() {
            thisVideo=document.getElementById("remotes");
            transform(thisVideo,this.title);
            this.title=this.title*-1;
      };

      
      toggleRemotesButton.click();
      function transform(e,d) {
            e.style.webkitTransform="scaleX("+d+")";
            e.style.MozTransform="scaleX("+d+")";
            e.style.Transform="scaleX("+d+")";
      }
      
      

      
      
      $('#btnPlay').on('click', function(){
        getLag();
        playYoutube();
      });
  
      $('#btnPause').on('click', function(){
        pauseYoutube();
        swapButton('btnPause','btnPlay');
      });
  
      
      webrtc = new SimpleWebRTC({
            // the id/element dom element that will hold "our" video
            localVideoEl: 'localVideo',
            // the id/element dom element that will hold remote videos
            remoteVideosEl: 'remotes',
            // immediately ask for camera access
            autoRequestMedia: true,
            muted: true,
            log: true
            //mirror: true
      });
      
      webrtc.config.peerVolumeWhenSpeaking=0;
      webrtc.webrtc.config.autoAdjustMic=false;
      
      //receiver plays based on directions
      webrtc.connection.on('message',function(message) {
            //uncomment to show message alerts (testing only)
            //alert(JSON.stringify(message));
            if(message.type=='play') {
                  //ytplayer.style.opacity=0.5;
                  document.getElementById('countdownDivBack').style.display="inline";
                  if (ytplayer.getCurrentTime()>0) {
                        countDown=4;
                        document.getElementById('countdownDiv').innerHTML ="";
                  } else {
                        countDown=6;
                        document.getElementById('countdownDiv').innerHTML = "<img src='buddydance_files/text_prepare.png' />";
                        document.getElementById('countdownDiv').style.marginTop="25px";
                  }

                  document.getElementById('countdownDiv').style.display="inline";
                  swapButton('btnPlay','btnPause');
                  interval = setInterval(function() {
                                    //console.log('running');
                                    //document.getElementById('countdownDiv').style.display="inline";
                                    --countDown;
                                    if (countDown <= 0) {
                                          window.clearInterval(interval);
                                          document.getElementById('countdownDiv').style.display="none";
                                          document.getElementById('countdownDivBack').style.display="none";
                                          //ytplayer.style.opacity=1;
                                          ytplayer.playVideo();
                                    //countDown=6;
                                    } else {
                                          //document.getElementById('countdownDivBack').style.display="inline";
                                          document.getElementById('countdownDiv').style.marginTop="0px";
                                          document.getElementById('countdownDiv').innerHTML = "<img src='buddydance_files/"+countDown+".png'/>";
                                          if (countDown==5) {
                                                //code
                                                ytplayer.playVideo();
                                                ytplayer.pauseVideo();
                                                getLag();
                                          }
                                    }
                        }, 1000);
            } else if(message.type=='pause') {
                  //alert('pause video');
                  ytplayer.pauseVideo();
                  //ytplayer.style.opacity=1;
                  swapButton('btnPause','btnPlay');
                  if (!!interval) {
                        window.clearInterval(interval);
                        document.getElementById('countdownDiv').style.display="none";
                        document.getElementById('countdownDivBack').style.display="none";
                  }
                  //console.log(ytplayer.getCurrentTime());
                  webrtc.webrtc.sendToAll('youTubeStatus',{paused:true,time:ytplayer.getCurrentTime()});
            } else if (message.type=='switch') {
                  //code
                  //console.log(message.payload);
                  ytplayer.cueVideoById({videoId:message.payload, startSeconds:0, suggestedQuality:"medium"});
            } else if (message.type=='lagRequest') {
                  //code
                  //console.log(message.type+" Received");
                  webrtc.webrtc.sendToAll('lagResponse',{});
            } else if (message.type=='lagResponse') {
                  lagEstimate[lagCount]=parSec;
                  window.clearInterval(clock);
                  //console.log(message.type+" Received\\\n"+lagEstimate[lagCount]);
                  lagCount++;
                  if (lagCount<=3) {
                        getLag();
                  }
            } else if (message.type=='youTubeStatus') {

                  console.log(message.payload);
                  if (message.payload.time && message.payload.time < ytplayer.getCurrentTime()) {
                        ytplayer.seekTo(message.payload.time);
                  }
            }
      });

      if (location.search.indexOf('?')!=-1) {
            var room = location.search && location.search.split('?')[1];
            room = room.toLowerCase();
      } else {
            var room = "default";
      }


      // when it's ready, join if we got a room from the URL
      webrtc.on('readyToCall', function () {
                  // you can name it anything
                  if (room) webrtc.joinRoom(room);
                  //webrtc.webrtc.gainController.gain=1;
                  webrtc.webrtc.peers.reverse();
                  webrtc.setVolumeForAll(75);
                  d4hVideoEl=document.getElementById("localVideo");
                  console.log("Width: "+d4hVideoEl.videoWidth+"\\\n Height: "+d4hVideoEl.videoHeight);
                  //mute the local video element audio (possibly fix the firefox feedback issue)
                  d4hVideoEl.volume=0;
      });
      // Since we use this twice we put it here
      function setRoom(name) {
            $('form').remove();
            $('h1').text("Dance4Healing");
            $('#subTitle').text('Link to join: ' + location.href);
            $('body').addClass('active');
      }

      if (room) {
            setRoom(room);
      } else {
            $('form').submit(function () {
                  var val = $('#sessionInput').val().toLowerCase().replace(/\\\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
                  webrtc.createRoom(val, function (err, name) {
                        var newUrl = location.pathname + '?' + name;
                        if (!err) {
                              history.replaceState({foo: 'bar'}, null, newUrl);
                              setRoom(name);
                        }
                  });
                  return false;
            });
      }
      
      startButton=document.getElementById("startButton");
      stopButton=document.getElementById("stopButton");
      //start Video (*****doesn't work yet*****)
      startButton.onclick=function () {
            webrtc.joinRoom(location.search && location.search.split('?')[1]);
      };
      //stopButton (works, but doesn't allow restart without refresh)
      stopButton.onclick=function () {
            webrtc.webrtc.localStream.stop();
            webrtc.webrtc.mute();document.getElementById("localVideo").src=null;
      };
      
      //leaveRoom (works)
      leaveButton.onclick=function () {
            webrtc.leaveRoom();
      };

      pauseButton=document.getElementById("pauseButton");
      resumeButton=document.getElementById("resumeButton");
      pauseButton.onclick=function(){
            webrtc.webrtc.pause();
            localVideo.style.opacity="0.5";
            this.style.visibility="hidden";resumeButton.style.visibility="visible"
      };

      resumeButton.onclick=function(){
            webrtc.webrtc.resume();
            localVideo.style.opacity="1.0";
            this.style.visibility="hidden";
            pauseButton.style.visibility="visible"
      };
});    
