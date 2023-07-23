// Declaration
class Yoon {
    constructor(_containerClass, _itemsClass) {
      
        this.activeItem = null;
        
        this.draggableItems = document.querySelectorAll(_itemsClass);
        this.draggableContainer = document.querySelector(_containerClass);
        this.guides = [];
        this.snapThreshold = 4; // Threshold for snapping to guides
      
        this.allowSnap = true;
        this.allowDistancePreview = true;
    }


    startDrag(item)
    {
        this.activeItem = item;
    }

    drag()
    {
    
        if(this.activeItem)
        {
            const containerBounds = this.draggableContainer.getBoundingClientRect();
 
            this.removeGuides();
            
            this.showGuides(containerBounds.left, containerBounds.top);
        }

    }

    stopDrag()
    {
        this.activeItem = null;
    }


    showGuides(x,y) 
    {
        const activeBounds = this.activeItem.getBoundingClientRect();
        const centerBounds = {
          left: activeBounds.left + activeBounds.width / 2,
          top: activeBounds.top + activeBounds.height / 2,
          bottom: activeBounds.bottom,
        };
    
        this.draggableItems.forEach((item) => {
          if (item !== this.activeItem) {
            const itemBounds = item.getBoundingClientRect();
            const centerItem = {
              left: itemBounds.left + itemBounds.width / 2,
              top: itemBounds.top + itemBounds.height / 2,
              bottom: itemBounds.bottom,
            };
    
            // -----------------------------LEFT / LEFT - LEFT / RIGHT --------------------------------------
    
            if ((Math.abs(activeBounds.left - itemBounds.left) < this.snapThreshold)) {
              
              var source ,target ;
              
              var source1 = activeBounds.top - y;
              var target1 = itemBounds.bottom - y;
    
              var source2 = itemBounds.top - y;
              var target2 = activeBounds.bottom - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
              
              this.showVerticalGuide((itemBounds.left - x), source, this.distance(source, target) );
              
              this.showDistance((itemBounds.left - x), source, source, target);
    
              var snapPos = (itemBounds.left - x);
              this.snapAt('h', snapPos);
    
            }
            if ((Math.abs(activeBounds.left - itemBounds.right) < this.snapThreshold)) {
              
               
              var source ,target ;
              
              var source1 = activeBounds.top - y;
              var target1 = itemBounds.bottom - y;
    
              var source2 = itemBounds.top - y;
              var target2 = activeBounds.bottom - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
              
    
              this.showVerticalGuide((itemBounds.right - x), source, this.distance(source, target));
            
              this.showDistance((itemBounds.right - x), source, source, target);
    
              var snapPos = (itemBounds.right - x);
              this.snapAt('h', snapPos);
    
            }
    
            // --------------------------------------LEFT / CENTER -------------------------------------------
    
            if ((Math.abs(activeBounds.left - centerItem.left) < this.snapThreshold)) {
              
              var source ,target ;
              
              var source1 = activeBounds.bottom-y;
              var target1 = (centerItem.top);
    
              var source2 = (centerItem.bottom-(itemBounds.height/2));
              var target2 = activeBounds.top - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
    
              this.showVerticalGuide((centerItem.left - x), source, this.distance(source, target));
              
              this.showDistance((centerItem.left - x), source, source, target);
    
              var snapPos = (centerItem.left - x);
              this.snapAt('h', snapPos);
            }
           
            // // --------------------------------------CENTER / LEFT -------------------------------------------
    
            if (Math.abs(centerBounds.left - itemBounds.left) < this.snapThreshold) {
              
              var source ,target ;
            
              var source1 = centerBounds.top;
              var target1 = itemBounds.bottom;
    
              var source2 = itemBounds.top;
              var target2 = centerBounds.top - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showVerticalGuide((itemBounds.left - x), source, this.distance(source, target));
              
              this.showDistance((itemBounds.left - x), source, source, target);
    
              var snapPos = ((itemBounds.left - x) - (activeBounds.width/2));
              this.snapAt('h', snapPos);

            }
    
    
            // // --------------------------------------RIGHT / CENTER -------------------------------------------
    
            if (Math.abs(activeBounds.right - centerItem.left) < this.snapThreshold) {
                  
    
              var source = activeBounds.bottom-y;
              var target = (centerItem.top-(itemBounds.height/2));
    
              var source ,target ;
              
              var source1 = activeBounds.bottom-y;
              var target1 = (centerItem.top);
    
              var source2 = (centerItem.bottom-(itemBounds.height/2));
              var target2 = activeBounds.top - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
    
              this.showVerticalGuide((centerItem.left - x), source, this.distance(source, target));
              
              this.showDistance((centerItem.left - x), source, source, target);
    
              var snapPos = ((centerItem.left - x) - activeBounds.width);
              this.snapAt('h', snapPos);
    
            } 
    
    
            // // --------------------------------------CENTER / RIGHT -------------------------------------------
    
            if (Math.abs(centerBounds.left - itemBounds.right) < this.snapThreshold) {
                
              var source ,target ;
            
              var source1 = centerBounds.top;
              var target1 = itemBounds.bottom;
    
              var source2 = itemBounds.top;
              var target2 = centerBounds.top - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showVerticalGuide((itemBounds.right - x), source, this.distance(source, target));
                
              this.showDistance((itemBounds.right - x), source, source, target);
    
                var snapPos = ((itemBounds.right - x) - (activeBounds.width/2));
                this.snapAt('h', snapPos);
              }
    
            // // -----------------------------RIGHT / RIGHT - RIGHT / LEFT --------------------------------------
    
            if ((Math.abs(activeBounds.right - itemBounds.right) < this.snapThreshold)) {
              
              var source ,target ;
              
              var source1 = activeBounds.top - y;
              var target1 = itemBounds.bottom - y;
    
              var source2 = itemBounds.top - y;
              var target2 = activeBounds.bottom - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
    
              this.showVerticalGuide((itemBounds.right - x), source, this.distance(source, target));
              
              this.showDistance((itemBounds.right - x), source, source, target);
    
              var snapPos = ((itemBounds.right - x)-activeBounds.width);
              this.snapAt('h', snapPos);
            
            }
            
            if (Math.abs(activeBounds.right - itemBounds.left) < this.snapThreshold) {
    
              var source ,target ;
              
              var source1 = activeBounds.top - y;
              var target1 = itemBounds.bottom - y;
    
              var source2 = itemBounds.top - y;
              var target2 = activeBounds.bottom - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showVerticalGuide((itemBounds.left - x), source, this.distance(source, target));
              
              this.showDistance((itemBounds.left - x), source, source, target);
    
              var snapPos = ((itemBounds.right - x) - (itemBounds.width+activeBounds.width));
              this.snapAt('h', snapPos);
    
            }
    
            // // -----------------------------TOP / TOP - TOP / BOTTOM --------------------------------------
    
            if (Math.abs(activeBounds.top - itemBounds.top) < this.snapThreshold) {
              
              var source ,target ;
              
              var source1 = itemBounds.left - x;
              var target1 = activeBounds.right - x;
    
              var source2 = activeBounds.left - x;
              var target2 = itemBounds.right - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showHorizontalGuide((itemBounds.top - y), source, this.distance(source, target));
              
              this.showDistance((itemBounds.top - y), source, source, target);
    
              var snapPos = (itemBounds.top - y);
              this.snapAt('v', snapPos);
              
            }
    
            if (Math.abs(activeBounds.top - itemBounds.bottom) < this.snapThreshold) {
              
              var source ,target ;
              
              var source1 = activeBounds.left - x;
              var target1 = itemBounds.right - x;
    
              var source2 = itemBounds.left - x;
              var target2 = activeBounds.right - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              
              this.showHorizontalGuide((itemBounds.bottom - y), source, this.distance(source, target));
              
              this.showDistance((itemBounds.bottom - y), source, source, target);
    
              var snapPos = (itemBounds.bottom - y);
              this.snapAt('v', snapPos);
            }
    
            // // -----------------------------BOTTOM / BOTTOM - BOTTOM / TOP --------------------------------------
    
            if (Math.abs(activeBounds.bottom - itemBounds.bottom) < this.snapThreshold) {
              
    
              var source ,target ;
              
              var source1 = activeBounds.left - x;
              var target1 = itemBounds.right - x;
    
              var source2 = itemBounds.left - x;
              var target2 = activeBounds.right - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showHorizontalGuide((itemBounds.bottom - y), source, this.distance(source, target));
    
              // this.showDistance((itemBounds.bottom - y), source, source, target);
    
              var snapPos = ((itemBounds.bottom - y) - itemBounds.height + Math.abs(itemBounds.height-activeBounds.height));
              this.snapAt('v', snapPos);
    
            }
            
            if (Math.abs(activeBounds.bottom - itemBounds.top) < this.snapThreshold) {
              
              var source ,target ;
              
              var source1 = activeBounds.left - x;
              var target1 = itemBounds.right - x;
    
              var source2 = itemBounds.left - x;
              var target2 = activeBounds.right - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showHorizontalGuide((itemBounds.top - y), source,  this.distance(source, target));
    
              // this.showDistance((itemBounds.top - y), source, source, target);
    
              var snapPos = ((itemBounds.top - y) - itemBounds.height + Math.abs(itemBounds.height-activeBounds.height));
              this.snapAt('v', snapPos);
            }
    
            // // -----------------------------CENTER LEFT / CENTER LEFT - CENTER LEFT / CENTER RIGHT ------------------------------------------
    
            if ((Math.abs(centerBounds.left - centerItem.left) < this.snapThreshold) ) 
            {
    
              var source ,target ;
                  
              var source1 = centerBounds.top - y;
              var target1 = centerItem.top - y;
    
              var source2 = centerItem.top - y;
              var target2 = centerBounds.top - y;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
              
              this.showVerticalGuide((centerItem.left - x), source, this.distance(source, target));
              
              // this.showDistance((itemBounds.top - y), source, source, target);
    
              var snapPos = ((centerItem.left - x) - (activeBounds.width/2));
              this.snapAt('h', snapPos);
            }
    
    
            // // -----------------------------CENTER TOP / CENTER TOP - CENTER TOP / CENTER BOTTOM --------------------------------------
    
            if ((Math.abs(centerBounds.top - centerItem.top) < this.snapThreshold)) {
              
              var source ,target ;
                  
              var source1 = centerBounds.left - x;
              var target1 = centerItem.left - x;
    
              var source2 = centerItem.left - x;
              var target2 = centerBounds.left - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showHorizontalGuide(centerItem.top, source, this.distance(source, target));
              
              var snapPos = (centerItem.top - (activeBounds.height/2));
              this.snapAt('v', snapPos);
            }
    
    
            // // ---------------------------------------- TOP / CENTER ----------------------------------------------------
    
            if ((Math.abs(activeBounds.top - centerItem.top) < this.snapThreshold)) {
              
    
              var source ,target ;
                  
              var source1 = activeBounds.left - x;
              var target1 = centerItem.left - x;
    
              var source2 = centerItem.left - x;
              var target2 = activeBounds.right - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showHorizontalGuide(centerItem.top, source, this.distance(source, target));
              
              var snapPos = (centerItem.top);
              this.snapAt('v', snapPos);
            }
            // // ---------------------------------------- BOTTOM / CENTER ----------------------------------------------------
    
            if ((Math.abs(activeBounds.bottom - centerItem.top) < this.snapThreshold)) {
              
              var source ,target ;
                  
              var source1 = activeBounds.left - x;
              var target1 = centerItem.left - x;
    
              var source2 = centerItem.left - x;
              var target2 = activeBounds.right - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
    
              this.showHorizontalGuide(centerItem.top, source, this.distance(source, target));
              
              var snapPos = (centerItem.top - activeBounds.height);
              this.snapAt('v', snapPos);
            }
    
            // // ---------------------------------------- CENTER / TOP ----------------------------------------------------
    
            if ((Math.abs(centerBounds.top - itemBounds.top) < this.snapThreshold)) {
              
              var source ,target ;
                  
              var source1 = centerBounds.left - x;
              var target1 = itemBounds.right - x;
    
              var source2 = itemBounds.left - x;
              var target2 = centerBounds.left - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showHorizontalGuide((itemBounds.top-y), source, this.distance(source, target));
              
              var snapPos = ((itemBounds.top - y) - activeBounds.height/2);
              // this.snapAt('h', snapPos);
            }
    
            // ---------------------------------------- CENTER / BOTTOM ----------------------------------------------------
    
            if ((Math.abs(centerBounds.top - itemBounds.bottom) < this.snapThreshold)) {
              
              var source ,target ;
                  
              var source1 = centerBounds.left - x;
              var target1 = itemBounds.right - x;
    
              var source2 = itemBounds.left - x;
              var target2 = centerBounds.left - x;
    
              var source = Math.min(source1, source2);
              var target = Math.max(target1, target2);
    
              this.showHorizontalGuide((itemBounds.bottom-y), source, this.distance(source, target));
              
              var snapPos = ((itemBounds.bottom - y) - activeBounds.height/2);
              // this.snapAt('h', snapPos);
            }
    
    
          }
        });
    
        // ---------------------------------- MAIN CONTAINER  -----------------------------------------------
    
        if (Math.abs((centerBounds.left - x) - this.draggableContainer.clientWidth / 2) < this.snapThreshold) {
          
          this.showVerticalGuide(this.draggableContainer.clientWidth / 2, 0, (this.draggableContainer.clientHeight), true);
    
          this.showDistance((this.draggableContainer.clientWidth / 2), 0, (centerBounds.top-y), this.draggableContainer.clientHeight / 2);
    
          var snapPos = (this.draggableContainer.clientWidth / 2 - activeBounds.width/2);
          this.snapAt('h', snapPos);
    
        }
    
        if (Math.abs((centerBounds.top - y) - this.draggableContainer.clientHeight / 2) < this.snapThreshold) {
          
          this.showHorizontalGuide(this.draggableContainer.clientHeight / 2, 0, (this.draggableContainer.clientWidth), true);
        
          this.showDistance(0,(this.draggableContainer.clientHeight / 2), (centerBounds.left - x), this.draggableContainer.clientWidth / 2);
    
          var snapPos = (this.draggableContainer.clientHeight / 2 - activeBounds.height/2);
          this.snapAt('v', snapPos);
        
        }
    }
    
    
    // UTILITIES ....

    distance(a,b)
    {
        return Math.abs(a - b);
    }

    showVerticalGuide(x, y, length, isContainer = false, color = "#6941BE") {
        const guide = this.createGuideLine('v', x, y, length, isContainer, color);
        this.guides.push(guide);

    }

    showHorizontalGuide(y, x, length, isContainer = false, color = "#6941BE") {
        const guide = this.createGuideLine('h', x, y, length, isContainer, color);
        this.guides.push(guide);
    }

    createGuideLine(type, x, y, length, isContainer = false, color = "#6941BE") {
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
        this.draggableContainer.appendChild(guide);
        return guide;
    }

    removeGuides() {
        this.guides.forEach((guide) => guide.remove());
        this.guides.length = 0;
        const distanceElements = document.querySelectorAll(".guide-distance");
        distanceElements.forEach((el) => el.remove());
    }


    snapAt(type, pos)
    {
        if(this.allowSnap)
        {  
            if(type == 'h')
            {
                this.activeItem.style.left = pos + "px";
            }
            if(type == 'v')
            {
                this.activeItem.style.top = pos + "px";
            }
        }
    }


    showDistance(x, y, source, target)
    {
        if(this.allowDistancePreview)
        {
            const distance = Math.abs(source - target);
            this.createDistance(x, y, distance);
        }
        
    }

    createDistance(targetLeft, targetTop, distance) {

        const distanceEl = document.createElement("div");
        distanceEl.classList.add("guide-distance");
        distanceEl.style.left = `${targetLeft}px`;
        distanceEl.style.top = `${targetTop}px`;
        distanceEl.textContent = distance.toFixed(1);
        this.draggableContainer.appendChild(distanceEl);
    }
  


  }

  window.Yoon = Yoon;