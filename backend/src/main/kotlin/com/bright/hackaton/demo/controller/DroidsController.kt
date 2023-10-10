package com.bright.hackaton.demo.controller

import com.bright.hackaton.demo.facade.DroidsFacade
import com.bright.hackaton.demo.model.Droid
import kotlinx.coroutines.flow.Flow
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class DroidController(private val droidsFacade: DroidsFacade) {

    @RequestMapping(
        method = [RequestMethod.POST],
        value = ["/api/droids"],
        produces = ["application/json"],
        consumes = ["application/json"]
    )
    suspend fun createDroid(@RequestBody droid: Droid): ResponseEntity<Droid> {
        return ResponseEntity.ok(droidsFacade.createDroid(droid))
    }

    @RequestMapping(
        method = [RequestMethod.GET],
        value = ["/api/droids"],
        produces = ["application/json"],
    )
    fun getAllDroids(deviceId: String): ResponseEntity<Flow<Droid>> {
        return ResponseEntity.ok(droidsFacade.getAllDroids(deviceId))
    }


    @RequestMapping(
            method = [RequestMethod.GET],
            value = ["/api/droids/{deviceId}"],
            produces = ["application/json"],
    )
    suspend fun getOneDroidByDeviceIdAndOrder(deviceId: String, order: Int): ResponseEntity<Droid> {
        return ResponseEntity.ok(droidsFacade.getDroidByDeviceIdAndOrder(deviceId, order))
    }

    @RequestMapping(
            method = [RequestMethod.PUT],
            value = ["/api/droids/activate"],
            produces = ["application/json"],
    )
    suspend fun activateDroid(deviceId: String, droidOrder: Int): ResponseEntity<Droid> {
        return ResponseEntity.ok(droidsFacade.activateDroidForUser(deviceId, droidOrder))
    }

}