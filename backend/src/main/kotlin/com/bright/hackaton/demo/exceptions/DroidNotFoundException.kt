package com.bright.hackaton.demo.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class DroidNotFoundException (val deviceId: String, val order: Int) : ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Droid with $deviceId and order number $order not found",
)