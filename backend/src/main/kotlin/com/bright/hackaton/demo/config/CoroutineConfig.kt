package com.bright.hackaton.demo.config

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class CoroutineConfig {
    @Bean
    fun applicationCoroutineScope(): CoroutineScope {
        return CoroutineScope(SupervisorJob())
    }
}