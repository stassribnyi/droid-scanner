package com.bright.hackaton.demo.config.migration

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.mongodb.reactivestreams.client.MongoDatabase
import io.mongock.api.annotations.*
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.reactive.asFlow
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.reactive.awaitLast
import kotlinx.coroutines.reactive.awaitSingle
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.insert
import org.springframework.data.mongodb.core.query.Query

@ChangeUnit(id = "DroidsInitChangelog", order = "1", author = "rsereb")
class DroidsInitMigration(private val reactiveMongoTemplate: ReactiveMongoTemplate) {

    private val droidCollectionName = "droid"

    data class Droid(
        var id: String,
        var name: String,
        var description: String,
        var order: Int,
        var activated: Boolean,
        var hint: String
    )

    companion object {
        private val logger = LoggerFactory.getLogger(DroidsInitMigration::class.java)
    }

    @Execution
    fun firstMigration(database: MongoDatabase) {
        runBlocking {
            database.createCollection(droidCollectionName)
            val documents = createDroids()
            reactiveMongoTemplate.insert(documents, droidCollectionName).awaitLast()
        }
    }

    @RollbackExecution
    fun rollback() {
    }

    private fun createDroids(): List<Document> {
        val droids = jacksonObjectMapper().readValue<List<Droid>>(javaClass.getResource("/data/droids.json")!!)
        val documents = droids.map { droid ->
            val document = Document()
            document["_id"] = droid.id
            document["name"] = droid.name
            document["description"] = droid.description
            document["order"] = droid.order
            document["activated"] = droid.activated
            document["hint"] = droid.hint
            document
        }
        logger.info("Found droids': ${droids[0].id}")
        return documents
    }
}
