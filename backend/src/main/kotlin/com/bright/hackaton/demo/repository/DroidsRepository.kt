package com.bright.hackaton.demo.repository

import com.bright.hackaton.demo.model.Droid
import kotlinx.coroutines.flow.Flow
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.Update
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface DroidsRepository: CoroutineCrudRepository<Droid, String> {

    @Query(value = "{ 'order' : ?0}", fields = "{ 'activated' : false}")
    @Update("{\$set : { 'activated' : true } }")
    suspend fun findByOrderAndActivate(order: Int): Int

    fun getByOrder(order: Int): Flow<Droid>
}