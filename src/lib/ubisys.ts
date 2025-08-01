import {Zcl} from "zigbee-herdsman";

import {presets as e, access as ea} from "./exposes";
import {logger} from "./logger";
import {type BinaryArgs, binary, deviceAddCustomCluster, type NumericArgs, numeric, setupConfigureForReporting} from "./modernExtend";
import type {Configure, Fz, ModernExtend, Tz} from "./types";

const NS = "zhc:ubisys";

export const ubisysModernExtend = {
    addCustomClusterHvacThermostat: () =>
        deviceAddCustomCluster("hvacThermostat", {
            ID: 0x0201,
            attributes: {
                // H10
                ubisysClassBTemperatureOffset: {ID: 0x0000, type: Zcl.DataType.INT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysReturnFlowTemperatureWeight: {
                    ID: 0x0001,
                    type: Zcl.DataType.INT8,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysRawOutdoorTemperature: {ID: 0x0002, type: Zcl.DataType.STRUCT, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysRawLocalTemperatureA: {ID: 0x0003, type: Zcl.DataType.STRUCT, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysRawLocalTemperatureB: {ID: 0x0004, type: Zcl.DataType.STRUCT, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysRawForwardFlowTemperature: {
                    ID: 0x0005,
                    type: Zcl.DataType.STRUCT,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysRawReturnFlowTemperature: {
                    ID: 0x0006,
                    type: Zcl.DataType.STRUCT,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysInstalledExtensions: {ID: 0x0007, type: Zcl.DataType.BITMAP64, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                // H1
                ubisysTemperatureOffset: {ID: 0x0010, type: Zcl.DataType.INT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysDefaultOccupiedHeatingSetpoint: {
                    ID: 0x0011,
                    type: Zcl.DataType.INT16,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysVacationMode: {ID: 0x0012, type: Zcl.DataType.BOOLEAN, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysRemoteTemperature: {ID: 0x0013, type: Zcl.DataType.INT16, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysRemoteTemperatureValidDuration: {
                    ID: 0x0014,
                    type: Zcl.DataType.UINT8,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysDetectOpenWindow: {ID: 0x0015, type: Zcl.DataType.BITMAP8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysOpenWindowState: {ID: 0x0016, type: Zcl.DataType.BITMAP8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysOpenWindowSensitivity: {ID: 0x0017, type: Zcl.DataType.UINT16, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysOpenWindowDetectionPeriod: {
                    ID: 0x0018,
                    type: Zcl.DataType.UINT16,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysOpenWindowTimeout: {ID: 0x0019, type: Zcl.DataType.UINT16, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysProportionalGain: {ID: 0x0020, type: Zcl.DataType.INT16, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysProportionalShift: {ID: 0x0021, type: Zcl.DataType.INT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysIntegralFactor: {ID: 0x0022, type: Zcl.DataType.INT16, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
            },
            commands: {},
            commandsResponse: {},
        }),
    addCustomClusterGenLevelCtrl: () =>
        deviceAddCustomCluster("genLevelCtrl", {
            ID: 0x0008,
            attributes: {
                // D1(-R)
                ubisysMinimumOnLevel: {ID: 0x0000, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                // H10
                ubisysValveType: {ID: 0x0001, type: Zcl.DataType.BITMAP8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysCyclePeriod: {ID: 0x0002, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysSeason: {ID: 0x0003, type: Zcl.DataType.ENUM8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysBackupLevel: {ID: 0x0004, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysAlternateBackupLevel: {ID: 0x0005, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysLowerRange: {ID: 0x0006, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysUpperRange: {ID: 0x0007, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysPumpThresholdOn: {ID: 0x0008, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysPumpThresholdOff: {ID: 0x0009, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysHeatingDemandEnableThreshold: {
                    ID: 0x000a,
                    type: Zcl.DataType.UINT8,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysHeatingDemandDisableThreshold: {
                    ID: 0x000b,
                    type: Zcl.DataType.UINT8,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysCoolingDemandEnableThreshold: {
                    ID: 0x000c,
                    type: Zcl.DataType.UINT8,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysCoolingDemandDisableThreshold: {
                    ID: 0x000d,
                    type: Zcl.DataType.UINT8,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
            },
            commands: {},
            commandsResponse: {},
        }),
    addCustomClusterClosuresWindowCovering: () =>
        deviceAddCustomCluster("closuresWindowCovering", {
            ID: 0x0102,
            attributes: {
                // J1(-R)
                ubisysTurnaroundGuardTime: {ID: 0x1000, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysLiftToTiltTransitionSteps: {
                    ID: 0x1001,
                    type: Zcl.DataType.UINT16,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysTotalSteps: {ID: 0x1002, type: Zcl.DataType.UINT16, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysLiftToTiltTransitionSteps2: {
                    ID: 0x1003,
                    type: Zcl.DataType.UINT16,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysTotalSteps2: {ID: 0x1004, type: Zcl.DataType.UINT16, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysAdditionalSteps: {ID: 0x1005, type: Zcl.DataType.UINT8, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                ubisysInactivePowerThreshold: {
                    ID: 0x1006,
                    type: Zcl.DataType.UINT16,
                    manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
                },
                ubisysStartupSteps: {ID: 0x1007, type: Zcl.DataType.UINT16, manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
            },
            commands: {},
            commandsResponse: {},
        }),
    addCustomClusterManuSpecificUbisysDeviceSetup: () =>
        deviceAddCustomCluster("manuSpecificUbisysDeviceSetup", {
            ID: 0xfc00,
            // XXX: once we moved all manuSpecific ones out of zh, we should revisit this
            // Doesn't use manufacturerCode: https://github.com/Koenkk/zigbee-herdsman-converters/pull/4412
            attributes: {
                inputConfigurations: {ID: 0x0000, type: Zcl.DataType.ARRAY},
                inputActions: {ID: 0x0001, type: Zcl.DataType.ARRAY},
            },
            commands: {},
            commandsResponse: {},
        }),
    addCustomClusterManuSpecificUbisysDimmerSetup: () =>
        deviceAddCustomCluster("manuSpecificUbisysDimmerSetup", {
            ID: 0xfc01,
            manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH,
            attributes: {
                capabilities: {ID: 0x0000, type: Zcl.DataType.BITMAP8},
                status: {ID: 0x0001, type: Zcl.DataType.BITMAP8},
                mode: {ID: 0x0002, type: Zcl.DataType.BITMAP8},
            },
            commands: {},
            commandsResponse: {},
        }),
    localTemperatureOffset: (args?: Partial<NumericArgs>) =>
        numeric({
            name: "local_temperature_offset",
            cluster: "hvacThermostat",
            attribute: "ubisysTemperatureOffset",
            entityCategory: "config",
            description: "Specifies the temperature offset for the locally measured temperature value.",
            valueMin: -10,
            valueMax: 10,
            unit: "ºC",
            ...args,
        }),
    occupiedHeatingSetpointDefault: (args?: Partial<NumericArgs>) =>
        numeric({
            name: "occupied_heating_default_setpoint",
            cluster: "hvacThermostat",
            attribute: "ubisysDefaultOccupiedHeatingSetpoint",
            entityCategory: "config",
            description:
                "Specifies the default heating setpoint during occupancy, " +
                "representing the targeted temperature when a recurring weekly schedule ends without a follow-up schedule.",
            scale: 100,
            valueStep: 0.5, // H1 interface uses 0.5 step
            valueMin: 7,
            valueMax: 30,
            unit: "ºC",
            ...args,
        }),
    remoteTemperatureDuration: (args?: Partial<NumericArgs>) =>
        numeric({
            name: "remote_temperature_duration",
            cluster: "hvacThermostat",
            attribute: "ubisysRemoteTemperatureValidDuration",
            entityCategory: "config",
            description:
                "Specifies the duration period in seconds, during which a remotely measured temperature value " +
                "remains valid since its reception as attribute report.",
            valueMin: 0,
            valueMax: 86400,
            unit: "s",
            ...args,
        }),
    vacationMode: (): ModernExtend => {
        const clusterName = "hvacThermostat";
        const writeableAttributeName = "ubisysVacationMode";
        const readableAttributeName = "occupancy";
        const propertyName = "vacation_mode";
        const access = ea.ALL;

        const expose = e
            .binary(propertyName, access, true, false)
            .withDescription("When Vacation Mode is active the schedule is disabled and unoccupied_heating_setpoint is used.");

        const fromZigbee: Fz.Converter[] = [
            {
                cluster: clusterName,
                type: ["attributeReport", "readResponse"],
                convert: (model, msg, publish, options, meta) => {
                    if (msg.data[readableAttributeName] !== undefined) {
                        return {[propertyName]: msg.data.occupancy === 0};
                    }
                },
            },
        ];

        const toZigbee: Tz.Converter[] = [
            {
                key: [propertyName],
                convertSet: async (entity, key, value, meta) => {
                    if (typeof value === "boolean") {
                        // NOTE: DataType is BOOLEAN in zcl definition as per the device technical reference
                        //       passing a BOOLEAN type 'value' throws INVALID_DATA_TYPE, we need to pass 1 (true) or 0 (false)
                        //       ZCL DataType used does still need to be 0x0010 (BOOLEAN)
                        await entity.write(
                            clusterName,
                            {[writeableAttributeName]: value ? 1 : 0},
                            {manufacturerCode: Zcl.ManufacturerCode.UBISYS_TECHNOLOGIES_GMBH},
                        );
                    } else {
                        logger.error(`${propertyName} must be a boolean!`, NS);
                    }
                },
                convertGet: async (entity, key, meta) => {
                    await entity.read(clusterName, [readableAttributeName]);
                },
            },
        ];

        const configure: Configure[] = [
            setupConfigureForReporting(clusterName, readableAttributeName, {config: {min: 0, max: "1_HOUR", change: 0}, access}),
        ];

        return {exposes: [expose], fromZigbee, toZigbee, configure, isModernExtend: true};
    },
    openWindowState: (args?: Partial<BinaryArgs>) =>
        binary({
            name: "open_window_state",
            cluster: "hvacThermostat",
            attribute: "ubisysOpenWindowState",
            access: "STATE_GET",
            valueOn: [true, 1],
            valueOff: [false, 0],
            description: "Presents the currently detected window state.",
            ...args,
        }),
    openWindowDetect: (args?: Partial<BinaryArgs>) =>
        binary({
            name: "open_window_detect",
            cluster: "hvacThermostat",
            attribute: "ubisysDetectOpenWindow",
            entityCategory: "config",
            valueOn: [true, 1],
            valueOff: [false, 0],
            description: "Specifies whether the Open Window Detection is activated or deactivated.",
            ...args,
        }),
    openWindowTimeout: (args?: Partial<NumericArgs>) =>
        numeric({
            name: "open_window_timeout",
            cluster: "hvacThermostat",
            attribute: "ubisysOpenWindowTimeout",
            entityCategory: "config",
            description:
                "Specifies the maximum time duration in seconds for a detected open-window state. This attribute " +
                "effectively defines how long a detected open-window state should last before H1 returns back to " +
                "its default set point settings.",
            valueMin: 0,
            valueMax: 86400,
            unit: "s",
            ...args,
        }),
    openWindowDetectionPeriod: (args?: Partial<NumericArgs>) =>
        numeric({
            name: "open_window_detection_periode",
            cluster: "hvacThermostat",
            attribute: "ubisysOpenWindowDetectionPeriod",
            entityCategory: "config",
            description:
                "Specifies the time duration in minutes, within which the sharp temperature change must have taken " +
                "place for the open window detection.",
            valueMin: 1,
            valueMax: 180,
            unit: "m",
            ...args,
        }),
    openWindowSensitivity: (args?: Partial<NumericArgs>) =>
        numeric({
            name: "open_window_sensitivity",
            cluster: "hvacThermostat",
            attribute: "ubisysOpenWindowSensitivity",
            entityCategory: "config",
            description:
                "Specifies the temperature change threshold for the Open Window Detection. This is the point at " +
                "which the H1 detects a significant temperature change indicating the detection of an open or " +
                "closed window.",
            scale: 100,
            valueStep: 0.5, // H1 interface uses 0.5 step
            valueMin: 1,
            valueMax: 30,
            unit: "ºC",
            ...args,
        }),
};
