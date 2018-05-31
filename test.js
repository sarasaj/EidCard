
var canvas = this.__canvas  = new fabric.Canvas('c', {
  preserveObjectStacking: true,
});
canvas.setHeight(500);
canvas.setWidth(500);
// Define an array with all fonts
var fonts = ["Changa", "El Messiri", "Lalezar", "Lemonada" , "Amiri" , "Cairo" , "Pacifico" , "Tajawal"];
//text align
var align = ["left", "center", "right" , "justify"];
var el = document.getElementById('res');
// Populate the fontFamily select
var select = document.getElementById("font-family");
//append typography to images div for drag and drop
for (var i = 1; i <= 25; i++) {
  $('#images').append('<img draggable="true" src="eid designs/25 typography/MKH_'+i+'-01.png" class="typo img-responsive" onclick="addTypo(this)"></img>');
}
//append bg images
for (var i = 1; i <= 16; i++) {
  $('#backgrounds').append('<img onclick="changeIt(this)" class="bg img-responsive" src="eid designs/backgrounds/'+i+'.jpg" />');
}

fabric.Image.fromURL('eid designs/backgrounds/12.jpg', function(myImg) {
 var img1 = myImg.set({
  left: 0, top: 0 ,width:500,height:500,
  lockMovementX:true,
  lockMovementY:true,
 });
 canvas.add(img1);
});
box = new fabric.IText('..اكتب إسمك هنا', {
      left: 160,
      top: 430,
      fontFamily: 'arial black',
      fill: '#ffffff',
      fontSize: 30,
      textAlign: 'right'
});
canvas.add(box).setActiveObject(box);
fonts.unshift('Times New Roman');
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
      console.log("font added");
    }).catch(function(e) {
      console.log(e)
          });
}
fonts.forEach(function(font) {
  loadAndUse(font);
  var option = document.createElement('option');
  option.innerHTML = font;
  option.value = font;
  select.appendChild(option);
});
//editing tools
function Addtext() {
box = new fabric.IText('..اكتب إسمك هنا', {
      left: 150,
      top: 400,
      fontFamily: 'arial black',
      fill: '#ffffff',
      fontSize: 30,
      textAlign: 'center'
});
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
document.getElementById('bold').onclick = function() {
    box.set({fontWeight : "bold"});
    canvas.renderAll();
    };
document.getElementById('italic').onclick = function() {
    box.set({fontStyle : "italic"});
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
  img.onload = function(){
   newTab.document.body.append(img);
  }
  img.src = canvas.toDataURL();
  img.src.download = "mypainting1";

});
// download png
var link = document.createElement('a');
    link.innerHTML = '<a href="#" class="btn btn-danger btn-md" id="download"><i class="fas fa-download"></i> تحميل الصورة</a>';
link.addEventListener('click', function(ev) {
    link.href = canvas.toDataURL();
    link.download = "mypainting.png";
}, false);
$(".downloadTap").append(link);

//drag and drop
function handleDragStart(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    this.classList.add('img_dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
    // NOTE: comment above refers to the article (see top) -natchiketa

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    var img = document.querySelector('#images img.img_dragging');
    console.log('event: ', e);

    var newImage = new fabric.Image(img, {
        width: 341,
        height: 341,
        // Set the center of the new object based on the event coordinates relative
        // to the canvas container.
        left: e.layerX,
        top: e.layerY
    });
    canvas.add(newImage);

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}

if (Modernizr.draganddrop) {
    // Browser supports HTML5 DnD.

    // Bind the event listeners for the image elements
    var images = document.querySelectorAll('#images img');
    [].forEach.call(images, function (img) {
        img.addEventListener('dragstart', handleDragStart, false);
        img.addEventListener('dragend', handleDragEnd, false);
    });
    // Bind the event listeners for the canvas
    var canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);
} else {
    // Replace with a fallback to a library solution.
    alert("This browser doesn't support the HTML5 Drag and Drop API.");
}

//delete active object on canvas
function deleteObj(){
 canvas.remove(canvas.getActiveObject());
}

function addImage(imgLink) {
    fabric.Image.fromURL(imgLink, function(img) {
        img.set({ 'left': 50 });
        img.set({ 'top': 50 });
        img.scaleToWidth(100);
        img.scaleToHeight(100);

        var objs = canvas.getObjects();
        if (objs.length) {
            objs.forEach(function(e) {
                if (e && e.type === 'image' & e.width >= 350) {
                    e._element.src = imgLink;
                    canvas.renderAll();
                }
            });
        } else canvas.add(img);
    });
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
current = 0
currentimg = ""
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

  var newImage = new fabric.Image(img, {
        width: 341,
        height: 341,
        left:80,
        top:100
    });
    canvas.add(newImage).setActiveObject(newImage);
    current++;
}

jQuery(document).ready(function() {
  jQuery('.tabs .tab-links a').on('click', function(e) {
    var currentAttrValue = jQuery(this).attr('href');
    // Show/Hide Tabs
    jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
    // Change/remove current tab to active
    jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
    e.preventDefault();

    // Show/Hide Tabs
    jQuery('.tabs ' + currentAttrValue).slideDown(400).siblings().slideUp(400);
  });
});
 // range slider handlers
 var elem = document.querySelector('input[type="range"]');

 var rangeValue = function(){
   var newValue = elem.value;
   var target = document.querySelector('.value');
   target.innerHTML = newValue;
 }

 elem.addEventListener("input", rangeValue);
