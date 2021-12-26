input.onButtonPressed(Button.A, function () {
    OLED.clear()
    OLED.writeString("Temperature: ")
    OLED.writeNum(input.temperature())
    OLED.newLine()
    OLED.writeString("Temperature: ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.newLine()
    OLED.writeString("Temperature: ")
    OLED.writeNum(Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P1))
    OLED.newLine()
    OLED.writeString("Poussières: ")
    OLED.writeNum(Environment.ReadDust(DigitalPin.P13, AnalogPin.P2))
    OLED.newLine()
    OLED.writeString("Humidité: ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
    OLED.newLine()
    OLED.writeString("Pression: ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_pressure) / 10)
    OLED.newLine()
    OLED.writeString("Altitude: ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_altitude))
    basic.pause(5000)
    OLED.clear()
})
OLED.clear()
OLED.init(128, 64)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("DERYtelecom_80164997", "gupu1050")
if (ESP8266_IoT.wifiState(true)) {
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
    basic.clearScreen()
} else {
    basic.showIcon(IconNames.No)
}
basic.forever(function () {
    ESP8266_IoT.connectThingSpeak()
    if (ESP8266_IoT.thingSpeakState(true)) {
        basic.showIcon(IconNames.Happy)
        basic.pause(1000)
        basic.clearScreen()
    } else {
        basic.showIcon(IconNames.Sad)
    }
    ESP8266_IoT.setData(
    "4YS5FW9L55K7BMQ8",
    input.temperature(),
    Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
    Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
    Environment.octopus_BME280(Environment.BME280_state.BME280_pressure) / 10
    )
    ESP8266_IoT.uploadData()
    basic.pause(5000)
})
