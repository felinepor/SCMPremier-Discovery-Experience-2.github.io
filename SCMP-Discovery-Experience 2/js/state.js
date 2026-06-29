/*
====================================================

SCMPremier Discovery Experience
Build 0.5.2

File
state.js

Description
Application State Manager

====================================================
*/

const AppState = {

    currentScreen:"dashboard-screen",

    timer: 30,

    timerInterval: null,

    discoveries: 0,

    attempts: 0,

    totalPairs: 6,

    matchedPairs: 0,

    selectedCards: [],

    products: [],

    discoveredProducts: [],

    missionCompleted: false,

    missionFailed: false,
  
    deck: [],
    
    isBusy:false,

    canPlay:true
    
    
};