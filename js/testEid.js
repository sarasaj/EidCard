var canvas = this.__canvas  = new fabric.Canvas('c', {
  preserveObjectStacking: true
  // selection : false,
  // controlsAboveOverlay:true,
  // centeredScaling:true,
  // allowTouchScrolling: true
});
var winW = $(window).width(),
    winH = $(window).height(),
    canW = winW - 75,
    canH = canW;

    if(canW>500) {
      canW=500;
      canH=500;
    }
canvas.setWidth(canW);
canvas.setHeight(canH);
canvas.calcOffset();
console.log("canW :"+canH+" winW:"+winW);
canvas.renderAll();

// Define an array with all fonts
var fonts = ["Changa", "El Messiri", "Lalezar", "Lemonada" , "Amiri" , "Cairo" , "Pacifico" , "Tajawal"];
//text align
var align = ["left", "center", "right" , "justify"];
var el = document.getElementById('res');
// Populate the fontFamily select
var select = document.getElementById("font-family");
//append typography to images div for drag and drop
for (var i = 1; i <= 25; i++) {
  $('#images').append('<img src="./eid designs/25 typography/MKH_'+i+'-01.png" class="typo img-responsive" onclick="addTypo(this)"></img>');
}
//append bg images
for (var i = 1; i <= 16; i++) {
  $('#backgrounds').append('<img onclick="changeIt(this)" class="bg img-responsive" src="./eid designs/backgrounds/'+i+'.jpg" />');
}

fabric.Image.fromURL('./eid designs/backgrounds/12.jpg', function(myImg) {
 var img1 = myImg.set({
  left: 0, top: 0 ,
  width:500,
  height:500,  
  lockMovementX:true,
  lockMovementY:true,
  lockUniScaling:true,
  lockRotation:true,
  hasControls:false,
  

 });
//  img.scaleToWidth(canvas.getWidth());
//  img.scaleToHeight(canvas.getHeight());
 console.log("in set bg image")
 canvas.add(img1).sendToBack();
 canvas.renderAll();
},{crossOrigin:'Anonymous'});
box = new fabric.IText('..اكتب إسمك هنا', {
      left: 160,
      top: 430,
      fontFamily: 'arial black',
      fill: '#ffffff',
      fontSize: 30,
      textAlign: 'right'
});
canvas.add(box).setActiveObject(box).bringToFront();
fonts.unshift('Times New Roman');
var url = "images/elearn_logo2.png";
var img = new Image();
img.setAttribute('crossOrigin', 'anonymous');
img.src = url;
addLogo(img);
canvas.renderAll();
// Apply selected font on change
document.getElementById('font-family').onchange = function() {
  if (this.value !== 'Times New Roman') {
    loadAndUse(this.value);
  } else {
    canvas.getActiveObject().set("fontFamily", this.value);
    canvas.requestRenderAll();
  }
};
// load fonts for text box

function loadAndUse(font) {
  var myfont = new FontFaceObserver(font)
  myfont.load()
    .then(function() {
      // when font is loaded, use it.
      var active = canvas.getActiveObject();
      active.set("fontFamily", font);
      canvas.requestRenderAll();
      active.bringToFront();
      //console.log("font added");
    }).catch(function(e) {
      console.log(e)
          });
}
fonts.forEach(function(font) {
  loadAndUse(font);
  $("#myDropdown").append("<a class='fonttag' style='font-family:'"+font+"';'>"+font+" اختر الخط المناسب "+"</a>");

  var option = document.createElement('option');
  option.innerHTML = font;
  option.value = font;
  select.appendChild(option);
});
//editing tools
function Addtext() {
box = new fabric.IText('..اكتب إسمك هنا', {
      left: canH/(3.3),
      top: canH/(1.25),
      fontFamily: 'arial black',
      fill: '#ffffff',
      fontSize: 30,
      textAlign: 'center',
      controlsAboveOverlay: true
});
console.log("position:"+canH/(1.25)+"left "+canH/(3.3));
canvas.add(box).setActiveObject(box);
console.log(canvas.getActiveObject());
}
//coloring

document.getElementById('jstextcolor').onchange = function() {
      box.set({fill: "#"+this.value});
      canvas.renderAll();
      };

//font family
document.getElementById('font-family').onchange = function() {
    box.set({fontFamily: this.value});
    canvas.renderAll();
    };

//size
document.getElementById('text-font-size').onchange = function() {
    box.set({fontSize: this.value});
    canvas.renderAll();
    };
document.getElementById('jstextbgcolor').onchange = function() {
      box.set({backgroundColor: "#"+this.value});
      canvas.renderAll();
      };
var bold = false;
document.getElementById('bold').onclick = function() {

    if(bold == false){
      box.set({fontWeight : "bold"});
      console.log("bold");
      bold = true;
    } else {
      box.set({fontWeight : "normal"});
      console.log("bold");
      bold = false;
    }

    canvas.renderAll();
    };
var italic = false;
document.getElementById('italic').onclick = function() {
  if(bold == false){
    box.set({fontWeight : "italic"});
    bold = true;
  } else {
    box.set({fontWeight : "normal"});
    bold = false;
  }
    canvas.renderAll();
    };
//align
document.getElementById('justify').onclick = function() {
    box.set({textAlign : "justify"});
    canvas.renderAll();
    };
document.getElementById('center').onclick = function() {
  box.set({textAlign : "center"});
  canvas.renderAll();
};
document.getElementById('left').onclick = function() {
  box.set({textAlign : "left"});
  canvas.renderAll();
};
document.getElementById('right').onclick = function() {
  box.set({textAlign : "right"});
  canvas.renderAll();
};
// save png
$(document).on("click", "#savepng", function() {
  var newTab = window.open();
  var img  = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function(){
   newTab.document.body.append(img);
  }
  img.src = canvas.toDataURL();
  img.src.download = "mypainting1";

});
// download png
document.getElementById('download').addEventListener('click', function() {
    var link = this;
    link.href = canvas.toDataURL();
    link.download = "test.jpg";
}, false);

//delete active object on canvas
function deleteObj(){
 canvas.remove(canvas.getActiveObject());
}

function addImage(imgLink) {
    fabric.Image.fromURL(imgLink, function(img) {
        img.set( { 
          left: 0, 
          top: 0 ,
          width:500,
          height:500,
        });
        // img.scaleToWidth(canvas.getWidth());
        // img.scaleToHeight(canvas.getheight());
        // console.log("scale 1");
        img.crossOrigin = "Anonymous";
        var objs = canvas.getObjects();
        if (objs.length) {
            objs.forEach(function(e) {
                if (e && e.type === 'image' & e.width >= 350) {
                    e._element.src = imgLink;
                    canvas.renderAll();
                }
            });
        } else canvas.add(img);
    },{crossOrigin:'Anonymous'});
}

// file upload
var span = document.querySelector('#span');
span.onchange = function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(file) {
        addImage(file.target.result);
    }
    reader.readAsDataURL(file);
}
//change canvas bg
function changeIt(img) {
  var name = img.src;
  addImage(name)
}
current = 0;
currentLogo = 0;
currentimg = ""
// add typography
function addTypo(img) {

  if(current > 0){
    var activeObj = canvas.getActiveObject();
    canvas.getObjects().forEach(function (targ) {
      if(targ.isType('image')& targ.width == 341){
        console.log(targ);
        canvas.remove(targ);
      }
    });
  }

  var newImage = new fabric.Image(img, 
    {
        width: 341,
        height: 341,
        left:80,
        top:100,

    });
    canvas.add(newImage).setActiveObject(newImage);
    current++;
}

 // range slider handlers
 var elem = document.querySelector('input[type="range"]');

 var rangeValue = function(){
   var newValue = elem.value;
   var target = document.querySelector('.value');
   target.innerHTML = newValue;
 }

 elem.addEventListener("input", rangeValue);
//allowTouchScrolling
 var disableScroll = function(){
   canvas.allowTouchScrolling = false;
 };

 var enableScroll = function(){
   canvas.allowTouchScrolling = true;
 };

 canvas.on('object:moving', disableScroll);
 canvas.on('object:scaling', disableScroll);
 canvas.on('object:rotating', disableScroll);
 canvas.on('object:rotating', disableScroll);
//  canvas.on({
//   'touch:gesture': enableScroll,
//   'touch:drag': enableScroll
//   });
 canvas.on('mouse:up', enableScroll);
//  canvas.on('mouse:move',function(option){
//   var pointer = canvas.getPointer(option.e);
//  });
 //alert('fabric.isTouchSupported=' + fabric.isTouchSupported)
 document.getElementById('textInput').oninput = function() {
   //console.log("text:"+this.value);
     box.set({text: this.value});
     canvas.renderAll();
     };
 canvas.on("object:selected", function(options) {
     options.target.bringToFront();
 });


 function addLogo(img) {
  var newImage = new fabric.Image(img, {
        width: 110,
        height: 58,
        left:380,
        top:20,
        // hasControls: false,
        // hasBorders: false,
        lockMovementX: true,
        lockMovementY: true
    });
    newImage.crossOrigin = "Anonymous";
    canvas.add(newImage);
    canvas.renderAll();
}

 function addElearningLogo(checkboxElem) {
  if (checkboxElem.checked) {
    // var url = "images/elearn_logo1.png";
    var url = "images/elearn_logo2.png";
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
    addLogo(img);
    
  } else {
    canvas.getObjects().forEach(function (targ) {
      if(targ.isType('image')& targ.width == 110){
        console.log(targ);
        canvas.remove(targ);
      }
    });
  }
  
}
//share 
function saveToServer(){
  var newTab = window.open();
  var img  = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function(){
   newTab.document.body.append(img);
  }
  img.src = canvas.toDataURL();
  img.src.download = "mypainting1";

  var link = this;
    link.href = canvas.toDataURL();
    link.download = "test.jpg";
}
//open tab
function openTab(evt,name){
  tabcontent = document.getElementsByClassName("tab");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";

}

// window.addEventListener('resize', function(event){
//   var winW = $(window).width(),
//       winH = $(window).height(),
//       curW = canvas.getWidth(),
//       curH = canvas.getHeight(),
//       canW = winW - 75,
//       canH = winH - 60;

//   canvas.setWidth(canW);
//   canvas.setHeight(canH);
//   canvas.renderAll();
// });