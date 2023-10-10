package com.bright.hackaton.demo.repository

import com.bright.hackaton.demo.model.Droid
import kotlinx.coroutines.flow.Flow
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.Update
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface DroidsRepository: CoroutineCrudRepository<Droid, String> {

    @Query(value = "{ 'order' : ?0}", fields = "{ 'deviceId' : ?1}")
    @Update("{\$set : { 'activated' : true } }")
    suspend fun findByOrderAndActivate(order: Int, deviceId: String): Int

    fun getAllByDeviceId(deviceId: String): Flow<Droid>
    suspend fun findByDeviceIdAndOrder(deviceId: String, order: Int): Droid?
}