package com.bright.hackaton.demo.model

import com.bright.hackaton.demo.util.generateObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Droid(
    @Id val id: String = generateObjectId(),
    var name: String,
    var description: String,
    var order: Int,
    var activated: Boolean = false,
)