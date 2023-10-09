package com.bright.hackaton.demo.controller


import com.bright.hackaton.demo.model.User
import com.bright.hackaton.demo.service.UserService
import com.bright.hackaton.demo.util.pickRandomNickNameAndModifyExisting
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UsersController(private val userService: UserService) {
    @RequestMapping(
        method = [RequestMethod.POST],
        value = ["/api/users/register"],
        produces = ["application/json"]
    )
    suspend fun registerUser(deviceId: String, userNickname: String): ResponseEntity<User> {
        val createdUser = userService.createUser(deviceId, userNickname)
        return ResponseEntity.ok(createdUser)
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
        return ResponseEntity.ok(userService.getUserInfo(deviceId))
    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/api/users/leaderboard"],
        produces = ["application/json"]
    )
    suspend fun getLeaderBoard(): ResponseEntity<List<User>> {
        return ResponseEntity.ok(userService.getLeaderBoard())
    }
}