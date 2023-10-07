package com.bright.hackaton.demo.repository

import com.bright.hackaton.demo.model.Droid
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface DroidsRepository: CoroutineCrudRepository<Droid, String>