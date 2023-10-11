package com.bright.hackaton.demo.repository

import com.bright.hackaton.demo.model.User
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: CoroutineCrudRepository<User, String> {

    suspend fun findByDeviceId(deviceId: String): User?

}
