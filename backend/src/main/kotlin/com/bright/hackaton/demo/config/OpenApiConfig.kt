package com.bright.hackaton.demo.config

import org.springdoc.core.properties.SpringDocConfigProperties
import org.springdoc.core.properties.SwaggerUiConfigParameters
import org.springdoc.core.properties.SwaggerUiConfigProperties
import org.springdoc.core.properties.SwaggerUiOAuthProperties
import org.springdoc.core.providers.ActuatorProvider
import org.springdoc.core.providers.ObjectMapperProvider
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springdoc.core.providers.SpringWebProvider
import org.springdoc.webflux.core.providers.SpringWebFluxProvider
import org.springdoc.webflux.ui.*
import org.springframework.beans.factory.annotation.Value
import java.util.*

@Configuration
class OpenApiConfig {
    @Bean
    fun swaggerWelcome(
        swaggerUiConfig: SwaggerUiConfigProperties,
        springDocConfigProperties: SpringDocConfigProperties,
        swaggerUiConfigParameters: SwaggerUiConfigParameters,
        springWebProvider: SpringWebProvider,
    ): SwaggerWelcomeWebFlux {
        return SwaggerWelcomeWebFlux(
            swaggerUiConfig,
            springDocConfigProperties,
            swaggerUiConfigParameters,
            springWebProvider,
        )
    }
}
