const chargeLevel = document.getElementById('charge_level');
const charge = document.getElementById('charge');
const chargingTimeRef = document.getElementById("charging_time");

window.onload = () => {
    // For browsers taht don't support the battery status API
    if(!navigator.getBattery) {
        alert("Battery Status API Is Not Supported In Your Browser");
        return false;
    }
};


navigator.getBattery().then((battery) => {
    function updateALLBatteryInfo() {
        updateChargingInfo();
        updateLevelInfo();
    }
    updateALLBatteryInfo();

    // When the Charging status changes
    battery.addEventListener("chargingchange", () => {
        updateALLBatteryInfo();
    });

    // When the battery Level Changes
    battery.addEventListener("levelchange", () => {
        updateALLBatteryInfo();
    });

    function updateChargingInfo() {
        if(battery.charging) {
            charge.classList.add("active");
            chargingTimeRef.innerText = "";
        } else {
            charge.classList.remove("active");

            // Display time left to discharge only when it is a integer value i.e not infinity
            if(parseInt(battery.dischargingTime)) {
                let hr = parseInt(battery.dischargingTime / 3600);
                let min = parseInt(battery.dischargingTime / 60 - hr * 60);
                chargingTimeRef.innerText = `${hr}hour ${min}mins remaining`;
            }
        }
    }

    // Updating battery level
    function updateLevelInfo() {
        let batteryLevel = `${parseInt(battery.level * 100)}%`;
        charge.style.width = batteryLevel;
        chargeLevel.textContent = batteryLevel;
    }

});