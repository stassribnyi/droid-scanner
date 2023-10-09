package com.bright.hackaton.demo.service

import com.bright.hackaton.demo.model.Droid
import com.bright.hackaton.demo.model.LeaderBoard
import com.bright.hackaton.demo.model.User
import com.bright.hackaton.demo.repository.UserRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.toList
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository, private val droidsService: DroidsService) {

    suspend fun createUser(deviceId: String, userNickname: String): User {
        val total = droidsService.getAllDroids().toList().size
        return userRepository.save(User(deviceId = deviceId, name = userNickname, totalDroids = total))
    }

    suspend fun getUserInfo(deviceId: String): User {
        return userRepository.findByDeviceId(deviceId).first()
    }

    suspend fun getLeaderBoard(): List<User> {
        val users = getAllUsers().toList()
        return users
    }


    private fun getAllUsers(): Flow<User> {
        return userRepository.findAll()
    }
}