package com.hmtmcse.websocket;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class MessageEncoder implements Encoder.Text<Message> {



    @Override
    public String encode(Message message) throws EncodeException {
        return "oli baba " + message.getContent();
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
        // Custom initialization logic
    }


    @Override
    public void destroy() {
        // Close resources
    }
}