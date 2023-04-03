# twitterclone / TexterClone
A full Twitter clone with NextJS, MongoDB, NextAuth, Zustand and tailwindcss

![https://github.com/Almada2021](https://github.com/Almada2021/texterclone/blob/master/images/twitterCloneScreenShoot.JPG?raw=true)
## Setup
1. Clone the repository you only need copy one
    ```  
        #clone with https
        git clone https://github.com/Almada2021/texterclone.git
        #clone with ssh
        git clone git@github.com:Almada2021/texterclone.git

        #change directory
        cd twitter-clone
    ```
2. Install dependencies
    ```
        # You need NodeJs and npm
        npm install
    ```
3. make a file called .env, inside the root folder of the project
    ```
        DATABASE_URL=
        NEXTAUTH_JWT_SECRET=
        NEXTAUTH_SECRET=TWEET_CLONE        
    ```
4. For variables NEXTAUTH you can put anything, but inside Database url you need a connection string for a MongoDB database [here](https://www.youtube.com/watch?v=oVHQXwkdS6w) a video that explain with Atlas
5. run the project inside twitter clone folder
    ```
        npm run dev
    ```