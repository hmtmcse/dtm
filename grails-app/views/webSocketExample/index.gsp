<!DOCTYPE HTML>

<html>
<head>

    <script type = "text/javascript">

        var ws;

        function WebSocketTest() {

            if ("WebSocket" in window) {
                alert("WebSocket is supported by your Browser!");

                // Let us open a web socket
                ws = new WebSocket("ws://localhost:1122/chat/touhid");

                ws.onopen = function() {
                    // var x = 0;
                    // window.setInterval(function(){
                    //     ws.send("Message to send " + x);
                    //     x++;
                    // }, 5000);


                };

                ws.onmessage = function (evt) {
                    var received_msg = evt.data;
                    console.log("Receved Data: " + received_msg);
                };

                ws.onclose = function() {

                    // websocket is closed.
                    alert("Connection is closed...");
                };
            } else {

                // The browser doesn't support WebSocket
                alert("WebSocket NOT supported by your Browser!");
            }
        }

        function close() {
            ws.close();
        }
    </script>

</head>

<body>
<div id = "sse">
    <a href = "javascript:WebSocketTest()">Run WebSocket</a>
    <br/>
    <br/>
    <a href = "javascript:close()">Close</a>
</div>

</body>
</html>