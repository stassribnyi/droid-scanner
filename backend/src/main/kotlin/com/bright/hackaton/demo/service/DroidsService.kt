package com.bright.hackaton.demo.service

import com.bright.hackaton.demo.exceptions.DroidNotFoundException
import com.bright.hackaton.demo.model.Droid
import com.bright.hackaton.demo.repository.DroidsRepository
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import kotlinx.coroutines.flow.*
import org.springframework.stereotype.Service

@Service
class DroidsService(private val droidsRepository: DroidsRepository) {
    suspend fun createDroid(droid: Droid): Droid {
        return droidsRepository.save(droid)
    }

    fun getAllDroidsByDeviceId(deviceId: String): Flow<Droid> {
        return droidsRepository.getAllByDeviceId(deviceId)
    }


    suspend fun findByOrderAndActivate(droidOrderNumber: Int, deviceId: String) {
        droidsRepository.findByOrderAndActivate(droidOrderNumber, deviceId)
    }

    suspend fun getByDeviceIdAndOrder(deviceId: String, droidOrderNumber: Int): Droid {
        return droidsRepository.findByDeviceIdAndOrder(deviceId, droidOrderNumber) ?: throw DroidNotFoundException(deviceId, droidOrderNumber)
    }

    suspend fun createInitialDroidsList(deviceId: String): List<Droid> {
        val droids = createDroids(deviceId)
        return droidsRepository.saveAll(droids).toList()
    }


    private fun createDroids(deviceId: String): List<Droid> {
        val droidsFromJson = jacksonObjectMapper().readValue<List<Droid>>(javaClass.getResource("/data/droids.json")!!)
        val droids = droidsFromJson.map { droid ->
            Droid(name = droid.name, description = droid.description, order = droid.order, activated = droid.activated, hint = droid.hint, deviceId = deviceId)
        }
        return droids
    }

    suspend fun deleteAll() {
        droidsRepository.deleteAll()
    }
}