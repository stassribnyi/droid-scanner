package com.bright.hackaton.demo.facade

import com.bright.hackaton.demo.model.Droid
import com.bright.hackaton.demo.service.DroidsService
import com.bright.hackaton.demo.service.UserService
import kotlinx.coroutines.flow.Flow
import org.springframework.stereotype.Component

@Component
class DroidsFacade(private val droidsService: DroidsService, private val userService: UserService) {

    suspend fun activateDroidForUser(deviceId: String, droidOrderNumber: Int): Droid {
        userService.updateUser(deviceId) {
            activatedDroidsNumbers += droidOrderNumber
            collectedDroids+=1
        }
        droidsService.findByOrderAndActivate(droidOrderNumber, deviceId)
        return droidsService.getByDeviceIdAndOrder(deviceId, droidOrderNumber)
    }

    fun getAllDroids(deviceId: String): Flow<Droid> {
        return droidsService.getAllDroidsByDeviceId(deviceId)
    }

    suspend fun getDroidByDeviceIdAndOrder(deviceId: String, droidOrderNumber: Int): Droid {
        return droidsService.getByDeviceIdAndOrder(deviceId, droidOrderNumber)
    }

    suspend fun createDroid(droid: Droid): Droid {
        return droidsService.createDroid(droid)
    }

}