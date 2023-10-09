package com.bright.hackaton.demo.service

import com.bright.hackaton.demo.model.Leaderboard
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
        //ToDo:
        return userRepository.findByDeviceId(deviceId).first()
    }

    suspend fun getLeaderboard(): List<Leaderboard> {
        val users = getAllUsers().toList()
        val leadersList = generateLeaderboard(users)
        return leadersList
    }

    private fun generateLeaderboard(users: List<User>): List<Leaderboard> {
        return users.map { user ->
            Leaderboard(user.name, user.collectedDroids)
        }.sortedByDescending { it.collectedDroids }
    }


    private fun getAllUsers(): Flow<User> {
        return userRepository.findAll()
    }
}