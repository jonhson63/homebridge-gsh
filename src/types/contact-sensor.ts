import type { SmartHomeV1ExecuteRequestCommands, SmartHomeV1SyncDevices } from 'actions-on-google';
import { Characteristic } from '../hap-types';
import { HapService, AccessoryTypeExecuteResponse } from '../interfaces';
import { Hap } from '../hap';

export class ContactSensor {
 

  sync(service: HapService):SmartHomeV1SyncDevices {
    return {
      id: service.uniqueId,
       type: 'action.devices.types.SENSOR',
      traits: [
        'action.devices.traits.OpenClose',
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
        discreteOnlyOpenClose: true,
        commandOnlyOpenClose: false,
      	queryOnlyOpenClose: true,
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
  	const ContactSensorState = service.characteristics.find(x => x.type === Characteristic.ContactSensorState).value;
    // open, closed, opening, closing, stopped
    const openPercent = [100, 0][ContactSensorState];
    return {
          on: true,
      online: true,
      openPercent,
	} as any;
  }

  execute(service: HapService, command: SmartHomeV1ExecuteRequestCommands): AccessoryTypeExecuteResponse {
    return { payload: { characteristics: [] } };
  }

}