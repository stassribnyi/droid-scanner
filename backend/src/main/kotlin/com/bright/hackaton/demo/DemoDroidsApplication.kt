package com.bright.hackaton.demo

import io.mongock.runner.springboot.EnableMongock
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DemoDroidsApplication

fun main(args: Array<String>) {
	runApplication<DemoDroidsApplication>(*args)
}
