package com.bright.hackaton.demo.service

import com.bright.hackaton.demo.model.Droid
import com.bright.hackaton.demo.repository.DroidsRepository
import kotlinx.coroutines.flow.Flow
import org.springframework.stereotype.Service

@Service
class DroidsService(private val droidsRepository: DroidsRepository) {
    suspend fun createDroid(droid: Droid): Droid {
        return droidsRepository.save(droid)
    }

    fun getAllDroids(): Flow<Droid> {
        return droidsRepository.findAll()
    }
}