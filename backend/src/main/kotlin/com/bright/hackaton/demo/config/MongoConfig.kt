package com.bright.hackaton.demo.config

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoDatabase
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean

@Bean
fun mongoDatabase(
    mongoClient: MongoClient,
    @Value("\${spring.data.mongodb.database}") dbName: String,
): MongoDatabase {
    return mongoClient.getDatabase(dbName)
}