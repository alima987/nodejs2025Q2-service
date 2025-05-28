export class Favorites {
  artists: string[]; 
  albums: string[]; 
  tracks: string[]; 
  
  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
 
}