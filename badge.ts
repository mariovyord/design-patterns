// Implementation interface
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(volume: number): void;
}

// Concrete implementations
class TV implements Device {
  private enabled: boolean = false;
  private volume: number = 30;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(100, volume));
  }
}

class Radio implements Device {
  private enabled: boolean = false;
  private volume: number = 20;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(100, volume));
  }
}

// Abstraction
abstract class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }
}

// Refined Abstraction
class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    this.device.setVolume(0);
  }
}

// Example usage
const tv = new TV();
const radio = new Radio();

const tvRemote = new AdvancedRemoteControl(tv);
const radioRemote = new AdvancedRemoteControl(radio);

tvRemote.togglePower(); // Turn on TV
tvRemote.volumeUp(); // Increase TV volume
tvRemote.mute(); // Mute TV

radioRemote.togglePower(); // Turn on Radio
radioRemote.volumeDown(); // Decrease Radio volume
