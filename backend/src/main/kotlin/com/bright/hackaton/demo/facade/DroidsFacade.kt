package com.bright.hackaton.demo.facade

import com.bright.hackaton.demo.model.Droid
import com.bright.hackaton.demo.service.DroidsService
import com.bright.hackaton.demo.service.UserService
import kotlinx.coroutines.flow.Flow
import org.springframework.stereotype.Component

@Component
class DroidsFacade(private val droidsService: DroidsService, private val userService: UserService) {

    suspend fun activateDroidForUser(deviceId: String, droidOrderNumber: Int): Flow<Droid> {
        userService.updateUser(deviceId) {
            activatedDroidsNumbers += droidOrderNumber
        }
        droidsService.findByOrderAndActivate(droidOrderNumber)
        return droidsService.getByOrder(droidOrderNumber)
    }
    fun getAllDroids(): Flow<Droid> {
        return droidsService.getAllDroids()
    }

    suspend fun createDroid(droid: Droid): Droid {
        return droidsService.createDroid(droid)
    }
}