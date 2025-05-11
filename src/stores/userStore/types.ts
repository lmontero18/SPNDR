export interface UserData {
  income: number;
  expenses: number;
  debts: number;
  savings: number;
}

export interface UserStore {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}
