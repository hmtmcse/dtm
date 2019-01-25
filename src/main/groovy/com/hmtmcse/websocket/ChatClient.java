package com.hmtmcse.websocket;

import javax.websocket.WebSocketContainer;
import java.net.URI;
import java.io.IOException;
import javax.websocket.ClientEndpoint;
import javax.websocket.ContainerProvider;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;


@ClientEndpoint
public class ChatClient {
    private final String uri = "ws://localhost:1122/chat/touhid";
    private Session session;

    public ChatClient() {
        try {
            WebSocketContainer container = ContainerProvider.getWebSocketContainer();
            container.connectToServer(this, new URI(uri));
        } catch (Exception ex) {

        }
    }

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println(message);
    }

    public void sendMessage(String message) {
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException ex) {

        }
    }
}
