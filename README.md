# Droids of Republic

Droids of Republic is a web application that allows users to scan QR codes and find droids from the Star Wars universe. Users can also collect and rank the droids they have scanned and view the global leaderboard of other users.

## Features

- Scan QR codes using your device's camera
- Find droids from Star Wars universe and see their details
- Finish quests droid gives to you
- View the global leaderboard of other users
- Mobile-friendly interface

## Technologies

- Frontend: Vite + React + TypeScript + MUI
- Backend: Kotlin + Spring Boot + MongoDB

## Getting Started

These instructions will cover usage information and docker container 

### Prerequisities

In order to run this project container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

Run all containers with:

```shell
docker compose up
```

UI 
> http://localhost:3000

Swagger
> http://localhost:8080

## Application flow

To use this application, you need to register your user name. Then, you can scan QR codes by clicking on the scan icon in the navigation bar. You can either use your device's camera directly or via app. If the QR code contains a valid URL of a droid from Star Wars universe, you will see the details of the activated droid. Your rank depends on the amount of droids you've collected. You can view the global leaderboard of other users and droids they've collected.
