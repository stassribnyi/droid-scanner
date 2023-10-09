package com.bright.hackaton.demo.repository

import com.bright.hackaton.demo.model.User
import kotlinx.coroutines.flow.Flow
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: CoroutineCrudRepository<User, String> {

    fun findByDeviceId(deviceId: String): Flow<User>

}
