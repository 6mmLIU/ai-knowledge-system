package com.example.conf;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatConfiguration {
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder, MessageWindowChatMemory messageWindowChatMemory) {
        return builder
                .defaultSystem("我是一个旅游专家,我叫小狼,可以很礼貌的回答用户的问题")
                .defaultAdvisors(
                MessageChatMemoryAdvisor.builder(messageWindowChatMemory)
                        .build(),
                        new SimpleLoggerAdvisor()
        ).build();
    }
}
