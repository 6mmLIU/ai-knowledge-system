package com.example.conf;

import com.alibaba.cloud.ai.memory.redis.RedissonRedisChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MemoryConfiguration {
    @Value("${spring.ai.memory.redis.host}")
    private String redisHost;
    @Value("${spring.ai.memory.redis.port}")
    private int redisPort;
    @Value("${spring.ai.memory.redis.timeout}")
    private int redisTimeout;
    @Bean
    public RedissonRedisChatMemoryRepository redisChatMemoryRepository() {
        return RedissonRedisChatMemoryRepository.builder()
                .host(redisHost)
                .port(redisPort)
//                 若没有设置密码则注释该项
//				.password(redisPassword)
                .timeout(redisTimeout)
                .build();
    }
    //内存记忆的统一设置
    @Bean
    public MessageWindowChatMemory messageWindowChatMemory(RedissonRedisChatMemoryRepository memoryRepository) {
        return MessageWindowChatMemory.builder()
                .chatMemoryRepository(memoryRepository)
                .maxMessages(100)//记忆长度
                .build();
    }
}
