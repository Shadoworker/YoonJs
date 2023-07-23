document.addEventListener("DOMContentLoaded", function () {
  const draggableItems = document.querySelectorAll(".draggable-item");
  const draggableContainer = document.querySelector(".draggable-container");
  let activeItem = null;
  let guides = [];
  const snapThreshold = 4; // Threshold for snapping to guides

  let allowSnap = true;
  let allowDistancePreview = true;

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

      const containerBounds = draggableContainer.getBoundingClientRect();

      const offsetX = clientX - containerBounds.left;
      const offsetY = clientY - containerBounds.top;

      activeItem.style.left = offsetX - activeItem.offsetWidth / 2 + "px";
      activeItem.style.top = offsetY - activeItem.offsetHeight / 2 + "px";

      removeGuides();
      
      showGuides(containerBounds.left, containerBounds.top);

    }
  }

  

  function showGuides(x,y) {
    const activeBounds = activeItem.getBoundingClientRect();
    const centerBounds = {
      left: activeBounds.left + activeBounds.width / 2,
      top: activeBounds.top + activeBounds.height / 2,
      bottom: activeBounds.bottom,
    };

    draggableItems.forEach((item) => {
      if (item !== activeItem) {
        const itemBounds = item.getBoundingClientRect();
        const centerItem = {
          left: itemBounds.left + itemBounds.width / 2,
          top: itemBounds.top + itemBounds.height / 2,
          bottom: itemBounds.bottom,
        };

        // -----------------------------LEFT / LEFT - LEFT / RIGHT --------------------------------------

        if ((Math.abs(activeBounds.left - itemBounds.left) < snapThreshold)) {
          
          var source ,target ;
          
          var source1 = activeBounds.top - y;
          var target1 = itemBounds.bottom - y;

          var source2 = itemBounds.top - y;
          var target2 = activeBounds.bottom - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);
          
          showVerticalGuide((itemBounds.left - x), source, distance(source, target) );
          
          showDistance((itemBounds.left - x), source, source, target);

          var snapPos = (itemBounds.left - x);
          snapAt('h', snapPos);

        }
        if ((Math.abs(activeBounds.left - itemBounds.right) < snapThreshold)) {
          
           
          var source ,target ;
          
          var source1 = activeBounds.top - y;
          var target1 = itemBounds.bottom - y;

          var source2 = itemBounds.top - y;
          var target2 = activeBounds.bottom - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);
          

          showVerticalGuide((itemBounds.right - x), source, distance(source, target));
        
          showDistance((itemBounds.right - x), source, source, target);

          var snapPos = (itemBounds.right - x);
          snapAt('h', snapPos);

        }

        // --------------------------------------LEFT / CENTER -------------------------------------------

        if ((Math.abs(activeBounds.left - centerItem.left) < snapThreshold)) {
          
         
          var source ,target ;
          
          var source1 = activeBounds.bottom-y;
          var target1 = (centerItem.top);

          var source2 = (centerItem.bottom-(itemBounds.height/2));
          var target2 = activeBounds.top - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);


          showVerticalGuide((centerItem.left - x), source, distance(source, target));
          
          showDistance((centerItem.left - x), source, source, target);

          var snapPos = (centerItem.left - x);
          snapAt('h', snapPos);
        }
       
        // // --------------------------------------CENTER / LEFT -------------------------------------------

        if (Math.abs(centerBounds.left - itemBounds.left) < snapThreshold) {
          
          var source ,target ;
        
          var source1 = centerBounds.top;
          var target1 = itemBounds.bottom;

          var source2 = itemBounds.top;
          var target2 = centerBounds.top - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showVerticalGuide((itemBounds.left - x), source, distance(source, target));
          
          showDistance((itemBounds.left - x), source, source, target);

          var snapPos = ((itemBounds.left - x) - (activeBounds.width/2));
          snapAt('h', snapPos);
        }


        // // --------------------------------------RIGHT / CENTER -------------------------------------------

        if (Math.abs(activeBounds.right - centerItem.left) < snapThreshold) {
              

          var source = activeBounds.bottom-y;
          var target = (centerItem.top-(itemBounds.height/2));

          var source ,target ;
          
          var source1 = activeBounds.bottom-y;
          var target1 = (centerItem.top);

          var source2 = (centerItem.bottom-(itemBounds.height/2));
          var target2 = activeBounds.top - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);


          showVerticalGuide((centerItem.left - x), source, distance(source, target));
          
          showDistance((centerItem.left - x), source, source, target);

          var snapPos = ((centerItem.left - x) - activeBounds.width);
          snapAt('h', snapPos);

        } 


        // // --------------------------------------CENTER / RIGHT -------------------------------------------

        if (Math.abs(centerBounds.left - itemBounds.right) < snapThreshold) {
            
          var source ,target ;
        
          var source1 = centerBounds.top;
          var target1 = itemBounds.bottom;

          var source2 = itemBounds.top;
          var target2 = centerBounds.top - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showVerticalGuide((itemBounds.right - x), source, distance(source, target));
            
          showDistance((itemBounds.right - x), source, source, target);

            var snapPos = ((itemBounds.right - x) - (activeBounds.width/2));
            snapAt('h', snapPos);
          }

        // // -----------------------------RIGHT / RIGHT - RIGHT / LEFT --------------------------------------

        if ((Math.abs(activeBounds.right - itemBounds.right) < snapThreshold)) {
          
          var source ,target ;
          
          var source1 = activeBounds.top - y;
          var target1 = itemBounds.bottom - y;

          var source2 = itemBounds.top - y;
          var target2 = activeBounds.bottom - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);


          showVerticalGuide((itemBounds.right - x), source, distance(source, target));
          
          showDistance((itemBounds.right - x), source, source, target);

          var snapPos = ((itemBounds.right - x)-activeBounds.width);
          snapAt('h', snapPos);
        
        }
        
        if (Math.abs(activeBounds.right - itemBounds.left) < snapThreshold) {

          var source ,target ;
          
          var source1 = activeBounds.top - y;
          var target1 = itemBounds.bottom - y;

          var source2 = itemBounds.top - y;
          var target2 = activeBounds.bottom - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showVerticalGuide((itemBounds.left - x), source, distance(source, target));
          
          showDistance((itemBounds.left - x), source, source, target);

          var snapPos = ((itemBounds.right - x) - (itemBounds.width+activeBounds.width));
          snapAt('h', snapPos);

        }

        // // -----------------------------TOP / TOP - TOP / BOTTOM --------------------------------------

        if (Math.abs(activeBounds.top - itemBounds.top) < snapThreshold) {
          
          var source ,target ;
          
          var source1 = itemBounds.left - x;
          var target1 = activeBounds.right - x;

          var source2 = activeBounds.left - x;
          var target2 = itemBounds.right - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showHorizontalGuide((itemBounds.top - y), source, distance(source, target));
          
          showDistance((itemBounds.top - y), source, source, target);

          var snapPos = (itemBounds.top - y);
          snapAt('v', snapPos);
          
        }

        if (Math.abs(activeBounds.top - itemBounds.bottom) < snapThreshold) {
          
          var source ,target ;
          
          var source1 = activeBounds.left - x;
          var target1 = itemBounds.right - x;

          var source2 = itemBounds.left - x;
          var target2 = activeBounds.right - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          
          showHorizontalGuide((itemBounds.bottom - y), source, distance(source, target));
          
          showDistance((itemBounds.bottom - y), source, source, target);

          var snapPos = (itemBounds.bottom - y);
          snapAt('v', snapPos);
        }

        // // -----------------------------BOTTOM / BOTTOM - BOTTOM / TOP --------------------------------------

        if (Math.abs(activeBounds.bottom - itemBounds.bottom) < snapThreshold) {
          

          var source ,target ;
          
          var source1 = activeBounds.left - x;
          var target1 = itemBounds.right - x;

          var source2 = itemBounds.left - x;
          var target2 = activeBounds.right - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showHorizontalGuide((itemBounds.bottom - y), source, distance(source, target));

          // showDistance((itemBounds.bottom - y), source, source, target);

          var snapPos = ((itemBounds.bottom - y) - itemBounds.height + Math.abs(itemBounds.height-activeBounds.height));
          snapAt('v', snapPos);

        }
        
        if (Math.abs(activeBounds.bottom - itemBounds.top) < snapThreshold) {
          
          var source ,target ;
          
          var source1 = activeBounds.left - x;
          var target1 = itemBounds.right - x;

          var source2 = itemBounds.left - x;
          var target2 = activeBounds.right - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showHorizontalGuide((itemBounds.top - y), source,  distance(source, target));

          // showDistance((itemBounds.top - y), source, source, target);

          var snapPos = ((itemBounds.top - y) - itemBounds.height + Math.abs(itemBounds.height-activeBounds.height));
          snapAt('v', snapPos);
        }

        // // -----------------------------CENTER LEFT / CENTER LEFT - CENTER LEFT / CENTER RIGHT ------------------------------------------

        if ((Math.abs(centerBounds.left - centerItem.left) < snapThreshold) ) 
        {

          var source ,target ;
              
          var source1 = centerBounds.top - y;
          var target1 = centerItem.top - y;

          var source2 = centerItem.top - y;
          var target2 = centerBounds.top - y;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);
          
          showVerticalGuide((centerItem.left - x), source, distance(source, target));
          
          // showDistance((itemBounds.top - y), source, source, target);

          var snapPos = ((centerItem.left - x) - (activeBounds.width/2));
          snapAt('h', snapPos);
        }


        // // -----------------------------CENTER TOP / CENTER TOP - CENTER TOP / CENTER BOTTOM --------------------------------------

        if ((Math.abs(centerBounds.top - centerItem.top) < snapThreshold)) {
          
          var source ,target ;
              
          var source1 = centerBounds.left - x;
          var target1 = centerItem.left - x;

          var source2 = centerItem.left - x;
          var target2 = centerBounds.left - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showHorizontalGuide(centerItem.top, source, distance(source, target));
          
          var snapPos = (centerItem.top - (activeBounds.height/2));
          snapAt('v', snapPos);
        }


        // // ---------------------------------------- TOP / CENTER ----------------------------------------------------

        if ((Math.abs(activeBounds.top - centerItem.top) < snapThreshold)) {
          

          var source ,target ;
              
          var source1 = activeBounds.left - x;
          var target1 = centerItem.left - x;

          var source2 = centerItem.left - x;
          var target2 = activeBounds.right - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showHorizontalGuide(centerItem.top, source, distance(source, target));
          
          var snapPos = (centerItem.top);
          snapAt('v', snapPos);
        }
        // // ---------------------------------------- BOTTOM / CENTER ----------------------------------------------------

        if ((Math.abs(activeBounds.bottom - centerItem.top) < snapThreshold)) {
          
          var source ,target ;
              
          var source1 = activeBounds.left - x;
          var target1 = centerItem.left - x;

          var source2 = centerItem.left - x;
          var target2 = activeBounds.right - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);


          showHorizontalGuide(centerItem.top, source, distance(source, target));
          
          var snapPos = (centerItem.top - activeBounds.height);
          snapAt('v', snapPos);
        }

        // // ---------------------------------------- CENTER / TOP ----------------------------------------------------

        if ((Math.abs(centerBounds.top - itemBounds.top) < snapThreshold)) {
          
          var source ,target ;
              
          var source1 = centerBounds.left - x;
          var target1 = itemBounds.right - x;

          var source2 = itemBounds.left - x;
          var target2 = centerBounds.left - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showHorizontalGuide((itemBounds.top-y), source, distance(source, target));
          
          var snapPos = ((itemBounds.top - y) - activeBounds.height/2);
          // snapAt('h', snapPos);
        }

        // ---------------------------------------- CENTER / BOTTOM ----------------------------------------------------

        if ((Math.abs(centerBounds.top - itemBounds.bottom) < snapThreshold)) {
          
          var source ,target ;
              
          var source1 = centerBounds.left - x;
          var target1 = itemBounds.right - x;

          var source2 = itemBounds.left - x;
          var target2 = centerBounds.left - x;

          var source = Math.min(source1, source2);
          var target = Math.max(target1, target2);

          showHorizontalGuide((itemBounds.bottom-y), source, distance(source, target));
          
          var snapPos = ((itemBounds.bottom - y) - activeBounds.height/2);
          // snapAt('h', snapPos);
        }


      }
    });

    // ---------------------------------- MAIN CONTAINER  -----------------------------------------------

    if (Math.abs((centerBounds.left - x) - draggableContainer.clientWidth / 2) < snapThreshold) {
      
      showVerticalGuide(draggableContainer.clientWidth / 2, 0, (draggableContainer.clientHeight), true);

      showDistance((draggableContainer.clientWidth / 2), 0, (centerBounds.top-y), draggableContainer.clientHeight / 2);

      var snapPos = (draggableContainer.clientWidth / 2 - activeBounds.width/2);
      snapAt('h', snapPos);

    }

    if (Math.abs((centerBounds.top - y) - draggableContainer.clientHeight / 2) < snapThreshold) {
      
      showHorizontalGuide(draggableContainer.clientHeight / 2, 0, (draggableContainer.clientWidth), true);
    
      showDistance(0,(draggableContainer.clientHeight / 2), (centerBounds.left - x), draggableContainer.clientWidth / 2);

      var snapPos = (draggableContainer.clientHeight / 2 - activeBounds.height/2);
      snapAt('v', snapPos);
    
    }
  }

  function distance(a,b)
  {
    return Math.abs(a - b);
  }

  function showVerticalGuide(x, y, length, isContainer = false, color = "#6941BE") {
    const guide = createGuideLine('v', x, y, length, isContainer, color);
    guides.push(guide);

  }

  function showHorizontalGuide(y, x, length, isContainer = false, color = "#6941BE") {
    const guide = createGuideLine('h', x, y, length, isContainer, color);
    guides.push(guide);
      
  }

  function createGuideLine(type, x, y, length, isContainer = false, color = "#6941BE") {
    const guide = document.createElement("div");
    guide.classList.add("guide-line");

    if (type == 'h') {
      guide.style.width = length + "px";
    } else {
      guide.style.height = length + "px";
    }

    if (isContainer) {
      guide.style.borderColor = "#6941BE47";
    }

    guide.style.borderColor = color;


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


  function snapAt(type, pos)
  {
    if(allowSnap)
    {  
      if(type == 'h')
      {
        activeItem.style.left = pos + "px";
      }
      if(type == 'v')
      {
        activeItem.style.top = pos + "px";
      }
    }
      
  
  }


  function showDistance(x, y, source, target)
  {
    if(allowDistancePreview)
    {
      const distance = Math.abs(source - target);
      createDistance(x, y, distance);
    }
     
  }

  function createDistance(targetLeft, targetTop, distance) {
    const distanceEl = document.createElement("div");
    distanceEl.classList.add("guide-distance");
    distanceEl.style.left = `${targetLeft}px`;
    distanceEl.style.top = `${targetTop}px`;
    distanceEl.textContent = distance.toFixed(1);
    draggableContainer.appendChild(distanceEl);
  }
});
