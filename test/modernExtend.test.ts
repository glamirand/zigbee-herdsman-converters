import {describe, expect, test} from "vitest";
import * as fz from "../src/converters/fromZigbee";
import {repInterval} from "../src/lib/constants";
import {fromZigbee as lumiFz} from "../src/lib/lumi";
import {setupAttributes} from "../src/lib/modernExtend";
import * as philips from "../src/lib/philips";
import {assertDefinition, mockDevice, reportingItem} from "./utils";

describe("ModernExtend", () => {
    test("light({turnsOffAtBrightness1: true})", async () => {
        await assertDefinition({
            device: mockDevice({modelID: "FWG125Bulb50AU", endpoints: [{inputClusters: ["genOnOff", "genLevelCtrl"]}]}),
            meta: {turnsOffAtBrightness1: true},
            fromZigbee: [fz.on_off, fz.brightness, fz.ignore_basic_report, fz.level_config, fz.power_on_behavior],
            toZigbee: [
                "state",
                "brightness",
                "brightness_percent",
                "on_time",
                "off_wait_time",
                "transition",
                "level_config",
                "rate",
                "brightness_move",
                "brightness_move_onoff",
                "brightness_step",
                "brightness_step_onoff",
                "effect",
                "alert",
                "flash",
                "power_on_behavior",
            ],
            exposes: ["effect", "light(state,brightness)", "power_on_behavior"],
            bind: [],
            read: [],
            configureReporting: [],
        });
    });

    test("light({colorTemp: {range: undefined}})", async () => {
        await assertDefinition({
            device: mockDevice({modelID: "TWGU10Bulb50AU", endpoints: [{inputClusters: ["genOnOff", "genLevelCtrl", "lightingColorCtrl"]}]}),
            meta: {},
            fromZigbee: [fz.on_off, fz.brightness, fz.ignore_basic_report, fz.level_config, fz.color_colortemp, fz.power_on_behavior],
            toZigbee: [
                "state",
                "brightness",
                "brightness_percent",
                "on_time",
                "off_wait_time",
                "transition",
                "level_config",
                "rate",
                "brightness_move",
                "brightness_move_onoff",
                "brightness_step",
                "brightness_step_onoff",
                "color_temp",
                "color_temp_percent",
                "color_mode",
                "color_options",
                "colortemp_move",
                "color_temp_move",
                "color_temp_step",
                "color_temp_startup",
                "effect",
                "alert",
                "flash",
                "power_on_behavior",
            ],
            exposes: ["effect", "light(state,brightness,color_temp,color_temp_startup)", "power_on_behavior"],
            bind: [],
            read: {
                1: [
                    ["lightingColorCtrl", ["colorCapabilities"]],
                    ["lightingColorCtrl", ["colorTempPhysicalMin", "colorTempPhysicalMax"]],
                ],
            },
            configureReporting: [],
        });
    });

    test('light({color: {modes: ["xy", "hs"], applyRedFix: true}, colorTemp: {range: [153, 555], startup: false}, turnsOffAtBrightness1: true}', async () => {
        await assertDefinition({
            device: mockDevice({modelID: "OPL 130 C", endpoints: [{inputClusters: ["genOnOff", "genLevelCtrl", "lightingColorCtrl"]}]}),
            meta: {applyRedFix: true, supportsHueAndSaturation: true, turnsOffAtBrightness1: true},
            fromZigbee: [fz.on_off, fz.brightness, fz.ignore_basic_report, fz.level_config, fz.color_colortemp, fz.power_on_behavior],
            toZigbee: [
                "state",
                "brightness",
                "brightness_percent",
                "on_time",
                "off_wait_time",
                "transition",
                "level_config",
                "rate",
                "brightness_move",
                "brightness_move_onoff",
                "brightness_step",
                "brightness_step_onoff",
                "color",
                "color_temp",
                "color_temp_percent",
                "color_mode",
                "color_options",
                "colortemp_move",
                "color_temp_move",
                "color_temp_step",
                "hue_move",
                "saturation_move",
                "hue_step",
                "saturation_step",
                "effect",
                "alert",
                "flash",
                "power_on_behavior",
            ],
            exposes: ["effect", "light(state,brightness,color_temp,color_xy,color_hs)", "power_on_behavior"],
            bind: [],
            read: {
                1: [
                    ["lightingColorCtrl", ["colorCapabilities"]],
                    ["lightingColorCtrl", ["colorTempPhysicalMin", "colorTempPhysicalMax"]],
                ],
            },
            configureReporting: [],
        });
    });

    test("light({color: true})", async () => {
        await assertDefinition({
            device: mockDevice({modelID: "ZBEK-1", endpoints: [{inputClusters: ["genOnOff", "genLevelCtrl", "lightingColorCtrl"]}]}),
            meta: {},
            fromZigbee: [fz.on_off, fz.brightness, fz.ignore_basic_report, fz.level_config, fz.color_colortemp, fz.power_on_behavior],
            toZigbee: [
                "state",
                "brightness",
                "brightness_percent",
                "on_time",
                "off_wait_time",
                "transition",
                "level_config",
                "rate",
                "brightness_move",
                "brightness_move_onoff",
                "brightness_step",
                "brightness_step_onoff",
                "color",
                "color_temp",
                "color_temp_percent",
                "color_mode",
                "color_options",
                "colortemp_move",
                "color_temp_move",
                "color_temp_step",
                "color_temp_startup",
                "hue_move",
                "saturation_move",
                "hue_step",
                "saturation_step",
                "effect",
                "alert",
                "flash",
                "power_on_behavior",
            ],
            exposes: ["effect", "light(state,brightness,color_temp,color_temp_startup,color_xy)", "power_on_behavior"],
            bind: [],
            read: {
                1: [
                    ["lightingColorCtrl", ["colorCapabilities"]],
                    ["lightingColorCtrl", ["colorTempPhysicalMin", "colorTempPhysicalMax"]],
                ],
            },
            configureReporting: [],
        });
    });

    test("onOff({powerOnBehavior: false}), electricalMeasurements({current: {divisor: 1000}, voltage: {divisor: 1}, power: {divisor: 1}, energy: {divisor: 100}})", async () => {
        await assertDefinition({
            device: mockDevice({modelID: "SP 120", endpoints: [{inputClusters: ["genOnOff", "haElectricalMeasurement", "seMetering"]}]}),
            meta: undefined,
            fromZigbee: [fz.on_off, fz.electrical_measurement, fz.metering],
            toZigbee: [
                "state",
                "on_time",
                "off_wait_time",
                "power",
                "voltage",
                "current",
                "energy",
                "produced_energy",
                "ac_frequency",
                "power_factor",
            ],
            exposes: ["current", "energy", "power", "switch(state)", "voltage"],
            bind: {1: ["genOnOff", "haElectricalMeasurement", "seMetering"]},
            read: {
                1: [
                    ["genOnOff", ["onOff"]],
                    ["haElectricalMeasurement", ["activePower", "rmsCurrent", "rmsVoltage"]],
                    ["seMetering", ["currentSummDelivered"]],
                ],
            },
            configureReporting: {
                1: [
                    ["genOnOff", [reportingItem("onOff", 0, repInterval.MAX, 1)]],
                    [
                        "haElectricalMeasurement",
                        [
                            reportingItem("activePower", 10, 65000, 5),
                            reportingItem("rmsCurrent", 10, 65000, 50),
                            reportingItem("rmsVoltage", 10, 65000, 5),
                        ],
                    ],
                    ["seMetering", [reportingItem("currentSummDelivered", 10, 65000, 10)]],
                ],
            },
        });
    });

    test(`philipsLight({gradient: {extraEffects: ['sparkle', 'opal', 'glisten']}, colorTemp: {range: [153, 500]}})`, async () => {
        await assertDefinition({
            device: mockDevice({
                modelID: "LCX012",
                endpoints: [{ID: 1, inputClusters: ["genOnOff", "genLevelCtrl", "lightingColorCtrl", "manuSpecificPhilips2"]}, {ID: 242}],
            }),
            meta: {supportsHueAndSaturation: true, turnsOffAtBrightness1: true},
            fromZigbee: [
                fz.on_off,
                fz.brightness,
                fz.ignore_basic_report,
                fz.level_config,
                fz.color_colortemp,
                fz.power_on_behavior,
                philips.fz.gradient,
            ],
            toZigbee: [
                "state",
                "brightness",
                "brightness_percent",
                "on_time",
                "off_wait_time",
                "transition",
                "level_config",
                "rate",
                "brightness_move",
                "brightness_move_onoff",
                "brightness_step",
                "brightness_step_onoff",
                "color",
                "color_temp",
                "color_temp_percent",
                "color_mode",
                "color_options",
                "colortemp_move",
                "color_temp_move",
                "color_temp_step",
                "color_temp_startup",
                "hue_move",
                "saturation_move",
                "hue_step",
                "saturation_step",
                "power_on_behavior",
                "hue_power_on_behavior",
                "hue_power_on_brightness",
                "hue_power_on_color_temperature",
                "hue_power_on_color",
                "effect",
                "gradient_scene",
                "gradient",
            ],
            exposes: [
                "effect",
                "gradient",
                "gradient_scene",
                "light(state,brightness,color_temp,color_temp_startup,color_xy,color_hs)",

                "power_on_behavior",
            ],
            bind: {1: ["manuSpecificPhilips2"]},
            read: {
                1: [
                    ["lightingColorCtrl", ["colorCapabilities"]],
                    ["lightingColorCtrl", ["colorTempPhysicalMin", "colorTempPhysicalMax"]],
                ],
            },
            configureReporting: [],
        });
    });

    test(`ledvanceLight({configureReporting: true, endpoints: {'l1': 10, 'l2': 11, 's1': 25}, ota: true})`, async () => {
        await assertDefinition({
            device: mockDevice({
                modelID: "Zigbee 3.0 DALI CONV LI",
                endpoints: [
                    {ID: 10, inputClusters: ["genOnOff", "genLevelCtrl"]},
                    {ID: 11, inputClusters: ["genOnOff", "genLevelCtrl"]},
                    {ID: 25, inputClusters: ["genOnOff", "genLevelCtrl"]},
                    {ID: 242, inputClusters: []},
                ],
            }),
            meta: {multiEndpoint: true},
            fromZigbee: [fz.command_toggle, fz.command_move, fz.command_stop, fz.on_off, fz.brightness, fz.ignore_basic_report, fz.level_config],
            toZigbee: [
                "state",
                "brightness",
                "brightness_percent",
                "on_time",
                "off_wait_time",
                "transition",
                "level_config",
                "rate",
                "brightness_move",
                "brightness_move_onoff",
                "brightness_step",
                "brightness_step_onoff",
                "effect",
                "alert",
                "flash",
                "set_transition",
                "remember_state",
                "osram_set_transition",
                "osram_remember_state",
            ],
            exposes: [
                "action",
                "effect",
                "effect",
                "effect",
                "light_l1(state,brightness)",
                "light_l2(state,brightness)",
                "light_s1(state,brightness)",
            ],
            bind: {
                10: ["genOnOff", "genLevelCtrl"],
                11: ["genOnOff", "genLevelCtrl"],
                25: ["genOnOff", "genLevelCtrl"],
            },
            read: {
                10: [
                    ["genOnOff", ["onOff"]],
                    ["genLevelCtrl", ["currentLevel"]],
                ],
                11: [
                    ["genOnOff", ["onOff"]],
                    ["genLevelCtrl", ["currentLevel"]],
                ],
                25: [
                    ["genOnOff", ["onOff"]],
                    ["genLevelCtrl", ["currentLevel"]],
                ],
            },
            configureReporting: {
                10: [
                    ["genOnOff", [reportingItem("onOff", 0, repInterval.MAX, 1)]],
                    ["genLevelCtrl", [reportingItem("currentLevel", 5, 65000, 1)]],
                ],
                11: [
                    ["genOnOff", [reportingItem("onOff", 0, repInterval.MAX, 1)]],
                    ["genLevelCtrl", [reportingItem("currentLevel", 5, 65000, 1)]],
                ],
                25: [
                    ["genOnOff", [reportingItem("onOff", 0, repInterval.MAX, 1)]],
                    ["genLevelCtrl", [reportingItem("currentLevel", 5, 65000, 1)]],
                ],
            },
            endpoints: {l1: 10, l2: 11, s1: 25},
        });
    });

    test("onOff({endpoints: {top: 1, bottom: 2}})", async () => {
        await assertDefinition({
            device: mockDevice({
                modelID: "PM-S240R-ZB",
                endpoints: [
                    {ID: 1, inputClusters: ["genOnOff"]},
                    {ID: 2, inputClusters: ["genOnOff"]},
                ],
            }),
            meta: {multiEndpoint: true},
            fromZigbee: [fz.on_off],
            toZigbee: ["state", "on_time", "off_wait_time"],
            exposes: ["switch_bottom(state)", "switch_top(state)"],
            bind: {
                1: ["genOnOff"],
                2: ["genOnOff"],
            },
            read: {
                1: [["genOnOff", ["onOff"]]],
                2: [["genOnOff", ["onOff"]]],
            },
            configureReporting: {
                1: [["genOnOff", [reportingItem("onOff", 0, repInterval.MAX, 1)]]],
                2: [["genOnOff", [reportingItem("onOff", 0, repInterval.MAX, 1)]]],
            },
            endpoints: {bottom: 2, top: 1},
        });
    });

    test("VOCKQJK11LM", async () => {
        await assertDefinition({
            device: mockDevice({modelID: "lumi.airmonitor.acn01", endpoints: [{ID: 1, inputClusters: []}]}),
            meta: {battery: {voltageToPercentage: {min: 2850, max: 3000}}},
            fromZigbee: [
                fz.battery,
                lumiFz.lumi_specific,
                expect.objectContaining({cluster: "manuSpecificLumi"}),
                expect.objectContaining({cluster: "genAnalogInput"}),
                expect.objectContaining({cluster: "msTemperatureMeasurement"}),
                expect.objectContaining({cluster: "msRelativeHumidity"}),
                expect.objectContaining({cluster: "manuSpecificLumi"}),
                expect.objectContaining({cluster: "manuSpecificLumi"}),
            ],
            toZigbee: ["air_quality", "voc", "temperature", "humidity", "display_unit"],
            exposes: ["air_quality", "battery", "device_temperature", "display_unit", "humidity", "temperature", "voc", "voltage"],
            bind: {
                1: ["genPowerCfg", "genAnalogInput", "msTemperatureMeasurement", "msRelativeHumidity"],
            },
            read: {
                1: [
                    ["genPowerCfg", ["batteryVoltage"]],
                    ["manuSpecificLumi", ["airQuality"]],
                    ["genAnalogInput", ["presentValue"]],
                    ["msTemperatureMeasurement", ["measuredValue"]],
                    ["msRelativeHumidity", ["measuredValue"]],
                    ["manuSpecificLumi", ["displayUnit"]],
                ],
            },
            configureReporting: {
                1: [
                    ["genPowerCfg", [reportingItem("batteryVoltage", repInterval.HOUR, repInterval.MAX, 0)]],
                    ["genAnalogInput", [reportingItem("presentValue", 10, repInterval.HOUR, 5)]],
                    ["msTemperatureMeasurement", [reportingItem("measuredValue", 10, repInterval.HOUR, 100)]],
                    ["msRelativeHumidity", [reportingItem("measuredValue", 10, repInterval.HOUR, 100)]],
                ],
            },
        });
    });

    test("Setup attributes", async () => {
        const device = mockDevice({modelID: "", endpoints: [{inputClusters: ["haElectricalMeasurement"]}]});
        const deviceEp = device.endpoints[0];
        const coordinator = mockDevice({modelID: "", endpoints: [{}]});
        const coordinatorEp = coordinator.endpoints[0];
        const config = {min: 0, max: 10, change: 1};
        const expectedConfig = {maximumReportInterval: 10, minimumReportInterval: 0, reportableChange: 1};

        await setupAttributes(deviceEp, coordinator.endpoints[0], "haElectricalMeasurement", [
            {attribute: "1", ...config},
            {attribute: "2", ...config},
            {attribute: "3", ...config},
            {attribute: "4", ...config},
            {attribute: "5", ...config},
            {attribute: "6", ...config},
        ]);

        expect(deviceEp.bind).toHaveBeenCalledTimes(1);
        expect(deviceEp.bind).toHaveBeenCalledWith("haElectricalMeasurement", coordinatorEp);

        expect(deviceEp.configureReporting).toHaveBeenCalledTimes(2);
        expect(deviceEp.configureReporting).toHaveBeenNthCalledWith(1, "haElectricalMeasurement", [
            {attribute: "1", ...expectedConfig},
            {attribute: "2", ...expectedConfig},
            {attribute: "3", ...expectedConfig},
            {attribute: "4", ...expectedConfig},
        ]);
        expect(deviceEp.configureReporting).toHaveBeenNthCalledWith(2, "haElectricalMeasurement", [
            {attribute: "5", ...expectedConfig},
            {attribute: "6", ...expectedConfig},
        ]);

        expect(deviceEp.read).toHaveBeenCalledTimes(2);
        expect(deviceEp.read).toHaveBeenNthCalledWith(1, "haElectricalMeasurement", ["1", "2", "3", "4"]);
        expect(deviceEp.read).toHaveBeenNthCalledWith(2, "haElectricalMeasurement", ["5", "6"]);
    });
});
