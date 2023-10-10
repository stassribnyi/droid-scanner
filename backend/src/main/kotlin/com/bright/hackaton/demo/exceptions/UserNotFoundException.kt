package com.bright.hackaton.demo.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class UserNotFoundException(val deviceId: String) : ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "User with $deviceId not found",
)