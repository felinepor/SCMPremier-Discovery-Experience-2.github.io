/*
====================================================

SCMPremier Discovery Experience
Build 0.5.2

File
router.js

Description
Screen Router

====================================================
*/

const Router = {

    show(screenId){

        const screens = document.querySelectorAll(".screen");

        screens.forEach(screen=>{

    console.log(
        screen.id,
        screen.className
    );

    screen.classList.remove("active");

});

        const target = document.getElementById(screenId);

        if(target){

            console.log(
            "SHOW =>",
            screenId
            );
            
            target.classList.add("active");

            AppState.currentScreen = screenId;

        }

    }

};