### LearnIt

I'm using Ubuntu 18.04 for this project. You can follow installation in Ubuntu 18.04 as given below: 


#### Install NodeJS, npm, git

```
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ sudo apt-get install git
```

Change directory to where you want to save your project, and clone my project.
```
$ cd ~/projects
$ git clone https://github.com/chirayu-joshi/learnIt
```

#### Install MongoDB

```
$ sudo apt-get install gnupg
$ sudo wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
$ echo "mongodb-org hold" | sudo dpkg --set-selections
$ echo "mongodb-org-server hold" | sudo dpkg --set-selections
$ echo "mongodb-org-shell hold" | sudo dpkg --set-selections
$ echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
$ echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

#### Initialize project and install necessary dependencies

```
$ npm init
$ npm install axios bcrypt-nodejs body-parser bootstrap config connect-ensure-login connect-flash cookie-parser ejs express express-session mongoose passport passport-local request session-file-store supervisor shortid cron --save-dev
$ npm install multer cors nodemon cli-table --save
```

#### Install libs for FrontEnd

```
$ npm install @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader file-loader mini-css-extract-plugin node-sass sass-loader style-loader url-loader webpack webpack-cli react react-dom react-router-dom video.js jquery bootstrap history popper.js
```

#### Install node-media-server

```
$ npm install node-media-server --save
```

#### Install ffmpeg for RTMP to HLS transcoding 

```
$ sudo add-apt-repository ppa:jonathonf/ffmpeg-4
$ sudo apt install ffmpeg
```

#### Install OBS Studio

```
$ sudo add-apt-repository ppa:obsproject/obs-studio
$ sudo apt-get update && sudo apt-get install obs-studio
```

#### Configuration
Change ffmpeg path in node media server configuration to your
own installed path.

Also change secret string. It will be used for session encryption.

```
cd learnIt && nano /server/config/default.js

const config = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
        port : 3333
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8888,
            mediaroot: './server/media',
            allow_origin: '*'
        },
        trans: {
            ffmpeg: '/usr/bin/ffmpeg',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        }
    }
};
```


#### Turn on database service and Run server
```
# start mongodb service
$ sudo service mongod start

# (!!!Only for information!!!) mongodb service status | restart | stop
$ sudo service mongod status
$ sudo service mongod restart
$ sudo service mongod stop

# run webpack and watch for changes
$ npm run watch 

# run node server with supervisor and watch for changes
$ npm run start
```

#### Generate live streaming key
Register yourself and login with your account. In navigation, go to `Go Live`. You will receive a streaming key here. 

#### Streaming with OBS as a client
Go to Settings > Stream.  Select Custom service and `rtmp://127.0.0.1:1935/live`
in server input. Enter your streaming key issued by LearnIt and click Apply.
Click start streaming to broadcast your stream.

#### Watch live stream on browser
Open browser > enter url: `127.0.0.1:3333`. Click on `here` in `Don't have an account? Register here.`. 
Enter your credentials, and register. If there is any live stream going on, you will find it here, 
else the page would be empty. 

[References](https://quantizd.com/building-live-streaming-app-with-node-js-and-react/).
