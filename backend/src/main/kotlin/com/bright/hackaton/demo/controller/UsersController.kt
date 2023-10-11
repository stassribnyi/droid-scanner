package com.bright.hackaton.demo.controller

import com.bright.hackaton.demo.facade.UserFacade
import com.bright.hackaton.demo.model.Leaderboard
import com.bright.hackaton.demo.model.User
import com.bright.hackaton.demo.util.pickRandomNickNameAndModifyExisting
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UsersController(private val userFacade: UserFacade) {
    @RequestMapping(
        method = [RequestMethod.POST],
        value = ["/api/users/register"],
        produces = ["application/json"]
    )
    suspend fun registerUser(deviceId: String, userNickname: String): ResponseEntity<User> {
        return ResponseEntity.ok(userFacade.createUser(deviceId, userNickname))
    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/api/users/generate-nickname"]
    )
    fun getNickname(): ResponseEntity<String> {
        return ResponseEntity.ok(pickRandomNickNameAndModifyExisting())
    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/api/users/{deviceId}"],
        produces = ["application/json"]
    )
    suspend fun getUserInfo(@PathVariable deviceId: String): ResponseEntity<User> {
        return ResponseEntity.ok(userFacade.getUserInfo(deviceId))

    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/api/users/leaderboard"],
        produces = ["application/json"]
    )
    suspend fun getLeaderBoard(): ResponseEntity<List<Leaderboard>> {
        return ResponseEntity.ok(userFacade.getLeaderboard())
    }

    @RequestMapping(
        method = [RequestMethod.DELETE],
        value = ["/api/droids/SQLInjection"]
    )
    suspend fun SQLInjection(secretWord: String): ResponseEntity<String> {
        if (secretWord.equals("dropDataBase")) {
            userFacade.usersAndDroidsCleanupDB()
            return ResponseEntity.ok("PRODUCTION DB IS GONE! APPLY NOW: https://djinni.co/")
        }
        return ResponseEntity.ok("YOU ARE SAFE. FOR NOW...")
    }
}