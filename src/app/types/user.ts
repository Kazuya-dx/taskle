export interface User {
  uid: string | undefined;
  name: string;
  bio: string;
  icon: string;
  background: string;
  point: number;
  coin: number;
  is_guest: boolean;
}
