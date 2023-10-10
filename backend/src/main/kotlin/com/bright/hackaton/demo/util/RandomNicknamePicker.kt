package com.bright.hackaton.demo.util

import java.util.*

fun pickRandomNickNameAndModifyExisting(): String {
    val names = listOf(
        "Luke Skyjoker",
        "Princess Leia Buns Solo",
        "Han Brolo",
        "Chewbacca the Hairy Hugger",
        "Obi-Wan Cannoli",
        "Darth Tater",
        "Jar Jar Slinks",
        "Yoda Soda",
        "R2-Tea-2",
        "C-3POpcorn",
        "Jabba the Hutt-belly",
        "Lando Calrispian",
        "Admiral Snackbar",
        "Boba Fettuccine",
        "Emperor Palpa-Bean",
        "Darth Vaper",
        "Count Chocolate Dooku",
        "Wookiee Cookies",
        "Greedo the Green Bean",
        "R2-Double-D2",
        "Princess Leia Doughnut",
        "Luke Frywalker",
        "Chewbacca Chew-toy",
        "Obi-Wan Kenolive",
        "Han SoyLo",
        "C-3P-Onion",
        "Admiral Ackbarbecue",
        "Ewok Eclair",
        "Salacious Crumb Cake",
        "Qui-Gon Jinn and Juice",
        "Boba Feta Cheese",
        "Wedge Antillettuce",
        "Darth Salad Vader",
        "Lando Calrissian Vinaigrette",
        "Jabba the Hutt-dog",
        "General Gravy-ous",
        "R2-Tea-3PO",
        "Padmé Amidala Pickles",
        "Ewok Waffles",
        "Chewbacca Chocolate Chip",
        "Jar Jar Meringue",
        "Darth Maulted Milk",
        "Yoda Soda Float",
        "Mon Mothma Muffin",
        "Admiral Snack-pars",
        "Porkins and Beans",
        "Bossk-nack",
        "C-3P-Broccoli",
        "Porg-corn",
        "Lobot-ster Roll"
    )
    val random = Random()
    val randomIndex = random.nextInt(names.size)
    val randomName = names[randomIndex]

    val modifiedName = "$randomName"+"${random.nextInt(0,5000)}"

    return modifiedName
}
