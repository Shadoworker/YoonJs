document.addEventListener("DOMContentLoaded", function () {
  const draggableItems = document.querySelectorAll(".draggable-item");
  const draggableContainer = document.querySelector(".draggable-container");
  let activeItem = null;
  let guides = [];
  let allowSnap = true;
  let snapedHPos = false;
  let snapedHNeg = false;
  let snapedVPos = false;
  let snapedVNeg = false;



  const snapThreshold = 4; // Threshold for snapping to guides

  const sidesMatching = {

    1 : [[3,['h']],[4,['h']],[5,['h','v']],[6,['v']],[7,['v']]], // h: horizontal , v: vertical, hv: horizverti
    
    2 : [[5,['v']],[6,['v']],[7,['v']]],
    
    3 : [[1,['-h']],[5,['v']],[6,['v']],[7,['-h','v']],[8,['-h']]],
    
    4 : [[1,['-h']],[7,['-h']],[8,['-h']]],
    
    5 : [[1,['-h','-v']],[2,['-v']],[3,['-v']],[7,['-h']],[8,['-h']]],
    
    6 : [[1,['-v']],[2,['-v']],[3,['-v']]],
    
    7 : [[1,['-v']],[2,['-v']],[3,['h','-v']],[4,['h']],[5,['h']]],
    
    8 : [[3,['h']],[4,['h']],[5,['h']]],

  }

  draggableItems.forEach((item) => {
    item.addEventListener("mousedown", startDrag);
    item.addEventListener("mouseup", stopDrag);
  });

  function startDrag(e) {
    activeItem = e.target;
    document.addEventListener("mousemove", drag);
  }

  function stopDrag() {
    activeItem = null;
    document.removeEventListener("mousemove", drag);
    removeGuides();
  }

  function drag(e) {
    if (activeItem) {
      const { clientX, clientY } = e;
      activeItem.style.left = clientX - activeItem.offsetWidth / 2 + "px";
      activeItem.style.top = clientY - activeItem.offsetHeight / 2 + "px";

      removeGuides();
      showGuides();
    }
  }

  function getPresets(item)
  {
    const bounds = item.getBoundingClientRect();

    /* MODEL :
    
        1-------2-------3
        |               |
        8               4
        |               |
        7-------6-------5
    */

    var presets = {

      1 : {x : bounds.left,                     y : bounds.top},
      2 : {x : bounds.left + (bounds.width/2),  y : bounds.top},
      3 : {x : bounds.left + (bounds.width),    y : bounds.top},
      4 : {x : bounds.left + (bounds.width),    y : bounds.top + (bounds.height/2)},
      5 : {x : bounds.left + (bounds.width),    y : bounds.top + (bounds.height)},
      6 : {x : bounds.left + (bounds.width/2),  y : bounds.top + (bounds.height)},
      7 : {x : bounds.left,                     y : bounds.top + (bounds.height)},
      8 : {x : bounds.left,                     y : bounds.top + (bounds.height/2)},
    }


    return presets;

  }


  function showGuides() {

    const activePresets = getPresets(activeItem);

    draggableItems.forEach((item) => {
      if (item !== activeItem) {
        const itemPresets = getPresets(item);

        for (let i = 0; i < 8; i++) {
          
          const activeSide = activePresets[i+1];

          var matches = sidesMatching[i+1];

          for (let j = 0; j < matches.length; j++) {
            const otherSideRefs = matches[j];

            const otherSideIndex = otherSideRefs[0];
            const otherSideContactTypes = otherSideRefs[1];
            const otherSide = itemPresets[otherSideIndex];

            otherSideContactTypes.forEach(ctype => {
            
              compareSide(itemPresets, activeSide, otherSide, ctype);
              
            });
            
          }
         
        }
        
      }
    });

    // ---------------------------------------  Container presets  ------------------------------------------
    
    if(Math.abs(activePresets[2].x - (draggableContainer.clientWidth / 2)) < snapThreshold)
    {
        showVerticalGuide((draggableContainer.clientWidth / 2), 0, (draggableContainer.clientHeight), true);
        
        var snapPos = (((draggableContainer.clientWidth / 2)-(activeItem.getBoundingClientRect().width/2)));
        snapAt('v', snapPos);

    }

    if(Math.abs(activePresets[8].y - (draggableContainer.clientHeight / 2)) < snapThreshold)
    {
      showHorizontalGuide(0,(draggableContainer.clientHeight / 2), (draggableContainer.clientWidth), true);
      
      var snapPos = (((draggableContainer.clientHeight / 2)-(activeItem.getBoundingClientRect().height/2)));
      snapAt('h', snapPos);

    }

    //--------------------------------------------------------------------------------------------------------

  }


  function compareSide(itemPresets, side1, side2, type)
  {
    if(type == 'h')
    {   
      if(Math.abs(side1.y - side2.y) < snapThreshold && (side1.x >= side2.x))
      {
        showHorizontalGuide(side2.x, side2.y, distance(side1.x, side2.x));

        if(!snapedHPos)
        {  
          var snapPos = side1.y;
          // snapAt('h', snapPos, 0);
          snapedHPos = true;
        }
      }
      else
      {
        snapedHPos = false;
      }

    }

    if(type == '-h')
    {   
      if(Math.abs(side1.y - side2.y) < snapThreshold && (side1.x < side2.x))
      {
        showHorizontalGuide(side1.x, side1.y, distance(side1.x, side2.x));

        // var snapPos = (((draggableContainer.clientWidth / 2)-(activeItem.getBoundingClientRect().width/2)));
        // snapAt('v', snapPos);
      }
    }

    if(type == 'v')
    {   
      if(Math.abs(side1.x - side2.x) < snapThreshold && (side1.y >= side2.y))
      {
        showVerticalGuide(side2.x, side2.y, distance(side1.y, side2.y));

        // var snapPos = (((draggableContainer.clientWidth / 2)-(activeItem.getBoundingClientRect().width/2)));
        // snapAt('v', snapPos);
      }
    }

    if(type == '-v')
    {   
      if(Math.abs(side1.x - side2.x) < snapThreshold && (side1.y < side2.y))
      {
        showVerticalGuide(side1.x, side1.y, distance(side1.y, side2.y));

        // var snapPos = (((draggableContainer.clientWidth / 2)-(activeItem.getBoundingClientRect().width/2)));
        // snapAt('v', snapPos);
      }
    }
  
  }

  function distance(a,b)
  {
    return Math.abs(a - b);
  }



  function showVerticalGuide(x, y, length, isContainer = false) {
    const guide = createGuideLine('v', x, y, length, isContainer);
    guides.push(guide);

    const distance = length;
    displayDistance(x, y, (distance));
  }

  function showHorizontalGuide(x, y, length, isContainer = false) {
    const guide = createGuideLine('h', x, y, length, isContainer);
    guides.push(guide);

    const distance = length;
    displayDistance(x, y, (distance));
  }

  function createGuideLine(type, x, y, length, isContainer = false) {
    const guide = document.createElement("div");
    guide.classList.add("guide-line");

    if (type == 'h') {
      guide.style.width = length + "px";
    } else {
      guide.style.height = length + "px";
    }

    if (isContainer) {
      guide.style.borderColor = "#ff00007b";
    }


    guide.style.left = x + "px";
    guide.style.top = y + "px";
    draggableContainer.appendChild(guide);
    return guide;
  }

  function removeGuides() {
    guides.forEach((guide) => guide.remove());
    guides.length = 0;
    const distanceElements = document.querySelectorAll(".guide-distance");
    distanceElements.forEach((el) => el.remove());
  }

  function snapAt(type, pos, diff = 0)
  {
    if(allowSnap)
      if(type == 'h')
      {
        activeItem.style.top = (pos-diff) + "px";
      }
      if(type == 'v')
      {
        activeItem.style.left = pos + "px";
      }
  
  }

  function displayDistance(targetLeft, targetTop, distance) {
    const distanceEl = document.createElement("div");
    distanceEl.classList.add("guide-distance");
    distanceEl.style.left = `${targetLeft}px`;
    distanceEl.style.top = `${targetTop}px`;
    distanceEl.textContent = distance.toFixed(1);
    draggableContainer.appendChild(distanceEl);
  }



});

