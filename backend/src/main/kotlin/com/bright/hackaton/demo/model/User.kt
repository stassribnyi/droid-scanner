package com.bright.hackaton.demo.model

import com.bright.hackaton.demo.util.generateObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class User(
        @Id val id: String = generateObjectId(),
        var name: String,
        var deviceId: String,
        var rank: String? = "1",
        var collectedDroids: Int = 0,
        var totalDroids: Int,
        var activatedDroidsNumbers: Set<Int> = setOf(),
)
