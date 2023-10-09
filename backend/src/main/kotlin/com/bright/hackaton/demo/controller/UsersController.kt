package com.bright.hackaton.demo.controller

import com.bright.hackaton.demo.model.Droid
import com.bright.hackaton.demo.model.User
import com.bright.hackaton.demo.service.UserService
import com.bright.hackaton.demo.util.pickRandomNickNameAndModifyExisting
import kotlinx.coroutines.flow.Flow
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UsersController(private val userService: UserService) {
    @PostMapping("/register")
    suspend fun createUser(@RequestBody deviceId: String, userNickname: String): ResponseEntity<User> {
        val createdUser = userService.createUser(deviceId, userNickname)
        return ResponseEntity.ok(createdUser)
    }

    @GetMapping("/generate-nickname")
    fun getAllDroids(): ResponseEntity<String> {
        return ResponseEntity.ok(pickRandomNickNameAndModifyExisting())
    }
}