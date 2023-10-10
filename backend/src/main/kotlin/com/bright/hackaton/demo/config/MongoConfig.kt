package com.bright.hackaton.demo.config

import com.mongodb.reactivestreams.client.MongoClient
import io.mongock.driver.mongodb.reactive.driver.MongoReactiveDriver
import io.mongock.runner.springboot.EnableMongock
import io.mongock.runner.springboot.MongockSpringboot
import io.mongock.runner.springboot.base.MongockInitializingBeanRunner
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MongoConfig {
    @Bean
    fun mongockDriverBuilder(
            mongoDriver: MongoReactiveDriver,
            context: ApplicationContext,
            @Value("\${mongock.enabled}") mongockEnabled: Boolean = false,
    ): MongockInitializingBeanRunner {
        return MongockSpringboot.builder()
                .setEnabled(mongockEnabled)
                .setDriver(mongoDriver)
                .addMigrationScanPackage("com.bright.hackaton.demo.config.migration")
                .setSpringContext(context)
                .buildInitializingBeanRunner()
    }

    @Bean
    fun mongockReactiveDriver(
            mongoClient: MongoClient,
            @Value("droidsdb") dbName: String,
    ): MongoReactiveDriver {
        return MongoReactiveDriver.withDefaultLock(mongoClient, dbName)
    }
}