package com.bright.hackaton.demo.facade

import com.bright.hackaton.demo.config.migration.DroidsInitMigration
import com.bright.hackaton.demo.model.Leaderboard
import com.bright.hackaton.demo.model.User
import com.bright.hackaton.demo.service.DroidsService
import com.bright.hackaton.demo.service.UserService
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import kotlinx.coroutines.flow.toList
import org.bson.Document
import org.springframework.stereotype.Component

@Component
class UserFacade(private val userService: UserService, private val droidsService: DroidsService) {

    suspend fun createUser(deviceId: String, userNickname: String): User {
        droidsService.createInitialDroidsList(deviceId)
        val total = droidsService.getAllDroidsByDeviceId(deviceId).toList().size
        return userService.createUser(deviceId, userNickname, total)
    }

    suspend fun getUserInfo(deviceId: String): User {
        return userService.getUserInfo(deviceId)
    }

    suspend fun getLeaderboard(): List<Leaderboard> {
        val users = userService.getAllUsers().toList()
        val leadersList = generateLeaderboard(users)
        return leadersList
    }

    private fun generateLeaderboard(users: List<User>): List<Leaderboard> {
        return users.map { user ->
            Leaderboard(user.name, user.collectedDroids)
        }.sortedByDescending { it.collectedDroids }
    }



}