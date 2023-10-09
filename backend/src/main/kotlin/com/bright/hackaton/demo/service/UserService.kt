package com.bright.hackaton.demo.service

import com.bright.hackaton.demo.model.User
import com.bright.hackaton.demo.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    suspend fun createUser(deviceId: String, userNickname: String): User {
        return userRepository.save(User(deviceId = deviceId, name = userNickname))
    }
}