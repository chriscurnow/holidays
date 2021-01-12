
export class LocationItem {
  id!: string;
  name!: string;
  city!: string;
  state!: string;

  constructor (data: any) {
    if (data) {
      this.id = data.id ? data.id : this.id;
      this.name = data.name ? data.name : this.name;
      this.city = data.city ? data.city : this.city;
      this.state = data.state ? data.state : this.state;
    }
  }
}
