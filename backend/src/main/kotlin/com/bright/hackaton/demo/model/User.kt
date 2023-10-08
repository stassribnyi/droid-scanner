package com.bright.hackaton.demo.model

import com.bright.hackaton.demo.util.generateObjectId
import com.bright.hackaton.demo.util.pickRandomNickNameAndModifyExisting
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class User(
    @Id val id: String = generateObjectId(),
    val name: String = pickRandomNickNameAndModifyExisting()
)
