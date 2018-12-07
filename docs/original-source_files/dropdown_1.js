// Copyright (C) 2005-2008 Ilya S. Lyubinskiy. All rights reserved.
// Technical support: http://www.php-development.ru/
//
// YOU MAY NOT
// (1) Remove or modify this copyright notice.
// (2) Re-distribute this code or any part of it.
//     Instead, you may link to the homepage of this code:
//     http://www.php-development.ru/javascripts/dropdown.php
//
// YOU MAY
// (1) Use this code on your website.
// (2) Use this code as part of another product.
//
// NO WARRANTY
// This code is provided "as is" without warranty of any kind.
// You expressly acknowledge and agree that use of this code is at your own risk.


// ***** Popup Control *********************************************************

// ***** at_show_aux *****

var ObjP;
var ObjC;

function at_show_aux(parent, child)
{
  var p = ObjP; // document.getElementById(parent);
  var c = ObjC; // document.getElementById(child );
  
  if ((typeof(c)!="object") || (typeof(p)!="object"))
  {
   return;
  }

  var top  = (c["at_position"] == "y") ? p.offsetHeight+2 : 0;  //remove 06/aug/2013 distance in second level H menu item
  var left = (c["at_position"] == "x") ? p.offsetWidth+2: 0;

 // top = parseInt(p.offsetHeight) + parseInt(p.height);

  for (; p; p = p.offsetParent)
  {
    top += p.offsetTop - 1; //remove 06/aug/2013
    left += p.offsetLeft;
  }

  c.style.position   = "absolute";
  
  c.style.top = top + 'px'; //remove 06/aug/2013

  c.style.left       = left+'px';
  c.style.visibility = "visible";
  c.style.display = "";
}

// ***** at_show *****

function at_show()
{
  var p = ObjP; // document.getElementById(this["at_parent"]);
  var c = ObjC; // document.getElementById(this["at_child" ]);
  
  if ((typeof(c)!="object") || (typeof(p)!="object"))
  {
   return;
  }
  //at_show_aux(p.id, c.id);
  at_show_aux(p, c);
  clearTimeout(c["at_timeout"]);
}

function at_showParent()
{
  var p = document.getElementById(this["at_parent"]);
  var c = document.getElementById(this["at_child" ]);

  ObjP = p;
  ObjC = c;
 
  at_show_aux(p.id, c.id);
  clearTimeout(c["at_timeout"]);
}

// ***** at_hide *****

function at_hide()
{
  var p = document.getElementById(this["at_parent"]);
  var c = document.getElementById(this["at_child" ]);

  c["at_timeout"] = setTimeout("document.getElementById('"+c.id+"').style.visibility = 'hidden'", 300);
}

// ***** at_click *****

function at_click()
{
  var p = document.getElementById(this["at_parent"]);
  var c = document.getElementById(this["at_child" ]);


  if (c.style.visibility != "visible") at_show_aux(p, c); else c.style.visibility = "hidden";
  return false;
}

// ***** at_attach *****

// PARAMETERS:
// parent   - id of the parent html element
// child    - id of the child  html element that should be droped down
// showtype - "click" = drop down child html element on mouse click
//            "hover" = drop down child html element on mouse over
// position - "x" = display the child html element to the right
//            "y" = display the child html element below
// cursor   - omit to use default cursor or specify CSS cursor name

function at_attach(parent, child, showtype, position, cursor)
{
  var p = document.getElementById(parent);
  var c = document.getElementById(child);

  p["at_parent"]     = p.id;
  c["at_parent"]     = p.id;
  p["at_child"]      = c.id;
  c["at_child"]      = c.id;
  p["at_position"]   = position;
  c["at_position"]   = position;

  c.style.position = "absolute";
  c.style.visibility = "hidden";
  c.style.display = "none"
  
  if (cursor != undefined) p.style.cursor = cursor;

  switch (showtype)
  {
    case "click":
      p.onclick     = at_click;
      p.onmouseout  = at_hide;
      c.onmouseover = at_show;
      c.onmouseout  = at_hide;
      break;
    case "hover":
      p.onmouseover = at_showParent;
      p.onmouseout  = at_hide;
      c.onmouseover = at_show;
      c.onmouseout = at_hide;
      c.onmousemove = at_show;
      break;
  }
}

function setchildwidth(parent,child)
{


/////////////////////////////////////////
    
var a = document.getElementById(parent);
var b = document.getElementById(child);
//alert(a.width);
//alert(a.offsetWidth);
//alert(b.width);
//alert(b.offsetWidth);
 
 b.width=a.clientWidth; //a.width ;
 b.style.width = a.clientWidth + 'px';
}