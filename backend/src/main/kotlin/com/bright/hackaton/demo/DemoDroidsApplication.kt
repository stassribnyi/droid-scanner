package com.bright.hackaton.demo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication

class DemoDroidsApplication

fun main(args: Array<String>) {
	runApplication<DemoDroidsApplication>(*args)
}
