/* 
 *  Description: TV
 *  Modified: 12/26/12
 *  Created by: @chrisaiv
 *  Notes: 
 *  Borrowed heavily from http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3
 */
//jQuery Function that helps determin if an object exists
jQuery.fn.exists = function () {
    return this.length > 0;
}

var root = $(this);

var MagnifyingGlass = {
    width: 0,
    height: 0,
    divSmall: ".small",
	divLarge: ".large",
    hover: function (left, top) {
	
        //When the user hovers on the image, the script will first calculate
        //the native dimensions if they don't exist. Only after the native dimensions
        //are available, the script will

        if (!MagnifyingGlass.width && !MagnifyingGlass.height) {
            //This will create a new image object with the same image as that in .small
            //We cannot directly get the dimensions from .small because of the 
            //width specified to 200px in the html. To get the actual dimensions we have
            //created this image object.
            var image = new Image();
            image.src = $(MagnifyingGlass.divSmall).attr("src");

            //This code is wrapped in the .load function which is important.
            //width and height of the object would return 0 if accessed before 
            //the image gets loaded.
            MagnifyingGlass.width = image.width;
            MagnifyingGlass.height = image.height;
        } else {
            //x/y coordinates of the mouse
            //This is the position of .magnify with respect to the document.
            var offset = root.offset();
            //We will deduct the positions of .magnify from the mouse positions with
            //respect to the document to get the mouse positions with respect to the 
            //container(.magnify)
//			var mx = e.pageX - offset.left;
//			var my = e.pageY - offset.top;
            var mx = left;
            var my = top

            //Finally the code to fade out the glass if the mouse is outside the container
            if (mx < root.width() && my < root.height() && mx > 0 && my > 0) {
                $(MagnifyingGlass.divLarge).fadeIn(100);
            } else {
                $(MagnifyingGlass.divLarge).fadeOut(100);
            }
            if ($(MagnifyingGlass.divLarge).is(":visible")) {
                //The background position of .large will be changed according to the position
                //of the mouse over the .small image. So we will get the ratio of the pixel
                //under the mouse pointer with respect to the image and use that to position the 
                //large image inside the magnifying glass
                var rx = Math.round(mx / $(MagnifyingGlass.divSmall).width() * MagnifyingGlass.width - $(MagnifyingGlass.divLarge).width() / 2) * -1;
                var ry = Math.round(my / $(MagnifyingGlass.divSmall).height() * MagnifyingGlass.height - $(MagnifyingGlass.divLarge).height() / 2) * -1;
                var bgp = rx + "px " + ry + "px";

                //Time to move the magnifying glass with the mouse
                var px = mx - $(MagnifyingGlass.divLarge).width() / 2;
                var py = my - $(MagnifyingGlass.divLarge).height() / 2;
                //Now the glass moves with the mouse
                //The logic is to deduct half of the glass's width and height from the 
                //mouse coordinates to place it with its center at the mouse coordinates

                //If you hover on the image now, you should see the magnifying glass in action
                $(MagnifyingGlass.divLarge).css({
                    left: px,
                    top: py,
                    backgroundPosition: bgp
                });
            }
        }
    }
}

/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * 
 *  Socket.io
 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */
var SocketBridge = {
    socket: null,
    initialize: function () {
        this.socket = io.connect("/");
        this.socket.on("onJoyStickMove", function (obj) {
            //console.log( "moveMag:", obj.x, obj.y );
            MagnifyingGlass.hover(obj.x, obj.y)
        });
    },
    socketIoSend: function (event, params) {
        this.socket.emit(event, params, function (data) {

        });
    },
    error: function (err) {
        console.log("SocketBridge.err", err)
    }
}

SocketBridge.initialize();