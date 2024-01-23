import type { SmartHomeV1ExecuteRequestCommands, SmartHomeV1SyncDevices } from 'actions-on-google';
import { Characteristic } from '../hap-types';
import { HapService, AccessoryTypeExecuteResponse } from '../interfaces';
import { Hap } from '../hap';

export class MotionSensor {
 

  sync(service: HapService):SmartHomeV1SyncDevices {
    return {
      id: service.uniqueId,
       type: 'action.devices.types.SENSOR',
      traits: [
        'action.devices.traits.OccupencySensing',
      ],
      name: {
        defaultNames: [
          service.serviceName,
          service.accessoryInformation.Name,
        ],
        name: service.serviceName,
        nicknames: [],
      },
      willReportState: true,
      
      
      attributes: {
        occupancySensorType: 'PIR',
        occupiedToUnoccupiedDelaySec: 10,
      	unoccupiedToOccupiedDelaySec: 10,
      	unoccupiedToOccupiedEventThreshold: 2,
      },
      deviceInfo: {
        manufacturer: service.accessoryInformation.Manufacturer,
        model: service.accessoryInformation.Model,
        hwVersion: service.accessoryInformation.HardwareRevision,
        swVersion: service.accessoryInformation.SoftwareRevision,
      },
      customData: {
        aid: service.aid,
        iid: service.iid,
        instanceUsername: service.instance.username,
        instanceIpAddress: service.instance.ipAddress,
        instancePort: service.instance.port,
      },
    };
  }

  query(service: HapService) {
    return {
      online: true,
		occupancy: service.characteristics.find(x => x.type === Characteristic.MotionDetected)?.value,
	} as any;
  }

  execute(service: HapService, command: SmartHomeV1ExecuteRequestCommands): AccessoryTypeExecuteResponse {
    return { payload: { characteristics: [] } };
  }

}