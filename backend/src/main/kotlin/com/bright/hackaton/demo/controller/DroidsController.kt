package com.bright.hackaton.demo.controller

import com.bright.hackaton.demo.model.Droid
import com.bright.hackaton.demo.model.User
import com.bright.hackaton.demo.service.DroidsService
import com.bright.hackaton.demo.service.UserService
import kotlinx.coroutines.flow.Flow
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/droids")
class DroidController(private val droidService: DroidsService) {

    @PostMapping("/create")
    suspend fun createDroid(@RequestBody droid: Droid): ResponseEntity<Droid> {
        val createdDroid = droidService.createDroid(droid)
        return ResponseEntity.ok(createdDroid)
    }

    @GetMapping("/get")
    fun getAllDroids(): ResponseEntity<Flow<Droid>> {
        val droids = droidService.getAllDroids()
        return ResponseEntity.ok(droids)
    }

}