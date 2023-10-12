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
* 
### Start
Run all containers with:
```shell
docker compose up
```

UI 
> http://localhost:3000

Swagger
> http://localhost:8080

## Usage

To use this application, you need to register your user name. You can use button Generate Nickname or enter your own.

![img.png](img.png)

Then, you can scan QR codes by clicking on the scan icon in the navigation bar. You can either use your device's camera or upload an image of a QR code. 

![img_1.png](img_1.png)

If the QR code contains a valid URL of a droid from the Star Wars API, you will see the details of the droid and have the option to add it to your collection. 

![img_2.png](img_2.png)

Your rank depends on the amount of droids you've collected. You can view the global leaderboard of other users and their droids by clicking on the leaderboard icon in the navigation bar.

For testing, you can use these QR codes:

![c3p0.png](c3p0.png)
![r2d2.png](r2d2.png)
