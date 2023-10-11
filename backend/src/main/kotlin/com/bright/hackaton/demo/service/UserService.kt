package com.bright.hackaton.demo.service

import com.bright.hackaton.demo.exceptions.UserNotFoundException
import com.bright.hackaton.demo.model.User
import com.bright.hackaton.demo.repository.UserRepository
import kotlinx.coroutines.flow.Flow
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    suspend fun createUser(deviceId: String, userNickname: String, total: Int): User {
        return userRepository.save(User(deviceId = deviceId, name = userNickname, totalDroids = total))
    }

    suspend fun getUserInfo(deviceId: String): User {
        return userRepository.findByDeviceId(deviceId) ?: throw UserNotFoundException(deviceId)
    }

    suspend fun updateUser(deviceId: String, updater: User.() -> Unit): User {
        val userToUpdate = getUserInfo(deviceId)
        return userRepository.save(userToUpdate.apply(updater))
        }


    fun getAllUsers(): Flow<User> {
        return userRepository.findAll()
    }

    suspend fun deleteAll(){
        userRepository.deleteAll()
    }
}