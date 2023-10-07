package com.bright.hackaton.demo.util

import org.bson.types.ObjectId

fun generateObjectId(): String {
    return ObjectId().toHexString()
}