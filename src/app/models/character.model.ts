export interface ICharacter {
  id: number;
  name: string;
  status: string;
  gender?: string,
  species: string;
  image: string;
  type?: string,
  url?: string,
  location: {
    name: string;
  };
  created?: Date,
  episode?: string[],
  origin?: IOrigin,
}

export interface IOrigin {
  name: string,
  url: string,
}

// export enum EStatus {
//   Alive = "Alive", Dead = "Dead"
// }